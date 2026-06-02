package org.example.playhubbackend.modules.auth.dto;

import java.util.List;

public record LoginResponse(
        String accessToken,
        String refreshToken,
        String email,
        List<String> roles
) { }
