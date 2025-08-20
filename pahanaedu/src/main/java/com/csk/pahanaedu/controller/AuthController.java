package com.csk.pahanaedu.controller;

import com.csk.pahanaedu.dto.UserResponse;
import com.csk.pahanaedu.mapper.UserMapper;
import com.csk.pahanaedu.dto.RegisterRequest;
import com.csk.pahanaedu.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        if (userService.existsByUsername(req.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        userService.register(req);
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build(); // Unauthorized, no body
        }
        return userService.findByUsername(userDetails.getUsername())
                .map(user -> ResponseEntity.ok(userMapper.toResponse(user)))
                .orElseGet(() -> ResponseEntity.notFound().build()); // 404 Not Found, no body
    }
}
