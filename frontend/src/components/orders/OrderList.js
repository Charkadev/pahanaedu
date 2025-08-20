// src/components/orders/OrderList.js
import React from "react";
import "../../pages/Orders.css";

export default function OrderList({ orders = [], loading, onEdit, onDelete, showActions = true }) {
  if (loading) return <p>Loading orders...</p>;

  if (!orders || orders.length === 0) return <p>No orders found.</p>;

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Total</th>
          {showActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customerName}</td>
            <td>
              {order.items?.map((item, index) => (
                <div key={index}>
                  {item.itemName} (x{item.quantity})
                </div>
              ))}
            </td>
            <td>
              LKR {parseFloat(order.totalAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>

            {showActions && (
              <td>
                <button className="edit-btn" onClick={() => onEdit(order)}>Edit</button>{" "}
                <button className="delete-btn" onClick={() => onDelete(order.id)}>Delete</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
