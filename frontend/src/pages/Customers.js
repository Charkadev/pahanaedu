// src/pages/Customers.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api";
import CustomerForm from "../components/customers/CustomerForm";
import CustomerList from "../components/customers/CustomerList";
import "./Customers.css";

export default function Customers({ user }) {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await fetchCustomers();
      setCustomers(data);
      setFilteredCustomers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!searchQuery) {
        setFilteredCustomers(customers);
      } else {
        const q = searchQuery.toLowerCase();
        const filtered = customers.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.accountNumber.toLowerCase().includes(q)
        );
        setFilteredCustomers(filtered);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, customers]);

  const handleAddClick = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await deleteCustomer(id);
      const updatedCustomers = customers.filter((c) => c.id !== id);
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingCustomer) {
        const updated = await updateCustomer(editingCustomer.id, formData);
        const updatedList = customers.map((c) => (c.id === updated.id ? updated : c));
        setCustomers(updatedList);
        setFilteredCustomers(updatedList);
      } else {
        const created = await createCustomer(formData);
        const updatedList = [...customers, created];
        setCustomers(updatedList);
        setFilteredCustomers(updatedList);
      }
      setShowForm(false);
      setEditingCustomer(null);
    } catch (err) {
      alert("Save failed: " + err.message);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };

  return (
    <div className="customers-container">
      <div className="back-btn-container">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>

      <h2>Customers</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="customers-header">
            <button className="add-btn" onClick={handleAddClick}>
              Add New Customer
            </button>
            <input
              type="text"
              placeholder="Search by name, email, or account..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {showForm && (
            <CustomerForm
              initialData={editingCustomer || {}}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          )}

          <CustomerList
            customers={filteredCustomers}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onView={(id) => navigate(`/customers/${id}`)}
            user={user}
          />
        </>
      )}
    </div>
  );
}
