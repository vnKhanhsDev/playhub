package org.example.playhubbackend.modules.auth;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.playhubbackend.common.response.ApiResponse;
import org.example.playhubbackend.modules.auth.dto.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    @RequestMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(RegisterRequest request, HttpServletRequest httpRequest) {
        return null;
    }

}
