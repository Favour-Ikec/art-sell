import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const inputStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "1.13rem",
  borderRadius: "7px",
  border: "2px solid #222",
  marginBottom: "16px",
  fontFamily: "'Port Lligat Sans', Arial, sans-serif",
};

function PaymentPage() {
  const { cart, removeFromCart, setQty, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);

  // Handles submit and redirects to /payment-success
  function handlePaymentSubmit(e) {
    e.preventDefault();
    clearCart(); // <-- clear cart after payment
    navigate("/payment-success");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#e5e2dd",
        fontFamily: "'Port Lligat Sans', Arial, sans-serif",
        padding: 0,
      }}
    >
      <div className="payment-main">
        {/* Order Summary */}
        <div className="payment-summary">
          <div
            style={{
              fontFamily: "'Overlock', serif",
              fontWeight: 700,
              fontSize: "2.3rem",
              marginBottom: "12px",
              letterSpacing: "2px",
            }}
          >
            Summary Order
          </div>
          <div
            style={{
              fontSize: "1.06rem",
              fontWeight: 400,
              marginBottom: "32px",
              letterSpacing: "0.02em",
              maxWidth: "90%",
              color: "#292929",
            }}
          >
            Review your selected artwork and complete your purchase.
          </div>
          {cart.length === 0 && (
            <div style={{ margin: "40px 0", color: "#444" }}>
              <strong>Your cart is empty.</strong>
            </div>
          )}
          {/* Cart Items */}
          <div className="payment-cart-items">
            {cart.map((item, idx) => (
              <div
                key={item.slug}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "26px",
                }}
              >
                <img
                  src={item.src || item.img}
                  alt={item.title}
                  style={{
                    width: "70px",
                    height: "60px",
                    borderRadius: "7px",
                    objectFit: "cover",
                    marginRight: "18px",
                    boxShadow: "0 2px 10px #0002",
                  }}
                />
                <div style={{ flex: "1" }}>
                  <div
                    style={{
                      fontFamily: "'Port Lligat Sans', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      marginBottom: "2px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ display: "flex", gap: "12px", marginBottom: "2px" }}>
                    <div>
                      <span
                        style={{
                          background: "#fff",
                          borderRadius: "6px",
                          padding: "3px 10px",
                          fontWeight: 600,
                          fontSize: "0.92rem",
                          border: "1px solid #bdbdbd",
                          marginRight: "6px",
                        }}
                      >
                        Size: L
                      </span>
                    </div>
                    <div>
                      <span
                        style={{
                          background: "#fff",
                          borderRadius: "6px",
                          padding: "3px 10px",
                          fontWeight: 600,
                          fontSize: "0.92rem",
                          border: "1px solid #bdbdbd",
                          marginRight: "6px",
                        }}
                      >
                        QTY:{" "}
                        <input
                          type="number"
                          min={1}
                          value={item.qty}
                          onChange={e => setQty(item.slug, Number(e.target.value))}
                          style={{
                            width: "36px",
                            border: "none",
                            fontSize: "1rem",
                            background: "transparent",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ fontWeight: 600, fontSize: "1.15rem", minWidth: "98px", textAlign: "right" }}>
                  ${(item.price * item.qty).toLocaleString()}
                </div>
                {/* Icons */}
                <div style={{ marginLeft: "12px", color: "#181818", fontSize: "1.22rem", display: "flex", gap: "12px" }}>
                  {/* Trash Icon */}
                  <span style={{ cursor: "pointer" }} title="Remove" onClick={() => removeFromCart(item.slug)}>
                    &#128465;
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Shipping Method */}
          <div
            style={{
              marginTop: "46px",
              fontWeight: 700,
              fontSize: "1.13rem",
              letterSpacing: "2px",
              marginBottom: "12px",
            }}
          >
            Available Shipping Method <span title="Shipping Info" style={{
              fontSize: "1.14rem",
              marginLeft: "8px",
              cursor: "pointer",
              borderRadius: "50%",
              border: "1px solid #bbb",
              display: "inline-block",
              width: "20px",
              height: "20px",
              textAlign: "center",
              lineHeight: "19px",
            }}>i</span>
          </div>
          <div
            style={{
              background: "#c6c6c6",
              borderRadius: "15px",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              width: "340px",
              maxWidth: "90%",
            }}
          >
            <img
              src="/fedex.png"
              alt="FedEx"
              style={{
                width: "80px",
                height: "32px",
                marginRight: "18px",
                objectFit: "contain",
              }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>FedEx Delivery</div>
              <div style={{ fontSize: "0.92rem" }}>3-5 days delivery</div>
            </div>
          </div>
        </div>
        {/* Payment Section */}
        <div className="payment-form">
          <div
            style={{
              fontFamily: "'Overlock SC', Arial, sans-serif",
              fontSize: "2.0rem",
              fontWeight: 700,
              marginBottom: "10px",
              letterSpacing: "2px",
              textAlign: "center",
            }}
          >
            Payment Method
          </div>
          <div
            style={{
              fontSize: "1.06rem",
              marginBottom: "30px",
              letterSpacing: "0.02em",
              color: "#e0dedb",
              textAlign: "center",
            }}
          >
            Fill your payment details and shipping information below.
          </div>
          <form onSubmit={handlePaymentSubmit}>
            <input type="email" placeholder="Email" style={inputStyle} required />
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <input type="text" placeholder="Card Number" style={{ ...inputStyle, flex: 2 }} required />
              <input type="text" placeholder="MM/YY" style={{ ...inputStyle, flex: 1 }} required />
              <input type="text" placeholder="CVV" style={{ ...inputStyle, width: "60px" }} required />
            </div>
            <input type="text" placeholder="Card Holder" style={inputStyle} required />

            <div style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "5px" }}>Billing Address</div>
            <input type="text" placeholder="Home Address" style={inputStyle} required />
            <div style={{ display: "flex", gap: "8px", marginBottom: "22px" }}>
              <input type="text" placeholder="State" style={{ ...inputStyle, flex: 1 }} required />
              <input type="text" placeholder="Postcode" style={{ ...inputStyle, flex: 1 }} required />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "2rem",
                fontWeight: 700,
                letterSpacing: "2px",
                margin: "30px 0 14px 0",
              }}
            >
              <span>Total</span>
              <span style={{ fontSize: "2rem" }}>${total.toLocaleString()}</span>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                background: "#181818",
                color: "#fff",
                fontSize: "1.35rem",
                fontWeight: 700,
                border: "none",
                borderRadius: "9px",
                padding: "17px",
                marginTop: "8px",
                letterSpacing: "1px",
                cursor: "pointer",
                fontFamily: "'Port Lligat Sans', Arial, sans-serif",
              }}
            >
              Pay ${total.toLocaleString()} Now
            </button>
          </form>
        </div>
      </div>
      {/* Responsive styles */}
      <style>
        {`
        .payment-main {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 0;
          padding: 44px 0;
        }
        .payment-summary {
          background: #f6f4f2;
          flex: 1 1 500px;
          max-width: 560px;
          min-width: 350px;
          border-radius: 0 0 0 28px;
          box-shadow: 0 6px 28px #0002;
          padding: 48px 32px 38px 46px;
          margin-right: 0px;
        }
        .payment-cart-items {
          max-height: 340px;
          overflow-y: auto;
        }
        .payment-form {
          background: #525151;
          flex: 1 1 460px;
          max-width: 510px;
          min-width: 340px;
          border-radius: 0 0 28px 0;
          box-shadow: 0 6px 28px #0002;
          padding: 48px 36px 38px 36px;
          color: #fff;
          margin-left: 0px;
        }
        @media (max-width: 1100px) {
          .payment-main {
            flex-direction: column;
            align-items: stretch;
            gap: 28px;
            padding: 22px 0;
          }
          .payment-summary,
          .payment-form {
            border-radius: 22px;
            max-width: 95vw;
            min-width: 0;
            padding: 36px 4vw 36px 4vw;
            margin: 0 auto 0 auto;
          }
        }
        @media (max-width: 700px) {
          .payment-main {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            padding: 12px 0;
          }
          .payment-summary,
          .payment-form {
            border-radius: 16px;
            max-width: 99vw;
            min-width: 0;
            padding: 24px 2vw 28px 2vw;
            margin: 0 0 12px 0;
          }
          .payment-cart-items {
            max-height: 200px;
          }
        }
        `}
      </style>
    </div>
  );
}

export default PaymentPage;
