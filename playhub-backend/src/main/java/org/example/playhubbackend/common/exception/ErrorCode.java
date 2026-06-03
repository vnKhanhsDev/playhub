package org.example.playhubbackend.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {

    VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "Validation failed"),

    ACCOUNT_EXISTED(HttpStatus.CONFLICT, "Account already exists"),
    ACCOUNT_NOT_PENDING_VERIFY(HttpStatus.BAD_REQUEST, "Account is not pending verify"),
    ACCOUNT_LOCKED(HttpStatus.FORBIDDEN, "Account is locked"),

    OTP_RESEND_TOO_FREQUENTLY(HttpStatus.TOO_MANY_REQUESTS, "Otp resend too frequently"),
    OTP_NOT_FOUND(HttpStatus.NOT_FOUND, "OTP not found"),
    OTP_MAX_ATTEMPTS(HttpStatus.TOO_MANY_REQUESTS, "OTP has been used too many times"),
    OTP_INCORRECT(HttpStatus.BAD_REQUEST, "Incorrect OTP code"),

    PASSWORD_INCORRECT(HttpStatus.BAD_REQUEST, "Incorrect password"),

    AUTH_FLOW_EXPIRED(HttpStatus.UNAUTHORIZED, "Auth flow session has expired or is invalid"),
    INVALID_AUTH_FLOW_STATE(HttpStatus.BAD_REQUEST, "Invalid auth flow state"),

    ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND, "Account not found"),
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Invalid credentials")

    ;

    private HttpStatus httpStatus;
    private String message;

}
