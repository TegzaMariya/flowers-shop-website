import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config';
import { useAuthApi } from '../hooks/useAuthAPI'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  if (typeof window !== "undefined" && window.authMock) {
    return (
      <AuthContext.Provider value={window.authMock}>
        {children}
      </AuthContext.Provider>
    );
  }

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { login: loginApi, register: registerApi } = useAuthApi();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
        });
        setIsAuth(true);
      } else {
        setUser(null);
        setIsAuth(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const result = await loginApi(email, password); 
    if (result) {
      setUser({ uid: result.uid, email: result.email, name: result.name });
      setIsAuth(true);
    }
    return result !== null; 
  };

  const register = async (email, password, name) => {
    const result = await registerApi(email, password, name);
    if (result) {
      setUser({ uid: result.uid, email: result.email, name: result.name });
      setIsAuth(true);
    }
    return result !== null; 
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      console.error("Помилка при виході з Firebase:", error);
    }
  };

  if (loading) {
    return <div>Завантаження...</div>; 
  }

  return (
    <AuthContext.Provider value={{ isAuth, user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  if (typeof window !== "undefined" && window.authMock) {
    return window.authMock;
  }

  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth повинен використовуватися всередині AuthProvider');
    
  return context;
};
