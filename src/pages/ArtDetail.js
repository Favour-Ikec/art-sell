import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

// Art details - ensure each entry has a slug!
const artDetails = {
  "dantes-inferno": {
    slug: "dantes-inferno",
    title: "Dante's Inferno",
    img: "/wallpaperflare.com_wallpaper.jpg",
    price: 1850,
    description: [
      "This dramatic artwork depicts scenes from Dante Alighieri's 'Inferno,' a literary masterpiece that explores themes of sin, redemption, and the human condition.",
      "The artist uses light, shadow, and symbolism to evoke the emotional and spiritual journey through the circles of hell.",
      "Dante's Inferno continues to inspire and challenge viewers with its complex narrative and powerful visual storytelling.",
      "The intricate details and haunting atmosphere serve as a testament to the enduring influence of classical literature on visual art."
    ],
  },
  "school-of-athens": {
    slug: "school-of-athens",
    title: "The School of Athens",
    img: "/schoolofathens.png",
    price: 2000,
    description: [
      "Painted by Raphael, 'The School of Athens' is a grand fresco representing philosophy, wisdom, and classical learning.",
      "Central figures such as Plato and Aristotle embody the exchange of ideas that shaped Western thought.",
      "Raphael's masterful use of perspective and architectural space draws the viewer into an idealized world of knowledge and harmony.",
      "This artwork remains a symbol of the Renaissance pursuit of truth and intellectual beauty.",
    ],
  },
  "sabine-women": {
    slug: "sabine-women",
    title: "The Intervention of the Sabine Women",
    img: "/sabine.jpg",
    price: 1300,
    description: [
      "Painted by Jacques-Louis David, this piece tells the story of the Sabine women intervening to end a war between their Roman fathers and Sabine husbands.",
      "The dramatic composition, heroic scale, and emotional power are typical of neoclassical art.",
      "This painting celebrates the power of reconciliation and the role of women as peacemakers.",
    ],
  },
  "babel": {
    slug: "babel",
    title: "Tower of Babel",
    img: "/babel.jpg",
    price: 1250,
    description: [
      "Pieter Bruegel the Elder's 'Tower of Babel' illustrates the biblical story of humanity's ambitious construction and the confusion of languages.",
      "The monumental architecture and bustling activity evoke both human achievement and hubris.",
      "Bruegel's attention to detail and social commentary make this painting a timeless reflection on communication and cooperation.",
    ],
  },
  "napoleon-munich": {
    slug: "napoleon-munich",
    title: "Entry of Napoleon I into Munich",
    img: "/ankunft-napoleons-in-m-nchen.jpg!Large.jpg",
    price: 1700,
    description: [
      "This grand historical painting captures Napoleon's ceremonial entry into Munich in 1805.",
      "The scene is filled with color, movement, and the sense of a pivotal moment in European history.",
      "It commemorates both the power and spectacle of the Napoleonic era.",
    ],
  },
  "van-gogh": {
    slug: "van-gogh",
    title: "Self Portrait: Vincent van Gogh",
    img: "/gogh.jpeg",
    price: 1250,
    description: [
      "This painting is a self-portrait by Vincent van Gogh,",
      "A Dutch post-impressionist painter who is among the most famous and influential figures in the history of Western art.",
      "Van Gogh created many self-portraits during his lifetime, and they are some of his most well-known and analyzed works.",
      "The particular style, with visible brushstrokes and emotive use of color, is characteristic of his work from the late 1880s.",
      "Vincent van Gogh's self-portraits are a profound journey into the soul of one of history's most intriguing artists.",
      "Through these canvases, we witness the evolution of his artistic style and get a glimpse into his tormented psyche.",
      "Van Gogh was prolific in his self-examination, creating over 30 self-portraits within the span of just a few years.",
      "This was partly due to a lack of funds to pay models, but also because his self-portraits were an introspective process that allowed him to express a range of emotions."
    ],
  },
  "coronation-napoleon": {
    slug: "coronation-napoleon",
    title: "The Coronation of Napoleon",
    img: "/coronation.jpg",
    price: 2100,
    description: [
      "Jacques-Louis David’s iconic masterpiece captures Napoleon Bonaparte’s self-coronation as Emperor of France in Notre-Dame Cathedral.",
      "With grand scale, careful composition, and dramatic lighting, David immortalizes both the event and the personalities involved.",
      "This painting is a stunning representation of power, ambition, and historical spectacle.",
    ],
  },
  "greece": {
    slug: "greece",
    title: "Greece",
    img: "/greece.jpg",
    price: 950,
    description: [
      "A sweeping, epic vision of ancient Greece in the midst of myth and history.",
      "This painting captures both the glory and the tragedy of a civilization that has inspired the Western world for centuries.",
      "The artist’s dynamic brushwork and grand storytelling invite the viewer to witness the drama of gods and mortals alike.",
    ],
  },
};

function ArtDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const art = artDetails[slug];

  // If not found
  if (!art) {
    return (
      <div
        style={{
          background: "#1a1a1a",
          color: "#fff",
          minHeight: "100vh",
          padding: "60px 20px",
          fontFamily: "'Port Lligat Sans', Arial, sans-serif",
        }}
      >
        <h1>Art Not Found</h1>
        <button
          onClick={() => navigate("/art")}
          style={{
            marginTop: "24px",
            fontSize: "1.2rem",
            padding: "8px 32px",
            borderRadius: "8px",
            border: "none",
            background: "#eee",
            color: "#191919",
            cursor: "pointer",
          }}
        >
          Back to Gallery
        </button>
      </div>
    );
  }

  const alreadyInCart = !!cart.find(item => item.slug === art.slug);

  return (
    <div
      style={{
        background: "#1a1a1a",
        color: "#fff",
        minHeight: "100vh",
        padding: "50px 0 0 0",
        fontFamily: "'Port Lligat Sans', Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          background: "#181818",
          border: "3px solid #eee",
          borderRadius: "0 0 9px 9px",
          boxShadow: "0 8px 32px #0005",
          padding: "38px 36px 34px 36px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {/* Left (text) */}
        <div style={{ flex: "1 1 380px", minWidth: "280px", marginRight: "40px" }}>
          <h1
            style={{
              fontFamily: "'Overlock', serif",
              fontWeight: 700,
              fontSize: "2.7rem",
              marginBottom: "30px",
              letterSpacing: "1.1px",
            }}
          >
            {art.title}
          </h1>
          {art.description.map((line, idx) => (
            <div
              key={idx}
              style={{
                fontSize: "1.13rem",
                color: "#eee",
                marginBottom: idx === art.description.length - 1 ? "0" : "18px",
                fontWeight: 400,
                letterSpacing: "0.02em",
                lineHeight: 1.6,
              }}
            >
              {line}
            </div>
          ))}
        </div>
        {/* Right (image + price + add to cart) */}
        <div style={{ flex: "1 1 340px", minWidth: "220px", alignSelf: "flex-start" }}>
          <div
            style={{
              width: "100%",
              maxWidth: "380px",
              background: "#eaeaea",
              borderRadius: "8px",
              boxShadow: "0 4px 22px #0007",
              overflow: "hidden",
              marginBottom: "32px",
              position: "relative",
              cursor: "pointer"
            }}
            onClick={() => navigate("/payment")}
            title="Click image to buy now"
          >
            <img
              src={art.img}
              alt={art.title}
              style={{
                width: "100%",
                objectFit: "cover",
                display: "block",
                minHeight: "200px",
                maxHeight: "240px",
                transition: "filter 0.2s",
                filter: "brightness(0.98)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                background: "rgba(40, 40, 40, 0.56)",
                color: "#ddd",
                fontSize: "1.44rem",
                padding: "12px",
                textAlign: "center",
                fontFamily: "'Port Lligat Sans', Arial, sans-serif",
              }}
            >
              ${art.price.toLocaleString()}
            </div>
          </div>
          <button
            style={{
              fontFamily: "'Port Lligat Sans', Arial, sans-serif",
              fontSize: "1.15rem",
              color: "#fff",
              background: alreadyInCart ? "#8b8071" : "#cc9900",
              border: "none",
              borderRadius: "9px",
              padding: "10px 28px",
              cursor: alreadyInCart ? "not-allowed" : "pointer",
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "10px",
              marginRight: "30px",
              fontWeight: 700,
              boxShadow: "0 3px 16px #0003",
              opacity: alreadyInCart ? 0.8 : 1,
              transition: "background 0.15s"
            }}
            disabled={alreadyInCart}
            onClick={() => addToCart({ ...art })}
          >
            {alreadyInCart ? "Added to Cart" : "Add to Cart"}
          </button>
          <button
            style={{
              fontFamily: "'Port Lligat Sans', Arial, sans-serif",
              fontSize: "1.13rem",
              color: "#fff",
              background: "#343440",
              border: "none",
              borderRadius: "7px",
              padding: "9px 26px",
              cursor: "pointer",
              marginTop: "7px",
              fontWeight: 600,
              letterSpacing: ".5px"
            }}
            onClick={() => {
              if (!alreadyInCart) addToCart({ ...art });
              navigate("/payment");
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
      {/* Next Art Piece Button + Arrow */}
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "40px 36px 50px 36px",
        }}
      >
        {/* Arrow pointing at button */}
        <div style={{ display: "flex", alignItems: "center", marginRight: "18px" }}>
          <svg width="85" height="34" viewBox="0 0 85 34" fill="none">
            <line x1="0" y1="17" x2="70" y2="17" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <polyline points="62,7 82,17 62,27" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <button
          style={{
            fontFamily: "'Port Lligat Sans', Arial, sans-serif",
            fontSize: "1.25rem",
            color: "#fff",
            background: "#444",
            border: "none",
            borderRadius: "12px",
            padding: "14px 38px",
            cursor: "pointer",
            marginLeft: "0",
            transition: "background 0.18s",
          }}
          onClick={() => {
            const slugs = Object.keys(artDetails);
            const idx = slugs.indexOf(slug);
            const nextSlug = slugs[(idx + 1) % slugs.length];
            navigate(`/art/${nextSlug}`);
          }}
        >
          Next Art Piece
        </button>
      </div>
    </div>
  );
}

export default ArtDetail;
