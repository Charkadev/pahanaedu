// src/components/items/ItemForm.js
import React, { useState, useEffect } from "react";

export default function ItemForm({ initialData = {}, onSubmit, onCancel }) {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(
    initialData.imageUrl ? `http://localhost:8080${initialData.imageUrl}` : null
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    setName(initialData.name || "");
    setDescription(initialData.description || "");
    setPrice(initialData.price || "");
    setPreview(initialData.imageUrl ? `http://localhost:8080${initialData.imageUrl}` : null);
    setFile(null);
    setError(null);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !description || !price) {
      setError("All fields are required");
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setError("Price must be a positive number");
      return;
    }

    onSubmit({ name, description, price: parsedPrice }, file);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <h3>{initialData.id || initialData._id ? "Edit Item" : "Add New Item"}</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {preview && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
      )}

      <div className="form-buttons">
        <button type="submit" className="add-btn">
          {initialData.id || initialData._id ? "Update" : "Add"}
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
