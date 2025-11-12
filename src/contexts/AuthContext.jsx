import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthApi } from '../hooks/useAuthAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const { login: loginApi, register: registerApi } = useAuthApi();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedAuth = localStorage.getItem('isAuth') === 'true';
    if (storedUser && storedAuth) {
      setUser(storedUser);
      setIsAuth(true);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    if (data) {
      setUser(data);
      setIsAuth(true);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('isAuth', 'true');
      return true;
    }
    return false;
  };

  const register = async (email, password, name) => {
    const data = await registerApi(email, password, name);
    if (data) {
      setUser(data);
      setIsAuth(true);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('isAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuth');
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth повинен використовуватися всередині AuthProvider');
  return context;
};