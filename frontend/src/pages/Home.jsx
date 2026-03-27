import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryBar from '../components/CategoryBar';

const featuredProducts = [
  { id: 1, name: 'Tomato', price: 40, oldPrice: 65, category: 'Vegetables', description: 'Locally grown red juicy tomatoes.', icon: '🍅', image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=400&h=400&fit=crop' },
  { id: 2, name: 'Broccoli', price: 90, oldPrice: 120, category: 'Vegetables', description: 'Crunchy and rich in nutrients.', icon: '🥦', image: 'https://images.unsplash.com/photo-1564874998499-1f3c14e9e8b6?w=400&h=400&fit=crop' },
  { id: 3, name: 'Carrot', price: 45, oldPrice: 65, category: 'Vegetables', description: 'Rich in Vitamin A, harvested fresh.', icon: '🥕', image: 'https://images.unsplash.com/photo-1632918364721-2fb4a81e0879?w=400&h=400&fit=crop' },
  { id: 4, name: 'Capsicum', price: 60, oldPrice: 85, category: 'Vegetables', description: 'Fresh organic yellow capsicum.', icon: '🫑', image: 'https://images.unsplash.com/photo-1738932372075-ef0eda76d262?w=400&h=400&fit=crop' },
];

const Home = () => {
  return (
    <div className="bg-[#F5E6D3]">
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <span className="text-6xl mb-4 block">🌾</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#6D4C41] mb-4 leading-tight">
            Fresh From Farm<br />
            <span className="text-[#26A69A]">Straight To You</span>
          </h1>
          <p className="text-lg text-[#6D4C41]/60 mb-8 max-w-xl mx-auto">
            Discover the freshest organic produce directly from local farmers. 
            Quality you can trust, prices you'll love.
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-[#FF7043] hover:bg-[#F4511E] text-white px-8 py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Explore Marketplace →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 sm:px-6 py-8">
        <CategoryBar />
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 sm:px-6 pb-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#6D4C41]">
              Top Picked For You
            </h2>
            <p className="text-[#6D4C41]/50 mt-1 text-sm">
              Fresh produce selected from our partner farms this morning.
            </p>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline-block text-[#FF7043] font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-[#6D4C41] py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          <div>
            <span className="text-3xl block mb-2">🚜</span>
            <h4 className="font-bold text-lg">500+</h4>
            <p className="text-white/60 text-sm">Local Farmers</p>
          </div>
          <div>
            <span className="text-3xl block mb-2">📦</span>
            <h4 className="font-bold text-lg">10,000+</h4>
            <p className="text-white/60 text-sm">Orders Delivered</p>
          </div>
          <div>
            <span className="text-3xl block mb-2">🌿</span>
            <h4 className="font-bold text-lg">100%</h4>
            <p className="text-white/60 text-sm">Organic Verified</p>
          </div>
          <div>
            <span className="text-3xl block mb-2">⭐</span>
            <h4 className="font-bold text-lg">4.8★</h4>
            <p className="text-white/60 text-sm">User Rating</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
