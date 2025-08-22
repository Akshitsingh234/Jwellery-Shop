import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/OwnerLogin.css';

const OwnerLogin = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if already logged in for this shop
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("ownerLoggedIn");
    const sessionShopId = sessionStorage.getItem("shopId");
    if (loggedIn === "true" && sessionShopId === shopId) {
      navigate(`/shop/${shopId}/dashboard`);
    }
  }, [shopId, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`http://localhost:8080/api/owner/login/${shopId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.text();

      if (response.ok && result === "true") {
        sessionStorage.setItem("ownerLoggedIn", "true");
        sessionStorage.setItem("ownerEmail", email);
        sessionStorage.setItem("shopId", shopId);

        setSuccess("Login successful!");
        setTimeout(() => navigate(`/shop/${shopId}/dashboard`), 1000);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
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
          transition: "box-shadow 0.4s",
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
              alt="Jewelry Logo"
              style={{ width: 48, height: 48 }}
            />
          </div>
        </div>
        <h2 className="text-center mb-4" style={{ color: "#fff", fontWeight: 700, letterSpacing: 1 }}>
          Owner Login
        </h2>
        <h6 className="text-center mb-4" style={{ color: "#bdbdbd" }}>
          Shop ID: <span style={{ color: "#fff" }}>{shopId}</span>
        </h6>
        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          <div className="form-group mb-3">
            <label style={{ color: "#bdbdbd" }}>Email</label>
            <input
              type="email"
              className="form-control"
              style={{
                borderRadius: "0.75rem",
                background: "#2a2040",
                color: "#fff",
                border: "1px solid #6a11cb",
              }}
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
};

export default OwnerLogin;
