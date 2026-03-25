import React from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const featuredProducts = [
    { id: 1, name: 'Fresh Apples', price: 120, description: 'Direct from Shimla orchards.', icon: '🍎' },
    { id: 2, name: 'Juicy Carrots', price: 40, description: 'Rich in Vitamin A, harvested yesterday.', icon: '🥕' },
    { id: 3, name: 'Organic Lemons', price: 60, description: 'Pesticide-free farm fresh.', icon: '🍋' }
  ];

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
           <h2 className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 drop-shadow-sm">Top Picked For You</h2>
           <p className="text-xl text-secondary/70 max-w-2xl mx-auto">Discover the freshest produce selected right from our partner farms this morning.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
