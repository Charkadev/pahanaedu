import React from "react";
import "./Help.css";

function Help() {
  return (
    <div className="help-container">
      <h1>Help & Guidelines</h1>

      <section className="help-section">
        <h2>Getting Started</h2>
        <p>Welcome to the system! Follow these steps to begin:</p>
        <ul>
          <li>Create an account or log in with your credentials.</li>
          <li>Navigate through the dashboard to access different modules.</li>
          <li>Use the search functionality to quickly find items, customers, or orders.</li>
        </ul>
      </section>

      <section className="help-section">
        <h2>Customers Page</h2>
        <ul>
          <li>Click "Add New Customer" to register a new customer.</li>
          <li>Use "Edit" to update customer details and "Delete" to remove a customer.</li>
          <li>Click "View Details" to see orders and billing information for a customer.</li>
          <li>Use the search box to quickly find Customers by name, email or account number.</li>
          <li>Click "Print Bill" in "view Details" to print bill or print bill can be done from Billing page.</li>
        </ul>
      </section>

      <section className="help-section">
        <h2>Items Page</h2>
        <ul>
          <li>Click "Add New Item" to add a product to the inventory.</li>
          <li>Use "Edit" to update item information and "Delete" to remove an item.</li>
          <li>Upload item images to help users identify products easily.</li>
          <li>Use the search box to quickly find items by name or description.</li>
        </ul>
      </section>

      <section className="help-section">
        <h2>Orders Page</h2>
        <ul>
          <li>Create new orders for customers and manage order statuses.</li>
          <li>Click "Edit" to modify order details and "Delete" to cancel an order.</li>
          <li>Search orders by customer name or order ID for quick access.</li>
        </ul>
      </section>

      <section className="help-section">
        <h2>Billing & Payments Page</h2>
        <ul>
          <li>View customer bills by entering Order ID.</li>
          <li>View customer combined bills (multiple orders) by entering Customer ID or Account Number.</li>
          <li>Print bills using the "Print" button for record keeping.</li>
          <li>Ensure all orders are correctly recorded before generating the bill.</li>
        </ul>
      </section>

      <section className="help-section">
        <h2>Tips for New Users</h2>
        <ul>
          <li>Always log out after completing your session.</li>
          <li>Use clear names and descriptions when adding items or customers.</li>
          <li>Regularly back up important data to prevent loss.</li>
          <li>Contact support if you encounter any issues.</li>
        </ul>
      </section>

      <p className="help-footer">
        For further assistance, contact the system administrator on 555 extension.
      </p>
    </div>
  );
}

export default Help;
