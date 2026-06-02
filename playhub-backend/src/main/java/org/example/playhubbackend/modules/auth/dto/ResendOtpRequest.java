package org.example.playhubbackend.modules.auth.dto;

public record ResendOtpRequest(
        String flowId
) { }