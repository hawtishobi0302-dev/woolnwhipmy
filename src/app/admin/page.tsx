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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Kids',
    image: '/images/hero.png',
    description: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect Password!');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase Error:', error);
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      console.error('Fetch Error:', err);
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
      alert(`Error: ${error.message}`);
    } else {
      fetchProducts();
      setNewProduct({ name: '', price: '', category: 'Kids', image: '/images/hero.png', description: '' });
      alert('Product saved successfully!');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting:', error);
    } else {
      fetchProducts();
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: 'var(--color-cream)',
        padding: '2rem'
      }}>
        <div className={styles.formCard} style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h1 className="heading-serif" style={{ marginBottom: '2rem' }}>Admin Login</h1>
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Admin Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter password"
                required 
              />
            </div>
            <button type="submit" className="text-minimal" style={{ 
              width: '100%', 
              padding: '1rem', 
              background: 'var(--color-dark-brown)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '10px',
              cursor: 'pointer'
            }}>
              Unlock Dashboard
            </button>
          </form>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/" style={{ color: 'var(--color-light-brown)', fontSize: '0.9rem' }}>← Back to Store</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <h1 className="heading-serif">Store Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/" className="text-minimal">View Site</Link>
          <button onClick={() => setIsAuthenticated(false)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>Logout</button>
        </div>
      </header>

      <div className={styles.dashboardGrid}>
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <h3>Total Products</h3>
            <p>{products.length}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Revenue</h3>
            <p>Rs. 1,450</p>
          </div>
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
              ></textarea>
            </div>
            <button type="submit" className={styles.saveBtn}>Save Product</button>
          </form>
        </div>

        <div className={styles.productList}>
          <h2 className="heading-serif">Current Inventory</h2>
          {loading ? <p>Loading products...</p> : products.map(product => (
            <div key={product.id} className={styles.productItem}>
              <img src={product.image} alt={product.name} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: '600' }}>{product.name}</h4>
                <p style={{ fontSize: '0.8rem', color: '#666' }}>{product.category}</p>
              </div>
              <p style={{ fontWeight: '700' }}>Rs. {product.price}</p>
              <button className={styles.deleteBtn} onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
