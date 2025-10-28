import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css'; 

const CategoryCard = ({ item }) => {
    if (!item) return null;

    return (
        <div className={styles.card}>
            <div className={styles.productLink}>

                <div className={styles.imageWrapper}> 
                    <img 
                        src={`/assets/${item.image}`} 
                        alt={item.name} 
                        className={styles.image}
                    />
                </div>
                
                <div className={styles.info}>
                    <h3 className={styles.name}>{item.name}</h3>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;