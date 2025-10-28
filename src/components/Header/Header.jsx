import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuth, user, logout } = useAuth(); 

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.title}>
          Flowers shop
        </Link>
      </div>
      <div className={styles.icons}>
        <Link to="/cart" className={styles.iconLink}>🛒</Link> 
        
        {isAuth ? (
          <div className={styles.authInfo}>
             <span className={styles.userName}>{user.name}</span>
             <button 
                onClick={logout} 
                className={styles.logoutButton}
             >
                Вийти
             </button>
          </div>
        ) : (
          <Link to="/auth" className={styles.iconLink}>👤</Link>
        )}
      </div>
    </header>
  );
};

export default Header;