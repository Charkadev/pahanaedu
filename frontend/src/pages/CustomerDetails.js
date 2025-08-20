// src/pages/CustomerDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCustomerById,
  getOrdersByCustomerId,
  getBillByCustomerId,
} from "../api";
import OrderList from "../components/orders/OrderList";
import BillList from "../components/billing/BillList";
import "./Customers.css";

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const cust = await getCustomerById(id);
        setCustomer(cust);

        try {
          const ords = await getOrdersByCustomerId(id);
          setOrders(ords || []);
        } catch {
          setOrders([]);
        }

        try {
          const billData = await getBillByCustomerId(id);
          setBill(billData);
        } catch {
          setBill(null);
        }
      } catch {
        setError("Failed to load customer information.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  const handlePrintBill = () => {
    if (!bill) return;
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>Print Bill</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Bill for ${bill.customerName}</h2>
          <p><strong>Order Count:</strong> ${bill.orderCount}</p>
          ${bill.items.map(item => `
          <div>${item.name} x${item.quantity} - LKR ${parseFloat(item.totalPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          `).join("")}
          <h3>Total Amount: LKR ${parseFloat(bill.totalAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>

        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  if (loading) return <p>Loading customer details...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="customer-details-container">
      <button className="back-btn" onClick={() => navigate("/customers")}>
        ← Back to Customers
      </button>

      <h2>Customer Details</h2>

      {customer && (
        <div className="customer-info">
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Account Number:</strong> {customer.accountNumber}</p>
          <p><strong>Address:</strong> {customer.address}</p>
        </div>
      )}

      <h3>Orders</h3>
      <OrderList orders={orders} loading={loading} showActions={false} />

      {bill && (
        <div className="bill-section">
          <BillList bill={bill} />
          <button className="print-btn" onClick={handlePrintBill}>
            Print Bill
          </button>
        </div>
      )}
    </div>
  );
}
