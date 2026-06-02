package org.example.playhubbackend.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.playhubbackend.common.exception.ErrorCode;

import java.time.Instant;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse <T> {

    private boolean success;
    private T data;
    private String errorCode;
    private String message;
    private String path;
    private Instant timestamp;

    public static <T> ApiResponse<T> success(T data, HttpServletRequest request) {
        return ApiResponse.<T>builder()
                .success(true)
                .data(data)
                .path(request.getRequestURI())
                .timestamp(Instant.now())
                .build();
    }

    public static <T> ApiResponse<T> error(ErrorCode errorCode, HttpServletRequest request) {
        return ApiResponse.<T>builder()
                .success(false)
                .errorCode(errorCode.name())
                .message(errorCode.getMessage())
                .path(request.getRequestURI())
                .timestamp(Instant.now())
                .build();
    }

}
