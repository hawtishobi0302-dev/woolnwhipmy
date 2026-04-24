"use client";

import { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Kids',
    image: '/images/hero.png',
    description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Attempting to fetch from Supabase...');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase Error:', error);
        alert(`Supabase Error: ${error.message}`);
      } else {
        console.log('Products fetched:', data);
        setProducts(data || []);
      }
    } catch (err) {
      console.error('Network/Fetch Error:', err);
      alert('Fetch Error: Could not connect to Supabase. Check your internet or ad-blocker.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const productToAdd = {
      name: newProduct.name,
      price: parseFloat(newProduct.price) || 0,
      category: newProduct.category,
      image: newProduct.image,
      description: newProduct.description
    };
    
    const { error } = await supabase
      .from('products')
      .insert([productToAdd]);

    if (error) {
      alert(`Supabase Error: ${error.message} (Code: ${error.code})`);
      console.error(error);
    } else {
      fetchProducts();
      setNewProduct({ name: '', price: '', category: 'Kids', image: '/images/hero.png', description: '' });
      alert('Product saved successfully to Supabase!');
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
    } else {
      fetchProducts();
    }
  };

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <h1 className="heading-serif">Wool & Whimpy Admin</h1>
        <Link href="/" style={{ color: 'var(--color-light-brown)', fontWeight: '600' }}>View Storefront</Link>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Active Orders</h3>
          <p>12</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Revenue</h3>
          <p>Rs. 1,450</p>
        </div>
        <div className={styles.statCard}>
          <h3>Custom Requests</h3>
          <p>4</p>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.productList}>
          <h2 className="heading-serif" style={{ marginBottom: '1.5rem' }}>Inventory Management</h2>
          {products.map(product => (
            <div key={product.id} className={styles.productItem}>
              <img src={product.image} alt={product.name} className={styles.productThumb} />
              <div>
                <h4 style={{ fontWeight: '600' }}>{product.name}</h4>
                <p style={{ fontSize: '0.8rem', color: '#666' }}>{product.category}</p>
              </div>
              <p style={{ fontWeight: '700' }}>Rs. {product.price}</p>
              <button className={styles.deleteBtn} onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          ))}
        </div>

        <div className={styles.formCard}>
          <h2 className="heading-serif">Add New Product</h2>
          <form className={styles.form} onSubmit={handleAddProduct}>
            <div className={styles.inputGroup}>
              <label>Product Image</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden', background: '#eee' }}>
                  <img src={newProduct.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  style={{ fontSize: '0.8rem' }}
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Product Name</label>
              <input 
                type="text" 
                value={newProduct.name} 
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} 
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Price (Rs.)</label>
              <input 
                type="number" 
                value={newProduct.price} 
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Category</label>
              <select 
                value={newProduct.category} 
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="Kids">Kids</option>
                <option value="Women">Women</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Description</label>
              <textarea 
                value={newProduct.description} 
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                rows={3}
              ></textarea>
            </div>
            <button type="submit" className={styles.submitBtn}>Save Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}
