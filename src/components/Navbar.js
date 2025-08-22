import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; // <-- Import the custom CSS

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm navbar-pop">
      <div className="container">
        {/* Logo and Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/diamond.png"
            alt="Logo"
            width="32"
            height="32"
            className="me-2"
            style={{ objectFit: "contain" }}
          />
          <span className="fw-bold">JewelryShop</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Shop/Home Page */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {/* Contact Us */}
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>

            {/* Admin Panel */}
            <li className="nav-item">
              <Link className="nav-link" to="/adminlogin">Admin Panel</Link>
            </li>

            {/* Register */}
            <li className="nav-item">
              <Link className="nav-link" to="/ownerRegister">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
