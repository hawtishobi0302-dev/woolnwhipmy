"use client";

import styles from './WhatsAppButton.module.css';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({ 
  phoneNumber = "923190710263", 
  message = "Hello Wool & Whimpy! I'm interested in your handmade knitwear." 
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a 
      href={whatsappUrl} 
      className={styles.floatingButton} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <div className={styles.tooltip}>Chat with us!</div>
      <svg 
        viewBox="0 0 32 32" 
        className={styles.icon}
        fill="currentColor"
      >
        <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.733 5.476 2.017 7.783l-2.017 7.351 7.521-1.974c2.247 1.214 4.814 1.905 7.545 1.905 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.273c-2.433 0-4.717-0.612-6.721-1.688l-0.481-0.258-4.464 1.171 1.192-4.348-0.283-0.451c-1.151-1.834-1.821-4.012-1.821-6.347 0-6.425 5.228-11.653 11.653-11.653 6.425 0 11.653 5.228 11.653 11.653s-5.228 11.653-11.653 11.653zM22.181 18.667c-0.341-0.171-2.017-0.995-2.329-1.108-0.312-0.113-0.539-0.171-0.767 0.171s-0.88 1.108-1.079 1.336-0.398 0.256-0.739 0.085c-0.341-0.171-1.439-0.531-2.741-1.692-1.013-0.904-1.696-2.020-1.895-2.361s-0.021-0.526 0.15-0.696c0.153-0.153 0.341-0.398 0.512-0.597 0.171-0.199 0.228-0.341 0.341-0.569s0.057-0.427-0.028-0.597c-0.085-0.171-0.767-1.849-1.051-2.531-0.276-0.665-0.557-0.575-0.767-0.585-0.199-0.010-0.427-0.011-0.654-0.011s-0.597 0.085-0.91 0.427c-0.312 0.341-1.194 1.166-1.194 2.844s1.223 3.301 1.393 3.529c0.171 0.228 2.404 3.671 5.823 5.145 0.813 0.35 1.448 0.559 1.943 0.716 0.817 0.259 1.561 0.223 2.149 0.135 0.655-0.098 2.017-0.825 2.301-1.621s0.284-1.479 0.199-1.621c-0.085-0.142-0.312-0.227-0.654-0.398z" />
      </svg>
    </a>
  );
}
