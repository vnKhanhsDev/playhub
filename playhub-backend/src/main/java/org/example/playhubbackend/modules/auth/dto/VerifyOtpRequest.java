package org.example.playhubbackend.modules.auth.dto;

public record VerifyOtpRequest(
        String flowId,
        String otpCode
) { }