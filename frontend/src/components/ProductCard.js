import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const handleBuy = async () => {
    const buyerName = window.prompt("Enter your Name to place the order:");
    if (!buyerName) return;
    
    const buyerPhone = window.prompt("Enter your Phone Number:");
    if (!buyerPhone) return;

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id, buyerName, buyerPhone })
      });
      if (res.ok) {
        alert('Order placed successfully! The farmer will contact you soon.');
      } else {
        alert('Failed to place order.');
      }
    } catch (err) {
      alert('Error connecting to server.');
    }
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05, rotateY: 8, rotateX: -5, z: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl p-5 shadow-lg border-2 border-transparent hover:border-highlight hover:shadow-2xl cursor-pointer"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <div 
        className="h-48 bg-primary/40 rounded-xl flex items-center justify-center mb-4 shadow-inner"
        style={{ transform: "translateZ(30px)" }}
      >
        <span className="text-8xl flex" style={{ filter: 'drop-shadow(0px 10px 8px rgba(0,0,0,0.2))' }}>
          {product.icon || '🥦'}
        </span>
      </div>
      
      <div style={{ transform: "translateZ(40px)" }}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-secondary">{product.name}</h3>
          <span className="bg-highlight text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
            Fresh
          </span>
        </div>
        
        <p className="text-secondary/70 text-sm mb-5 min-h-[40px]">{product.description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-3xl font-black text-secondary">₹{product.price}<span className="text-sm font-medium opacity-60">/kg</span></span>
          <motion.button 
            onClick={handleBuy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
            className="bg-accent hover:bg-[#F4511E] text-white px-5 py-2.5 rounded-lg font-bold shadow-[0px_4px_0px_#D84315] hover:shadow-[0px_2px_0px_#D84315] hover:translate-y-[2px] transition-all"
          >
            Buy 🛒
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
