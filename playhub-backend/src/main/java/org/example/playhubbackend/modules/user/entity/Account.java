package org.example.playhubbackend.modules.user.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.playhubbackend.common.entity.BaseEntity;
import org.example.playhubbackend.modules.user.enums.AccountStatus;

import java.util.Set;

@Entity
@Table(name = "accounts")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Account extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_status", nullable = false)
    @Builder.Default
    private AccountStatus status = AccountStatus.PENDING_VERIFY;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AccountRole> roles;

}
