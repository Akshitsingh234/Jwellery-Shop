import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerDashboard from "./pages/OwnerDashboard";
import CategoryPage from "./pages/CategoryPage";
import ShopPage from "./pages/ShopPage";
import Navbar from "./components/Navbar";
// import ShopDetailsPage from "./pages/ShopDetailsPage";
import AdminPanel from "./pages/AdminPanel"; 
import AdminLogin from "./pages/AdminLogin";
import ShopHome from "./pages/ShopHome";
import ContactPage from "./pages/ContactPage";
import OwnerRegister from "./pages/OwnerRegister";
function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<ShopPage />} />
       <Route path="/shop/:shopId/login" element={<OwnerLogin />} />
       <Route path="/shop/:shopId/dashboard" element={<OwnerDashboard />} />
      <Route path="/shop/:shopId/category/:category" element={<CategoryPage />} />

        {/* <Route path="/shop/:shopId/details" element={<ShopDetailsPage />} /> */}
        <Route path="/admin" element={<AdminPanel />} /> 
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/shop/:shopId" element={<ShopHome />} /> 
        <Route path="/shop/:shopId/category/:categoryName" element={<CategoryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/ownerRegister" element={<OwnerRegister />} />
      </Routes>
    </Router>
  );
}

export default App;