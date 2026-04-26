"use client";

import { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [view, setView] = useState<'products' | 'orders'>('products');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', category: 'Kids', image: '/images/hero.png', description: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Incorrect Password!');
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts(data || []);
  };

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewProduct({ ...newProduct, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('products').insert([{ ...newProduct, price: parseFloat(newProduct.price) }]);
    if (error) alert(error.message);
    else {
      fetchProducts();
      setNewProduct({ name: '', price: '', category: 'Kids', image: '/images/hero.png', description: '' });
      alert('Product saved!');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm('Delete product?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  
