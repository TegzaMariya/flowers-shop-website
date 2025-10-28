import React from 'react';
import Button from '../../components/UI/Button';
import styles from './CartPage.module.css';
import { useCart } from '../../contexts/CartContext'; 


const CartPage = () => {
    const { cartItems, removeFromCart, getTotal } = useCart();
    const isAuth = true;
    const total = getTotal();

    const shippingThreshold = 66.00;
    const remainingForFreeShipping = shippingThreshold - total;

    const handleCheckout = (e) => {
        e.preventDefault();
        alert(`Замовлення на суму ${total} грн. оформлено. Дякуємо!`);
    };
    
    if (cartItems.length === 0) {
        return (
            <div className={styles.cartPageContainer}>
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>Ваш кошик</h1>
                    <span className={styles.itemCount}>(0 товарів)</span>
                </div>
                <p className={styles.emptyCartMessage}>
                    Ваш кошик порожній. <a href="/" className={styles.link}>Почніть купувати!</a>
                </p>
            </div>
        );
    }

    return (
        <div className={styles.cartPageContainer}>
            <div className={styles.cartContent}>

                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>Ваш кошик</h1>
                    <span className={styles.itemCount}>({cartItems.length} товарів)</span>
                </div>

                <div className={styles.shippingInfo}>
                    {remainingForFreeShipping > 0 ? (
                        <p>До безкоштовної доставки залишилося {remainingForFreeShipping.toFixed(2)} грн.!</p>
                    ) : (
                        <p>Ви маєте право на безкоштовну доставку!</p>
                    )}
                    <div className={styles.progressBar}>
                        <div 
                            className={styles.progressFill} 
                            style={{ width: `${Math.min(100, (total / shippingThreshold) * 100)}%` }}
                        ></div>
                    </div>
                </div>
                
                <div className={styles.itemsList}>
                    {cartItems.map(item => (
                        <div key={item.id} className={styles.cartItem}>
                            <img 
                                src={`/assets/${item.image}`} 
                                alt={item.name} 
                                className={styles.itemImage} 
                            />
                            <div className={styles.itemDetails}>
                                <p className={styles.itemName}>{item.name}</p>
                                <p className={styles.itemSize}>Кількість: {item.count}</p> 
                            </div>
                            <span className={styles.itemPrice}>{(item.price * item.count).toFixed(2)} грн.</span>
                            <button 
                                className={styles.removeItemButton} 
                                onClick={() => removeFromCart(item.id)}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>

                <form className={styles.checkoutForm} onSubmit={handleCheckout}>
                    <h3 className={styles.formTitle}>Оформлення замовлення</h3>
                    <input className={styles.input} type="text" placeholder="ПІБ*" required />
                    <input className={styles.input} type="tel" placeholder="Номер телефону*" required />
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
                </form>

                <div className={styles.summary}>
                    <div className={styles.summaryRow}>
                        <span>Загальна сума</span>
                        <span>{total.toFixed(2)} грн.</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Доставка</span>
                        <span>{remainingForFreeShipping > 0 ? 'TBD' : 'Безкоштовно'}</span>
                    </div>
                </div>

                <Button type="submit" variant="secondary" className={styles.submitButton} onClick={handleCheckout}>
                    ОФОРМИТИ ЗАМОВЛЕННЯ<br/>
                    <span className={styles.totalText}>До сплати {total.toFixed(2)} грн.</span> 
                </Button>

                <p className={styles.finePrint}>
                    Фінальна вартість доставки, знижки та податки будуть розраховані при оформленні.
                </p>
            </div>
        </div>
    );
};

export default CartPage;