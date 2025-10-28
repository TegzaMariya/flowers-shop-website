import React from 'react';

import { CartProvider } from './contexts/CartContext'; 
import { AuthProvider } from './contexts/AuthContext';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import CartPage from './pages/CartPage/CartPage'; 
import ProductPage from './pages/ProductPage/ProductPage'; 

const Placeholder = ({ name }) => (
    <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1 style={{ color: '#A242B4' }}>{name}</h1>
        <p>Сторінка в розробці. Дякуємо за терпіння!</p>
    </div>
);

const App = () => {
  return (
    <AuthProvider> 
      <CartProvider> 
        <BrowserRouter> 
          
          <Header />

          <main style={{ minHeight: '80vh', padding: '20px 50px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/cart" element={<CartPage />} /> 
              <Route path="/product/:id" element={<ProductPage />} /> 

              <Route path="/services" element={<Placeholder name="Наші послуги" />} />
              <Route path="/team" element={<Placeholder name="Про нас" />} />
              
              <Route path="*" element={<h1>404 | Сторінка не знайдена</h1>} />
            </Routes>
          </main>
          
          <Footer />
          
        </BrowserRouter> 
      </CartProvider> 
    </AuthProvider>
  );
};

export default App;