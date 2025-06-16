import React from "react";

function AboutUs() {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Background image and overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <div
          style={{
            background: `url('/background.jpg') center center/cover no-repeat`,
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            zIndex: 1,
          }}
        />
        <div
          style={{
            background: "rgba(230, 224, 220, 0.35)",
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            zIndex: 2,
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          padding: "40px 0 30px 0",
        }}
      >
        <div
          className="about-heading-wrapper"
          style={{
            width: "90%",
            maxWidth: "1100px",
            margin: "0 auto 0 auto",
            paddingLeft: "0.5rem", // makes sure it aligns with content text
          }}
        >
          <h1
            style={{
              fontFamily: "'Overlock', Arial, sans-serif",
              fontWeight: 400,
              fontSize: "4.2rem",
              color: "#6a635c",
              margin: "38px 0 32px 0",
              letterSpacing: "2px",
              textShadow: "0 1px 12px #fff6",
              lineHeight: 1.12,
              textAlign: "left",
            }}
          >
            Who We Are
          </h1>
        </div>

        <div
          className="about-main-content"
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "90%",
            maxWidth: "1100px",
            justifyContent: "space-between",
            gap: "3rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {/* Left (Text + lucifer.png) */}
          <div
            className="about-left"
            style={{
              flex: "1 1 360px",
              minWidth: 0,
              maxWidth: "530px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontFamily: "'Port Lligat Sans', Arial, sans-serif",
                fontSize: "1.25rem",
                color: "#232222",
                marginBottom: "2.4rem",
                textAlign: "left",
                maxWidth: 660,
                fontWeight: "bold",
              }}
            >
              We believe art isn’t just decoration—it’s transformation.
              <br />
              <br />
              Re-Imagine was founded with a vision to bridge timeless classical aesthetics with today’s creative expression. Our gallery curates a living dialogue between past and present, celebrating the harmony, detail, and emotion that classical art inspires.
              <br />
              <br />
              From bold mythological portraits to quiet studies of form, every piece in our collection is selected for its power to move, heal, and reawaken the human spirit.
            </div>
            <div style={{ marginTop: "1.2rem", marginBottom: "1.7rem", alignSelf: "center" }}>
              <img
                src="/lucifer.png"
                alt="Classical Art Closeup"
                style={{
                  width: "100%",
                  maxWidth: "440px",
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px 0 #0005, 0 2px 10px 0 #b04a3c44",
                  border: "none",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* Right (base.png + mission text) */}
          <div
            className="about-right"
            style={{
              flex: "1 1 320px",
              minWidth: 0,
              maxWidth: "530px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="/base.png"
              alt="Classical Eye"
              style={{
                width: "100%",
                maxWidth: "440px",
                borderRadius: "16px",
                boxShadow: "0 4px 22px 0 #0005, 0 2px 7px 0 #b04a3c44",
                marginBottom: "1.3rem",
              }}
            />
            <div
              className="about-mission"
              style={{
                fontFamily: "'Port Lligat Sans', Arial, sans-serif",
                fontSize: "1.16rem",
                color: "#232222",
                textAlign: "left",
                marginTop: "70px",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Our mission: Make fine art accessible, meaningful, and personal for every visitor.
              <br />
              <br />
              Whether you are a collector, creator, or simply curious, we invite you to explore and connect with works that echo centuries of vision, mastery, and inspiration.
              <br />
              <br />
              <em style={{ fontWeight: 400 }}>
                Art is not just something to look at—it’s something to experience, to feel, and to reimagine together.
              </em>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>
        {`
        @media (max-width: 1050px) {
          .about-heading-wrapper {
            padding-left: 0 !important;
          }
          .about-main-content {
            flex-direction: column !important;
            gap: 2.2rem !important;
            align-items: center !important;
          }
          .about-left,
          .about-right {
            max-width: 98vw !important;
            width: 100% !important;
          }
          .about-heading-wrapper h1 {
            font-size: 3.1rem !important;
            text-align: center !important;
            margin-left: 0 !important;
          }
          .about-mission {
            margin-top: 30px !important; /* Raise it up on tablets */
          }
        }
        @media (max-width: 700px) {
          .about-main-content {
            flex-direction: column !important;
            gap: 1.1rem !important;
            width: 98vw !important;
            padding: 0 !important;
          }
          .about-left,
          .about-right {
            max-width: 99vw !important;
            padding: 0 2vw !important;
          }
          .about-heading-wrapper h1 {
            font-size: 2.1rem !important;
            text-align: center !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .about-mission {
            margin-top: 18px !important; /* Raise it up even more on mobile */
          }
        }
        `}
      </style>
    </div>
  );
}

export default AboutUs;
