import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </main>
        <footer className="bg-[#6D4C41] text-white text-center py-6 shadow-inner">
          <p className="font-bold opacity-80">© 2026 KissanConnect. Connecting Farmers & Buyers.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
