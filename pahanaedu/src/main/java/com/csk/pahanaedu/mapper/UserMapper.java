package com.csk.pahanaedu.mapper;

import com.csk.pahanaedu.dto.RegisterRequest;
import com.csk.pahanaedu.dto.UserResponse;
import com.csk.pahanaedu.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(RegisterRequest request, String encodedPassword) {
        if (request == null) return null;
        return User.builder()
                .username(request.getUsername())
                .password(encodedPassword)
                .role(request.getRole() == null || request.getRole().isBlank() ? "USER" : request.getRole())
                .build();
    }

    public UserResponse toResponse(User user) {
        if (user == null) return null;
        return UserResponse.builder()
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }
}
