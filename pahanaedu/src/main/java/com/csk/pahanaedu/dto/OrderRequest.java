package com.csk.pahanaedu.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    @NotBlank
    private String customerId;

    @NotEmpty
    private List<OrderItemRequest> items;
}
