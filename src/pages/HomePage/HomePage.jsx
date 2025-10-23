import React, { useState, useMemo } from 'react'; 
import styles from './HomePage.module.css';
import { PRODUCTS, FLOWER_TYPES, CATEGORIES } from '../../utils/constants'; 
import ProductCard from '../../components/HomeSections/ProductCard';
import CategoryCard from '../../components/HomeSections/CategoryCard'; 

const ALL_DISPLAY_PRODUCTS = PRODUCTS || []; 

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = useMemo(() => {
        const products = ALL_DISPLAY_PRODUCTS || [];

        if (!products.length || !searchTerm) { 
            return products;
        }
        
        const lowerCaseSearch = searchTerm.toLowerCase();
        
        return products.filter(product =>
            product && product.name && product.name.toLowerCase().includes(lowerCaseSearch)
        );
    }, [searchTerm]); 

    const renderProductsSection = (title, items) => {
        const itemsArray = Array.isArray(items) ? items : [];

        if (itemsArray.length === 0) {
            return null;
        }
        
        return (
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{title}</h2>
                <div className={styles.horizontalGrid}> 
                    {itemsArray.map(item => {
                        if (!item || item.id === undefined) return null; 

                        return item.price !== undefined ? (
                            <ProductCard key={item.id} product={item} /> 
                        ) : (
                            <CategoryCard key={item.id} item={item} /> 
                        );
                    })}
                </div>
            </section>
        );
    };

    return (
        <div>
            {/* Hero Section */}
            <div 
                className={styles.heroSection}
            >
                <h1 className={styles.heroTitle}>Flowers shop: Зробіть день особливим.</h1>
                <p className={styles.heroText}>
                    Замовляйте найкращі букети онлайн з доставкою по місту.
                </p>
            </div>
            
            <section className={styles.searchSection}>
                <input
                    type="text"
                    placeholder="Шукати букети за назвою..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    id="search"
        name="search"
                />
            </section>

            {filteredProducts.length > 0 ? (
                renderProductsSection("Наші букети", filteredProducts) 
            ) : (
                <div className={styles.section} style={{ textAlign: 'center' }}>
                    <p className={styles.noResults}>
                        За запитом "{searchTerm}" нічого не знайдено.
                    </p>
                </div>
            )}
            
            {/* СЕКЦІЯ КАТЕГОРІЙ */}
            {/* Перевіряємо, що CATEGORIES є, інакше передаємо порожній масив */}
            {renderProductsSection("Типи квітів", CATEGORIES || [])}
            
            {/* СЕКЦІЯ ТИПІВ КВІТІВ */}
            {/* Перевіряємо, що FLOWER_TYPES є, інакше передаємо порожній масив */}
            {renderProductsSection("Додаткові пропозиції", FLOWER_TYPES || [])}
        </div>
    );
};

export default HomePage;