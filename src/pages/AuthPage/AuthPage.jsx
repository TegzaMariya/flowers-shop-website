import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Button from '../../components/UI/Button';
import styles from './AuthPage.module.css';
import { useAuth } from '../../contexts/AuthContext'; 

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { login, isAuth } = useAuth(); 
    const navigate = useNavigate();

    if (isAuth) {
        navigate('/');
        return null; 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isLogin) {
            if (login(email, password)) {
                alert(`Ласкаво просимо, ${email}!`);
            } else {
                alert('Помилка входу. Спробуйте інший логін/пароль.');
            }
        } else {
            alert('Реєстрація успішна! Виконується автоматичний вхід...');
            login(email, password);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.authBox}>
                <h2 className={styles.title}>{isLogin ? 'Увійти' : 'Зареєструватися'}</h2>
            
                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Електронна пошта*" 
                        className={styles.input} 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email" 
                        name="email"
                        autoComplete="email"
                    />
                    <input 
                        type="password" 
                        placeholder="Пароль*" 
                        className={styles.input} 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password" 
                        name="password"
                        autoComplete="current-password"
                    />
                    
                    {/* Додаткові поля для реєстрації, якщо не Вхід */}
                    {!isLogin && (
                        <input 
                            type="password" 
                            placeholder="Повторіть Пароль*" 
                            className={styles.input} 
                            required 
                            id="confirm-password"
                            name="confirmPassword"
                            autoComplete="new-password"
                        />
                    )}

                    <Button type="submit" variant="primary" className={styles.submitButton}>
                        {isLogin ? 'Увійти' : 'Зареєструватися'}
                    </Button>
                </form>

                {/* ПЕРЕМИКАЧ РЕЖИМІВ */}
                <p className={styles.toggleText}>
                    {isLogin ? 'Немає акаунту?' : 'Вже зареєстровані?'} 
                    <button 
                        type="button" 
                        className={styles.toggleButton} 
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Зареєструватися' : 'Увійти'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;