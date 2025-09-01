// src/pages/ContactPage.js
import React, { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    // minimal client-side validation example
    const form = e.currentTarget;
    const data = {
      name: form.fullname?.value,
      email: form.email?.value,
      company: form.company?.value,
      phone: form.phone?.value,
      message: form.message?.value,
    };

    // here you could send to supabase/functions/email or any backend
    // for now just simulate success
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus(null), 3000);
    }, 900);
  }

  /* Colors tuned to your ArtSell theme */
  const BG = "#fffdfc";
  const PANEL_BG = "#f8f6f4";
  const ACCENT = "#b97a2b"; // gold used in your UI
  const TEXT = "#1a1a1a";
  const MUTED = "#6b6b6b";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 28,
        fontFamily: "'Port Lligat Sans', 'Montserrat', Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1180,
          display: "grid",
          gridTemplateColumns: "minmax(260px, 420px) 1fr",
          gap: 32,
          alignItems: "start",
        }}
      >
        {/* Left gradient info card */}
        <div
          aria-hidden="true"
          style={{
            borderRadius: 14,
            padding: "34px 28px",
            minHeight: 420,
            color: "#fff",
            background:
              "linear-gradient(180deg, rgba(185,122,43,0.95) 0%, rgba(178,145,106,0.92) 45%, rgba(244,245,247,0.92) 100%)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontFamily: "'Overlock', serif",
                fontWeight: 700,
                fontSize: "1.6rem",
                letterSpacing: "-0.6px",
                color: "#fff",
                marginBottom: 12,
              }}
            >
              Get in touch
            </h3>

            <div style={{ color: "#fff", opacity: 0.95, lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Visit us</div>
              <div style={{ fontSize: 14 }}>
                Come say hello at our HQ.
                <div style={{ marginTop: 8, fontSize: 13, opacity: 0.95 }}>
                  67 Wisteria Way, Croydon South VIC 3136 AU
                </div>
              </div>

              <div style={{ height: 14 }} />

              <div style={{ fontWeight: 700, marginBottom: 6 }}>Chat to us</div>
              <div style={{ fontSize: 14 }}>
                Our friendly team is here to help.
                <div style={{ marginTop: 8, fontSize: 13, opacity: 0.95 }}>
                  hello@artsell.example
                </div>
              </div>

              <div style={{ height: 14 }} />

              <div style={{ fontWeight: 700, marginBottom: 6 }}>Call us</div>
              <div style={{ fontSize: 14 }}>
                Mon–Fri from 8am to 5pm
                <div style={{ marginTop: 8, fontSize: 13, opacity: 0.95 }}>
                  (+61) 3 5555 5555
                </div>
              </div>
            </div>
          </div>

          {/* Social & subtle footer */}
          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 13, opacity: 0.95, marginBottom: 12 }}>Follow us</div>
            <div style={{ display: "flex", gap: 10 }}>
              {/* Small circular icon buttons */}
              <a href="#facebook" style={iconLinkStyle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.12 8.44 9.94v-7.03H8.23v-2.91h2.21V9.41c0-2.19 1.3-3.4 3.29-3.4.95 0 1.95.17 1.95.17v2.15h-1.09c-1.07 0-1.4.67-1.4 1.36v1.64h2.38l-.38 2.91h-2V22c4.78-.82 8.44-4.95 8.44-9.93z" fill="#fff"/></svg>
              </a>
              <a href="#linkedin" style={iconLinkStyle}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6 1.11 6 0 4.88 0 3.5 0 2.12 1.11 1 2.49 1 3.86 1 4.98 2.12 4.98 3.5zM.24 8.24h4.5V24h-4.5V8.24zM9.98 8.24h4.32v2.09h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3.01 5.4 6.91V24h-4.5v-7.37c0-1.76-.03-4.01-2.44-4.01-2.45 0-2.83 1.92-2.83 3.9V24h-4.5V8.24z" fill="#fff"/></svg></a>
              <a href="#instagram" style={iconLinkStyle}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 1 0 12 7.2zm6.3-.2a1.12 1.12 0 1 0 0 2.24 1.12 1.12 0 1 0 0-2.24zM21.6 6.28c.06 1.3.06 2.6 0 3.9-.06 1.3-.23 2.6-.6 3.78-.37 1.18-.9 2.3-1.82 3.22-.92.92-2.04 1.45-3.22 1.82-1.18.37-2.48.54-3.78.6-1.3.06-2.6.06-3.9 0-1.3-.06-2.6-.23-3.78-.6-1.18-.37-2.3-.9-3.22-1.82-.92-.92-1.45-2.04-1.82-3.22C1.83 12.78 1.66 11.48 1.6 10.18c-.06-1.3-.06-2.6 0-3.9.06-1.3.23-2.6.6-3.78.37-1.18.9-2.3 1.82-3.22.92-.92 2.04-1.45 3.22-1.82C7.98.23 9.28.06 10.58 0c1.3-.06 2.6-.06 3.9 0 1.3.06 2.6.23 3.78.6 1.18.37 2.3.9 3.22 1.82.92.92 1.45 2.04 1.82 3.22.37 1.18.54 2.48.6 3.78z" fill="#fff"/></svg></a>
            </div>

            <div style={{ marginTop: 18, fontSize: 12, opacity: 0.9 }}>
              © {new Date().getFullYear()} Artsell — All rights reserved.
            </div>
          </div>
        </div>

        {/* Right: Form panel */}
        <div
          style={{
            borderRadius: 12,
            background: PANEL_BG,
            padding: 28,
            boxShadow: "0 8px 36px rgba(13,13,13,0.04)",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 10, fontFamily: "'Overlock', serif", fontSize: "1.8rem", color: TEXT }}>
            Send us a message
          </h2>
          <p style={{ marginTop: 0, marginBottom: 18, color: MUTED }}>
            Have a question about a piece, shipping or commissions? Drop us a line and we’ll reply within 1–2 business days.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <label style={labelStyle}>
                <div style={labelTextStyle}>First name</div>
                <input name="fullname" required type="text" placeholder="Jane" style={inputStyle} />
              </label>
              <label style={labelStyle}>
                <div style={labelTextStyle}>Last name</div>
                <input name="lastname" required type="text" placeholder="Doe" style={inputStyle} />
              </label>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <label style={labelStyle}>
                <div style={labelTextStyle}>Company</div>
                <input name="company" type="text" placeholder="Optional" style={inputStyle} />
              </label>
              <label style={labelStyle}>
                <div style={labelTextStyle}>Email</div>
                <input name="email" required type="email" placeholder="you@example.com" style={inputStyle} />
              </label>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12, alignItems: "center" }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>
                <div style={labelTextStyle}>Country</div>
                <select name="country" defaultValue="AU" style={inputStyle}>
                  <option value="AU">Australia</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </label>

              <label style={{ ...labelStyle, marginBottom: 0 }}>
                <div style={labelTextStyle}>Phone</div>
                <input name="phone" type="tel" placeholder="(555) 555-5555" style={inputStyle} />
              </label>
            </div>

            <label style={labelStyle}>
              <div style={labelTextStyle}>Message</div>
              <textarea name="message" required rows={5} placeholder="Tell us about your request" style={{ ...inputStyle, minHeight: 110, resize: "vertical" }} />
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: 10, color: MUTED, fontSize: 13 }}>
              <input type="checkbox" style={{ width: 16, height: 16 }} />
              <span>I agree to receive updates and accept the <a href="#privacy" style={{ color: ACCENT }}>Privacy Policy</a>.</span>
            </label>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  background: ACCENT,
                  color: "#fff",
                  border: "none",
                  padding: "12px 26px",
                  borderRadius: 26,
                  cursor: "pointer",
                  fontWeight: 700,
                  boxShadow: "0 8px 24px rgba(185,122,43,0.14)"
                }}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              <div style={{ color: MUTED, fontSize: 14 }}>
                {status === "sent" ? "Thanks — we’ll be in touch." : "Or email hello@artsell.example"}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* small inline styles used as constants */}
      <style>{`
        @media (max-width: 880px) {
          div[style*="grid-template-columns: minmax(260px, 420px) 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

/* tiny local styles reused in the component */
const labelStyle = {
  display: "block"
};

const labelTextStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: "#222",
  marginBottom: 8,
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  fontSize: 15,
  borderRadius: 8,
  border: "1px solid rgba(26,26,26,0.08)",
  background: "white",
  outline: "none",
  boxSizing: "border-box"
};

const iconLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: 10,
  background: "rgba(255,255,255,0.12)",
  textDecoration: "none"
};
