import React from "react";

function ContactPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Montserrat, Arial, sans-serif",
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
        {/* Background image */}
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
        {/* Soft semi-transparent overlay */}
        <div
          style={{
            background: "rgba(240,236,232, 0.52)", // Adjust alpha for visibility
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            zIndex: 2,
          }}
        />
      </div>

      {/* Centered Content */}
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 40px #0001",
          padding: "36px 26px 28px 26px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 3,
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "2.7rem",
            fontWeight: 900,
            color: "#191919",
            marginBottom: "28px",
            letterSpacing: "-1px",
            fontFamily: "'Montserrat', Arial, sans-serif",
            textAlign: "center",
          }}
        >
          Contact Us
        </h1>
        {/* Form */}
        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
          onSubmit={e => {
            e.preventDefault();
            alert("Thank you! Your message has been submitted.");
          }}
        >
          <div>
            <label
              htmlFor="fullname"
              style={{
                fontWeight: 500,
                fontSize: "1rem",
                color: "#1a1918",
                marginBottom: 2,
              }}
            >
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              required
              style={{
                width: "100%",
                border: "none",
                borderBottom: "2px solid #222",
                background: "none",
                fontSize: "1.09rem",
                padding: "6px 2px 7px 2px",
                marginTop: 2,
              }}
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              style={{
                fontWeight: 500,
                fontSize: "1rem",
                color: "#1a1918",
                marginBottom: 2,
              }}
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              style={{
                width: "100%",
                border: "none",
                borderBottom: "2px solid #222",
                background: "none",
                fontSize: "1.09rem",
                padding: "6px 2px 7px 2px",
                marginTop: 2,
              }}
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              style={{
                fontWeight: 500,
                fontSize: "1rem",
                color: "#1a1918",
                marginBottom: 2,
              }}
            >
              Message
            </label>
            <textarea
              id="message"
              rows={3}
              style={{
                width: "100%",
                border: "none",
                borderBottom: "2px solid #222",
                background: "none",
                fontSize: "1.09rem",
                padding: "6px 2px 7px 2px",
                marginTop: 2,
                resize: "vertical",
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: "90%",
              margin: "18px auto 0 auto",
              background: "#181818",
              color: "#fff",
              fontSize: "1.17rem",
              border: "none",
              borderRadius: "28px",
              padding: "13px 0",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.17s",
              letterSpacing: "1px",
              alignSelf: "center",
            }}
          >
            Contact Us
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
