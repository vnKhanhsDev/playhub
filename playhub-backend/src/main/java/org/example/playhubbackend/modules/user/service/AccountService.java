package org.example.playhubbackend.modules.user.service;

import lombok.RequiredArgsConstructor;
import org.example.playhubbackend.modules.user.repository.AccountRepository;
import org.example.playhubbackend.modules.user.repository.AccountRoleRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final AccountRoleRepository accountRoleRepository;

}
