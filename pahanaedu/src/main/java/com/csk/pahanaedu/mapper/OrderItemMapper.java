package com.csk.pahanaedu.mapper;

import com.csk.pahanaedu.dto.OrderItemRequest;
import com.csk.pahanaedu.dto.OrderItemResponse;
import com.csk.pahanaedu.entity.OrderItem;
import com.csk.pahanaedu.entity.Item;
import org.springframework.stereotype.Component;

@Component
public class OrderItemMapper {

    // Map OrderItemRequest + Item entity -> OrderItem entity
    public OrderItem toEntity(OrderItemRequest req, Item itemEntity) {
        double totalPrice = itemEntity.getPrice() * req.getQuantity();

        return OrderItem.builder()
                .itemId(req.getItemId())
                .itemName(itemEntity.getName())
                .quantity(req.getQuantity())
                .price(itemEntity.getPrice())
                .totalPrice(totalPrice)
                .build();
    }

    // Map OrderItem entity -> OrderItemResponse DTO
    public OrderItemResponse toResponse(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .itemId(orderItem.getItemId())
                .itemName(orderItem.getItemName())
                .quantity(orderItem.getQuantity())
                .price(orderItem.getPrice())
                .totalPrice(orderItem.getTotalPrice())
                .build();
    }
}
