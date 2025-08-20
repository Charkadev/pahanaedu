package com.csk.pahanaedu.controller;

import com.csk.pahanaedu.dto.BillingDto;
import com.csk.pahanaedu.service.BillingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/billing")
@RequiredArgsConstructor
public class BillingController {

    private final BillingService billingService;

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @GetMapping("/{orderId}")
    public ResponseEntity<BillingDto> getBill(@PathVariable String orderId) {
        return ResponseEntity.ok(billingService.getBillByOrderId(orderId));
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<BillingDto> getCombinedBill(@PathVariable String customerId) {
        return ResponseEntity.ok(billingService.getCombinedBillForCustomer(customerId));
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @GetMapping("/account/{accountNumber}")
    public ResponseEntity<BillingDto> getCombinedBillByAccountNumber(@PathVariable String accountNumber) {
        return ResponseEntity.ok(billingService.getCombinedBillForAccountNumber(accountNumber));
    }
}
