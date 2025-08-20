package com.csk.pahanaedu.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {

    @Id
    private String id;

    private String name;
    private String email;
    private String address;
    private String phone;

    private String accountNumber; // <-- Unique account number
}
