package com.csk.pahanaedu.controller;

import com.csk.pahanaedu.dto.CustomerRequest;
import com.csk.pahanaedu.dto.CustomerResponse;
import com.csk.pahanaedu.dto.OrderResponse;
import com.csk.pahanaedu.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<CustomerResponse> create(@Valid @RequestBody CustomerRequest request) {
        CustomerResponse created = customerService.createCustomer(request);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> update(@PathVariable String id,
                                                   @Valid @RequestBody CustomerRequest request) {
        CustomerResponse updated = customerService.updateCustomer(id, request);
        return ResponseEntity.ok(updated);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getById(@PathVariable String id) {
        CustomerResponse customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(customer);
    }

    @GetMapping
    public ResponseEntity<List<CustomerResponse>> getAll() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    // Get customer by account number
    @GetMapping("/account/{accountNumber}")
    public ResponseEntity<CustomerResponse> getByAccountNumber(@PathVariable String accountNumber) {
        CustomerResponse customer = customerService.getCustomerByAccountNumber(accountNumber);
        return ResponseEntity.ok(customer);
    }
    // Get orders by customer id
    @GetMapping("/{id}/orders")
    public ResponseEntity<List<OrderResponse>> getOrders(@PathVariable String id) {
        List<OrderResponse> orders = customerService.getOrdersByCustomerId(id);
        return ResponseEntity.ok(orders);
    }



}
