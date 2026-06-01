package org.example.playhubbackend.modules.user.repository;

import org.example.playhubbackend.modules.user.entity.AccountRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AccountRoleRepository extends JpaRepository<AccountRole, UUID> {
}
