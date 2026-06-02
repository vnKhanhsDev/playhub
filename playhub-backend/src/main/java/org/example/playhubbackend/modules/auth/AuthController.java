package org.example.playhubbackend.modules.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.playhubbackend.common.response.ApiResponse;
import org.example.playhubbackend.modules.auth.dto.*;
import org.example.playhubbackend.modules.auth.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletRequest httpRequest
    ) {
        AuthFlowResponse response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, httpRequest));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<?>> verifyOtp(
            @Valid @RequestBody VerifyOtpRequest request,
            HttpServletRequest httpRequest
    ) {
        LoginResponse response = authService.verifyOtp(request);

        return ResponseEntity
                .ok(ApiResponse.success(response, httpRequest));
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<ApiResponse<?>> resendOtp(
            @Valid @RequestBody ResendOtpRequest request,
            HttpServletRequest httpRequest
    ) {
        AuthFlowResponse response = authService.resendOtp(request);

        return ResponseEntity
                .ok(ApiResponse.success(response, httpRequest));
    }

}
