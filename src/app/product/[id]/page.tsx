"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import styles from "./ProductDetail.module.css";
import Image from "next/image";
import Link from "next/link";
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';

const ALL_PRODUCTS = [
  { id: 1, name: "Baby Cloud Sweater", price: 4500, category: "Kids", image: "/images/kids-sweater-pink.png", description: "This adorable baby sweater is hand-knitted using the finest, itch-free merino wool. Designed with a loose fit to ensure your little one can move freely while staying warm and cozy. Perfect for gifting or daily wear.", material: "100% Organic Merino Wool", care: "Hand wash cold, dry flat." },
  { id: 2, name: "Cozy Wool Cardigan", price: 8500, category: "Women", image: "/images/women-cardigan-beige.png", description: "Our signature women's cardigan is a timeless piece for any wardrobe. Hand-knitted with a chunky texture that feels like a warm hug. Features elegant wooden buttons and deep pockets for comfort.", material: "Premium Alpaca & Wool Blend", care: "Dry clean recommended." },
  { id: 3, name: "Soft Knit Cap", price: 2200, category: "Kids", image: "/images/hero.png", description: "A classic ribbed knit cap that grows with your baby. Super stretchy and incredibly soft against delicate skin.", material: "100% Cashmere-feel Acrylic", care: "Machine washable on gentle cycle." },
  { id: 4, name: "Pastel Dream Socks", price: 1500, category: "Kids", image: "/images/custom-order.png", description: "Keep those tiny toes toasty with our hand-knitted socks. Features a soft elasticated cuff to prevent slipping.", material: "Wool & Cotton Blend", care: "Machine wash warm." },
];

export default function ProductDetail() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('S');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      setProduct(data);
    } else {
      const fallback = ALL_PRODUCTS.find(p => p.id === id) || ALL_PRODUCTS[0];
      setProduct(fallback);
    }
  };

  if (!product) return null;
  
  const sizes = product.category === 'Kids' ? ['0-3M', '3-6M', '6-12M', '1-2Y'] : ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }, selectedSize);
    alert(`${product.name} (${selectedSize}) added to cart!`);
  };

  return (
    <>
      <Navbar />
      
      <main className={styles.container}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <Image src={product.image} alt={product.name} fill />
          </div>
          <div className={styles.thumbnails}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`${styles.thumbnail} ${i === 1 ? styles.active : ''}`}>
                <Image src={product.image} alt={`${product.name} view ${i}`} width={150} height={150} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.breadcrumb}>
            <Link href="/shop">Shop</Link> / <Link href={`/shop?category=${product.category.toLowerCase()}`}>{product.category} Collection</Link>
          </div>
          <h1 className="heading-serif">{product.name}</h1>
          <p className={styles.price}>Rs. {product.price.toLocaleString()}</p>
          
          <p className={styles.description}>{product.description}</p>
          
          <div className={styles.options}>
            <span className={styles.label}>Select Size</span>
            <div className={styles.sizeGrid}>
              {sizes.map(size => (
                <button 
                  key={size} 
                  className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className={styles.actions}>
            <button className={styles.addToCart} onClick={handleAddToCart}>Add to Cart</button>
            <button className={styles.wishlist}>♡</button>
          </div>
          
          <div className={styles.meta}>
            <p className={styles.metaItem}><span>Material:</span> {product.material}</p>
            <p className={styles.metaItem}><span>Care Instructions:</span> {product.care}</p>
            <p className={styles.metaItem}><span>Handmade:</span> Yes, with love.</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
