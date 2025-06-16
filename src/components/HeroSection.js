import React from "react";

function HeroSection() {
  return (
    <div
      className="hero-section d-flex flex-column flex-md-row"
      style={{
        minHeight: "92vh",
        background: "#f9f7f4",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Mobile/tablet background image */}
      <div
        className="hero-bg-image"
        style={{
          display: "none", // will be enabled with media query below
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "url('/The Rise.png') center center/cover no-repeat",
          opacity: 0.23,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      {/* Content */}
      <div
        className="d-flex flex-column justify-content-center align-items-start p-5"
        style={{
          flex: "1 1 0%",
          minWidth: 0,
          maxWidth: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontSize: "5rem",
            fontFamily: "'Overlock', Arial, sans-serif",
            fontWeight: 400,
            letterSpacing: "2px",
            marginBottom: "2rem",
            color: "#5f5852",
            lineHeight: 1.1,
          }}
        >
          ART<br />
          HEALS
        </h1>
        <div
          style={{
            fontFamily: "'Port Lligat Sans', Arial, sans-serif",
            fontSize: "1.13rem",
            color: "#232222",
          }}
        >
          <p style={{ maxWidth: 650 }}>
            Classical art, spanning roughly from the 8th century BCE to the 5th century CE, represents the artistic foundation of Western civilization.
          </p>
          <p style={{ maxWidth: 650 }}>
            Rooted in the cultures of ancient Greece and Rome, it emphasizes ideals of balance, proportion, and harmony.
          </p>
          <p style={{ maxWidth: 650 }}>
            Unlike the experimentation that defines later movements, classical art sought to capture beauty and perfection through established techniques and a focus on the human form and its relationship with the divine.
          </p>
        </div>
      </div>
      {/* Desktop right image */}
      <div
        className="hero-image"
        style={{
          flex: "0 0 38vw",
          minHeight: "92vh",
          backgroundImage: "url('/The Rise.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          boxShadow: "0 0 20px 0 #bbb",
          display: "block", // will be set to none on small screens below
          position: "relative",
          zIndex: 2,
        }}
      ></div>

      {/* Responsive Style Block */}
      <style>{`
        @media (max-width: 900px) {
          .hero-image {
            display: none !important;
          }
          .hero-bg-image {
            display: block !important;
          }
          .hero-section {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}

export default HeroSection;
