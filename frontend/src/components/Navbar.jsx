import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-green-500/20">
      <div className="container mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-white hover:text-green-100 transition-colors">
          <Leaf className="text-green-300" size={28} strokeWidth={2.5} />
          <span>KissanConnect</span>
        </Link>
        
        <div className="hidden md:flex gap-8 font-semibold text-sm text-green-50 tracking-wide items-center">
          <Link to="/" className="hover:text-green-200 transition-colors py-1 px-2 rounded-md">Home</Link>
          <Link to="/marketplace" className="hover:text-green-200 transition-colors py-1 px-2 rounded-md">Marketplace</Link>
          {isAuthenticated && user?.role === 'user' && (
            <>
              <Link to="/cart" className="hover:text-green-200 transition-colors py-1 px-2 rounded-md">
                Cart ({cartCount})
              </Link>
              <Link to="/user-dashboard" className="hover:text-green-200 transition-colors py-1 px-2 rounded-md">Dashboard</Link>
            </>
          )}
          {isAuthenticated && user?.role === 'farmer' && (
            <Link to="/farmer-dashboard" className="hover:text-green-200 transition-colors py-1">Farmer Panel</Link>
          )}
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm font-semibold text-green-100">Hi, {user?.name?.split(' ')[0]}</span>
            <button
              onClick={logout}
              className="bg-green-900 hover:bg-green-950 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-lg active:translate-y-[1px] transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-green-400 hover:bg-green-300 text-green-900 px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-lg active:translate-y-[1px] transition-all">
              Join Us
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
