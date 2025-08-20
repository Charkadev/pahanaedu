package com.csk.pahanaedu.service.impl;

import com.csk.pahanaedu.dto.OrderRequest;
import com.csk.pahanaedu.entity.Order;
import com.csk.pahanaedu.mapper.OrderMapper;
import com.csk.pahanaedu.repository.CustomerRepository;
import com.csk.pahanaedu.repository.OrderRepository;
import com.csk.pahanaedu.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final OrderMapper orderMapper;

    @Override
    public Order createOrderFromRequest(OrderRequest request) {
        var customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        String customerName = customer.getName();
        String customerAccountNumber = customer.getAccountNumber();  // fetch account number

        Order order = orderMapper.toEntity(request, customerName, customerAccountNumber);
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrderFromRequest(String id, OrderRequest request) {
        Order existing = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        var customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        String customerName = customer.getName();
        String customerAccountNumber = customer.getAccountNumber();

        Order updatedOrder = orderMapper.toEntity(request, customerName, customerAccountNumber);

        // Preserve the existing order's id and createdAt
        updatedOrder.setId(existing.getId());
        updatedOrder.setCreatedAt(existing.getCreatedAt());

        return orderRepository.save(updatedOrder);
    }

    @Override
    public List<Order> getOrdersByCustomer(String customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(String id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    public void deleteOrder(String id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }
        orderRepository.deleteById(id);
    }

    @Override
    public com.csk.pahanaedu.dto.OrderResponse toResponse(Order order) {
        return orderMapper.toResponse(order);
    }
}
