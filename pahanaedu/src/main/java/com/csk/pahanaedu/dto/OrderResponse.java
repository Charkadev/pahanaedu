package com.csk.pahanaedu.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderResponse {
    private String id;
    private String customerId;
    private String customerName;
    private String customerAccountNumber;
    private List<OrderItemResponse> items;
    private double totalAmount;
    private LocalDateTime createdAt;
}
