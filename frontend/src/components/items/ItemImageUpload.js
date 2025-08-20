// src/components/items/ItemImageUpload.js
import React, { useState } from "react";
import { uploadItemImage } from "../../api";

export default function ItemImageUpload({ itemId, onUpload }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadItemImage(itemId, formData);
      onUpload(res.data);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "5px" }}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit" className="upload-btn">
        Upload
      </button>
    </form>
  );
}
