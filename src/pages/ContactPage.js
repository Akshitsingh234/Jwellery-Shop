import React, { useState } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type }), 3500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send form data to backend
    const response = await fetch("https://shopbackend2-1.onrender.com/contact/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      showNotification("Query submitted successfully ✅");
      setFormData({ name: "", email: "", phone: "", description: "" });
    } else {
      showNotification("Failed to submit query ❌", "error");
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <p className="text-center fw-bold">📧 Admin Email: admin@jewelryshop.com</p>

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Your Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Your Query</label>
          <textarea
            className="form-control"
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-dark w-100">Submit</button>
      </form>

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
    </div>
  );
}

export default ContactPage;
