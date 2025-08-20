// src/components/customers/CustomerList.js
import React from "react";

export default function CustomerList({ customers, onEdit, onDelete, onView, user }) {
  return (
    <table className="customers-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Account Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.length === 0 ? (
          <tr>
            <td colSpan="6" style={{ textAlign: "center", padding: "8px" }}>
              No customers found.
            </td>
          </tr>
        ) : (
          customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
              <td>{customer.phone}</td>
              <td>{customer.accountNumber}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(customer)}>Edit</button>
                <button className="view-btn" onClick={() => onView(customer.id)}>View Details</button>
                {user?.role === "ADMIN" && (
                  <button className="delete-btn" onClick={() => onDelete(customer.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
