package org.example.playhubbackend.modules.user.service;

import org.example.playhubbackend.common.exception.AppException;
import org.example.playhubbackend.common.exception.ErrorCode;
import org.example.playhubbackend.modules.user.entity.Account;
import org.example.playhubbackend.modules.user.enums.AccountStatus;
import org.example.playhubbackend.modules.user.enums.UserRole;
import org.example.playhubbackend.modules.user.repository.AccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AccountServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AccountService accountService;

    @Test
    void shouldCreateNewAccountWhenEmailNotExists() {
        // Khởi tạo thông tin đăng ký đầu vào giả định
        String email = "test@gmail.com";
        String password = "test@123";
        String passwordHash = "$2a$10$Oop0357TQV0zjujZr5f3aeGZ5LrzSFOr/ACwcn.OKMC4mNgns148C";

        when(accountRepository.findByEmail(email)).thenReturn(Optional.empty());    // Giả sử tài khoản chưa tồn tại
        when(passwordEncoder.encode(password)).thenReturn(passwordHash);    // Giả sử password được mã hoá là passwordHash

        accountService.registerLocalAccount(email, password);   // Thực hiện hành động đăng ký tài khoản

        // Khởi tạo ArgumentCaptor để bắt (capture) đối tượng Account truyền vào phương thức save()
        ArgumentCaptor<Account> accountCaptor = ArgumentCaptor.forClass(Account.class);
        // Xác minh phương thức save() của repository đã được gọi và lưu lại đối tượng Account được gửi lên
        verify(accountRepository).save(accountCaptor.capture());

        Account savedAccount = accountCaptor.getValue();
        assertNotNull(savedAccount);                                                // Kiểm tra đối tượng Account được lưu không null
        assertEquals(email, savedAccount.getEmail());                               // Xác minh email của tài khoản mới khớp với đầu vào
        assertEquals(passwordHash, savedAccount.getPasswordHash());                 // Xác minh password đã được mã hóa chính xác
        assertEquals(AccountStatus.PENDING_VERIFY, savedAccount.getStatus());       // Xác minh trạng thái tài khoản mặc định là PENDING_VERIFY
        assertTrue(savedAccount.hasRole(UserRole.PLAYER));                          // Xác minh tài khoản được gán vai trò PLAYER mặc định
    }

    @Test
    void shouldUpdatePasswordWhenAccountPendingVerify() {
        String email = "test@gmail.com";
        String password = "newPassword";
        String passwordHash = "newPasswordHash";

        Account existingAccount = Account.builder()
                .email(email)
                .passwordHash("oldPasswordHash")
                .status(AccountStatus.PENDING_VERIFY)
                .build();

        when(accountRepository.findByEmail(email)).thenReturn(Optional.of(existingAccount));
        when(passwordEncoder.encode(password)).thenReturn(passwordHash);

        accountService.registerLocalAccount(email, password);

        verify(accountRepository).save(existingAccount);
        assertEquals(passwordHash, existingAccount.getPasswordHash());
    }

    @Test
    void shouldThrowExceptionWhenAccountExistedAndNotPendingVerify() {
        String email = "test@gmail.com";
        String password = "somePassword";

        Account existingAccount = Account.builder()
                .email(email)
                .passwordHash("passwordHash")
                .status(AccountStatus.ACTIVE)
                .build();

        when(accountRepository.findByEmail(email)).thenReturn(Optional.of(existingAccount));

        AppException exception = assertThrows(AppException.class, () ->
                accountService.registerLocalAccount(email, password)
        );

        assertEquals(ErrorCode.ACCOUNT_EXISTED, exception.getErrorCode());
        verify(accountRepository, never()).save(any(Account.class));
    }

    @Test
    void shouldActivateAccountSuccessfully() {
        String email = "test@gmail.com";

        Account account = Account.builder()
                .email(email)
                .status(AccountStatus.PENDING_VERIFY)
                .build();

        when(accountRepository.findByEmail(email)).thenReturn(Optional.of(account));

        accountService.activateAccount(email);

        assertEquals(AccountStatus.ACTIVE, account.getStatus());
        verify(accountRepository).save(account);
    }

    @Test
    void shouldThrowExceptionWhenActivateAccountNotPendingVerify() {
        String email = "test@gmail.com";

        Account account = Account.builder()
                .email(email)
                .status(AccountStatus.ACTIVE)
                .build();

        when(accountRepository.findByEmail(email)).thenReturn(Optional.of(account));

        AppException exception = assertThrows(AppException.class, () ->
                accountService.activateAccount(email)
        );

        assertEquals(ErrorCode.ACCOUNT_NOT_PENDING_VERIFY, exception.getErrorCode());
        verify(accountRepository, never()).save(any(Account.class));
    }

    @Test
    void shouldThrowExceptionWhenAccountNotFound() {
        String email = "notfound@gmail.com";

        when(accountRepository.findByEmail(email)).thenReturn(Optional.empty());

        AppException exception = assertThrows(AppException.class, () ->
                accountService.activateAccount(email)
        );

        assertEquals(ErrorCode.ACCOUNT_NOT_FOUND, exception.getErrorCode());
        verify(accountRepository, never()).save(any(Account.class));
    }

}
