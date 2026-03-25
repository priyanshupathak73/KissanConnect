import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="bg-secondary text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 text-3xl font-extrabold tracking-tight hover:opacity-90 transition-opacity">
          <motion.div 
             animate={{ rotate: [0, -10, 10, 0] }} 
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Leaf className="text-highlight" size={32} strokeWidth={2.5} />
          </motion.div>
          <span>KissanConnect</span>
        </Link>
        
        <div className="hidden md:flex gap-10 font-semibold text-lg tracking-wide">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <Link to="/products" className="hover:text-accent transition-colors">Marketplace</Link>
        </div>

        <div>
           <Link to="/login">
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
              className="bg-accent text-white px-6 py-2.5 rounded-xl font-bold shadow-[0px_4px_0px_#D84315] hover:shadow-[0px_2px_0px_#D84315] hover:translate-y-[2px] transition-all"
            >
              Join Us
            </motion.button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
