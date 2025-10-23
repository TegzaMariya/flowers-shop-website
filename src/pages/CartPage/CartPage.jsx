import React from 'react';
import Button from '../../components/UI/Button';
import styles from './CartPage.module.css';
import { useCart } from '../../contexts/CartContext'; 


const CartPage = () => {
    const { cartItems, removeFromCart, getTotal } = useCart();
    const total = getTotal();

    if (cartItems.length === 0) {
        return (
            <div className={styles.container}>
                <h1 className="title">Flowers shop</h1>
                <h2 className={styles.subtitle}>Кошик</h2>
                <p className={styles.emptyCartMessage}>
                    Ваш кошик порожній. <a href="/" className={styles.link}>Почніть купувати!</a>
                </p>
            </div>
        );
    }

    const handleCheckout = (e) => {
        e.preventDefault();
        alert(`Замовлення на суму ${total} грн. оформлено. Дякуємо!`);
    };

    return (
        <div className={styles.container}>
            <h1 className="title">Flowers shop</h1>
            <h2 className={styles.subtitle}>Кошик</h2>

            {cartItems.map(item => (
                <div key={item.id} className={styles.cartItem}>
                    <img 
                        src={`/assets/${item.image}`} 
                        alt={item.name} 
                        className={styles.itemImage} 
                    />
                    <div className={styles.itemDetails}>
                        <p className={styles.itemName}>{item.name}</p>
                        <p className={styles.itemPrice}>
                            {item.price} грн. x {item.count} = **{item.price * item.count} грн.**
                        </p> 
                    </div>
                    <button 
                        className={styles.deleteButton} 
                        onClick={() => removeFromCart(item.id)}
                    >
                        🗑️ 
                    </button>
                </div>
            ))}
            
            <form className={styles.checkoutForm} onSubmit={handleCheckout}>
                <input 
                    className={styles.input} 
                    type="text" 
                    placeholder="ПІБ*" 
                    required 
                />
                <input 
                    className={styles.input} 
                    type="tel" 
                    placeholder="Номер телефону*" 
                    required 
                />
                <select className={styles.input} required defaultValue="">
                    <option value="" disabled>Доставка/Самовивіз*</option>
                    <option value="delivery">Доставка</option>
                    <option value="pickup">Самовивіз</option>
                </select>
                <select className={styles.input} required defaultValue="">
                    <option value="" disabled>Оплата (Карта/Готівка)*</option>
                    <option value="card">Карта</option>
                    <option value="cash">Готівка</option>
                </select>

                <Button type="submit" variant="secondary" className={styles.submitButton}>
                    Замовити<br/>
                    <span className={styles.totalText}>До сплати {total} грн.</span> 
                </Button>
            </form>
        </div>
    );
};

export default CartPage;