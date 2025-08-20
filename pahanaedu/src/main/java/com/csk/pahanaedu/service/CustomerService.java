package com.csk.pahanaedu.service;

import com.csk.pahanaedu.dto.CustomerRequest;
import com.csk.pahanaedu.dto.CustomerResponse;
import com.csk.pahanaedu.dto.OrderResponse;
import java.util.List;

public interface CustomerService {
    CustomerResponse createCustomer(CustomerRequest customerRequest);
    CustomerResponse updateCustomer(String id, CustomerRequest customerRequest);
    void deleteCustomer(String id);
    CustomerResponse getCustomerById(String id);
    List<CustomerResponse> getAllCustomers();

    CustomerResponse getCustomerByAccountNumber(String accountNumber);

    List<OrderResponse> getOrdersByCustomerId(String customerId);
}
