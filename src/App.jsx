import React from 'react';

import { CartProvider } from './contexts/CartContext'; 
import { AuthProvider } from './contexts/AuthContext'; 

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import HomePage from './pages/HomePage/HomePage';

const App = () => {
  return (
    <AuthProvider> 
      <CartProvider> 
          
          <Header />
          
          <main style={{ minHeight: '80vh', padding: '20px 50px' }}>

            <HomePage /> 
            
          </main>
          
          <Footer />

      </CartProvider> 
    </AuthProvider>
  );
};

export default App;