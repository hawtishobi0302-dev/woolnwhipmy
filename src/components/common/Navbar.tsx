"use client";

import Link from 'next/link';
import styles from './Navbar.module.css';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className={`${styles.navbar} glass`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className="heading-serif">Wool & Whimpy</Link>
        </div>
        
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/shop">Shop</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        
        <div className={styles.actions}>
          <Link href="/cart" className={styles.cartIcon}>
            <span>Cart</span>
            <span className={styles.cartBadge}>{cartCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
