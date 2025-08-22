import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { shopId, category } = useParams();
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    fetchDesigns();
  }, [shopId, category]);

  const fetchDesigns = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/shops/${shopId}/designs/category/${category}`
      );
      const data = await res.json();
      setDesigns(data);
    } catch (err) {
      console.error("Error fetching designs:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{category} Collection</h2>

      <div className="row">
        {designs.length === 0 ? (
          <p className="text-muted text-center">No designs available</p>
        ) : (
          designs.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card shadow h-100">
                <img
                  src={`http://localhost:8080/api/shops/${shopId}/designs/${item.id}/image`}
                  className="card-img-top"
                  alt={item.category}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.type}</h5>
                  <p className="card-text">
                    <strong>Weight:</strong> {item.weight} <br />
                    <strong>Type:</strong> {item.type}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
