package org.example.playhubbackend.modules.user.entity;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.example.playhubbackend.modules.user.enums.UserRole;

import java.io.Serializable;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class AccountRoleId implements Serializable {

    private UUID account;
    private UserRole role;

}
