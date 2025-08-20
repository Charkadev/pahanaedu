package com.csk.pahanaedu.service;

import com.csk.pahanaedu.dto.OrderRequest;
import com.csk.pahanaedu.dto.OrderResponse;
import com.csk.pahanaedu.entity.Order;

import java.util.List;

public interface OrderService {
    Order createOrderFromRequest(OrderRequest request);
    Order updateOrderFromRequest(String id, OrderRequest request);
    List<Order> getOrdersByCustomer(String customerId);
    List<Order> getAllOrders();
    Order getOrderById(String id);
    void deleteOrder(String id);

    // Conversion helper
    OrderResponse toResponse(Order order);
}
