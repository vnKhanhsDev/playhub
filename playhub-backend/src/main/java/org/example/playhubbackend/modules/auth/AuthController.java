package org.example.playhubbackend.modules.auth;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.playhubbackend.common.response.ApiResponse;
import org.example.playhubbackend.modules.auth.dto.RegisterRequest;
import org.example.playhubbackend.modules.auth.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @RequestMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(RegisterRequest request, HttpServletRequest httpRequest) {
        authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(null, httpRequest));
    }

}
