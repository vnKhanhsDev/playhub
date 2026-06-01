package org.example.playhubbackend.modules.user.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.playhubbackend.common.entity.BaseEntity;
import org.example.playhubbackend.modules.user.enums.AccountStatus;
import org.example.playhubbackend.modules.user.enums.UserRole;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "accounts")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Account extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private AccountStatus status = AccountStatus.PENDING_VERIFY;

    @OneToMany(mappedBy = "account")
    @Builder.Default
    private Set<AccountRole> roles = new HashSet<>();

    public boolean hasRole(UserRole role) {
        return roles.stream().map(AccountRole::getRole).anyMatch(role::equals);
    }

    public void addRole(UserRole role) {
        roles.add(AccountRole.builder().account(this).role(role).build());
    }

}
