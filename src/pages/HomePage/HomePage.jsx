import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import { PRODUCTS, FLOWER_TYPES, CATEGORIES } from '../../utils/constants'; 
import ProductCard from '../../components/HomeSections/ProductCard';
import CategoryCard from '../../components/HomeSections/CategoryCard';

const PRICE_RANGES = [
    { key: 'low', label: 'До 5000 грн.', min: 0, max: 5000 },
    { key: 'medium', label: '5000 - 10000 грн.', min: 5000, max: 10000 },
    { key: 'high', label: 'Понад 10000 грн.', min: 10000, max: Infinity },
];

const HomePage = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [flowerTypes, setFlowerTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState(null);

    const [showNotification, setShowNotification] = useState(false);
    const [addedProductName, setAddedProductName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 500));

                setAllProducts(PRODUCTS || []);
                setCategories(CATEGORIES || []);
                setFlowerTypes(FLOWER_TYPES || []);

            } catch (error) {
                console.error("Помилка завантаження даних:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); 

    const handleProductAdded = useCallback((productName) => {
        const cartElement = document.getElementById('main-cart-icon'); 
        if (cartElement) {
            cartElement.classList.add(styles.cartAnimation);
            setTimeout(() => {
                cartElement.classList.remove(styles.cartAnimation);
            }, 800); 
        }

        setAddedProductName(productName);
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
            setAddedProductName('');
        }, 5000); 
    }, []);

    const filteredProducts = useMemo(() => {
        const products = allProducts;
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
                    product.price >= selectedRange.min && 
                    product.price < selectedRange.max
                );
            }
        }

        return result;
    }, [searchTerm, priceRange, allProducts]);

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
                            <ProductCard 
                                key={item.id} 
                                product={item} 
                                onProductAdded={handleProductAdded}
                            />
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

            {isLoading ? (
                <div className={styles.section} style={{ textAlign: 'center' }}>
                    <p className={styles.noResults}>Завантаження даних...</p>
                </div>
            ) : filteredProducts.length > 0 ? (
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

            {renderProductsSection("Квіти на будь-який випадок", categories)}
            {renderProductsSection("Додаткові пропозиції", flowerTypes)}

            {showNotification && (
                <div className={styles.footerNotification}>
                    <span>
                        ✅ "{addedProductName}" успішно додано до кошика!
                    </span>
                    <Link to="/cart" className={styles.viewCartButton}>
                        Перейти до кошика
                    </Link>
                </div>
            )}
        </div>
    );
};

export default HomePage;