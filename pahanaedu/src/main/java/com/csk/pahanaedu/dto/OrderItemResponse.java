package com.csk.pahanaedu.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItemResponse {
    private String itemId;
    private String itemName;
    private int quantity;
    private double price;
    private double totalPrice;
}
