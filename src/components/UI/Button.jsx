import React from 'react';
import styles from './Button.module.css';

/**
 * Універсальний компонент кнопки.
 * @param {string} children - Текст кнопки.
 * @param {function} onClick - Обробник кліку.
 * @param {string} variant - Тип кнопки ('primary', 'secondary', 'icon').
 */
const Button = ({ children, onClick, variant = 'primary', ...props }) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`} 
      onClick={onClick} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;