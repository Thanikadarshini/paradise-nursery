import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  // 'home' | 'plants' | 'cart'
  const [page, setPage] = useState('home');

  if (page === 'plants') {
    return (
      <ProductList
        onHome={() => setPage('home')}
        onPlants={() => setPage('plants')}
        onCart={() => setPage('cart')}
      />
    );
  }

  if (page === 'cart') {
    return (
      <CartItem
        onHome={() => setPage('home')}
        onPlants={() => setPage('plants')}
        onCart={() => setPage('cart')}
        onContinueShopping={() => setPage('plants')}
      />
    );
  }

  return (
    <div className="app-root">
      <div className="landing-page">
        <div className="landing-content">
          <h1>Paradise Nursery</h1>
          <p className="landing-tagline">
            Houseplants that are easy to grow and easy to love.
          </p>
          <button className="get-started-button" onClick={() => setPage('plants')}>
            Get Started
          </button>
        </div>
      </div>
      <AboutUs />
    </div>
  );
}

export default App;
