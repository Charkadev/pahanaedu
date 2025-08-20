package com.csk.pahanaedu.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ItemRequest {
    @NotBlank
    private String name;

    private String description;

    @Positive
    private double price;

}
