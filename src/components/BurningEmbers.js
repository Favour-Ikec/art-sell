import React, { useEffect, useRef } from "react";

const EMBER_COUNT = 12;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

const BurningEmbers = () => {
  const ref = useRef();

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    for (let i = 0; i < EMBER_COUNT; i++) {
      const ember = document.createElement("div");
      const size = randomBetween(4, 10); // Ember size
      ember.className = "ember";
      ember.style.width = `${size}px`;
      ember.style.height = `${size}px`;
      ember.style.left = `${randomBetween(5, 95)}vw`;
      // Start from near bottom (80vh+) to feel like rising
      ember.style.top = `${randomBetween(80, 98)}vh`;
      ember.style.animationDuration = `${randomBetween(2.5, 5)}s`;
      ember.style.animationDelay = `${randomBetween(0, 4)}s`;
      ember.style.opacity = randomBetween(0.65, 0.9);
      container.appendChild(ember);
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
        zIndex: 3, // above sparkles
        overflow: "hidden",
      }}
      aria-hidden="true"
    />
  );
};

export default BurningEmbers;
