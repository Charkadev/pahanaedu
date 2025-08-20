// src/main/java/com/csk/pahanaedu/dto/UserResponse.java
package com.csk.pahanaedu.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private String username;
    private String role;
}
