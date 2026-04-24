"use client";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import styles from "./Cart.module.css";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const { cart, removeFromCart, cartTotal } = useCart();

  return (
    <>
      <Navbar />
      
      <main className={styles.container}>
        <h1 className="heading-serif">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Your cart is currently empty.</p>
            <Link href="/shop" className={styles.continueBtn}>Start Shopping</Link>
          </div>
        ) : (
          <div className={styles.cartLayout}>
            <div className={styles.cartItems}>
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image src={item.image} alt={item.name} fill />
                  </div>
                  <div className={styles.itemInfo}>
                    <h3>{item.name}</h3>
                    <p>Size: {item.size}</p>
                    <p>Qty: {item.quantity}</p>
                    <button 
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className={styles.itemPrice}>
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <h2 className="heading-serif">Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <Link href="/checkout">
                <button className={styles.checkoutBtn}>Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
