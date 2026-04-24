"use client";

import { useState } from 'react';
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import styles from "./Checkout.module.css";
import { useCart } from "@/context/CartContext";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      customer_name: `${formData.firstName} ${formData.lastName}`,
      customer_email: formData.email,
      address: formData.address,
      city: formData.city,
      postal_code: formData.postalCode,
      items: cart,
      total_amount: cartTotal,
      status: 'Pending'
    };

    const { error } = await supabase
      .from('orders')
      .insert([orderData]);

    if (error) {
      alert("Error placing order: " + error.message);
    } else {
      alert("Order placed successfully! Please send your JazzCash payment.");
      clearCart();
      router.push('/');
    }
    setIsSubmitting(false);
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
                  <input type="text" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} placeholder="Jane" />
                </div>
                <div className={styles.formGroup}>
                  <label>Last Name</label>
                  <input type="text" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} placeholder="Doe" />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="jane@example.com" />
              </div>
              <div className={styles.formGroup}>
                <label>Shipping Address</label>
                <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="123 Cozy Lane" />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>City</label>
                  <input type="text" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} placeholder="Lahore" />
                </div>
                <div className={styles.formGroup}>
                  <label>Postal Code</label>
                  <input type="text" required value={formData.postalCode} onChange={(e) => setFormData({...formData, postalCode: e.target.value})} placeholder="54000" />
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
                  Your order will be processed after payment verification.
                </p>
              </div>
            </section>
          </div>

          <aside className={styles.orderSummary}>
            <h2 className="heading-serif">Your Order</h2>
            {cart.map((item: any) => (
              <div key={`${item.id}-${item.size}`} className={styles.item}>
                <span>{item.name} ({item.size}) x{item.quantity}</span>
                <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className={styles.total}>
              <span>Total</span>
              <span>Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <button type="submit" disabled={isSubmitting} className={styles.placeOrder}>
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </aside>
        </form>
      </main>
      <Footer />
    </>
  );
}
