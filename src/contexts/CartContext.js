// src/contexts/CartContext.js
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";

const CartContext = createContext();
export function useCart() {
  return useContext(CartContext);
}

const LOCAL_CART_KEY = "cart_items_v1";
const LOCAL_CART_ID_KEY = "cart_id_v1";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const savingRef = useRef(false);
  const cartIdRef = useRef(null);

  // Helper: read local storage cart id or create one
  function ensureCartId() {
    let id = localStorage.getItem(LOCAL_CART_ID_KEY);
    if (!id) {
      id = uuidv4();
      localStorage.setItem(LOCAL_CART_ID_KEY, id);
    }
    cartIdRef.current = id;
    return id;
  }

  // Save cart to supabase (upsert by cart_id)
  async function saveCartToSupabase(items) {
    if (!supabase) return;
    const cart_id = ensureCartId();
    try {
      savingRef.current = true;
      console.log('[DEBUG] saveCartToSupabase - saving items:', items);
      const { data, error } = await supabase
        .from("carts")
        .upsert(
          { cart_id, items: items, user_id: null },
          { onConflict: "cart_id" }
        )
        .select()
        .single();
  
      console.log('[DEBUG] saveCartToSupabase - result:', { data, error });
  
      if (error) {
        console.warn("Failed to save cart to Supabase:", error.message || error);
      } else {
        try { localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items)); } catch(e){}
      }
    } catch (err) {
      console.error("Unexpected error saving cart:", err);
    } finally {
      savingRef.current = false;
    }
  }
  

  // Load cart from Supabase if present, otherwise load from localStorage or fallback []
// Load cart from Supabase if present, otherwise load from localStorage or fallback []
async function loadCartFromSupabase() {
  const cart_id = ensureCartId();

  try {
    // Use maybeSingle so we don't throw if no row exists
    const { data, error, status } = await supabase
      .from("carts")
      .select("items")
      .eq("cart_id", cart_id)
      .maybeSingle();

    console.log("[DEBUG] loadCartFromSupabase result:", { status, data, error });

    // If we got a row back (even if items is an empty array), use it.
    if (!error && data) {
      if (Array.isArray(data.items)) {
        setCart(data.items);
        try {
          localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(data.items));
        } catch (e) {
          console.warn("Could not write cart to localStorage:", e);
        }
        return;
      } else {
        // data exists but items is not an array (malformed) — log and fall through to localStorage
        console.warn("[DEBUG] carts.items not an array:", data.items);
      }
    } else if (error) {
      console.warn("[DEBUG] loadCartFromSupabase returned error:", error);
    }

  } catch (err) {
    console.warn("Could not fetch cart from Supabase:", err.message || err);
  }

  // fallback: check localStorage
  try {
    const raw = localStorage.getItem(LOCAL_CART_KEY);
    if (raw && raw !== "undefined") {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setCart(parsed);
        // Best-effort: ensure server has a copy (but only if it doesn't already)
        saveCartToSupabase(parsed);
        return;
      }
    }
  } catch (err) {
    console.warn("Error reading local cart:", err);
  }

  // Nothing found: empty cart
  setCart([]);
}


  // Initialize once
  useEffect(() => {
    loadCartFromSupabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Convenience: central setter that saves to both local state and supabase
  // Accepts either a value or an updater function (like setState)
  function setCartAndPersist(next) {
    setCart((prev) => {
      const newCart = typeof next === "function" ? next(prev) : next;

      // write localStorage immediately for snappy UI
      try {
        localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(newCart));
      } catch (err) {
        console.warn("Failed to write cart to localStorage:", err);
      }

      // save to supabase in background (don't await to avoid blocking UI)
      saveCartToSupabase(newCart);

      return newCart;
    });
  }

  /* Add an art piece; 
        if already present, increase the quantity.
  */
  function addToCart(art) {
    setCartAndPersist((prev) => {
      const exists = prev.some((item) => item.slug === art.slug);
      return exists
        ? prev.map((item) =>
            item.slug === art.slug ? { ...item, qty: (item.qty || 1) + 1 } : item
          )
        : [...prev, { ...art, qty: 1 }];
    });
  }

  // Remove an art piece
  function removeFromCart(slug) {
    setCartAndPersist((prev) => prev.filter((item) => item.slug !== slug));
  }

  // Change qty (set exact qty, if 0 remove)
  function setQty(slug, qty) {
    if (qty <= 0) {
      removeFromCart(slug);
      return;
    }
    setCartAndPersist((prev) =>
      prev.map((item) => (item.slug === slug ? { ...item, qty } : item))
    );
  }

  function clearCart() {
    setCartAndPersist([]);
  }

  // Optional: call this after a user signs in to associate cart with their user_id and merge carts.
  async function associateCartWithUser(user_id) {
    const cart_id = ensureCartId();
    try {
      const { data: serverUserCart } = await supabase
        .from("carts")
        .select("*")
        .eq("user_id", user_id)
        .single()
        .catch(() => ({ data: null }));

      const { data: anonCart } = await supabase
        .from("carts")
        .select("*")
        .eq("cart_id", cart_id)
        .single()
        .catch(() => ({ data: null }));

      let mergedItems = [];
      if (serverUserCart && Array.isArray(serverUserCart.items)) mergedItems = serverUserCart.items;
      if (anonCart && Array.isArray(anonCart.items)) {
        const bySlug = {};
        mergedItems.forEach((it) => (bySlug[it.slug] = { ...(bySlug[it.slug] || {}), ...it }));
        anonCart.items.forEach((it) => {
          if (bySlug[it.slug]) bySlug[it.slug].qty = (bySlug[it.slug].qty || 0) + (it.qty || 1);
          else bySlug[it.slug] = it;
        });
        mergedItems = Object.values(bySlug);
      }

      const newCartId = cart_id;
      const { error: upsertErr } = await supabase.from("carts").upsert({
        cart_id: newCartId,
        user_id,
        items: mergedItems,
      }, { onConflict: "cart_id" });

      if (upsertErr) {
        console.warn("Failed to associate cart with user:", upsertErr);
      } else {
        setCart(mergedItems);
        localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(mergedItems));
      }
    } catch (err) {
      console.error("Error associating cart with user:", err);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        setQty,
        clearCart,
        associateCartWithUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
