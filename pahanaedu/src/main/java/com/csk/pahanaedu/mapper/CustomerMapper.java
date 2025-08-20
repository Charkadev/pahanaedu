package com.csk.pahanaedu.mapper;

import com.csk.pahanaedu.dto.CustomerRequest;
import com.csk.pahanaedu.dto.CustomerResponse;
import com.csk.pahanaedu.entity.Customer;

public class CustomerMapper {

    public static Customer toEntity(CustomerRequest request) {
        if (request == null) return null;

        return Customer.builder()
                .name(request.getName())
                .email(request.getEmail())
                .address(request.getAddress())
                .phone(request.getPhone())
                // accountNumber is generated in service, so not set here
                .build();
    }

    public static CustomerResponse toResponse(Customer customer) {
        if (customer == null) return null;

        return CustomerResponse.builder()
                .id(customer.getId())
                .name(customer.getName())
                .email(customer.getEmail())
                .address(customer.getAddress())
                .phone(customer.getPhone())
                .accountNumber(customer.getAccountNumber())
                .build();
    }

    public static void updateEntity(CustomerRequest request, Customer existingCustomer) {
        if (request == null || existingCustomer == null) return;

        existingCustomer.setName(request.getName());
        existingCustomer.setEmail(request.getEmail());
        existingCustomer.setAddress(request.getAddress());
        existingCustomer.setPhone(request.getPhone());
        // accountNumber remains unchanged during update
    }
}
