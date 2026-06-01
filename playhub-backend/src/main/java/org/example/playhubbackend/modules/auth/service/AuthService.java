package org.example.playhubbackend.modules.auth.service;

import lombok.RequiredArgsConstructor;
import org.example.playhubbackend.infrastructure.mail.MailService;
import org.example.playhubbackend.modules.auth.dto.RegisterRequest;
import org.example.playhubbackend.modules.auth.enums.OtpType;
import org.example.playhubbackend.modules.user.service.AccountService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AccountService accountService;
    private final OtpService otpService;
    private final MailService mailService;

    public void register(RegisterRequest request) {
        // registerAccount (module user)
        accountService.registerLocalAccount(request.email(), request.password());

        // generate OTP code (otp service)
        String otpCode = otpService.generateAndSaveOtp(request.email(), OtpType.REGISTER);

        // send OTP code (mail service)
        mailService.sendRegistrationEmail(request.email(), otpCode);
    }

}
