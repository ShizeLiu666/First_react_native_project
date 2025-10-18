package com.fastfood.backend.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Unified Response Format
 * Standard response structure for all API endpoints
 *
 * @param <T> The type of data in the response
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response<T> {

    private Integer code;
    private String message;
    private T data;

    /**
     * Success response with data
     */
    public static <T> Response<T> success(T data) {
        return new Response<>(200, "Success", data);
    }

    /**
     * Success response with custom message and data
     */
    public static <T> Response<T> success(String message, T data) {
        return new Response<>(200, message, data);
    }

    /**
     * Success response with message only
     */
    public static <T> Response<T> success(String message) {
        return new Response<>(200, message, null);
    }

    /**
     * Error response with message
     */
    public static <T> Response<T> error(String message) {
        return new Response<>(500, message, null);
    }

    /**
     * Error response with message and data
     */
    public static <T> Response<T> error(String message, T data) {
        return new Response<>(500, message, data);
    }

    /**
     * Custom response with code, message and data
     */
    public static <T> Response<T> custom(Integer code, String message, T data) {
        return new Response<>(code, message, data);
    }
}
