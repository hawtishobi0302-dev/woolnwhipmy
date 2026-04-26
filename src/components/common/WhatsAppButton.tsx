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
              <div className={styles.tooltip}>Chat with us!</div>div>
              <svg 
                        viewBox="0 0 32 32" 
                className={styles.icon}
                        fill="currentColor"
                      >
                      <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.733 5.476 2.017 7.783l-2.017 7.351 7.521-1.974c2.247 1.214 4.814 1.905 7.545 1.905 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.273c-2.433 0-4.717-0.612-6.721-1.688l-0.481-0.258-4.464 1.171 1.192-4.348-0.283-0.451c-1.151-1.834-1.821-4.012-1.821-6.347 0-6.425 5.228-11.653 11.653-11.653 6.425 0 11.653 5.228 11.653 11.653s-5.228 11.653-11.653 11.653zM22.181 18.667c-0.341-0.171-2.017-0.995-2.329-1.108-0.312-0.113-0.539-0.171-0.767 0.171s-0.88 1.108-1.079 1.336-0.398 0.2-0.71 0.2-0.625-0.113-1.079-0.284c-0.454-0.171-1.931-0.71-3.607-2.215-1.306-1.151-2.187-2.584-2.443-3.011-0.256-0.426-0.028-0.653 0.199-0.852s0.454-0.539 0.681-0.823c0.227-0.284 0.312-0.483 0.454-0.795s0.085-0.596-0.028-0.852c-0.113-0.256-0.767-1.846-1.051-2.527-0.284-0.681-0.568-0.596-0.767-0.596-0.199 0-0.426-0.028-0.653-0.028s-0.596 0.085-0.911 0.426c-0.312 0.341-1.192 1.164-1.192 2.84 0 1.675 1.221 3.294 1.391 3.521s2.414 3.692 5.845 5.168c0.812 0.341 1.448 0.539 1.931 0.71 0.823 0.256 1.562 0.227 2.158 0.142 0.653-0.085 2.017-0.823 2.299-1.59s0.284-1.42 0.199-1.562c-0.085-0.142-0.312-0.227-0.653-0.398z" />
              </svg>svg>
        </a>a>
      );
}</a>
