"use client";

import { useState } from 'react';
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import styles from "./Checkout.module.css";
import { useCart } from "@/context/CartContext";
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully! Please ensure you have sent the JazzCash payment.");
    clearCart();
    router.push('/');
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className={styles.container}>
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h1 className="heading-serif">Your cart is empty</h1>
            <button onClick={() => router.push('/shop')} className={styles.placeOrder}>Go to Shop</button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <main className={styles.container}>
        <h1 className="heading-serif" style={{ textAlign: 'center', marginBottom: '2rem' }}>Checkout</h1>
        
        <form className={styles.grid} onSubmit={handlePlaceOrder}>
          <div className={styles.details}>
            <section className={styles.section}>
              <h2>Shipping Information</h2>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>First Name</label>
                  <input type="text" required placeholder="Jane" />
                </div>
                <div className={styles.formGroup}>
                  <label>Last Name</label>
                  <input type="text" required placeholder="Doe" />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input type="email" required placeholder="jane@example.com" />
              </div>
              <div className={styles.formGroup}>
                <label>Shipping Address</label>
                <input type="text" required placeholder="123 Cozy Lane" />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>City</label>
                  <input type="text" required placeholder="New York" />
                </div>
                <div className={styles.formGroup}>
                  <label>Postal Code</label>
                  <input type="text" required placeholder="10001" />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Payment Method</h2>
              <div className={styles.paymentMethods}>
                <div className={`${styles.paymentOption} ${styles.active}`}>
                  <input type="radio" checked readOnly />
                  <span>JazzCash (+92 319 0710263)</span>
                </div>
              </div>
              
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9f9f9', borderRadius: '10px' }}>
                <p style={{ fontSize: '0.9rem', color: '#444' }}>
                  Please send the total amount to <strong>+92 319 0710263</strong> via JazzCash. 
                  After payment, click "Place Order" below.
                </p>
              </div>
            </section>
          </div>

          <aside className={styles.orderSummary}>
            <h2 className="heading-serif">Your Order</h2>
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className={styles.item}>
                <span>{item.name} (x{item.quantity})</span>
                <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className={styles.total}>
              <span>Total</span>
              <span>Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <button type="submit" className={styles.placeOrder}>Place Order</button>
          </aside>
        </form>
      </main>

      <Footer />
    </>
  );
}
