package com.csk.pahanaedu.service;

import com.csk.pahanaedu.dto.BillingDto;

public interface BillingService {
    BillingDto getBillByOrderId(String orderId);
    BillingDto getCombinedBillForCustomer(String customerId);

    // get combined billing by account number
    BillingDto getCombinedBillForAccountNumber(String accountNumber);
}
