import axios from "axios";

const BASE_URL = "http://localhost:8080";

// ---------------- User Auth ----------------
export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.text();
}

export async function loginUser(data) {
  const formData = new URLSearchParams();
  formData.append("username", data.username);
  formData.append("password", data.password);
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString(),
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.text();
}

export async function logoutUser() {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Logout failed");
  return res.text();
}

export async function fetchCurrentUser() {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
}

// ---------------- Customer ----------------
export async function fetchCustomers() {
  const res = await fetch(`${BASE_URL}/api/customers`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
}

export async function createCustomer(data) {
  const res = await fetch(`${BASE_URL}/api/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateCustomer(id, data) {
  const res = await fetch(`${BASE_URL}/api/customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteCustomer(id) {
  const res = await fetch(`${BASE_URL}/api/customers/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
  return;
}

// ---------------- Items ----------------
const ITEM_API = `${BASE_URL}/api/items`;

export const getItems = () => axios.get(ITEM_API, { withCredentials: true });
export const getItemById = (id) => axios.get(`${ITEM_API}/${id}`, { withCredentials: true });

export const createItem = async (item, file) => {
  const formData = new FormData();
  formData.append("name", item.name);
  formData.append("description", item.description || "");
  formData.append("price", item.price);
  if (file) formData.append("file", file);

  return axios.post(ITEM_API, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
};

export const updateItem = async (id, item, file) => {
  const formData = new FormData();
  formData.append("name", item.name);
  formData.append("description", item.description || "");
  formData.append("price", item.price);
  if (file) formData.append("file", file);

  return axios.put(`${ITEM_API}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
};

export const deleteItem = (id) => axios.delete(`${ITEM_API}/${id}`, { withCredentials: true });

export const uploadItemImage = (id, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${ITEM_API}/${id}/upload-image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
};

// ---------------- Orders ----------------
const ORDER_API = `${BASE_URL}/api/orders`;

export const getOrders = async () => {
  const res = await fetch(ORDER_API, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const getOrderById = async (id) => {
  const res = await fetch(`${ORDER_API}/${id}`, { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to fetch order ${id}`);
  return res.json();
};

export const createOrder = async (orderData) => {
  const res = await fetch(ORDER_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const updateOrder = async (id, orderData) => {
  const res = await fetch(`${ORDER_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const deleteOrder = async (id) => {
  const res = await fetch(`${ORDER_API}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
  return;
};

// ---------------- Billing ----------------
export const getBillByOrderId = async (orderId) => {
  const res = await fetch(`${BASE_URL}/api/billing/${orderId}`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch bill");
  return res.json();
};

export const getBillByCustomerId = async (customerId) => {
  const res = await fetch(`${BASE_URL}/api/billing/customer/${customerId}`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch bill for customer");
  return res.json();
};

// ---------------- Customer Details ----------------
export const getCustomerById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/customers/${id}`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch customer");
  return res.json();
};

export const getOrdersByCustomerId = async (customerId) => {
  const res = await fetch(`${BASE_URL}/api/customers/${customerId}/orders`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch orders for customer");
  return res.json();
};
