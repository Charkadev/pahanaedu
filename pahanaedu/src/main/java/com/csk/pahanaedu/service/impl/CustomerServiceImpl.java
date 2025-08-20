package com.csk.pahanaedu.service.impl;

import com.csk.pahanaedu.dto.CustomerRequest;
import com.csk.pahanaedu.dto.CustomerResponse;
import com.csk.pahanaedu.dto.OrderResponse;
import com.csk.pahanaedu.entity.Customer;
import com.csk.pahanaedu.mapper.CustomerMapper;
import com.csk.pahanaedu.repository.CustomerRepository;
import com.csk.pahanaedu.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.csk.pahanaedu.service.OrderService;
import com.csk.pahanaedu.entity.Order;
import java.util.stream.Collectors;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    // Inject OrderService
    private final OrderService orderService;

    @Override
    public CustomerResponse createCustomer(CustomerRequest request) {
        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Customer with this email already exists");
        }

        Customer customer = CustomerMapper.toEntity(request);
        customer.setAccountNumber(generateAccountNumber());

        Customer saved = customerRepository.save(customer);
        return CustomerMapper.toResponse(saved);
    }

    @Override
    public CustomerResponse updateCustomer(String id, CustomerRequest request) {
        Customer existing = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        CustomerMapper.updateEntity(request, existing);
        Customer updated = customerRepository.save(existing);
        return CustomerMapper.toResponse(updated);
    }

    @Override
    public void deleteCustomer(String id) {
        customerRepository.deleteById(id);
    }

    @Override
    public CustomerResponse getCustomerById(String id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return CustomerMapper.toResponse(customer);
    }

    @Override
    public List<CustomerResponse> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(CustomerMapper::toResponse)
                .toList();
    }

    @Override
    public CustomerResponse getCustomerByAccountNumber(String accountNumber) {
        Customer customer = customerRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Customer not found with account number: " + accountNumber));
        return CustomerMapper.toResponse(customer);
    }

    private String generateAccountNumber() {
        return "CUS-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    @Override
    public List<OrderResponse> getOrdersByCustomerId(String customerId) {
        List<Order> orders = orderService.getOrdersByCustomer(customerId);
        return orders.stream()
                .map(orderService::toResponse)
                .collect(Collectors.toList());
    }

}
