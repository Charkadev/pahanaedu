// src/components/customers/CustomerForm.js
import React, { useState, useEffect } from "react";
import "../../pages/Customers.css";

export default function CustomerForm({ initialData = {}, onSubmit, onCancel }) {
  const [name, setName] = useState(initialData.name || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [address, setAddress] = useState(initialData.address || "");
  const [phone, setPhone] = useState(initialData.phone || "");
  const [error, setError] = useState(null);

  useEffect(() => {
    setName(initialData.name || "");
    setEmail(initialData.email || "");
    setAddress(initialData.address || "");
    setPhone(initialData.phone || "");
    setError(null);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !address || !phone) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email address");
      return;
    }

    onSubmit({ ...initialData, name, email, address, phone });
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <h3>{initialData.id ? "Edit Customer" : "Add New Customer"}</h3>
      {error && <p className="error">{error}</p>}

      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Address:</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>
      <div>
        <label>Phone:</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>

      
      <div className="form-buttons">
        <button type="submit" className="submit-btn">
          {initialData.id ? "Update" : "Add"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
