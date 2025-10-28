import React, { useState, useMemo } from 'react';
import styles from './HomePage.module.css';
import { PRODUCTS, FLOWER_TYPES, CATEGORIES } from '../../utils/constants';
import ProductCard from '../../components/HomeSections/ProductCard';
import CategoryCard from '../../components/HomeSections/CategoryCard';

const ALL_DISPLAY_PRODUCTS = PRODUCTS || [];

const PRICE_RANGES = [
    { key: 'low', label: 'До 5000 грн.', min: 0, max: 5000 },
    { key: 'medium', label: '5000 - 10000 грн.', min: 5000, max: 10000 },
    { key: 'high', label: 'Понад 10000 грн.', min: 10000, max: Infinity },
];

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState(null);

    const filteredProducts = useMemo(() => {
        const products = ALL_DISPLAY_PRODUCTS || [];

        let result = products;
        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            result = result.filter(product =>
                product && product.name && product.name.toLowerCase().includes(lowerCaseSearch)
            );
        }

        if (priceRange) {
            const selectedRange = PRICE_RANGES.find(r => r.key === priceRange);
            if (selectedRange) {
                result = result.filter(product =>
                    product.price >= selectedRange.min && product.price < selectedRange.max
                );
            }
        }

        return result;
    }, [searchTerm, priceRange]);

    const handlePriceChange = (key) => {
        setPriceRange(prevKey => (prevKey === key ? null : key));
    };

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
            <div
                className={styles.heroSection}
            >
                <h1 className={styles.heroTitle}>Flowers shop: Зробіть день особливим!</h1>
                <p className={styles.heroText}>
                    Замовляйте найкращі букети онлайн з доставкою по місту 💕
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

            <div className={styles.filterContainer}>
                <div className={styles.filterSection}>
                    <h3 className={styles.filterTitle}>Цінова категорія:</h3>
                    <div className={styles.filterButtons}>
                        {PRICE_RANGES.map(range => (
                            <button
                                key={range.key}
                                onClick={() => handlePriceChange(range.key)}
                                className={`${styles.priceButton} ${priceRange === range.key ? styles.activeFilter : ''}`}
                            >
                                {range.label}
                            </button>
                        ))}
                        {priceRange && (
                            <button
                                onClick={() => setPriceRange(null)}
                                className={styles.resetButton}
                                title="Скинути фільтр"
                            >
                                Скинути ❌
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                renderProductsSection("Наші букети", filteredProducts)
            ) : (
                <div className={styles.section} style={{ textAlign: 'center' }}>
                    <p className={styles.noResults}>
                        {searchTerm 
                            ? `За запитом "${searchTerm}" нічого не знайдено.`
                            : `Нічого не знайдено у вибраній категорії.`}
                    </p>
                </div>
            )}

            {renderProductsSection("Квіти на будь-який випадок", CATEGORIES || [])}
            {renderProductsSection("Додаткові пропозиції", FLOWER_TYPES || [])}
        </div>
    );
};

export default HomePage;