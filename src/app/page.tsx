"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import styles from "./Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const INITIAL_FEATURED = [
  { id: 1, name: "Baby Cloud Sweater", price: "Rs. 4,500", image: "/images/kids-sweater-pink.png" },
  { id: 2, name: "Cozy Wool Cardigan", price: "Rs. 8,500", image: "/images/women-cardigan-beige.png" },
  { id: 3, name: "Soft Knit Cap", price: "Rs. 2,200", image: "/images/hero.png" },
  { id: 4, name: "Pastel Dream Socks", price: "Rs. 1,500", image: "/images/custom-order.png" },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(4)
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const formatted = data.map((p: any) => ({
        ...p,
        price: `Rs. ${p.price.toLocaleString()}`
      }));
      setFeaturedProducts(formatted);
    } else {
      setFeaturedProducts(INITIAL_FEATURED);
    }
  };

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <Image 
            src="/images/hero.png" 
            alt="Wool & Whimpy Hero" 
            fill 
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay}></div>
          <div className={`${styles.heroContent} fade-in`}>
            <h1 className="heading-serif">Handmade with Love & Warmth</h1>
            <p>Premium handcrafted knitwear for little ones and the women who love them. Every stitch tells a story of care and comfort.</p>
            <Link href="/shop" className={styles.ctaButton}>Shop the Collection</Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <h2 className="heading-serif">Explore Collections</h2>
            <p>Thoughtfully designed for comfort and style.</p>
          </div>
          <div className={styles.categoryGrid}>
            <Link href="/shop?category=kids" className={styles.categoryCard}>
              <Image src="/images/kids-sweater-pink.png" alt="Kids Collection" fill />
              <div className={styles.categoryContent}>
                <h3 className="heading-serif">Kids Collection</h3>
                <p>Soft, warm, and cute essentials for babies & toddlers.</p>
              </div>
            </Link>
            <Link href="/shop?category=women" className={styles.categoryCard}>
              <Image src="/images/women-cardigan-beige.png" alt="Women Collection" fill />
              <div className={styles.categoryContent}>
                <h3 className="heading-serif">Women Collection</h3>
                <p>Elegant cardigans, shawls, and sweaters for every season.</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className={`${styles.section} ${styles.featuredSection}`}>
          <div className={styles.sectionHeading}>
            <h2 className="heading-serif">Featured Favorites</h2>
            <p>Our most-loved handmade pieces.</p>
          </div>
          <div className={styles.productGrid}>
            {featuredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <Image src={product.image} alt={product.name} width={400} height={400} />
                </div>
                <div className={styles.productInfo}>
                  <h3 className="text-minimal">{product.name}</h3>
                  <p className={styles.price}>{product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/shop" className={styles.ctaButton}>View All Products</Link>
          </div>
        </section>

        {/* Instagram Gallery */}
        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <h2 className="heading-serif">Follow Our Story</h2>
            <p>@woolnwhimpy on Instagram</p>
          </div>
          <div className={styles.instaGallery}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={styles.instaItem}>
                <Image src="/images/custom-order.png" alt={`Instagram ${i}`} width={200} height={200} />
              </div>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section className={styles.section} style={{ backgroundColor: 'var(--color-cream)', borderRadius: '30px', margin: 'var(--spacing-xl) auto' }}>
          <div className={styles.sectionHeading}>
            <h2 className="heading-serif">Why Choose Wool & Whimpy?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
            <div>
              <h3 className="heading-serif">100% Handmade</h3>
              <p>Every piece is uniquely crafted by hand with precision and love.</p>
            </div>
            <div>
              <h3 className="heading-serif">Premium Materials</h3>
              <p>We use only the softest, high-quality wool safe for baby skin.</p>
            </div>
            <div>
              <h3 className="heading-serif">Custom Orders</h3>
              <p>Can't find what you need? We love creating custom pieces for you.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
