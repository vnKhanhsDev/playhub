package org.example.playhubbackend.modules.auth.dto;

import org.example.playhubbackend.modules.auth.enums.AuthFlowState;

public record AuthFlowResponse(
        String flowId,
        AuthFlowState nextStep,
        String email
) { }