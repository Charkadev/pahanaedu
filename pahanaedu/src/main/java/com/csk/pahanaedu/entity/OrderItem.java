package com.csk.pahanaedu.entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {
    private String itemId;
    private String itemName;
    private int quantity;
    private double price;         // unit price
    private double totalPrice;    // price * quantity
}
