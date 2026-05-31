package org.example.playhubbackend.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.example.playhubbackend.common.exception.ErrorCode;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse <T> {

    private boolean success;
    private T data;
    private String errorCode;
    private String message;
    private Instant timestamp;
    private String path;

    public static <T> ApiResponse<T> success(T data, HttpServletRequest request) {
        return ApiResponse.<T>builder()
                .success(true)
                .data(data)
                .timestamp(Instant.now())
                .path(request.getRequestURI())
                .build();
    }

    public static <T> ApiResponse<T> error(ErrorCode errorCode, HttpServletRequest request) {
        return ApiResponse.<T>builder()
                .success(false)
                .errorCode(errorCode.name())
                .message(errorCode.getMessage())
                .timestamp(Instant.now())
                .path(request.getRequestURI())
                .build();
    }

}
