package com.fastfood.backend.controller;

import com.fastfood.backend.dto.UserDTO;
import com.fastfood.backend.request.LoginRequest;
import com.fastfood.backend.request.RegisterRequest;
import com.fastfood.backend.response.Response;
import com.fastfood.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * User Controller
 * REST API endpoints for user operations
 */
@RestController
@RequestMapping("/api/user")
@Tag(name = "User Management", description = "User registration, login and profile management")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * User registration
     * @param request Register request
     * @return Response with user info and token
     */
    @PostMapping("/register")
    @Operation(summary = "User Registration", description = "Register a new user account")
    public Response<Map<String, Object>> register(@RequestBody @Valid RegisterRequest request) {
        return userService.register(request);
    }

    /**
     * User login
     * @param request Login request
     * @return Response with user info and token
     */
    @PostMapping("/login")
    @Operation(summary = "User Login", description = "Login with email and password")
    public Response<Map<String, Object>> login(@RequestBody @Valid LoginRequest request) {
        return userService.login(request);
    }

    /**
     * Get current user profile
     * @param authentication Spring Security authentication object
     * @return Response with user info
     */
    @GetMapping("/profile")
    @Operation(summary = "Get User Profile", description = "Get current logged-in user's profile")
    public Response<UserDTO> getProfile(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return Response.error("User not authenticated");
        }

        String email = authentication.getName();
        UserDTO user = userService.getUserByEmail(email);

        if (user == null) {
            return Response.error("User not found");
        }

        return Response.success("Profile retrieved successfully", user);
    }
}
