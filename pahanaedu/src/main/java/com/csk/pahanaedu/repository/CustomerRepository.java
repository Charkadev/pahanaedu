package com.csk.pahanaedu.repository;

import com.csk.pahanaedu.entity.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CustomerRepository extends MongoRepository<Customer, String> {
    boolean existsByEmail(String email);
    Optional<Customer> findByAccountNumber(String accountNumber);
}
