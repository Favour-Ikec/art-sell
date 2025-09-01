// src/components/DebugCart.js
import React from 'react';
import { useCart } from '../contexts/CartContext';

export default function DebugCart() {
  const { cart, addToCart, removeFromCart, setQty, clearCart } = useCart();

  const sample = {
    slug: 'dantes-inferno',
    title: "Dante's Inferno",
    price: 1850,
    src: '/wallpaperflare.com_wallpaper.jpg'
  };

  return (
    <div style={{ padding: 16, border: '1px solid #ddd', maxWidth: 600 }}>
      <h3>Debug Cart</h3>
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => addToCart(sample)}>Add sample item</button>{' '}
        <button onClick={() => {
          // remove sample if exists
          removeFromCart(sample.slug);
        }}>Remove sample</button>{' '}
        <button onClick={() => setQty(sample.slug, 3)}>Set qty=3</button>{' '}
        <button onClick={() => clearCart()}>Clear cart</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>LocalStorage cart_items_v1:</strong>
        <pre style={{ background:'#f8f8f8', padding:8 }}>
{localStorage.getItem('cart_items_v1')}
        </pre>
        <strong>LocalStorage cart_id_v1:</strong>
        <pre style={{ background:'#f8f8f8', padding:8 }}>{localStorage.getItem('cart_id_v1')}</pre>
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Context cart (live):</strong>
        <pre style={{ background:'#fff', padding:8 }}>{JSON.stringify(cart, null, 2)}</pre>
      </div>

      <div style={{ marginTop: 12, color:'#666' }}>
        Open Supabase → Table Editor → <code>carts</code> to verify the server row for the cart_id shown above.
      </div>
    </div>
  );
}
