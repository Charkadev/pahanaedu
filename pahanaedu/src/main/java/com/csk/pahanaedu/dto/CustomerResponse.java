package com.csk.pahanaedu.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerResponse {

    private String id;
    private String name;
    private String email;
    private String address;
    private String phone;
    private String accountNumber;
}
