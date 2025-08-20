package com.csk.pahanaedu.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BillingDto {
    private String customerName;
    private String customerAccountNumber;
    private String orderId;
    private int orderCount;
    private List<BillingItem> items;
    private double totalAmount;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class BillingItem {
        private String name;
        private int quantity;
        private double unitPrice;
        private double totalPrice;
    }
}
