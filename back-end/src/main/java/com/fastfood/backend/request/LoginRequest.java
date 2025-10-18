package com.fastfood.backend.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Login Request
 * Request body for user login
 */
@Data
public class LoginRequest {

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Email format is invalid")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    private String password;
}
