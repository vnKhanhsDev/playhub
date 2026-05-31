package org.example.playhubbackend.modules.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.example.playhubbackend.common.entity.BaseEntity;
import org.example.playhubbackend.modules.user.enums.UserRole;

@Entity
@Table(name = "account_roles")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountRole extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

}
