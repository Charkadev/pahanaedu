// src/pages/Billing.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BillList from "../components/billing/BillList";
import "./Billing.css";

const BASE_URL = "http://localhost:8080";

export default function Billing() {
  const [orderId, setOrderId] = useState("");
  const [customerOrAccount, setCustomerOrAccount] = useState("");
  const [bill, setBill] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchBill = async (url) => {
    try {
      setError("");
      setBill(null);

      const res = await fetch(url, { credentials: "include" });
      const text = await res.text();

      if (!res.ok) throw new Error(text || `Error fetching bill (${res.status})`);

      try {
        const data = JSON.parse(text);
        setBill(data);
      } catch {
        setError(text || "No bill data found");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGetBillByOrderId = () => {
    if (!orderId.trim()) return setError("Please enter an order ID");
    fetchBill(`${BASE_URL}/api/billing/${orderId}`);
  };

  const handleGetCombinedBill = () => {
    if (!customerOrAccount.trim())
      return setError("Please enter Customer ID or Account Number");

    if (customerOrAccount.startsWith("CUS-")) {
      fetchBill(`${BASE_URL}/api/billing/account/${customerOrAccount}`);
    } else {
      fetchBill(`${BASE_URL}/api/billing/customer/${customerOrAccount}`);
    }
  };

  const handlePrint = () => {
    if (!bill) return;
    const printContent = document.getElementById("bill-content").innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>Print Bill</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .bill-header h2 { text-align: center; margin: 0; }
            .bill-header p { text-align: center; margin: 2px 0; }
            hr { margin: 10px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total-amount { margin-top: 10px; text-align: right; font-weight: bold; }
            .bill-footer { margin-top: 20px; text-align: center; font-style: italic; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="billing-container">
      <button className="back-home-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <h1>Billing</h1>

      <div className="billing-section">
        <h3>Get Bill by Order ID</h3>
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="input-field"
        />
        <button className="get-bill-btn" onClick={handleGetBillByOrderId}>
          Get Bill
        </button>
      </div>

      <div className="billing-section">
        <h3>Get Combined Bill (Customer ID or Account Number)</h3>
        <input
          type="text"
          placeholder="Enter Customer ID or Account Number"
          value={customerOrAccount}
          onChange={(e) => setCustomerOrAccount(e.target.value)}
          className="input-field"
        />
        <button className="get-bill-btn" onClick={handleGetCombinedBill}>
          Get Bill
        </button>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {bill && (
        <div className="bill-content" id="bill-content">
          <div className="bill-header">
            <h2>Pahana Edu Bookshop</h2>
            <p>Address: 123, Book Street, Colombo</p>
            <p>Phone: +94 11 224 2245</p>
            <hr />
          </div>

          <div className="bill-details">
            <p>
              <strong>Date:</strong> {new Date().toLocaleString()}
            </p>
            {bill.orderId && (
              <p>
                <strong>Order ID:</strong> {bill.orderId}
              </p>
            )}
            {bill.customerAccountNumber && (
              <p>
                <strong>Account Number:</strong> {bill.customerAccountNumber}
              </p>
            )}
            <p>
              <strong>Customer Name:</strong> {bill.customerName}
            </p>
            <p>
              <strong>Order Count:</strong> {bill.orderCount}
            </p>
          </div>

          {/* reusable BillList component */}
          <BillList bill={bill} />

          <div className="bill-footer">
            <p>Thank you for your purchase!</p>
          </div>

          <button className="print-bill-btn" onClick={handlePrint}>
            Print Bill
          </button>
        </div>
      )}
    </div>
  );
}
