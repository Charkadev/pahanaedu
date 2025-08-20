// src/pages/Orders.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderList from "../components/orders/OrderList";
import OrderForm from "../components/orders/OrderForm";
import { getOrders, createOrder, updateOrder, deleteOrder } from "../api";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchOrdersData = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
      setFilteredOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersData();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredOrders(orders);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredOrders(
        orders.filter(
          (o) =>
            o.id.toString().includes(q) ||
            o.customerName?.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery, orders]);

  const handleFormSubmit = async (orderData) => {
    try {
      if (editingOrder) {
        await updateOrder(editingOrder.id, orderData);
        setOrders((prev) =>
          prev.map((o) =>
            o.id === editingOrder.id ? { ...o, ...orderData } : o
          )
        );
      } else {
        const newOrder = await createOrder(orderData);
        setOrders((prev) => [...prev, newOrder]);
      }
      setShowForm(false);
      setEditingOrder(null);
    } catch (err) {
      console.error("Failed to save order:", err);
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteOrder(id);
      const updated = orders.filter((o) => o.id !== id);
      setOrders(updated);
      setFilteredOrders(updated);
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  return (
    <div className="orders-container">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="back-btn"
      >
        ⬅ Back to Home
      </button>

      <h2>Orders</h2>

      {!showForm && (
        <>
          <button
            onClick={() => setShowForm(true)}
            className="add-order-btn"
          >
            Add New Order
          </button>

          <div className="orders-search">
            <input
              type="text"
              placeholder="Search by Order ID or Customer Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilteredOrders(orders);
                }}
                className="reset-btn"
              >
                Reset
              </button>
            )}
          </div>
        </>
      )}

      {showForm ? (
        <div className="order-form">
          <OrderForm
            initialData={editingOrder || {}}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </div>
      ) : (
        <OrderList
          orders={filteredOrders}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
