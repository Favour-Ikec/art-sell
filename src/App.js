import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Sparkles from "./components/Sparkles";
import BurningEmbers from "./components/BurningEmbers";
import AboutUs from "./pages/AboutUs";
import ArtPage from "./pages/ArtPage";
import ArtDetail from "./pages/ArtDetail";
import PaymentPage from "./pages/PaymentPage";
import { CartProvider } from "./contexts/CartContext";
import PaymentSuccess from "./pages/PaymentSuccess";
import ContactPage from "./pages/ContactPage";


function App() {
  return (
    <CartProvider>
      <Router>
        <Sparkles />
        <BurningEmbers />
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/art" element={<ArtPage />} />
          <Route path="/art/:slug" element={<ArtDetail />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
