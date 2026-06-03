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
        Account account = getAccountNotLocked(email);

        if (account != null) {
            if (account.getStatus() == AccountStatus.ACTIVE) {
                throw new AppException(ErrorCode.ACCOUNT_EXISTED);
            }
            account.updatePassword(passwordEncoder.encode(password));
            accountRepository.save(account);
        } else {
            createLocalAccount(email, password);
        }
    }

    public void activateAccount(String email) {
        Account account = getAccountByEmail(email);
        account.activate();
        accountRepository.save(account);
    }

    public void changePassword(String email, String newPassword) {
        Account account = getAccountByEmail(email);
        account.updatePassword(passwordEncoder.encode(newPassword));
        accountRepository.save(account);
    }

    private Account getAccountNotLocked(String email) {
        Account account = accountRepository.findByEmail(email).orElse(null);

        if (account != null && account.getStatus() == AccountStatus.LOCKED) {
            throw new AppException(ErrorCode.ACCOUNT_LOCKED);
        }

        return account;
    }

    private void createLocalAccount(String email, String password) {
        Account newAccount = Account.builder()
                .email(email)
                .passwordHash(passwordEncoder.encode(password))
                .build();
        newAccount.addRole(UserRole.PLAYER);
        accountRepository.save(newAccount);
    }

    private Account getAccountByEmail(String email) {
        return accountRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND, "email=" + email));
    }

}
