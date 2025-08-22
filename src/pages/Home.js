import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Necklaces",
      img: "https://imgs.search.brave.com/PYoDfK3fVYspf-URIbwkFfj5fOWGM1Ji1dVvhaD3Tv0/rs:fit:500:0:1:0/g:ce/aHR0cDovLzIuaW1p/bWcuY29tL2RhdGEy/L1RCL1hPL01ZLTMx/ODk1NDMvam9kaGEt/YWtiYXItc3R5bGUt/c2V0LWRrLTI4Lmpw/Zw",
      desc: "Elegant designs crafted to perfection.",
    },
    {
      title: "Rings",
      img: "https://imgs.search.brave.com/Ry8ROhQO9HCnnlNz4rOhmSKHM24T1WgANM82OaJwg4A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzQxLzg2LzEz/LzM2MF9GXzEyNDE4/NjEzMzVfUHZ6UmtD/NzBjNVJEczlzck9h/TlBVcjhZNk9YWUdI/N0IuanBn",
      desc: "Sparkling rings for every special moment.",
    },
    {
      title: "Earrings",
      img: "https://imgs.search.brave.com/spz3Ngv2ZRUqHhiFPpbZ3IlBUQ6D9ltZYcr0qXMYaAE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzM3MTg2NzA3L3Iv/aWwvNDRlZDBmLzY0/MDQ1MjA5MTYvaWxf/MzAweDMwMC42NDA0/NTIwOTE2XzhnZHAu/anBn",
      desc: "Delicate earrings to complement your style.",
    },
    {
      title: "Chains",
      img: "https://imgs.search.brave.com/_Ue5nnDwewz6621YR1MfHaDXGDO6f1J-94X0wQSOsWs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ydWRy/YWtzaGFydGpld2Vs/bGVyeS5pbi9jZG4v/c2hvcC9maWxlcy8y/QzlCRDE3NS04NzE3/LTQxQjMtQjMzMC03/MTk1ODEzNjA1QjZf/MjA0OHgyMDQ4Lmpw/Zz92PTE3MDQ2MTkw/NTA",
      desc: "Classic chains for every style.",
    },
    {
      title: "Nosepins",
      img: "https://imgs.search.brave.com/K0nwhh9q9wAMQG5i3CEyQzbhVVGOY4WXsVco5y-sZ9g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzI1MzAwNDQ4L3Iv/aWwvZTI2NDY1LzU1/Nzk0OTQzNjMvaWxf/MzAweDMwMC41NTc5/NDk0MzYzX3J4Y3cu/anBn",
      desc: "Chic nosepins for a traditional touch.",
    },
    {
      title: "Bracelets",
      img: "https://imgs.search.brave.com/hLDcPKXxsU64wHpQbuBHzCGJvK_0E2jiXOcYQpwQcd8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFEOThrSk9zTEwu/anBn",
      desc: "Stylish bracelets for every occasion.",
    },
    {
      title: "Kardhani",
      img: "https://imgs.search.brave.com/UHLczMMU9lZrcVEf5Z1-ItAeI97O29wE6uWC_xeEcDc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODF5Y3cwc0pLNUwu/anBn",
      desc: "Elegant kardhanis for festive looks.",
    },
    {
      title: "Payals",
      img: "https://imgs.search.brave.com/XNgnaVjf-nTdvw6jhkSpRsHLtHH9pD2EP1Mds2coXi8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzMxMTg1OTAyL3Iv/aWwvYWFkZWM0LzQ5/NjM3NTgyMzIvaWxf/NjAweDYwMC40OTYz/NzU4MjMyX3J6bGsu/anBn",
      desc: "Graceful payals to adorn your steps.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-dark text-white text-center py-5">
        <h1>Welcome to JewelryShop 💎</h1>
        <p className="lead">Discover timeless pieces crafted for elegance and beauty.</p>
        <button className="btn btn-outline-light mt-3">Explore Collection</button>
      </div>

      {/* Category Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Explore by Category</h2>
        <div className="row">
          {categories.map((card, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div
                className="card h-100 shadow"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/category/${card.title.toLowerCase()}`)}
              >
                <img
                  src={card.img}
                  className="card-img-top"
                  alt={card.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Owners Section with Sliding Images */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Owners</h2>
        <div id="ownersCarousel" className="carousel slide mx-auto" data-bs-ride="carousel" style={{ maxWidth: "600px" }}>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://via.placeholder.com/600x300?text=Owner+1" className="d-block w-100 rounded" alt="Owner 1" />
            </div>
            <div className="carousel-item">
              <img src="https://via.placeholder.com/600x300?text=Owner+2" className="d-block w-100 rounded" alt="Owner 2" />
            </div>
            <div className="carousel-item">
              <img src="https://via.placeholder.com/600x300?text=Owner+3" className="d-block w-100 rounded" alt="Owner 3" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#ownersCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#ownersCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="d-flex justify-content-center gap-4 mt-4">
          <div className="owner-float-img" style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}></div>
          <div className="owner-float-img" style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}></div>
          <div className="owner-float-img" style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white mt-5 py-4">
        <div className="container text-center">
          <h5>Contact Us</h5>
          <p className="mb-1">
            Email: <a href="mailto:info@jewelryshop.com" className="text-white text-decoration-underline">info@jewelryshop.com</a> | 
            Phone: <a href="tel:+911234567890" className="text-white text-decoration-underline">+91 12345 67890</a>
          </p>
          <p className="mb-1">
            Address: 123, Main Bazaar, Jaipur, Rajasthan, India
          </p>
          <hr className="bg-light" />
          <p className="mb-0">Thanks for visiting!</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
