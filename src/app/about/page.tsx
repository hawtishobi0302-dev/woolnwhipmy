import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/image";

export default function About() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <h1 className="heading-serif" style={{ fontSize: '4rem', color: 'var(--color-dark-brown)', textAlign: 'center', marginBottom: '3rem' }}>Our Story</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div style={{ position: 'relative', height: '500px', borderRadius: '30px', overflow: 'hidden' }}>
            <Image src="/images/custom-order.png" alt="Handmade process" fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <h2 className="heading-serif" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-dark-brown)' }}>Born from a Love of Craft</h2>
            <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8', marginBottom: '1rem' }}>
              Wool & Whimpy started in a small home studio with a simple mission: to create high-quality, handmade knitwear that feels like a warm hug. 
            </p>
            <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8', marginBottom: '1rem' }}>
              We believe that in a world of fast fashion, there is something deeply special about a garment made by hand. Each stitch is a testament to patience, care, and attention to detail.
            </p>
            <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8' }}>
              Our collections for kids and women are designed with both comfort and aesthetic in mind, using only the finest natural materials that are kind to the skin and the planet.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--color-cream)', padding: '4rem', borderRadius: '40px', textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className="heading-serif" style={{ fontSize: '2.5rem', color: 'var(--color-dark-brown)', marginBottom: '1rem' }}>Our Philosophy</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--color-text-light)', fontSize: '1.1rem' }}>
            "We don't just sell knitwear; we share warmth. Every product that leaves our hands is infused with the love and dedication we put into our craft."
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
