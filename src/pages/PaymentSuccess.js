import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after 4 seconds
    const timer = setTimeout(() => navigate("/"), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Port Lligat Sans', Arial, sans-serif",
        padding: "40px 10px",
      }}
    >
      {/* Green icon */}
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "#43d6a9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          {/* Credit card SVG */}
          <svg
            width="98"
            height="98"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <rect x="6" y="14" width="36" height="20" rx="3" fill="#fff" />
            <rect x="6" y="18" width="36" height="4" fill="#43d6a9" />
            <rect x="10" y="30" width="9" height="2.5" rx="1" fill="#43d6a9" />
            <path
              d="M16 23c0-1 0-2 .93-2h6.27c.8 0 .8 1 .8 2"
              stroke="#43d6a9"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
      {/* Thank you message */}
      <div
        style={{
          color: "#23c18a",
          fontFamily: "'Overlock', Arial, sans-serif",
          fontWeight: 700,
          fontSize: "2.9rem",
          marginBottom: "12px",
          textAlign: "center",
        }}
      >
        Thank You!
      </div>
      <div
        style={{
          color: "#979797",
          fontFamily: "'Overlock', Arial, sans-serif",
          fontWeight: 400,
          fontSize: "1.55rem",
          marginBottom: "30px",
          letterSpacing: "1px",
          textAlign: "center",
          textTransform: "capitalize",
        }}
      >
        Payment done Successfully
      </div>
      <div
        style={{
          color: "#181817",
          fontFamily: "'Port Lligat Sans', Arial, sans-serif",
          fontWeight: 400,
          fontSize: "1.02rem",
          textAlign: "center",
          marginBottom: "35px",
          letterSpacing: ".01em",
        }}
      >
        YOU WILL BE REDIRECTED TO HOME PAGE SHORTLY<br />
        OR CLICK HERE TO RETURN TO HOME PAGE
      </div>
      <button
        style={{
          background: "#43d6a9",
          color: "#fff",
          border: "none",
          fontFamily: "'Overlock SC', Arial, sans-serif",
          fontWeight: 600,
          fontSize: "1.36rem",
          borderRadius: "35px",
          padding: "15px 68px",
          marginTop: "6px",
          cursor: "pointer",
          transition: "background 0.14s",
          boxShadow: "0 2px 18px #43d6a955",
          outline: "none",
        }}
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  );
}

export default PaymentSuccess;
