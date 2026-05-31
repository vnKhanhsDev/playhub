package org.example.playhubbackend.common.exception;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AppException extends RuntimeException {

    private final ErrorCode errorCode;

    /*
    * @param errorCode: USER_NOT_FOUND
    * @param detail: "id=123"
    * @return: "User not found: id=123"
    * */
    public AppException(ErrorCode errorCode, String detail) {
        super(errorCode.getMessage() + ": " + detail);
        this.errorCode = errorCode;
    }

}
