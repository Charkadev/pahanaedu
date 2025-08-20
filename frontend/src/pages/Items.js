import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItems, createItem, updateItem, deleteItem } from "../api";
import ItemForm from "../components/items/ItemForm";
import "./Items.css";

export default function Items({ user }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API_BASE_URL = "http://localhost:8080";
  const navigate = useNavigate();

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await getItems();
      const data = Array.isArray(response.data) ? response.data : [];
      setItems(data);
      setFilteredItems(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load items");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredItems(items);
    } else {
      const lower = searchTerm.toLowerCase();
      setFilteredItems(
        items.filter(
          (item) =>
            item.name.toLowerCase().includes(lower) ||
            item.description.toLowerCase().includes(lower)
        )
      );
    }
  }, [searchTerm, items]);

  const handleAddClick = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id && i._id !== id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  const handleFormSubmit = async (formData, file) => {
    try {
      if (editingItem) {
        await updateItem(editingItem.id || editingItem._id, formData, file);
      } else {
        await createItem(formData, file);
      }
      await loadItems();
      setShowForm(false);
      setEditingItem(null);
    } catch (err) {
      console.error(err);
      alert("Save failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    return imageUrl.startsWith("http") ? imageUrl : `${API_BASE_URL}${imageUrl}`;
  };

  return (
    <div className="items-container">
      <button onClick={() => navigate("/")} className="back-btn">
        ← Back to Home
      </button>

      <h2>Items</h2>

      {error && <p className="error">{error}</p>}

      <div className="items-actions">
        <button onClick={handleAddClick} className="add-btn">
          Add New Item
        </button>
      </div>

      <div className="items-search">
        <input
          type="text"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="item-form">
          <ItemForm
            initialData={editingItem || {}}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="items-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="5">No items found.</td>
              </tr>
            ) : (
              filteredItems.map((item) => {
                const imageUrl = getImageUrl(item.imageUrl);
                return (
                  <tr key={item.id || item._id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>LKR {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.name}
                          className="preview"
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/80?text=No+Image")
                          }
                        />
                      ) : (
                        <span>No image</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleEditClick(item)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      {user?.role === "ADMIN" && (
                        <button
                          onClick={() => handleDeleteClick(item.id || item._id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
