package com.csk.pahanaedu.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    @Id
    private String id;

    private String customerId;
    private String customerName;
    private String customerAccountNumber;

    private List<OrderItem> items;
    private double totalAmount;

    private LocalDateTime createdAt;
}
