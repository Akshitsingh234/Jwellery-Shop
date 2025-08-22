import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "../css/AdminPanel.css"; // reuse admin styles

export default function OwnerRegister() {
  const [shops, setShops] = useState([]);
  const [newShop, setNewShop] = useState({ shopName: "", address: "" });
  const [newOwner, setNewOwner] = useState({ email: "", password: "", shopId: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  const navigate = useNavigate();

  // fetch shops list (so owner can select their shop)
  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/shops");
      setShops(res.data);
    } catch (err) {
      console.error("Error fetching shops:", err);
      setShops([]);
    }
  };

  // Notification helper
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type }), 3500);
  };

  // handle shop form change
  const handleShopChange = (e) => {
    setNewShop({ ...newShop, [e.target.name]: e.target.value });
  };

  // add new shop
  const handleAddShop = async (e) => {
    e.preventDefault();
    const { shopName, address } = newShop;
    if (!shopName.trim() || !address.trim()) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    try {
      await axios.post("http://localhost:8080/admin/shop/register", {
        shopName: shopName.trim(),
        address: address.trim(),
      });
      setNewShop({ shopName: "", address: "" });
      showNotification("Shop added successfully!", "success");
      fetchShops(); // refresh shops
    } catch (err) {
      showNotification("Failed to add shop.", "error");
    }
  };

  // handle owner form change
  const handleOwnerChange = (e) => {
    setNewOwner({ ...newOwner, [e.target.name]: e.target.value });
  };

  // register owner for shop
  const handleAddOwner = async (e) => {
    e.preventDefault();
    const { email, password, shopId } = newOwner;
    if (!email.trim() || !password.trim() || !shopId) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/owner/register", {
        email: email.trim(),
        password: password.trim(),
        shopId: Number(shopId),
      });
      setNewOwner({ email: "", password: "", shopId: "" });
      showNotification("Owner registered and linked to shop!", "success");
    } catch (err) {
      showNotification("Failed to register owner. Please check backend logs.", "error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      {/* Notification Box */}
      {notification.show && (
        <div
          style={{
            position: "fixed",
            top: 30,
            right: 30,
            zIndex: 9999,
            minWidth: 250,
            padding: "1rem 2rem",
            background: notification.type === "success"
              ? "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)"
              : "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)",
            color: "#fff",
            borderRadius: "1rem",
            boxShadow: "0 8px 32px 0 #0005",
            fontWeight: 600,
            fontSize: "1.1rem",
            transition: "transform 0.5s, opacity 0.5s",
            transform: notification.show ? "translateY(0)" : "translateY(-40px)",
            opacity: notification.show ? 1 : 0,
          }}
        >
          {notification.message}
        </div>
      )}

      <h2 className="text-center mb-4">Owner Registration Portal</h2>

      {/* Add Shop Form */}
      <div className="card mb-4 admin-dark-card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Add New Shop</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddShop} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Shop Name</label>
              <input
                type="text"
                name="shopName"
                value={newShop.shopName}
                onChange={handleShopChange}
                className="form-control"
                placeholder="Enter shop name"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                value={newShop.address}
                onChange={handleShopChange}
                className="form-control"
                placeholder="Enter shop address"
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-success w-100">
                Add Shop
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Register Owner Form */}
      <div className="card mb-4 admin-dark-card">
        <div className="card-header bg-secondary text-white">
          <h5 className="mb-0">Register Owner for Shop</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddOwner} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Owner Email</label>
              <input
                type="email"
                name="email"
                value={newOwner.email}
                onChange={handleOwnerChange}
                className="form-control"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={newOwner.password}
                  onChange={handleOwnerChange}
                  className="form-control"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="col-md-12">
              <label className="form-label">Select Shop</label>
              <select
                name="shopId"
                value={newOwner.shopId}
                onChange={handleOwnerChange}
                className="form-control"
                required
              >
                <option value="">-- Select Shop --</option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>
                    {shop.shopName} (ID: {shop.id})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-warning w-100">
                Register Owner
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 mt-5" style={{ color: "#bdbdbd" }}>
        <hr />
        <div>
          <span>Contact: info@jewelryshop.com | +91 12345 67890</span>
          <br />
          <span>India</span>
          <br />
          <span>Thanks for registering with us!</span>
        </div>
      </footer>
    </div>
  );
}
