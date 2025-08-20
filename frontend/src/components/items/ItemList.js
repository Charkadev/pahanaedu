// src/components/items/ItemList.js
import React from "react";
import "./Items.css";

export default function ItemList({ items, onEdit, onDelete, user }) {
  const API_BASE_URL = "http://localhost:8080";

  if (!Array.isArray(items) || items.length === 0) return <p>No items found.</p>;

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    return imageUrl.startsWith("http") ? imageUrl : `${API_BASE_URL}${imageUrl}`;
  };

  return (
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
        {items.map((item) => {
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
                <button className="edit-btn" onClick={() => onEdit(item)}>
                  Edit
                </button>
                {user?.role === "ADMIN" && (
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(item.id || item._id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
