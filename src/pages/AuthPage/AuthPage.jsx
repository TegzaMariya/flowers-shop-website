import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import styles from './AuthPage.module.css';
import { useAuth } from '../../contexts/AuthContext';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const { login, register, isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        let success = false;

        if (isLogin) {
            success = await login(email, password);

            if (success) {
                alert(`Ласкаво просимо, ${email}!`);
            } else {
                setError('Помилка входу. Перевірте електронну пошту та пароль.');
            }
        } else {
            if (password !== confirmPassword) {
                setError('Паролі не співпадають. Будь ласка, перевірте введення.');
                return;
            }
            
            success = await register(email, password, name);
            
            if (success) {
                alert(`Реєстрація успішна! Ласкаво просимо, ${name || email}!`);
                navigate('/');
            } else {
                setError('Помилка реєстрації. Можливо, пошта вже використовується або пароль занадто слабкий (мінімум 6 символів).');
            }
        }

        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.authBox}>
                <h2 className={styles.title}>{isLogin ? 'Увійти' : 'Зареєструватися'}</h2>
                
                <form className={styles.authForm} onSubmit={handleSubmit}>
                    
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Ваше Ім'я (необов'язково)"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            name="name"
                            autoComplete="name"
                        />
                    )}

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
                        autoComplete={isLogin ? "current-password" : "new-password"}
                    />
                    
                    {!isLogin && (
                        <input 
                            type="password" 
                            placeholder="Повторіть Пароль*" 
                            className={styles.input} 
                            required 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            id="confirm-password"
                            name="confirmPassword"
                            autoComplete="new-password"
                        />
                    )}

                    {error && <p className={styles.errorText}>{error}</p>}
                    
                    <Button type="submit" variant="primary" className={styles.submitButton}>
                        {isLogin ? 'Увійти' : 'Зареєструватися'}
                    </Button>
                </form>

                <p className={styles.toggleText}>
                    {isLogin ? 'Немає акаунту?' : 'Вже зареєстровані?'} 
                    <button 
                        type="button" 
                        className={styles.toggleButton} 
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setPassword('');
                            setConfirmPassword('');
                        }}
                    >
                        {isLogin ? 'Зареєструватися' : 'Увійти'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;