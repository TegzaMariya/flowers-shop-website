import { useState } from 'react';

export const useCheckout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const checkout = async ({ name, phone, delivery, payment, items, total }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, delivery, payment, items, total }),
            });

            if (!response.ok) throw new Error('Помилка при оформленні замовлення');

            const data = await response.json();
            console.log('✅ Фейкове замовлення створене:', data);

            setLoading(false);
            return true;
        } catch (err) {
            console.error(err);
            setError(err.message || 'Щось пішло не так');
            setLoading(false);
            return false;
        }
    };

    return { checkout, loading, error };
};