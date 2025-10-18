package com.fastfood.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * User Repository
 * Data access layer for User entity
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by email
     * @param email User email
     * @return Optional User
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if email exists
     * @param email User email
     * @return true if exists
     */
    boolean existsByEmail(String email);
}
