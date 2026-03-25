import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Products = () => {
  const [products] = useState([
    { id: 1, name: 'Organic Apples', price: 120, farmer: 'Ram Singh', description: 'Handpicked sweet apples from Shimla.', icon: '🍎', available: true },
    { id: 2, name: 'Basmati Rice', price: 80, farmer: 'Suresh Kumar', description: 'A-grade long grain aromatic rice.', icon: '🍚', available: true },
    { id: 3, name: 'Farm Tomatoes', price: 40, farmer: 'Ramesh Farm', description: 'Locally grown red juicy tomatoes.', icon: '🍅', available: true },
    { id: 4, name: 'Fresh Broccoli', price: 90, farmer: 'Green Valley', description: 'Crunchy and rich in nutrients.', icon: '🥦', available: true },
    { id: 5, name: 'Yellow Corn', price: 30, farmer: 'Desi Farms', description: 'Sweet and perfect for roasting.', icon: '🌽', available: true },
    { id: 6, name: 'Watermelon', price: 50, farmer: 'Ram Singh', description: 'Refreshing summer delight.', icon: '🍉', available: true }
  ]);

  return (
    <div className="bg-primary min-h-screen py-10">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary drop-shadow-sm">The Marketplace</h2>
          <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
             className="hidden md:block bg-secondary text-white px-6 py-3 rounded-xl font-bold shadow-[0px_6px_0px_#4E342E] hover:shadow-[0px_4px_0px_#4E342E] hover:translate-y-[2px] transition-all"
          >
            Sell Your Produce
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
