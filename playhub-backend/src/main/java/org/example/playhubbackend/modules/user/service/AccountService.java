package org.example.playhubbackend.modules.user.service;

import lombok.RequiredArgsConstructor;
import org.example.playhubbackend.common.exception.AppException;
import org.example.playhubbackend.common.exception.ErrorCode;
import org.example.playhubbackend.modules.user.entity.Account;
import org.example.playhubbackend.modules.user.enums.AccountStatus;
import org.example.playhubbackend.modules.user.enums.UserRole;
import org.example.playhubbackend.modules.user.repository.AccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public void registerLocalAccount(String email, String password) {
        Account account = accountRepository.findByEmail(email).orElse(null);

        if (account == null) {
            Account newAccount = Account.builder()
                    .email(email)
                    .passwordHash(passwordEncoder.encode(password))
                    .build();
            newAccount.addRole(UserRole.PLAYER);
            accountRepository.save(newAccount);
        } else {
            if (account.getStatus() == AccountStatus.PENDING_VERIFY) {
                account.updatePassword(passwordEncoder.encode(password));
                accountRepository.save(account);
            } else {
                throw new AppException(ErrorCode.ACCOUNT_EXISTED);
            }
        }
    }

    public void activateAccount(String email) {
        Account account = getAccountByEmail(email);
        account.activate();
        accountRepository.save(account);
    }

    // Flow verifies email + password for login feature
    public void verifyCredentials(String email, String password) {
        Account account = accountRepository.findByEmail(email).orElse(null);

        if (account == null || !passwordEncoder.matches(password, account.getPasswordHash())) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }

        switch (account.getStatus()) {
            case AccountStatus.PENDING_VERIFY -> throw new AppException(ErrorCode.ACCOUNT_PENDING_VERIFY);
            case AccountStatus.LOCKED -> throw new AppException(ErrorCode.ACCOUNT_LOCKED);
        }
    }

    public void changePassword(String email, String newPassword) {
        Account account = getAccountByEmail(email);
        account.updatePassword(passwordEncoder.encode(newPassword));
        accountRepository.save(account);
    }

    private Account getAccountByEmail(String email) {
        return accountRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND, "email=" + email));
    }

}
