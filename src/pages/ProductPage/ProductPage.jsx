import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import Button from '../../components/UI/Button';
import styles from './ProductPage.module.css';
import { PRODUCTS } from '../../utils/constants';
import { useCart } from '../../contexts/CartContext'; 

const ProductPage = () => {
    const { id } = useParams(); 

    const [currentProduct, setCurrentProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const [quantity, setQuantity] = useState(1); 
    const [showNotification, setShowNotification] = useState(false);
    
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {  
                await new Promise(resolve => setTimeout(resolve, 500));

                const fetchedProduct = PRODUCTS.find(p => p.id === parseInt(id)); 

                if (fetchedProduct) {
                    setCurrentProduct(fetchedProduct);
                } else {
                }
            } catch (error) {
                console.error("Помилка завантаження продукту:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (isLoading) {
        return <h1 className={styles.loading}>Завантаження продукту...</h1>;
    }

    if (!currentProduct) {
        return <h1 className={styles.error}>Продукт не знайдено.</h1>;
    }

    const product = currentProduct;

    const handleAddToCart = () => {
        addToCart({ ...product, count: quantity });
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

                    <div className={styles.quantityWrapper}>
                        <label htmlFor="quantity">Кількість:</label>
                        <input 
                            type="number" 
                            id="quantity" 
                            min="1" 
                            value={quantity} 
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className={styles.quantityInput}
                        />
                    </div>
                    
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
                        ✅ "{product.name}" успішно додано до кошика!
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