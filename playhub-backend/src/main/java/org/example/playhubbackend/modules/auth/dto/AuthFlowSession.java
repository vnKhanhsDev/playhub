package org.example.playhubbackend.modules.auth.dto;

import org.example.playhubbackend.modules.auth.enums.AuthFlowState;

public record AuthFlowSession(
        String email,
        AuthFlowState state
) { }
