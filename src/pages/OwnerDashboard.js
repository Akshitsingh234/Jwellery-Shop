import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/OwnerDashboard.css';

const OwnerDashboard = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    category: "",
    weight: "",
    type: "",
    imageFile: null,
  });
  const [ownerEmail, setOwnerEmail] = useState("");

  const categories = [
    "necklaces",
    "rings",
    "earrings",
    "chains",
    "nosepins",
    "bracelets",
    "kardhani",
    "payals",
  ];

  // ✅ Check login & fetch items
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("ownerLoggedIn");
    const sessionShopId = sessionStorage.getItem("shopId");

    if (!loggedIn || sessionShopId !== shopId) {
      navigate(`/shop/${shopId}/login`);
      return;
    }

    setOwnerEmail(sessionStorage.getItem("ownerEmail") || "");
    fetchItems();
  }, [shopId, navigate]);

  // ✅ Fetch all designs for this shop
  const fetchItems = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/shops/${shopId}/designs`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  // ✅ Add new design with category + image
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.category || !newItem.weight || !newItem.type || !newItem.imageFile) return;

    try {
      const formData = new FormData();
      formData.append("category", newItem.category);
      formData.append("weight", newItem.weight);
      formData.append("type", newItem.type);
      formData.append("image", newItem.imageFile);

      const res = await fetch(`http://localhost:8080/api/shops/${shopId}/designs`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        fetchItems();
        setNewItem({ category: "", weight: "", type: "", imageFile: null });
      } else {
        console.error("Failed to add item:", res.status);
      }
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  // ✅ Delete design
  const handleDeleteItem = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/shops/${shopId}/designs/${id}`, {
        method: "DELETE",
      });
      fetchItems();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="display-3 fw-bold text-center mb-5 animate-welcome">
        Welcome, Shop Owner!
      </h1>
      <h2 className="mb-4">Owner Dashboard (Shop {shopId})</h2>
      <p>Logged in as: <strong>{ownerEmail}</strong></p>

      {/* ➕ Add New Design Form */}
      <div className="add-design-section">
        <h4>Add New Design</h4>
        <form onSubmit={handleAddItem} className="card shadow p-4 mb-4">
          <div className="row mb-3">
            {/* Category Dropdown */}
            <div className="col-md-3">
              <select
                className="form-control"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Weight (e.g. 10g)"
                value={newItem.weight}
                onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Type (Gold, Silver...)"
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setNewItem({ ...newItem, imageFile: e.target.files[0] })}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success w-100">Add Design</button>
        </form>
      </div>

      {/* 📦 Designs List */}
      <div className="row">
        {items.length === 0 ? (
          <p className="text-muted">No designs added yet.</p>
        ) : (
          items.map((item) => (
            <div className="col-md-4 mb-3" key={item.id}>
              <div className="card h-100 shadow shop-card">
                {item.id && (
                  <img
                    src={`http://localhost:8080/api/shops/${shopId}/designs/${item.id}/image`}
                    alt={item.category}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.category}</h5>
                  <p className="card-text">
                    <strong>Weight:</strong> {item.weight} <br />
                    <strong>Type:</strong> {item.type}
                  </p>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
