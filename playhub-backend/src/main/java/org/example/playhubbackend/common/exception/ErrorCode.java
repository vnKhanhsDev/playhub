package org.example.playhubbackend.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {

    ACCOUNT_EXISTED(HttpStatus.CONFLICT, "Account already exists"),

    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Invalid credentials")

    ;

    private HttpStatus httpStatus;
    private String message;

}
