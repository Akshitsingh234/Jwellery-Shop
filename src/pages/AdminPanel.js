import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/AdminPanel.css'; // Assuming you have a CSS file for styling

export default function AdminPanel() {
  const [shops, setShops] = useState([]);
  const [newShop, setNewShop] = useState({ shopName: "", address: "" });
  const [newOwner, setNewOwner] = useState({ email: "", password: "", shopId: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [queries, setQueries] = useState([]);
  const [owners, setOwners] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  // Confirmation modal state
  const [confirmBox, setConfirmBox] = useState({
    show: false,
    message: "",
    onConfirm: null,
  });
  const navigate = useNavigate();

  // ------------------- CHECK LOGIN SESSION -------------------
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("adminLoggedIn");
    if (!loggedIn) {
      navigate("/adminlogin"); // redirect if not logged in
    }
  }, [navigate]);

  // ------------------- LOAD SHOPS -------------------
  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchShops = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/shops");
      const data = res.data;

      if (Array.isArray(data)) {
        setShops(data);
      } else if (Array.isArray(data.shops)) {
        setShops(data.shops);
      } else {
        console.error("Unexpected shops response:", data);
        setShops([]);
      }
    } catch (err) {
      console.error("Error fetching shops:", err);
      setShops([]);
    }
  };

  //  owner list fetch
  const fetchOwners = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/owner/all");
      setOwners(res.data);
    } catch (err) {
      console.error("Error fetching owners:", err);
      setOwners([]);
    }
  };


  // ------------------- SHOP FORM -------------------
  const handleShopChange = (e) => {
    setNewShop({ ...newShop, [e.target.name]: e.target.value });
  };

  const handleAddShop = async (e) => {
    e.preventDefault();
    const { shopName, address } = newShop;
    if (!shopName.trim() || !address.trim()) {
      showNotification("Please fill in all fields", "error");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/shops", {
        shopName: shopName.trim(),
        address: address.trim(),
      });
      setNewShop({ shopName: "", address: "" });
      showNotification("Shop added successfully!", "success");
      fetchShops();
    } catch (err) {
      showNotification("Failed to add shop.", "error");
    }
  };

  // ------------------- OWNER FORM -------------------
  const handleOwnerChange = (e) => {
    setNewOwner({ ...newOwner, [e.target.name]: e.target.value });
  };

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

  // Notification helper
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type }), 3500);
  };

  // Confirm modal helpers
  const showConfirm = (message, onConfirm) => {
    setConfirmBox({ show: true, message, onConfirm });
  };
  const handleConfirm = () => {
    if (confirmBox.onConfirm) confirmBox.onConfirm();
    setConfirmBox({ show: false, message: "", onConfirm: null });
  };
  const handleCancel = () => {
    setConfirmBox({ show: false, message: "", onConfirm: null });
  };

  // ------------------- DELETE OWNER -------------------
  // const handleDeleteOwner = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:8080/api/owner/${id}`);
  //     setOwners(owners.filter((o) => o.id !== id));
  //     showNotification("Owner deleted successfully!", "success");
  //   } catch (err) {
  //     showNotification("Failed to delete owner.", "error");
  //   }
  // };
  // const askDeleteOwner = (id) => {
  //   showConfirm("Delete this owner?", () => handleDeleteOwner(id));
  // };

  // ------------------- DELETE SHOP -------------------
  const handleDeleteShop = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/shops/${id}`);
      setShops(shops.filter((s) => s.id !== id));
      showNotification("Shop deleted successfully!", "success");
    } catch (err) {
      showNotification("Failed to delete shop.", "error");
    }
  };
  const askDeleteShop = (id) => {
    showConfirm("Delete this shop?", () => handleDeleteShop(id));
  };

  // ------------------- Contact Queries -------------------
  // Fetch queries
  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const res = await axios.get("http://localhost:8080/contact/all");
      setQueries(res.data);
    } catch (err) {
      console.error("Error fetching queries:", err);
      setQueries([]);
    }
  };

  const handleDeleteQuery = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/contact/${id}`);
      setQueries(queries.filter((q) => q.id !== id));
      showNotification("Query deleted successfully!", "success");
    } catch (err) {
      showNotification("Failed to delete query.", "error");
    }
  };
  const askDeleteQuery = (id) => {
    showConfirm("Delete this query?", () => handleDeleteQuery(id));
  };

  // ------------------- LOGOUT -------------------
  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    sessionStorage.removeItem("adminUsername");
    navigate("/adminlogin");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ------------------- UI -------------------
  return (
    <div className="container mt-4">
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

      {/* Confirm Modal */}
      {confirmBox.show && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.4)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              background: "#232526",
              color: "#fff",
              borderRadius: "1rem",
              padding: "2rem 2.5rem",
              minWidth: 320,
              boxShadow: "0 8px 32px 0 #0008",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
              {confirmBox.message}
            </div>
            <div>
              <button
                className="btn btn-danger me-3"
                onClick={handleConfirm}
              >
                Yes
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Panel - Shop Management</h1>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      {/* Shop List */}
      <div className="card shop-list-card mb-5">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">All Shops ({shops.length})</h5>
          <button className="btn btn-outline-primary btn-sm" onClick={fetchShops}>Refresh</button>
        </div>
        <div className="card-body">
          {shops.length === 0 ? (
            <p className="text-muted text-center">No shops added yet. Use the form above to add shops.</p>
          ) : (
            <div className="row">
              {shops.map((shop) => (
                <div key={shop.id} className="col-md-6 col-lg-4 mb-3">
                  <div className="card h-100 shop-list-card">
                    <div className="card-body">
                      <h5 className="card-title">{shop.shopName}</h5>
                      <p className="card-text"><strong>Address:</strong> {shop.address}</p>
                      <p className="card-text"><small className="text-muted">ID: {shop.id}</small></p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <Link to={`/shop/${shop.id}`} className="btn btn-primary btn-sm">View Details</Link>
                      <button onClick={() => askDeleteShop(shop.id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* All Owners Section */}
    {/* All Owners Section */}
<div className="card admin-dark-card mb-5">
  <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
    <h5 className="mb-0">All Owners ({owners.length})</h5>
    <button className="btn btn-outline-light btn-sm" onClick={fetchOwners}>Refresh</button>
  </div>
  <div className="card-body">
    {owners.length === 0 ? (
      <p className="text-muted text-center">No owners registered yet.</p>
    ) : (
      <div className="row">
        {owners.map((owner) => (
          <div key={owner.id} className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100 admin-dark-card d-flex flex-column justify-content-center align-items-center p-4">
              
              {/* Email */}
              <h5 className="card-title text-center w-100" style={{margin: 0}}>
                {owner.email}
              </h5>

              {/* Shop name (from DTO) */}
              <p className="text-muted text-center w-100" style={{margin: 0}}>
                {owner.shopName}
              </p>

            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>


      {/* Contact Queries Section */}
      <div className="card mt-3 admin-dark-card mb-5">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Customer Queries ({queries.length})</h5>
          <button className="btn btn-outline-light btn-sm" onClick={fetchQueries}>Refresh</button>
        </div>
        <div className="card-body">
          {queries.length === 0 ? (
            <p className="text-muted text-center">No queries received yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-dark table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {queries.map((q) => (
                    <tr key={q.id}>
                      <td>{q.id}</td>
                      <td>{q.name}</td>
                      <td>{q.email}</td>
                      <td>{q.phone}</td>
                      <td>{q.description}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => askDeleteQuery(q.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Box */}
      {confirmBox.show && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.4)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              background: "#232526",
              color: "#fff",
              borderRadius: "1rem",
              padding: "2rem 2.5rem",
              minWidth: 320,
              boxShadow: "0 8px 32px 0 #0008",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
              {confirmBox.message}
            </div>
            <div>
              <button
                className="btn btn-danger me-3"
                onClick={handleConfirm}
              >
                Yes
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
