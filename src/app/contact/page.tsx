"use client";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.hero}>
          <h1 className="heading-serif">Get in Touch</h1>
          <p className="text-minimal">We'd love to hear from you. Whether it's a question about our products or a custom order request.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.info}>
            <h2 className="heading-serif">Contact Information</h2>
            <p style={{ marginBottom: '2rem' }}>Fill out the form or reach us directly via WhatsApp for faster communication.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-dark-brown)' }}>WhatsApp</h3>
                <a href="https://wa.me/923190710263" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-light-brown)', fontWeight: '600', fontSize: '1.2rem' }}>+92 319 0710263</a>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Fastest way to get a response!</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-dark-brown)' }}>Email</h3>
                <p style={{ fontSize: '1.1rem' }}>hello@woolnwhimpy.com</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-dark-brown)' }}>Social Media</h3>
                <a href="https://www.instagram.com/wool.whimpy?igsh=MWpqc2t4a2s2cXQ2MA==" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-light-brown)', fontWeight: '600', fontSize: '1.2rem' }}>@wool.whimpy</a>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Follow us for latest updates!</p>
              </div>
              <div style={{ background: 'var(--color-pastel-pink)', padding: '2rem', borderRadius: '20px' }}>
                <h3 className="heading-serif" style={{ marginBottom: '0.5rem' }}>Custom Orders</h3>
                <p style={{ fontSize: '0.9rem' }}>We take custom orders for baby sets and cardigans. Contact us on WhatsApp with your design requirements.</p>
              </div>
            </div>
          </div>

          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label>Your Name</label>
              <input type="text" placeholder="Full Name" />
            </div>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input type="email" placeholder="email@example.com" />
            </div>
            <div className={styles.formGroup}>
              <label>Subject</label>
              <input type="text" placeholder="How can we help?" />
            </div>
            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea placeholder="Write your message here..."></textarea>
            </div>
            <button type="submit" className={styles.submitBtn}>Send Message</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
