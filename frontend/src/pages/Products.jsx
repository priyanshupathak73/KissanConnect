import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryBar from '../components/CategoryBar';
import { productService } from '../services/api';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeCategory = searchParams.get('category') || null;
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (activeCategory) params.category = activeCategory;
        if (searchQuery) params.search = searchQuery;
        
        const data = await productService.getAll(params);
        setProducts(Array.isArray(data) ? data : (data?.products || []));
      } catch (error) {
        if (error.response?.status === 401) {
          setError('Please log in to view products');
        } else {
          setError('Failed to load products');
        }
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, searchQuery]);

  const filteredProducts = useMemo(() => {
    // API already filters by category and search, so just return products
    return products;
  }, [products]);

  const handleCategoryChange = (category) => {
    if (activeCategory === category) {
      // Clear category but keep search
      const newParams = {};
      if (searchQuery) newParams.search = searchQuery;
      setSearchParams(newParams);
      return;
    }

    // Set category and keep search if exists
    const newParams = { category };
    if (searchQuery) newParams.search = searchQuery;
    setSearchParams(newParams);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchParams(activeCategory 
      ? { category: activeCategory, search: value }
      : { search: value }
    );
  };

  const clearSearch = () => {
    setSearchParams(activeCategory ? { category: activeCategory } : {});
  };

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-950">
              The Marketplace
            </h2>
            <p className="text-green-900/60 mt-1">
              Showing {filteredProducts.length} of {products.length} items
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-auto flex items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full sm:w-64 px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-700/50 hover:text-green-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Bar */}
        <CategoryBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}

        {loading && (
          <p className="text-green-900/60 mb-4">Loading fresh produce...</p>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="text-green-900/60 text-lg">No products found in this category.</p>
            <button
              onClick={() => setSearchParams({})}
              className="mt-4 text-green-700 font-semibold hover:underline"
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
