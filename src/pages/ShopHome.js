import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ShopHome.css'; // Custom CSS for styling
const ShopHome = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [shop, setShop] = useState(null);
  const [designs, setDesigns] = useState([]);

  const categories = [
    { title: "Necklaces", desc: "Elegant designs crafted to perfection." },
    { title: "Rings", desc: "Sparkling rings for every special moment." },
    { title: "Earrings", desc: "Delicate earrings to complement your style." },
    { title: "Chains", desc: "Classic chains for every style." },
    { title: "Nosepins", desc: "Chic nosepins for a traditional touch." },
    { title: "Bracelets", desc: "Stylish bracelets for every occasion." },
    { title: "Kardhani", desc: "Elegant kardhanis for festive looks." },
    { title: "Payals", desc: "Graceful payals to adorn your steps." },
  ];

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await fetch(`https://shopbackend2-1.onrender.com/api/shops/${shopId}`);
        const data = await res.json();
        setShop(data);
      } catch (err) {
        console.error("Error fetching shop:", err);
      }
    };

    const fetchDesigns = async () => {
      try {
        const res = await fetch(`https://shopbackend2-1.onrender.com/api/shops/${shopId}/designs`);
        const data = await res.json();
        setDesigns(data);
      } catch (err) {
        console.error("Error fetching designs:", err);
      }
    };

    fetchShop();
    fetchDesigns();
  }, [shopId]);

  if (!shop) return <p className="text-center mt-12">Shop not found.</p>;

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-dark text-white text-center py-5">
        <h1>{shop.shopName} 💎</h1>
        <p className="lead">
          Owner: {shop.owner?.email || "Not assigned"} | Location: {shop.address}
        </p>
        <button className="btn btn-outline-light mt-3">Explore Collection</button>
        <br />
        <button 
          className="btn btn-warning mt-3"
          onClick={() => navigate(`/shop/${shopId}/login`)}
        >
          Owner Login
        </button>
      </div>

      {/* Category Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Explore by Category</h2>
        <div className="row">
          {categories.map((cat, index) => {
            const designsForCategory = designs.filter(
              d => d.category.toLowerCase() === cat.title.toLowerCase()
            );

            return (
              <div className="col-md-3 mb-4" key={index}>
                <div className="card h-100 shop-category-card p-2">
                  <h5 className="text-center mt-2">{cat.title}</h5>
                  <p className="text-center">{cat.desc}</p>

                  {/* ✅ Show preview only */}
                  {designsForCategory.length === 0 ? (
                    <p className="text-muted text-center">No designs yet</p>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`https://shopbackend2-1.onrender.com/api/shops/${shopId}/designs/${designsForCategory[0].id}/image`}
                        alt={cat.title}
                        style={{ width: "100%", height: "150px", objectFit: "cover" }}
                      />
                      <p className="mt-2 text-muted">
                        {designsForCategory.length} item
                        {designsForCategory.length > 1 ? "s" : ""} available
                      </p>
                    </div>
                  )}

                  <button
                    className="btn btn-sm btn-outline-primary w-100 mt-2"
                    onClick={() => navigate(`/shop/${shopId}/category/${cat.title.toLowerCase()}`)}
                  >
                    View More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopHome;
