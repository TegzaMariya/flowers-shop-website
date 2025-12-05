import React, { useState } from 'react';
import Button from '../../components/UI/Button';
import styles from './CartPage.module.css';

import { useCart as defaultUseCart } from '../../contexts/CartContext'; 
import { useCheckout as defaultUseCheckout } from '../../hooks/useCheckout';

const CartPage = ({ 
    useCart = defaultUseCart, 
    useCheckout = defaultUseCheckout 
}) => {
    const { cartItems, removeFromCart, increaseCount, decreaseCount, getTotal, clearCart } = useCart();
    const { checkout, loading, error } = useCheckout();
    const total = getTotal();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        delivery: '',
        payment: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const shippingThreshold = 66.0;
    const remainingForFreeShipping = shippingThreshold - total;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrorMessage('');
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.delivery || !formData.payment) {
            setErrorMessage('Будь ласка, заповніть усі обов’язкові поля перед оформленням замовлення.');
            return;
        }

        setErrorMessage('');

        const success = await checkout({
            ...formData,
            items: cartItems,
            total
        });

        if (success) {
            alert(`✅ Замовлення на суму ${total.toFixed(2)} грн оформлено. Дякуємо!`);
            clearCart();
        } else {
            alert('Помилка при оформленні замовлення. Спробуйте ще раз.');
        }
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
                        <p>До безкоштовної доставки залишилося {remainingForFreeShipping.toFixed(2)} грн!</p>
                    ) : (
                        <p>🎉 Ви маєте право на безкоштовну доставку!</p>
                    )}
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${Math.min(100, (total / shippingThreshold) * 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div className={styles.itemsList}>
                    {cartItems.map((item) => (
                        <div 
                            key={item.id} 
                            className={styles.cartItem}
                            data-testid={`cart-item-${item.id}`}
                        >
                            <img
                                src={`/assets/${item.image}`}
                                alt={item.name}
                                className={styles.itemImage}
                            />
                            <div className={styles.itemDetails}>
                                <p className={styles.itemName}>{item.name}</p>
                                <div className={styles.quantityControls}>
                                    <button 
                                        onClick={() => decreaseCount(item.id)} 
                                        className={styles.qtyBtn}
                                        data-testid={`decrease-${item.id}`}
                                    >
                                        −
                                    </button>
                                    <span>{item.count}</span>
                                    <button 
                                        onClick={() => increaseCount(item.id)} 
                                        className={styles.qtyBtn}
                                        data-testid={`increase-${item.id}`}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <span className={styles.itemPrice}>{(item.price * item.count).toFixed(2)} грн.</span>
                            <button
                                className={styles.removeItemButton}
                                onClick={() => removeFromCart(item.id)}
                                data-testid={`remove-${item.id}`}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>

                <form className={styles.checkoutForm} onSubmit={handleCheckout}>
                    <h3 className={styles.formTitle}>Оформлення замовлення</h3>

                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        placeholder="ПІБ*"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className={styles.input}
                        type="tel"
                        name="phone"
                        placeholder="Номер телефону*"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                    <select
                        className={styles.input}
                        name="delivery"
                        value={formData.delivery}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>
                            Доставка/Самовивіз*
                        </option>
                        <option value="delivery">Доставка</option>
                        <option value="pickup">Самовивіз</option>
                    </select>
                    <select
                        className={styles.input}
                        name="payment"
                        value={formData.payment}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>
                            Оплата (Карта/Готівка)*
                        </option>
                        <option value="card">Карта</option>
                        <option value="cash">Готівка</option>
                    </select>

                    {errorMessage && <p className={styles.errorMessage} data-testid="validation-error">{errorMessage}</p>}
                    {error && <p className={styles.errorMessage}>Помилка сервера: {error}</p>}

                    <Button
                        type="submit"
                        variant="secondary"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Обробка...' : 'ОФОРМИТИ ЗАМОВЛЕННЯ'}
                        <br />
                        <span className={styles.totalText}>До сплати {total.toFixed(2)} грн</span>
                    </Button>
                </form>

                <div className={styles.summary}>
                    <div className={styles.summaryRow}>
                        <span>Загальна сума</span>
                        <span>{total.toFixed(2)} грн</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Доставка</span>
                        <span>{remainingForFreeShipping > 0 ? 'TBD' : 'Безкоштовно'}</span>
                    </div>
                </div>

                <p className={styles.finePrint}>
                    Фінальна вартість доставки, знижки та податки будуть розраховані при оформленні.
                </p>
            </div>
        </div>
    );
};

export default CartPage;