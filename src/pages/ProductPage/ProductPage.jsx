import React, { useState } from 'react'; 
import { useParams, Link } from 'react-router-dom'; 
import Button from '../../components/UI/Button';
import styles from './ProductPage.module.css';
import { PRODUCTS } from '../../utils/constants';
import { useCart } from '../../contexts/CartContext'; 

const ProductPage = () => {
    const { id } = useParams(); 
    const product = PRODUCTS.find(p => p.id === parseInt(id)) || PRODUCTS[1]; 
    const [quantity, setQuantity] = useState(1); 
    const [showNotification, setShowNotification] = useState(false);
    
    const { addToCart } = useCart();

    if (!product) {
        return <h1>Продукт не знайдено</h1>;
    }

    const handleAddToCart = () => {
        addToCart(product, 1); 
        setShowNotification(true); 
    };

    return (
        <div className={styles.container}>
            <div className={styles.productWrapper}>
                
                <div className={styles.imageContainer}>
                    <img 
                        src={`/assets/${product.image}`} 
                        alt={product.name} 
                        className={styles.productImage} 
                    />
                </div>
                
                <div className={styles.details}>
                    <h1 className={styles.productName}>{product.name}</h1>
                    
                    <p className={styles.productDescription}>
                        Кількість квітів у букеті: {product.quantity}
                    </p>
                    
                    <p className={styles.price}>{product.price} грн.</p>
                    
                    <Button 
                        variant="primary" 
                        onClick={handleAddToCart}
                        className={styles.addButton}
                    >
                        Додати у кошик
                    </Button>
                </div>
            </div>

            {showNotification && (
                <div className={styles.footerNotification}>
                    <span>
                        ✅"{product.name}" успішно додано до кошика!
                    </span>
                    <Link to="/cart" className={styles.viewCartButton}>
                        Перейти до кошика
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ProductPage;