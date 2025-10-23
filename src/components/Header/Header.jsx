import React from 'react';
import styles from './Header.module.css';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuth, user, logout } = useAuth(); 

  return (
    <header className={styles.header}>

      <div className={styles.logo}>
        <a href="/" className={styles.title}>
          Flowers shop
        </a>
      </div>

      <nav className={styles.nav}>
        <span className={styles.navLink}>Головна</span>
        <span className={styles.navLink}>Послуги</span>
        <span className={styles.navLink}>Про нас</span>
      </nav>

      <div className={styles.icons}>
        <span className={styles.iconLink}>🛒</span> 
        
        {isAuth ? (
          <div className={styles.authInfo}>
             <span className={styles.iconLink}>👤</span>
             
             {user && user.name && <span className={styles.userName}>{user.name}</span>}
             
             <button 
                onClick={logout} 
                className={styles.logoutButton}
             >
                Вийти
             </button>
          </div>
        ) : (
          <span className={styles.iconLink}>👤</span>
        )}
      </div>
    </header>
  );
};

export default Header;