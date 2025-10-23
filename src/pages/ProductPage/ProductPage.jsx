import React from 'react';
import Button from '../../components/UI/Button';
import styles from './ProductPage.module.css';
import { PRODUCTS } from '../../utils/constants';

const ProductPage = () => {

    const product = PRODUCTS[0]; 
    
    if (!product) {
        return <h1>Немає доступних продуктів для відображення</h1>;
    }

    const handleAddToCart = () => {
        alert(`Товар "${product.name}" додано до кошика!`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.productWrapper}>
                
                {/* Зображення */}
                <div className={styles.imageContainer}>
                    <img 
                        src={`/assets/${product.image}`} 
                        alt={product.name} 
                        className={styles.productImage} 
                    />
                </div>
                
                {/* Деталі */}
                <div className={styles.details}>
                    <h1 className="title">Flowers shop</h1> 
                    
                    <h2 className={styles.productName}>{product.name}</h2>
                    
                    <p className={styles.productDescription}>
                        Опис: Гарні, пахучі, ніжні голандські троянди, {product.quantity}
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
        </div>
    );
};

export default ProductPage;