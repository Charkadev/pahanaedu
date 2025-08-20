// src/main/java/com/csk/pahanaedu/dto/RegisterRequest.java
package com.csk.pahanaedu.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    private String role; // Optional: defaults to USER
}
