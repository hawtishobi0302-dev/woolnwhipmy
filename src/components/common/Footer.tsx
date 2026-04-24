import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2 className="heading-serif">Wool & Whimpy</h2>
          <p>Handmade with Love & Warmth. Premium knitwear for kids and women.</p>
        </div>
        
        <div className={styles.links}>
          <div className={styles.column}>
            <h3>Shop</h3>
            <ul>
              <li><Link href="/shop?category=kids">Kids Collection</Link></li>
              <li><Link href="/shop?category=women">Women Collection</Link></li>
              <li><Link href="/shop">All Products</Link></li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h3>Company</h3>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/shipping">Shipping Policy</Link></li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h3>Connect</h3>
            <ul>
              <li><a href="https://wa.me/923225261527" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/wool.whimpy?igsh=MWpqc2t4a2s2cXQ2MA==" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="mailto:hello@woolnwhimpy.com">Email Us</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Wool & Whimpy. All rights reserved.</p>
      </div>
    </footer>
  );
}
