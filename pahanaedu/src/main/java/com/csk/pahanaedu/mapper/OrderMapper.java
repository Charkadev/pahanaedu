package com.csk.pahanaedu.mapper;

import com.csk.pahanaedu.dto.BillingDto;
import com.csk.pahanaedu.dto.OrderRequest;
import com.csk.pahanaedu.dto.OrderResponse;
import com.csk.pahanaedu.dto.OrderItemRequest;
import com.csk.pahanaedu.dto.OrderItemResponse;
import com.csk.pahanaedu.entity.Order;
import com.csk.pahanaedu.entity.OrderItem;
import com.csk.pahanaedu.entity.Item;
import com.csk.pahanaedu.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderMapper {

    private final ItemRepository itemRepository;
    private final OrderItemMapper orderItemMapper;

    // Map OrderRequest -> Order entity
    public Order toEntity(OrderRequest request, String customerName, String customerAccountNumber) {
        List<OrderItem> orderItems = request.getItems().stream()
                .map(this::toOrderItem)
                .collect(Collectors.toList());

        double totalAmount = orderItems.stream()
                .mapToDouble(OrderItem::getTotalPrice)
                .sum();

        return Order.builder()
                .customerId(request.getCustomerId())
                .customerName(customerName)
                .customerAccountNumber(customerAccountNumber)
                .items(orderItems)
                .totalAmount(totalAmount)
                .createdAt(LocalDateTime.now())
                .build();
    }

    // convert each OrderItemRequest to OrderItem entity
    private OrderItem toOrderItem(OrderItemRequest req) {
        Item itemEntity = itemRepository.findById(req.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found: " + req.getItemId()));
        return orderItemMapper.toEntity(req, itemEntity);
    }

    // Map Order entity -> OrderResponse DTO (used in Orders page)
    public OrderResponse toResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getItems().stream()
                .map(orderItemMapper::toResponse)
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .customerId(order.getCustomerId())
                .customerName(order.getCustomerName())
                .customerAccountNumber(order.getCustomerAccountNumber())
                .items(itemResponses)
                .totalAmount(order.getTotalAmount())
                .createdAt(order.getCreatedAt())
                .build();
    }

    // Map a single Order -> BillingDto (enhanced)
    public BillingDto toBillingDto(Order order) {
        List<BillingDto.BillingItem> billingItems = order.getItems().stream()
                .map(oi -> BillingDto.BillingItem.builder()
                        .name(oi.getItemName())
                        .quantity(oi.getQuantity())
                        .unitPrice(oi.getPrice())
                        .totalPrice(oi.getTotalPrice())
                        .build())
                .collect(Collectors.toList());

        return BillingDto.builder()
                .customerName(order.getCustomerName())
                .customerAccountNumber(order.getCustomerAccountNumber())
                .orderId(order.getId())
                .orderCount(1)
                .items(billingItems)
                .totalAmount(order.getTotalAmount())
                .build();
    }

    // Map multiple Orders -> combined BillingDto (enhanced)
    public BillingDto toCombinedBillingDto(List<Order> orders) {
        if (orders.isEmpty()) return null;

        String customerName = orders.get(0).getCustomerName();
        String accountNumber = orders.get(0).getCustomerAccountNumber();
        int orderCount = orders.size();

        List<BillingDto.BillingItem> combinedItems = new ArrayList<>();
        double totalAmount = 0;

        for (Order order : orders) {
            totalAmount += order.getTotalAmount();
            for (OrderItem oi : order.getItems()) {
                combinedItems.add(
                        BillingDto.BillingItem.builder()
                                .name(oi.getItemName())
                                .quantity(oi.getQuantity())
                                .unitPrice(oi.getPrice())
                                .totalPrice(oi.getTotalPrice())
                                .build()
                );
            }
        }

        return BillingDto.builder()
                .customerName(customerName)
                .customerAccountNumber(accountNumber)
                .orderCount(orderCount)
                .items(combinedItems)
                .totalAmount(totalAmount)
                .build();
    }
}
