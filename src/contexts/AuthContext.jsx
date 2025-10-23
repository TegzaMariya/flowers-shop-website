import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null); 

    const login = (email, password) => {
        if (email && password) {
            setIsAuth(true);
            setUser({ email: email, name: email.split('@')[0] || 'Користувач' });
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuth(false);
        setUser(null);
    };

    const value = {
        isAuth,
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth повинен використовуватися в межах AuthProvider');
    }
    return context;
};