"use client";

import { useState, useEffect } from 'react';
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import styles from "./Shop.module.css";
import Image from "next/image";
import Link from "next/link";
import { supabase } from '@/lib/supabase';

const ALL_PRODUCTS = [
  { id: 1, name: "Baby Cloud Sweater", price: 4500, category: "Kids", image: "/images/kids-sweater-pink.png", description: "Hand-knitted with the softest merino wool." },
  { id: 2, name: "Cozy Wool Cardigan", price: 8500, category: "Women", image: "/images/women-cardigan-beige.png", description: "Perfect for chilly evenings." },
  { id: 3, name: "Soft Knit Cap", price: 2200, category: "Kids", image: "/images/hero.png", description: "Keeps the little ears warm." },
  { id: 4, name: "Pastel Dream Socks", price: 1500, category: "Kids", image: "/images/custom-order.png", description: "Colorful and cozy socks." },
  { id: 5, name: "Elegant Shawl", price: 6500, category: "Women", image: "/images/women-cardigan-beige.png", description: "A touch of elegance for any outfit." },
  { id: 6, name: "Toddler Mittens", price: 1800, category: "Kids", image: "/images/kids-sweater-pink.png", description: "Tiny mittens for tiny hands." },
];

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      setProducts(data);
    } else {
      setProducts(ALL_PRODUCTS);
    }
  };

  const filteredProducts = filter === "All" 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <>
      <Navbar />
      
      <main className={styles.shopLayout}>
        <div className={styles.shopHeader}>
          <h1 className="heading-serif">Our Collection</h1>
          <p>Handcrafted with care for you and your loved ones.</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.filters}>
            {["All", "Kids", "Women"].map((cat) => (
              <button 
                key={cat}
                className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className={styles.sort}>
            <select className={styles.sortSelect}>
              <option>Newest Arrivals</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <Link href={`/product/${product.id}`}>
                <div className={styles.imageWrapper}>
                  <Image src={product.image} alt={product.name} fill />
                  <div className={styles.quickAdd}>View Details</div>
                </div>
              </Link>
              <div className={styles.info}>
                <span className={styles.category}>{product.category} Collection</span>
                <h3 className="text-minimal">{product.name}</h3>
                <p className={styles.price}>Rs. {product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
