import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h2 className="heading-serif">Wool & Whimpy</h2>
            <p>Premium handmade knitwear crafted with love and warmth for your precious ones.</p>
          </div>
          
          <div className={styles.column}>
            <h3>Shop</h3>
            <ul>
              <li><Link href="/shop?category=kids">Kids Collection</Link></li>
              <li><Link href="/shop?category=women">Women Collection</Link></li>
              <li><Link href="/shop">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h3>Support</h3>
            <ul>
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/shipping">Shipping Policy</Link></li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h3>Connect</h3>
            <ul>
              <li><a href="https://wa.me/923190710263" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/wool.whimpy?igsh=MWpqc2t4a2s2cXQ2MA==" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="mailto:hello@woolnwhimpy.com">Email Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Wool & Whimpy. All rights reserved.</p>
          <p>Handmade with ❤️ in Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
