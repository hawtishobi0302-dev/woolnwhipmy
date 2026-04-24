import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <h1 className="heading-serif" style={{ fontSize: '4rem', color: 'var(--color-dark-brown)', textAlign: 'center', marginBottom: '1rem' }}>Get in Touch</h1>
        <p style={{ textAlign: 'center', color: 'var(--color-text-light)', marginBottom: '4rem' }}>We'd love to hear from you. Whether you have a question about our products or a custom order request.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <div style={{ background: 'white', padding: '3rem', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <h2 className="heading-serif" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Send a Message</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '600' }}>Name</label>
                <input type="text" style={{ padding: '1rem', borderRadius: '10px', border: '1px solid #ddd' }} placeholder="Your name" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '600' }}>Email</label>
                <input type="email" style={{ padding: '1rem', borderRadius: '10px', border: '1px solid #ddd' }} placeholder="Your email" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '600' }}>Message</label>
                <textarea rows={5} style={{ padding: '1rem', borderRadius: '10px', border: '1px solid #ddd', fontFamily: 'inherit' }} placeholder="How can we help?"></textarea>
              </div>
              <button type="submit" style={{ background: 'var(--color-dark-brown)', color: 'white', border: 'none', padding: '1.2rem', borderRadius: '50px', fontWeight: '600', cursor: 'pointer' }}>Send Message</button>
            </form>
          </div>

          <div>
            <h2 className="heading-serif" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Contact Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-dark-brown)' }}>WhatsApp</h3>
                <a href="https://wa.me/923225261527" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-light-brown)', fontWeight: '600', fontSize: '1.2rem' }}>+92 322 5261527</a>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Fastest way to get a response!</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-dark-brown)' }}>Email</h3>
                <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>hello@woolnwhimpy.com</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-dark-brown)' }}>Social Media</h3>
                <a href="https://www.instagram.com/wool.whimpy?igsh=MWpqc2t4a2s2cXQ2MA==" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-light-brown)', fontWeight: '600', fontSize: '1.2rem' }}>@wool.whimpy</a>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Follow us for latest updates!</p>
              </div>
              <div style={{ background: 'var(--color-pastel-pink)', padding: '2rem', borderRadius: '20px' }}>
                <h3 className="heading-serif" style={{ marginBottom: '0.5rem' }}>Custom Orders</h3>
                <p style={{ fontSize: '0.9rem' }}>We specialize in custom knitwear. Contact us via WhatsApp for a personalized quote!</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
