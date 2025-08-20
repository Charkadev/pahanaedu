// src/components/billing/BillList.js
import React from "react";

export default function BillList({ bill }) {
  if (!bill) return null;

  return (
    <div className="bill-section">
      <h3>Bill</h3>
      <table className="bill-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>LKR {parseFloat(item.unitPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td>LKR {parseFloat(item.totalPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <h4>Total Amount: LKR {parseFloat(bill.totalAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
    </div>
  );
}
