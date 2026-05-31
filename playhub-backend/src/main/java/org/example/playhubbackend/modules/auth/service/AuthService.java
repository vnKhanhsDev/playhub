package org.example.playhubbackend.modules.auth.service;

import jakarta.servlet.http.HttpServletRequest;
import org.example.playhubbackend.common.response.ApiResponse;
import org.example.playhubbackend.modules.auth.dto.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public ResponseEntity<ApiResponse<?>> register(RegisterRequest request, HttpServletRequest httpRequest) {
        // registerAccount (module user)

        // generate OTP code (otp service)

        // send OTP code (mail service)

        return null;
    }

}
