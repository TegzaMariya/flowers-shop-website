import React from 'react';
import styles from './Footer.module.css'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>© 2025 Flowers shop. Всі права захищені.</p>
        <div className={styles.socials}>
          <a href="tel:+3806655567559" className={styles.contactLink}>
            <img
              src="/assets/icon-phone-call.jpg"
              alt="Телефон"
              className={styles.socialIcon}
            />
            +380665567559
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
            <img
              src="/assets/icon-instagram.jpg"
              alt="Instagram"
              className={styles.socialIcon}
            />
            Instagram
          </a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
            <img
              src="/assets/icon-telegram.jpg"
              alt="Telegram"
              className={styles.socialIcon}
            />
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;