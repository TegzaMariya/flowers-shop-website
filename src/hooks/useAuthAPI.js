import { auth } from '../../config';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    updateProfile 
} from 'firebase/auth';

export const useAuthApi = () => {
    if (typeof window !== "undefined" && window.firebaseMock) {
        return window.firebaseMock;
    }

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            return {
                email: user.email,
                uid: user.uid,
                name: user.displayName || user.email.split('@')[0],
            };
        } catch (error) {
            console.error('Помилка авторизації Firebase:', error.code, error.message);
            return null;
        }
    };

    const register = async (email, password, name = '') => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (name) {
                await updateProfile(user, { displayName: name });
            }

            console.log('Реєстрація Firebase успішна:', user);

            return { 
                email: user.email, 
                uid: user.uid,
                name: name || user.email.split('@')[0]
            };
        } catch (error) {
            console.error('Помилка при реєстрації Firebase:', error.code, error.message);
            return null;
        }
    };

    return { login, register };
};
