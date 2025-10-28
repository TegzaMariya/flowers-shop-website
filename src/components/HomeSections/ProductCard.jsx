import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import styles from './ProductCard.module.css';
import { useCart } from '../../contexts/CartContext'; 

const ProductCard = ({ product }) => { 
    
    const { addToCart } = useCart(); 

    const hasPrice = product.price && product.quantity; 
    
    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
        console.log(`Товар ${product.name} додано до кошика!`);
    };

    if (!product) return null; 

    return (
        <div className={styles.card}>

            <Link to={`/product/${product.id}`} className={styles.productLink}>
                <div className={styles.imageWrapper}> 
                <img
                    src={`/assets/${product.image}`} 
                    alt={product.name} 
                    className={styles.image} 
                />
                </div>

                <div className={styles.info}></div>
                
                <div className={styles.info}>
                    <h3 className={styles.name}>{product.name}</h3>
                    
                    {hasPrice ? (
                        <>
                            <p className={styles.price}>{product.price} грн.</p>
                            <p className={styles.quantity}>{product.quantity}</p>
                        </>
                    ) : (
                        <p className={styles.label}>Переглянути деталі</p>
                    )}
                </div>
            </Link>

            {hasPrice && (
                <div className={styles.buttonWrapper}>
                    <Button 
                        onClick={handleAddToCart} 
                        variant="primary" 
                    >
                        Додати у кошик
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProductCard;