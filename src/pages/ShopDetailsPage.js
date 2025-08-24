// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ShopDetailsPage = () => {
//   const { shopId } = useParams();
//   const navigate = useNavigate();
//   const [shop, setShop] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [loginData, setLoginData] = useState({ email: "", password: "" });

//   // Sample shop data (in a real app, this would come from an API)
//   const sampleShops = [
//     { id: 1, name: "Akshit Jewels", owner: "Akshit Soni", location: "Delhi", description: "Premium gold and diamond jewelry" },
//     { id: 2, name: "Soni Gold Palace", owner: "Rajesh Soni", location: "Mumbai", description: "Traditional and modern jewelry designs" },
//     { id: 3, name: "Royal Gems", owner: "Priya Mehta", location: "Jaipur", description: "Handcrafted gemstone jewelry" },
//   ];

//   // Sample product data (in a real app, this would come from an API)
//   const sampleProducts = {
//     1: [
//       { id: 101, name: "Gold Necklace", price: "₹45,000", image: "https://imgs.search.brave.com/PYoDfK3fVYspf-URIbwkFfj5fOWGM1Ji1dVvhaD3Tv0/rs:fit:500:0:1:0/g:ce/aHR0cDovLzIuaW1p/bWcuY29tL2RhdGEy/L1RCL1hPL01ZLTMx/ODk1NDMvam9kaGEt/YWtiYXItc3R5bGUt/c2V0LWRrLTI4Lmpw/Zw", category: "Necklaces" },
//       { id: 102, name: "Diamond Ring", price: "₹28,500", image: "https://imgs.search.brave.com/Ry8ROhQO9HCnnlNz4rOhmSKHM24T1WgANM82OaJwg4A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzQxLzg2LzEz/LzM2MF9GXzEyNDE4/NjEzMzVfUHZ6UmtD/NzBjNVJEczlzck9h/TlBVcjhZNk9YWUdI/N0IuanBn", category: "Rings" },
//       { id: 103, name: "Pearl Earrings", price: "₹12,000", image: "https://imgs.search.brave.com/spz3Ngv2ZRUqHhiFPpbZ3IlBUQ6D9ltZYcr0qXMYaAE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzM3MTg2NzA3L3Iv/aWwvNDRlZDBmLzY0/MDQ1MjA5MTYvaWxf/MzAweDMwMC42NDA0/NTIwOTE2XzhnZHAu/anBn", category: "Earrings" },
//     ],
//     2: [
//       { id: 201, name: "Gold Chain", price: "₹22,000", image: "https://imgs.search.brave.com/_Ue5nnDwewz6621YR1MfHaDXGDO6f1J-94X0wQSOsWs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ydWRy/YWtzaGFydGpld2Vs/bGVyeS5pbi9jZG4v/c2hvcC9maWxlcy8y/QzlCRDE3NS04NzE3/LTQxQjMtQjMzMC03/MTk1ODEzNjA1QjZf/MjA0OHgyMDQ4Lmpw/Zz92PTE3MDQ2MTkw/NTA", category: "Chains" },
//       { id: 202, name: "Diamond Nose Pin", price: "₹8,500", image: "https://imgs.search.brave.com/K0nwhh9q9wAMQG5i3CEyQzbhVVGOY4WXsVco5y-sZ9g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzI1MzAwNDQ4L3Iv/aWwvZTI2NDY1LzU1/Nzk0OTQzNjMvaWxf/MzAweDMwMC41NTc5/NDk0MzYzX3J4Y3cu/anBn", category: "Nosepins" },
//     ],
//     3: [
//       { id: 301, name: "Gold Bracelet", price: "₹18,000", image: "https://imgs.search.brave.com/hLDcPKXxsU64wHpQbuBHzCGJvK_0E2jiXOcYQpwQcd8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFEOThrSk9zTEwu/anBn", category: "Bracelets" },
//       { id: 302, name: "Traditional Payal", price: "₹9,500", image: "https://imgs.search.brave.com/XNgnaVjf-nTdvw6jhkSpRsHLtHH9pD2EP1Mds2coXi8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzMxMTg1OTAyL3Iv/aWwvYWFkZWM0LzQ5/NjM3NTgyMzIvaWxf/NjAweDYwMC40OTYz/NzU4MjMyX3J6bGsu/anBn", category: "Payals" },
//     ],
//   };

//   useEffect(() => {
//     // Simulate loading data
//     setTimeout(() => {
//       const foundShop = sampleShops.find(shop => shop.id === parseInt(shopId));
//       setShop(foundShop);
//       setProducts(sampleProducts[shopId] || []);
//       setLoading(false);
//     }, 500);
//   }, [shopId]);

//   const handleLoginClick = () => {
//     setShowLoginModal(true);
//   };

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     // In a real app, you would authenticate here
//     // For demo, just redirect to owner dashboard
//     navigate("/ownerdashboard");
//   };

//   const handleInputChange = (e) => {
//     setLoginData({
//       ...loginData,
//       [e.target.name]: e.target.value
//     });
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!shop) {
//     return (
//       <div className="container text-center py-5">
//         <h2>Shop Not Found</h2>
//         <p>The shop you're looking for doesn't exist.</p>
//         <Link to="/" className="btn btn-primary">Back to Home</Link>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Shop Header */}
//       <div className="bg-dark text-white py-4">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h1>{shop.name}</h1>
//               <p className="lead mb-0">{shop.description}</p>
//               <p className="mb-0">Owner: {shop.owner} | Location: {shop.location}</p>
//             </div>
//             <div className="col-md-4 text-md-end">
//               <button className="btn btn-outline-light me-2" onClick={() => navigate("/")}>
//                 Back to Shops
//               </button>
//               <button className="btn btn-primary" onClick={handleLoginClick}>
//                 Owner Login
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products Section */}
//       <div className="container mt-5">
//         <h2 className="text-center mb-4">Our Products</h2>
        
//         {products.length === 0 ? (
//           <div className="text-center py-5">
//             <h4 className="text-muted">No products available yet.</h4>
//             <p>Check back later for new arrivals.</p>
//           </div>
//         ) : (
//           <div className="row">
//             {products.map((product) => (
//               <div key={product.id} className="col-md-4 mb-4">
//                 <div className="card h-100 shadow-sm">
//                   <img
//                     src={product.image}
//                     className="card-img-top"
//                     alt={product.name}
//                     style={{ height: "250px", objectFit: "cover" }}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{product.name}</h5>
//                     <p className="card-text text-muted">{product.category}</p>
//                     <p className="card-text fw-bold text-primary">{product.price}</p>
//                   </div>
//                   <div className="card-footer bg-white">
//                     <button className="btn btn-outline-primary w-100">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Owner Login - {shop.name}</h5>
//                 <button 
//                   type="button" 
//                   className="btn-close" 
//                   onClick={() => setShowLoginModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleLoginSubmit}>
//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email address</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="email"
//                       name="email"
//                       value={loginData.email}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input
//                       type="password"
//                       className="form-control"
//                       id="password"
//                       name="password"
//                       value={loginData.password}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <button type="submit" className="btn btn-primary w-100">Login</button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="bg-dark text-white mt-5 py-4">
//         <div className="container text-center">
//           <h5>Contact {shop.name}</h5>
//           <p className="mb-1">
//             Email: <a href={`mailto:info@${shop.name.toLowerCase().replace(/\s+/g, '')}.com`} className="text-white text-decoration-underline">
//               info@{shop.name.toLowerCase().replace(/\s+/g, '')}.com
//             </a>
//           </p>
//           <p className="mb-1">Location: {shop.location}</p>
//           <hr className="bg-light" />
//           <p className="mb-0">Thanks for visiting {shop.name}!</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default ShopDetailsPage;