package com.csk.pahanaedu.controller;

import com.csk.pahanaedu.dto.OrderRequest;
import com.csk.pahanaedu.dto.OrderResponse;
import com.csk.pahanaedu.entity.Order;
import com.csk.pahanaedu.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@Valid @RequestBody OrderRequest request) {
        Order orderEntity = orderService.createOrderFromRequest(request);
        return ResponseEntity.ok(orderService.toResponse(orderEntity));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrderResponse>> getByCustomer(@PathVariable String customerId) {
        List<Order> orders = orderService.getOrdersByCustomer(customerId);
        List<OrderResponse> responses = orders.stream()
                .map(orderService::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAll() {
        List<Order> orders = orderService.getAllOrders();
        List<OrderResponse> responses = orders.stream()
                .map(orderService::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getById(@PathVariable String id) {
        Order order = orderService.getOrderById(id);
        return ResponseEntity.ok(orderService.toResponse(order));
    }

    @PutMapping("/{id}")
    //@PreAuthorize(
    public ResponseEntity<OrderResponse> updateOrder(@PathVariable String id,
                                                     @Valid @RequestBody OrderRequest request) {
        Order updatedOrder = orderService.updateOrderFromRequest(id, request);
        return ResponseEntity.ok(orderService.toResponse(updatedOrder));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
