package com.csk.pahanaedu.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ItemResponse {
    private String id;
    private String name;
    private String description;
    private double price;
    private String imageUrl;
}
