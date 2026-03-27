import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryBar from '../components/CategoryBar';

const allProducts = [
  { id: 1, name: 'Tomato', price: 40, oldPrice: 65, category: 'Vegetables', description: 'Locally grown red juicy tomatoes.', icon: '🍅', image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=400&h=400&fit=crop' },
  { id: 2, name: 'Capsicum', price: 60, oldPrice: 85, category: 'Vegetables', description: 'Fresh organic yellow capsicum.', icon: '🫑', image: 'https://images.unsplash.com/photo-1738932372075-ef0eda76d262?w=400&h=400&fit=crop' },
  { id: 3, name: 'Broccoli', price: 90, oldPrice: 120, category: 'Vegetables', description: 'Crunchy and rich in nutrients.', icon: '🥦', image: 'https://images.unsplash.com/photo-1564874998499-1f3c14e9e8b6?w=400&h=400&fit=crop' },
  { id: 4, name: 'Beans', price: 50, oldPrice: 70, category: 'Vegetables', description: 'Farm-fresh green beans.', icon: '🫘', image: 'https://images.unsplash.com/photo-1560252030-9fc63cb78dac?w=400&h=400&fit=crop' },
  { id: 5, name: 'Onion', price: 30, oldPrice: 55, category: 'Vegetables', description: 'Organic red onion, daily essential.', icon: '🧅', image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400&h=400&fit=crop' },
  { id: 6, name: 'Carrot', price: 45, oldPrice: 65, category: 'Vegetables', description: 'Rich in Vitamin A, harvested fresh.', icon: '🥕', image: 'https://images.unsplash.com/photo-1632918364721-2fb4a81e0879?w=400&h=400&fit=crop' },
  { id: 7, name: 'Cabbage', price: 35, oldPrice: 55, category: 'Vegetables', description: 'Green cabbage, crisp and fresh.', icon: '🥬', image: 'https://images.unsplash.com/photo-1693500384628-1f768680a421?w=400&h=400&fit=crop' },
  { id: 8, name: 'Sweet Potato', price: 55, oldPrice: 80, category: 'Vegetables', description: 'Naturally sweet and nutritious.', icon: '🍠', image: 'https://images.unsplash.com/photo-1771340224790-9a8cc4a9a24a?w=400&h=400&fit=crop' },
  { id: 9, name: 'Pumpkin', price: 40, oldPrice: 60, category: 'Vegetables', description: 'Perfect for soups and curries.', icon: '🎃', image: 'https://images.unsplash.com/photo-1692680919402-95fc56f99225?w=400&h=400&fit=crop' },
  { id: 10, name: 'Corn', price: 30, oldPrice: 50, category: 'Grains', description: 'Sweet and perfect for roasting.', icon: '🌽', image: 'https://images.unsplash.com/photo-1615485290161-7eb49a34eba5?w=400&h=400&fit=crop' },
  { id: 11, name: 'Radish', price: 25, oldPrice: 45, category: 'Vegetables', description: 'Crunchy radish with fresh leaves.', icon: '🥬', image: 'https://images.unsplash.com/photo-1587578855249-b6dbc62006d9?w=400&h=400&fit=crop' },
  { id: 12, name: 'Aubergine', price: 45, oldPrice: 65, category: 'Vegetables', description: 'Deep purple eggplant, farm fresh.', icon: '🍆', image: 'https://images.unsplash.com/photo-1590685006710-2b478c69b26b?w=400&h=400&fit=crop' },
  { id: 13, name: 'Beetroot', price: 50, oldPrice: 75, category: 'Vegetables', description: 'Rich in iron, dark red beetroot.', icon: '🫒', image: 'https://images.unsplash.com/photo-1591304332314-00dbc6de8357?w=400&h=400&fit=crop' },
  { id: 14, name: 'Cucumber', price: 30, oldPrice: 50, category: 'Vegetables', description: 'Cool and hydrating, farm fresh.', icon: '🥒', image: 'https://images.unsplash.com/photo-1587411768638-ec71f8e33b78?w=400&h=400&fit=crop' },
  { id: 15, name: 'Bitter Gourd', price: 35, oldPrice: 55, category: 'Vegetables', description: 'Organic karela, great for health.', icon: '🥒', image: 'https://images.unsplash.com/photo-1739903760931-bed27f3fe9b1?w=400&h=400&fit=crop' },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredProducts = activeCategory
    ? allProducts.filter((p) => p.category === activeCategory)
    : allProducts;

  const handleCategoryChange = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="bg-[#F5E6D3] min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#6D4C41]">
              The Marketplace
            </h2>
            <p className="text-[#6D4C41]/60 mt-1">
              Showing {filteredProducts.length} of {allProducts.length} items
            </p>
          </div>
        </div>

        {/* Category Bar */}
        <CategoryBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="text-[#6D4C41]/60 text-lg">No products found in this category.</p>
            <button
              onClick={() => setActiveCategory(null)}
              className="mt-4 text-[#FF7043] font-semibold hover:underline"
            >
              Show all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
