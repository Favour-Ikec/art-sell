import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // If you want to show cart count (optional)

function Navbar() {
  const location = useLocation();
  const { cart } = useCart?.() || { cart: [] }; // optional, remove if not using CartContext

  // Helper to set the "active" link style
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{
          background: "#ede9e6",
          borderBottom: "2px solid #e2dfdb",
          fontFamily: "Montserrat, Arial, sans-serif",
          zIndex: 10,
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand d-flex align-items-center"
            to="/"
            style={{ position: "relative", height: 45, textDecoration: "none" }}
          >
            {/* Red moon logo */}
            <span
              style={{
                display: "inline-block",
                width: "38px",
                height: "38px",
                background: "radial-gradient(circle at 60% 60%, #b04a3c 85%, #f9f7f4 100%)",
                borderRadius: "50%",
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                opacity: 0.35,
                zIndex: 1,
              }}
            ></span>
            {/* Brand Text */}
            <span
              style={{
                fontFamily: "'Overlock', serif",
                fontSize: "2rem",
                color: "#273246",
                letterSpacing: "1.5px",
                fontWeight: 700,
                marginLeft: 18,
                position: "relative",
                zIndex: 2,
              }}
            >
              Re-Imagine
            </span>
          </Link>

          {/* Hamburger button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul
              className="navbar-nav ms-auto mb-2 mb-lg-0"
              style={{
                fontSize: "1.1rem",
                gap: "2rem",
                alignItems: "center",
                fontFamily: "'Overlock SC', Arial, sans-serif",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              <li className="nav-item">
                <Link
                  className={`nav-link${isActive("/") ? " active-nav" : ""}`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link${isActive("/about") ? " active-nav" : ""}`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link${isActive("/art") ? " active-nav" : ""}`}
                  to="/art"
                >
                  Art
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link${isActive("/contact") ? " active-nav" : ""}`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              {/* Cart Icon */}
              <li className="nav-item">
                <Link
                  className={`nav-link cart-link${isActive("/payment") ? " active-nav" : ""}`}
                  to="/payment"
                  aria-label="Go to cart"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      position: "relative",
                      width: 28,
                      height: 28,
                    }}
                  >
                    {/* Cart SVG icon */}
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isActive("/payment") ? "#b04a3c" : "#232222"}
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transition: "stroke .15s",
                        display: "block",
                      }}
                    >
                      <circle cx="9" cy="21" r="1.4" />
                      <circle cx="18" cy="21" r="1.4" />
                      <path d="M3 6h2l.6 2.2a2 2 0 0 0 2 1.4h9.7a2 2 0 0 0 2-1.6l1.1-5.1H5.2" />
                    </svg>
                    {/* Optional: show cart count */}
                    {cart && cart.length > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-6px",
                          right: "-6px",
                          background: "#b04a3c",
                          color: "#fff",
                          borderRadius: "50%",
                          fontSize: "0.8rem",
                          width: "19px",
                          height: "19px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          border: "2px solid #ede9e6",
                          boxShadow: "0 1px 6px #c88b7c44",
                        }}
                      >
                        {cart.length}
                      </span>
                    )}
                  </span>
                  <span style={{ marginLeft: "2px" }}>Cart</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Animated underline for navlinks */}
      <style>
        {`
          .nav-link {
            position: relative;
            color: #232222;
            transition: color 0.18s;
            padding-bottom: 6px;
            outline: none;
          }
          .nav-link::after {
            content: '';
            display: block;
            position: absolute;
            left: 0; right: 0;
            bottom: 0;
            height: 2.5px;
            background: #b04a3c;
            border-radius: 2px;
            width: 0%;
            transition: width 0.32s cubic-bezier(.67,-0.15,.25,1.2);
          }
          .nav-link:hover,
          .nav-link:focus {
            color: #b04a3c !important;
          }
          .nav-link:hover::after,
          .nav-link:focus::after {
            width: 100%;
          }
          .nav-link.active-nav {
            color: #b04a3c !important;
          }
          .nav-link.active-nav::after {
            width: 100%;
          }
        `}
      </style>
    </>
  );
}

export default Navbar;
