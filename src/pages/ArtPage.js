import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const artData = [
  {
    slug: "dantes-inferno",
    src: "/wallpaperflare.com_wallpaper.jpg",
    title: "Dante's Inferno",
    price: 1850,
  },
  {
    slug: "school-of-athens",
    src: "/schoolofathens.png",
    title: "The School of Athens",
    price: 2000,
  },
  {
    slug: "sabine-women",
    src: "/sabine.jpg",
    title: "The Intervention of the Sabine Women",
    price: 1300,
  },
  {
    slug: "babel",
    src: "/babel.jpg",
    title: "Tower of Babel",
    price: 1250,
  },
  {
    slug: "napoleon-munich",
    src: "/ankunft-napoleons-in-m-nchen.jpg!Large.jpg",
    title: "Entry of Napoleon I into Munich",
    price: 1700,
  },
  {
    slug: "van-gogh",
    src: "/gogh.jpeg",
    title: "Self-Portrait: Vincent Van Gogh",
    price: 1250,
  },
  {
    slug: "coronation-napoleon",
    src: "/coronation.jpg",
    title: "The Coronation of Napoleon",
    price: 2100,
  },
  {
    slug: "greece",
    src: "/greece.jpg",
    title: "Greece",
    price: 950,
  },
];

function ArtPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: 0,
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
            background: "rgba(240,236,232, 0.51)", // adjust alpha as needed
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            zIndex: 2,
          }}
        />
      </div>

      {/* Main Content */}
      <div
        style={{
          width: "100%",
          maxWidth: "1160px",
          margin: "0 auto",
          padding: "44px 0 36px 0",
          position: "relative",
          zIndex: 3,
        }}
      >
        <div
          style={{
            fontFamily: "'Overlock', serif",
            fontWeight: 600,
            fontSize: "2.3rem",
            color: "#222",
            letterSpacing: "5px",
            margin: "25px 0 30px 0",
            textAlign: "center",
          }}
        >
          Explore
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2.5rem",
            justifyItems: "center",
            alignItems: "stretch",
            margin: "0 auto",
          }}
        >
          {artData.map((art, idx) => (
            <div
              key={idx}
              tabIndex={0}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "350px",
                borderRadius: "14px",
                boxShadow: "0 6px 28px #0002, 0 2px 7px #8e8c8944",
                overflow: "hidden",
                background: "#d9d7d4",
                cursor: "pointer",
                transition: "box-shadow 0.28s cubic-bezier(.22,.68,.61,1.12), filter 0.22s, transform 0.23s cubic-bezier(.22,.68,.61,1.12)",
              }}
              onClick={() => navigate(`/art/${art.slug}`)}
              onKeyDown={e => {
                if (e.key === "Enter") navigate(`/art/${art.slug}`);
              }}
              className="art-card"
            >
              <img
                src={art.src}
                alt={art.title}
                style={{
                  width: "100%",
                  height: "240px",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: "14px 14px 0 0",
                  filter: "brightness(0.97)",
                  transition: "filter 0.2s",
                }}
              />
              <div
                style={{
                  width: "100%",
                  background: "rgba(30, 30, 30, 0.6)",
                  color: "#fff",
                  fontFamily: "'Port Lligat Sans', Arial, sans-serif",
                  fontSize: "1.22rem",
                  fontWeight: 400,
                  textAlign: "center",
                  padding: "12px 12px",
                  borderRadius: "0 0 14px 14px",
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  letterSpacing: "0.2px",
                }}
              >
                {art.title}
              </div>
              <button
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  padding: "7px 18px",
                  background: "#181818bb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: "'Port Lligat Sans', Arial, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.93rem",
                  zIndex: 3,
                  transition: "background 0.14s",
                }}
                onClick={e => {
                  e.stopPropagation();
                  addToCart(art);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Inline style for pop/shadow effect */}
      <style>{`
        .art-card:hover, .art-card:focus {
          box-shadow: 0 14px 46px 9px #b04a3c44, 0 6px 40px #0004;
          filter: brightness(1.04);
          transform: scale(1.045) translateY(-4px);
          outline: none;
        }
        .art-card:active {
          transform: scale(0.98) translateY(0px);
        }
      `}</style>
    </div>
  );
}

export default ArtPage;
