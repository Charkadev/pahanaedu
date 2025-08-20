package com.csk.pahanaedu.service.impl;

import com.csk.pahanaedu.dto.BillingDto;
import com.csk.pahanaedu.entity.Order;
import com.csk.pahanaedu.mapper.OrderMapper;
import com.csk.pahanaedu.repository.CustomerRepository;
import com.csk.pahanaedu.repository.OrderRepository;
import com.csk.pahanaedu.service.BillingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BillingServiceImpl implements BillingService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final CustomerRepository customerRepository;

    @Override
    public BillingDto getBillByOrderId(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        return orderMapper.toBillingDto(order);
    }

    @Override
    public BillingDto getCombinedBillForCustomer(String customerId) {
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        if (orders.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No orders found for this customer");
        }
        return orderMapper.toCombinedBillingDto(orders);
    }

    @Override
    public BillingDto getCombinedBillForAccountNumber(String accountNumber) {
        var customerOpt = customerRepository.findByAccountNumber(accountNumber);
        if (customerOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer with account number not found");
        }
        String customerId = customerOpt.get().getId();
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        if (orders.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No orders found for this customer");
        }
        return orderMapper.toCombinedBillingDto(orders);
    }
}
