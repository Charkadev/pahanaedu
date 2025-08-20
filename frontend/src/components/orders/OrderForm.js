// src/components/orders/OrderForm.js
import React, { useState, useEffect } from "react";
import { getItems, fetchCustomers } from "../../api";

const API_BASE_URL = "http://localhost:8080";

export default function OrderForm({ initialData = {}, onSubmit, onCancel }) {
  const [customerId, setCustomerId] = useState(initialData.customerId || "");
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(initialData.items || []);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const resItems = await getItems();
        setItems(resItems.data || []);
        const resCustomers = await fetchCustomers();
        setCustomers(resCustomers || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  const handleQuantityChange = (itemId, qty) => {
    setSelectedItems((prev) =>
      prev.map((i) =>
        i.itemId === itemId ? { ...i, quantity: parseInt(qty) } : i
      )
    );
  };

  const handleItemToggle = (item) => {
    const exists = selectedItems.find((i) => i.itemId === (item.id || item._id));
    if (exists) {
      setSelectedItems((prev) => prev.filter((i) => i.itemId !== exists.itemId));
    } else {
      setSelectedItems((prev) => [
        ...prev,
        { itemId: item.id || item._id, quantity: 1, itemName: item.name, price: item.price },
      ]);
    }
  };

  const getImageUrl = (url) =>
    !url ? "https://via.placeholder.com/50?text=No+Image" : url.startsWith("http") ? url : `${API_BASE_URL}${url}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId || selectedItems.length === 0) {
      setError("Customer ID and at least one item are required");
      return;
    }
    onSubmit({ customerId, items: selectedItems });
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h3>{initialData.id ? "Edit Order" : "Add New Order"}</h3>
      {error && <p className="error">{error}</p>}

      {/* Customer Selection */}
      <div className="form-group">
        <label>Customer:</label>
        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.accountNumber})
            </option>
          ))}
        </select>
      </div>

      {/* Items Section */}
      <div className="form-group">
        <h4>Select Items:</h4>
        <div className="items-list">
          {items.map((item) => {
            const selected = selectedItems.find(
              (i) => i.itemId === (item.id || item._id)
            );
            return (
              <div className="item-row" key={item.id || item._id}>
                <img
                  src={getImageUrl(item.imageUrl)}
                  alt={item.name}
                  width="50"
                />
                <span className="item-name">
                  {item.name} (LKR {parseFloat(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                </span>

                <div className="item-controls">
                  <input
                    type="checkbox"
                    checked={!!selected}
                    onChange={() => handleItemToggle(item)}
                  />
                  {selected && (
                    <input
                      type="number"
                      min="1"
                      value={selected.quantity}
                      onChange={(e) =>
                        handleQuantityChange(selected.itemId, e.target.value)
                      }
                      className="quantity-input"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Buttons */}
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {initialData.id ? "Update" : "Add"}
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
}
