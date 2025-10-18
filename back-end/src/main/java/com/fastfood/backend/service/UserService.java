package com.fastfood.backend.service;

import com.fastfood.backend.dao.User;
import com.fastfood.backend.dao.UserRepository;
import com.fastfood.backend.dto.UserDTO;
import com.fastfood.backend.request.LoginRequest;
import com.fastfood.backend.request.RegisterRequest;
import com.fastfood.backend.response.Response;
import com.fastfood.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

/**
 * User Service
 * Business logic for user operations
 */
@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * User registration
     * @param request Register request
     * @return Response with user info and token
     */
    public Response<Map<String, Object>> register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return Response.error("Email already registered");
        }

        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getUsername());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());

        // Save user
        User savedUser = userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(savedUser.getEmail());

        // Prepare response data
        Map<String, Object> data = new HashMap<>();
        data.put("user", UserDTO.fromEntity(savedUser));
        data.put("token", token);

        return Response.success("Registration successful", data);
    }

    /**
     * User login
     * @param request Login request
     * @return Response with user info and token
     */
    public Response<Map<String, Object>> login(LoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return Response.error("Email not found");
        }

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return Response.error("Incorrect password");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail());

        // Prepare response data
        Map<String, Object> data = new HashMap<>();
        data.put("user", UserDTO.fromEntity(user));
        data.put("token", token);

        return Response.success("Login successful", data);
    }

    /**
     * Get user info by email
     * @param email User email
     * @return UserDTO
     */
    @Transactional(readOnly = true)
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        return UserDTO.fromEntity(user);
    }
}
