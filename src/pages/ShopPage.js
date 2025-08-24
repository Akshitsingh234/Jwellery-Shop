import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import '../css/ShopPage.css'; // Assuming you have a CSS file for styling
export default function ShopPage() {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");


  // Load shops from backend on component mount
  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const res = await axios.get("https://shopbackend2-1.onrender.com/api/shops");
      const data = res.data;

      if (Array.isArray(data)) {
        setShops(data);
      } else if (Array.isArray(data.shops)) {
        setShops(data.shops);
      } else {
        console.error("Unexpected response:", data);
        setShops([]);
      }
    } catch (err) {
      console.error("Error fetching shops:", err);
      setShops([]);
    }
  };

  const handleShopClick = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  const filteredShops = shops.filter((shop) =>
  (shop.shopName || "").toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <div
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            borderRadius: "50%",
            padding: 22,
            boxShadow: "0 4px 24px #6a11cb55",
            marginBottom: 18,
          }}
        >
          <img
            src="https://img.icons8.com/ios-filled/80/ffffff/shop.png"
            alt="Shop Icon"
            style={{ width: 54, height: 54 }}
          />
        </div>
        <h1 className="fw-bold mt-3" style={{
          color: "#3a185a",
          letterSpacing: 1,
          fontSize: "2.5rem"
        }}>
          Welcome to Our Jewelry Shops
        </h1>
        <p className="lead" style={{ color: "#6a11cb" }}>
          Explore our exclusive shops and discover timeless jewelry collections.
        </p>
      </div>

      <h1 className="text-center mb-5">Our Shops</h1>

      <input
        type="text"
        placeholder="Search shop by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-4"
        style={{ maxWidth: 400, margin: "0 auto" }}
      />

      {/* Add gap between search box and cards */}
      <div style={{ height: "2.5rem" }}></div>

      {filteredShops.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No shops available yet.</p>
          <p className="text-muted">Admin can add shops from the admin panel.</p>
        </div>
      ) : (
        <div className="row">
          {filteredShops.map((shop) => (
            <div className="col-md-4 mb-4" key={shop.id}>
              <div
                className="card h-100 shop-dark-card"
                style={{ cursor: "pointer", position: "relative", overflow: "visible" }}
                onClick={() => handleShopClick(shop.id)}
              >
                <div className="text-center" style={{ marginTop: "-36px" }}>
                  <div
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                      borderRadius: "50%",
                      padding: 12,
                      boxShadow: "0 4px 16px #6a11cb55",
                    }}
                  >
                    <img
                      src="https://img.icons8.com/ios-filled/50/ffffff/diamond.png"
                      alt="Diamond Logo"
                      style={{ width: 36, height: 36 }}
                    />
                  </div>
                </div>
                <div className="card-body text-center" style={{ marginTop: 8 }}>
                  <h5 className="card-title">{shop.shopName}</h5>
                  <p className="card-text">Address: {shop.address}</p>
                  <p className="card-text">
                    <small className="text-muted">ID: {shop.id}</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}