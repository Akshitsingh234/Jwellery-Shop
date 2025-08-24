// AdminLogin.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("adminLoggedIn") === "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // const res = await fetch("https://shopbackend2-1.onrender.com/admin/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username, password }),
    // });
    const res = await fetch("https://shopbackend2-1.onrender.com/admin/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password }),
});

    const success = await res.json();

    if (success) {
      sessionStorage.setItem("adminLoggedIn", "true");
      sessionStorage.setItem("adminUsername", username);
      navigate("/admin");
    } else {
      setError("Invalid credentials!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a0025 0%, #3a185a 50%, #000 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4 login-card-animated"
        style={{
          maxWidth: 400,
          width: "100%",
          borderRadius: "1.5rem",
          background: "rgba(34, 20, 50, 0.97)",
          position: "relative",
          boxShadow: "0 8px 32px 0 #6a11cb55, 0 2px 12px 0 #2575fc55",
        }}
      >
        <div className="text-center mb-3" style={{ marginTop: "-60px" }}>
          <div
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
              borderRadius: "50%",
              padding: 18,
              boxShadow: "0 4px 24px #6a11cb55",
            }}
          >
            <img
              src="https://img.icons8.com/ios-filled/80/ffffff/diamond.png"
              alt="Admin Logo"
              style={{ width: 48, height: 48 }}
            />
          </div>
        </div>
        <h2 className="text-center mb-4" style={{ color: "#fff", fontWeight: 700, letterSpacing: 1 }}>
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <div className="form-group mb-3">
            <label style={{ color: "#bdbdbd" }}>Username</label>
            <input
              type="text"
              className="form-control"
              style={{
                borderRadius: "0.75rem",
                background: "#2a2040",
                color: "#fff",
                border: "1px solid #6a11cb",
              }}
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label style={{ color: "#bdbdbd" }}>Password</label>
            <input
              type="password"
              className="form-control"
              style={{
                borderRadius: "0.75rem",
                background: "#2a2040",
                color: "#fff",
                border: "1px solid #6a11cb",
              }}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 fw-bold"
            style={{
              background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
              color: "#fff",
              borderRadius: "0.75rem",
              letterSpacing: "1px",
              boxShadow: "0 2px 8px rgba(106,17,203,0.15)",
              fontSize: "1.1rem",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
