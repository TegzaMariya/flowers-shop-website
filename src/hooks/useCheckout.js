import { useState } from 'react';
import { db } from '../../config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const useCheckout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const checkout = async ({ name, phone, delivery, payment, address, items, total, userId = null }) => {
        setLoading(true);
        setError(null);

        const orderData = {
            name, 
            phone, 
            delivery, 
            payment, 
            address, 
            items, 
            total,
            userId: userId, 
            createdAt: serverTimestamp(),
            status: 'pending',
        };

        try {
            const docRef = await addDoc(collection(db, "orders"), orderData);

            console.log('✅ Замовлення успішно створене у Firestore з ID:', docRef.id);

            setLoading(false);
            return true;
        } catch (err) {
            console.error('Помилка при збереженні замовлення у Firestore:', err);
            setError('Помилка при оформленні замовлення. Спробуйте пізніше.');
            setLoading(false);
            return false;
        }
    };

    return { checkout, loading, error };
};