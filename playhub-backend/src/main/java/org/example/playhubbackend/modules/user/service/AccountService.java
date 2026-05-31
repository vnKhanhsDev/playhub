package org.example.playhubbackend.modules.user.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.playhubbackend.common.exception.AppException;
import org.example.playhubbackend.common.exception.ErrorCode;
import org.example.playhubbackend.modules.user.entity.Account;
import org.example.playhubbackend.modules.user.entity.AccountRole;
import org.example.playhubbackend.modules.user.enums.AccountStatus;
import org.example.playhubbackend.modules.user.enums.UserRole;
import org.example.playhubbackend.modules.user.repository.AccountRepository;
import org.example.playhubbackend.modules.user.repository.AccountRoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final AccountRoleRepository accountRoleRepository;

    private final PasswordEncoder passwordEncoder;

    public void registerLocalAccount(String email, String password, HttpServletRequest request) {
        Account account = accountRepository.findByEmail(email).orElse(null);

        if (account != null && account.getStatus() != AccountStatus.PENDING_VERIFY) {
            throw new AppException(ErrorCode.ACCOUNT_EXISTED, request);
        }

        if (account == null) {
            createLocalAccount(email, password);
        }

    }

    public void createLocalAccount(String email, String password) {
        Account newAccount = accountRepository.save(
                Account.builder()
                        .email(email)
                        .passwordHash(passwordEncoder.encode(password))
                        .build()
        );

        accountRoleRepository.save(
                AccountRole.builder()
                        .account(newAccount)
                        .role(UserRole.PLAYER)
                        .build()
        );
    }

}
