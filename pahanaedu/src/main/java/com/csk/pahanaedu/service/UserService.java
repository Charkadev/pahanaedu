package com.csk.pahanaedu.service;

import com.csk.pahanaedu.dto.RegisterRequest;
import com.csk.pahanaedu.entity.User;

import java.util.Optional;

public interface UserService {
    User register(RegisterRequest request);
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}
