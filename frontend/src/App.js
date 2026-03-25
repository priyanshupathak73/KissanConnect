import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';

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
          </Routes>
        </main>
        <footer className="bg-secondary text-white text-center py-6 shadow-inner mt-10">
          <p className="font-bold opacity-80">© 2026 KissanConnect. Connecting Farmers & Buyers.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
