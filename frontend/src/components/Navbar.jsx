import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-[#6D4C41] hover:opacity-90 transition-opacity">
          <Leaf className="text-[#26A69A]" size={28} strokeWidth={2.5} />
          <span>KissanConnect</span>
        </Link>
        
        <div className="hidden md:flex gap-8 font-semibold text-sm text-[#6D4C41]/70 tracking-wide">
          <Link to="/" className="hover:text-[#6D4C41] transition-colors py-1">Home</Link>
          <Link to="/products" className="hover:text-[#6D4C41] transition-colors py-1">Marketplace</Link>
        </div>

        <Link to="/login">
          <button className="bg-[#FF7043] hover:bg-[#F4511E] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-lg active:translate-y-[1px] transition-all">
            Join Us
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
