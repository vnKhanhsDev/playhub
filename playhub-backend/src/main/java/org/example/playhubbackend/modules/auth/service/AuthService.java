package org.example.playhubbackend.modules.auth.service;

import lombok.RequiredArgsConstructor;
import org.example.playhubbackend.common.exception.AppException;
import org.example.playhubbackend.common.exception.ErrorCode;
import org.example.playhubbackend.infrastructure.jwt.JwtProvider;
import org.example.playhubbackend.infrastructure.mail.MailService;
import org.example.playhubbackend.modules.auth.dto.*;
import org.example.playhubbackend.modules.auth.enums.AuthFlowState;
import org.example.playhubbackend.modules.auth.enums.OtpType;
import org.example.playhubbackend.modules.user.entity.Account;
import org.example.playhubbackend.modules.user.repository.AccountRepository;
import org.example.playhubbackend.modules.user.service.AccountService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AccountService accountService;
    private final OtpService otpService;
    private final AuthFlowService authFlowService;
    private final MailService mailService;
    private final JwtProvider jwtProvider;
    private final AccountRepository accountRepository;

    public AuthFlowResponse register(RegisterRequest request) {
        // 1. Register or retrieve pending account (AccountService handles status check)
        accountService.registerLocalAccount(request.email(), request.password());

        // 2. Generate and send OTP
        String otpCode = otpService.generateAndSaveOtp(request.email(), OtpType.REGISTER);
        mailService.sendRegistrationEmail(request.email(), otpCode);

        // 3. Create AuthFlow session in Redis
        String flowId = authFlowService.createSession(request.email(), AuthFlowState.VERIFY_EMAIL);

        return new AuthFlowResponse(flowId, AuthFlowState.VERIFY_EMAIL, request.email());
    }

    public LoginResponse verifyOtp(VerifyOtpRequest request) {
        // 1. Retrieve and validate session
        AuthFlowSession session = authFlowService.getSession(request.flowId());

        // 2. Route by state
        return switch (session.state()) {
            case VERIFY_EMAIL -> handleVerifyEmail(session.email(), request);
        };
    }

    public AuthFlowResponse resendOtp(ResendOtpRequest request) {
        // 1. Retrieve and validate session
        AuthFlowSession session = authFlowService.getSession(request.flowId());

        // 2. Route by state
        return switch (session.state()) {
            case VERIFY_EMAIL -> handleResendEmailOtp(session.email(), request.flowId());
        };
    }

    // ===== Private handlers =====

    private LoginResponse handleVerifyEmail(String email, VerifyOtpRequest request) {
        // 1. Verify OTP code
        otpService.verifyOtp(email, request.otpCode(), OtpType.REGISTER);

        // 2. Activate account
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        account.activate();
        accountRepository.save(account);

        // 3. Delete AuthFlow session
        authFlowService.deleteSession(request.flowId());

        // 4. Generate JWT tokens and return
        return buildLoginResponse(account);
    }

    private AuthFlowResponse handleResendEmailOtp(String email, String flowId) {
        // 1. Generate and send new OTP
        String otpCode = otpService.generateAndSaveOtp(email, OtpType.REGISTER);
        mailService.sendRegistrationEmail(email, otpCode);

        // 2. Renew session TTL
        authFlowService.renewTtl(flowId);

        return new AuthFlowResponse(flowId, AuthFlowState.VERIFY_EMAIL, email);
    }

    private LoginResponse buildLoginResponse(Account account) {
        List<String> roles = account.getRoles().stream()
                .map(role -> role.getRole().name())
                .toList();

        String accessToken = jwtProvider.generateAccessToken(account.getEmail(), roles);
        String refreshToken = jwtProvider.generateRefreshToken(account.getEmail(), roles);

        return new LoginResponse(accessToken, refreshToken, account.getEmail(), roles);
    }

}
