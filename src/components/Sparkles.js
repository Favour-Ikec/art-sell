import React, { useEffect, useRef } from "react";

const SPARKLE_COUNT = 38; // You can increase or decrease

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

const Sparkles = () => {
  const ref = useRef();

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Create sparkles
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const sparkle = document.createElement("div");
      const size = randomBetween(3, 7); // px
      sparkle.className = "sparkle";
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.left = `${randomBetween(0, 100)}vw`;
      sparkle.style.top = `${randomBetween(0, 95)}vh`;
      sparkle.style.animationDelay = `${randomBetween(0, 6)}s`;
      container.appendChild(sparkle);
    }

    // Cleanup on unmount
    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2,
        overflow: "hidden",
      }}
      aria-hidden="true"
    />
  );
};

export default Sparkles;
