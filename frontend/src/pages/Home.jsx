import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryBar from '../components/CategoryBar';
import { productApi } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Farmer Illustration Component
const FarmerIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    {/* Soft blur shapes in background */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-5 w-40 h-40 bg-green-300 rounded-full blur-3xl"></div>
    </div>
    
    {/* Premium drop shadow wrapper for illustration */}
    <div className="relative z-10 drop-shadow-2xl">
      {/* Main illustration SVG with smooth scaling */}
      <svg viewBox="0 0 200 300" className="w-full max-w-sm animate-float filter drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Farmer body - shirt */}
      <ellipse cx="100" cy="120" rx="35" ry="45" fill="#22C55E" />
      
      {/* Farmer head */}
      <circle cx="100" cy="50" r="28" fill="#F4A46B" />
      
      {/* Farmer hat */}
      <path d="M 70 35 Q 70 20 100 18 Q 130 20 130 35 L 128 40 Q 100 38 72 40 Z" fill="#92400E" />
      <path d="M 68 40 L 132 40 Q 130 55 100 58 Q 70 55 68 40 Z" fill="#B45309" />
      
      {/* Face - happy expression */}
      <circle cx="90" cy="48" r="4" fill="#000" />
      <circle cx="110" cy="48" r="4" fill="#000" />
      <path d="M 90 58 Q 100 62 110 58" stroke="#000" strokeWidth="2" strokeLinecap="round" />
      
      {/* Arms with vegetables */}
      {/* Left arm */}
      <line x1="65" y1="110" x2="35" y2="95" stroke="#F4A46B" strokeWidth="8" strokeLinecap="round" />
      
      {/* Right arm */}
      <line x1="135" y1="110" x2="165" y2="95" stroke="#F4A46B" strokeWidth="8" strokeLinecap="round" />
      
      {/* Vegetables in left hand - carrots */}
      <g transform="translate(25, 85)">
        <path d="M 0 0 L -5 10 L 3 8 Z" fill="#EA580C" />
        <rect x="-5" y="8" width="8" height="15" fill="#EA580C" rx="2" />
        <line x1="-3" y1="8" x2="-5" y2="2" stroke="#16A34A" strokeWidth="1.5" />
        <line x1="1" y1="8" x2="3" y2="1" stroke="#16A34A" strokeWidth="1.5" />
      </g>
      
      {/* Vegetables in right hand - tomatoes */}
      <g transform="translate(175, 85)">
        <circle cx="0" cy="0" r="6" fill="#DC2626" />
        <circle cx="8" cy="3" r="5" fill="#EF4444" />
        <path d="M 2 -6 Q 4 -10 2 -12" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      
      {/* Pants */}
      <rect x="80" y="160" width="15" height="35" fill="#3B82F6" rx="3" />
      <rect x="105" y="160" width="15" height="35" fill="#3B82F6" rx="3" />
      
      {/* Shoes */}
      <ellipse cx="87" cy="200" rx="8" ry="6" fill="#1F2937" />
      <ellipse cx="113" cy="200" rx="8" ry="6" fill="#1F2937" />
      
      {/* Decorative plants/leaves */}
      <g transform="translate(20, 220)" opacity="0.8">
        <ellipse cx="0" cy="0" rx="8" ry="4" fill="#16A34A" />
        <ellipse cx="5" cy="-3" rx="7" ry="3" fill="#22C55E" />
        <ellipse cx="-5" cy="-3" rx="7" ry="3" fill="#22C55E" />
      </g>
      
      <g transform="translate(180, 240)" opacity="0.8">
        <ellipse cx="0" cy="0" rx="10" ry="5" fill="#16A34A" />
        <ellipse cx="7" cy="-4" rx="8" ry="4" fill="#22C55E" />
        <ellipse cx="-7" cy="-4" rx="8" ry="4" fill="#22C55E" />
      </g>
    </svg>    </div>  </div>
);

// Add floating animation to styles
const floatingStyle = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeInUp {
    animation: fadeInUp 0.8s ease-out forwards;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessError, setAccessError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch products from backend
        const response = await productApi.getProducts();
        // Limit to first 4 products for featured section
        const products = Array.isArray(response.data) ? response.data : [];
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        if (error.response?.status === 401) {
          setError('Please log in to view featured products');
        } else {
          console.error('Error fetching featured products:', error);
        }
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleFarmerDashboard = () => {
    setAccessError(null);
    
    if (!isAuthenticated) {
      // Not logged in - redirect to login
      navigate('/login');
      return;
    }

    if (user?.role === 'farmer') {
      // Farmer - navigate to farmer dashboard
      navigate('/farmer-dashboard');
    } else {
      // Customer - show error message
      setAccessError('Only farmers can access this. Please log in as a farmer.');
      setTimeout(() => setAccessError(null), 5000); // Auto-dismiss after 5 seconds
    }
  };

  const isFarmerButtonDisabled = isAuthenticated && user?.role !== 'farmer';
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    // Search functionality can be integrated with backend later
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 via-green-50 to-emerald-50 min-h-screen">
      {/* Add animation styles */}
      <style>{floatingStyle}</style>
      
      {/* Hero Section - Two Column Layout */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        {/* Premium background shapes with enhanced blur for depth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large ambient glow shapes */}
          <div className="absolute -top-60 -right-60 w-96 h-96 bg-gradient-to-br from-green-200/20 to-emerald-200/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-60 w-96 h-96 bg-gradient-to-tr from-green-100/15 to-emerald-100/5 rounded-full blur-3xl"></div>
          
          {/* Floating blob elements with low opacity */}
          <div className="absolute top-20 right-1/3 w-64 h-64 bg-emerald-300/15 rounded-full blur-3xl" style={{animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-green-300/10 rounded-full blur-3xl" style={{animation: 'float 6s ease-in-out infinite'}}></div>
          
          {/* Targeted glow elements behind farmer image */}
          <div className="hidden md:block absolute right-1/4 top-1/3 w-80 h-80 bg-gradient-to-br from-emerald-200/15 to-green-200/10 rounded-full blur-3xl"></div>
          <div className="hidden md:block absolute right-1/3 top-1/2 w-72 h-72 bg-gradient-to-tl from-green-200/12 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* LEFT SIDE - Glass Card Wrapper */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 lg:p-10 shadow-xl border border-white/30 animate-fadeInUp">
              {/* Content inside glass card */}
              <div className="space-y-8 md:space-y-10">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-green-950 leading-tight">
                    Connecting Farmers<br />
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Directly with Customers</span>
                  </h1>
                  <p className="text-lg md:text-xl text-green-900/70 leading-relaxed max-w-lg font-light">
                    Buy fresh, local produce directly from trusted farmers near you. Quality you can trust, prices you'll love.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md group">
                  <input
                    type="text"
                    placeholder="Search fresh vegetables, fruits..."
                    value={searchInput}
                    onChange={handleSearch}
                    className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-green-200 text-gray-800 font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-lg group-hover:shadow-xl transition-all duration-300"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                    🔍
                  </button>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 pt-6">
                  <Link 
                    to="/marketplace" 
                    className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Explore Products →
                  </Link>
                  
                  <button
                    onClick={handleFarmerDashboard}
                    disabled={isFarmerButtonDisabled}
                    className={`inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-lg shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      isFarmerButtonDisabled
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-60'
                        : 'bg-white border-2 border-green-500 text-green-700 hover:bg-green-50 hover:shadow-lg hover:border-green-600'
                    }`}
                    title={isFarmerButtonDisabled ? 'Only for farmers' : ''}
                  >
                    Farmer Dashboard →
                  </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 pt-8">
                  <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-md border border-green-100/50 hover:shadow-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                    <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">1000+</div>
                    <div className="text-sm font-semibold text-green-900/70 mt-2">Fresh Products</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-md border border-green-100/50 hover:shadow-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                    <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">500+</div>
                    <div className="text-sm font-semibold text-green-900/70 mt-2">Trusted Farmers</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-md border border-green-100/50 hover:shadow-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                    <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">⭐ 4.8</div>
                    <div className="text-sm font-semibold text-green-900/70 mt-2">Avg Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Farmer Illustration with Enhanced Depth */}
            <div className="hidden md:flex items-center justify-center h-96 lg:h-[500px] relative">
              {/* Multiple glow layers behind image for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/40 to-emerald-100/20 rounded-3xl blur-2xl"></div>
              <div className="absolute -inset-8 bg-gradient-to-tl from-emerald-200/20 to-green-100/10 rounded-full blur-3xl"></div>
              <div className="absolute -inset-12 bg-gradient-to-br from-green-200/15 to-transparent rounded-full blur-3xl" style={{animation: 'float 8s ease-in-out infinite'}}></div>
              
              {/* Premium glass card for illustration with strong shadow */}
              <div className="relative z-20 w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/40 backdrop-blur-md drop-shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-8">
                  <FarmerIllustration />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Error Message */}
      {accessError && (
        <section className="container mx-auto px-4 sm:px-6 mb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800 font-semibold">{accessError}</p>
          </div>
        </section>
      )}

      {/* Categories - Premium soft background */}
      <section className="bg-gradient-to-r from-emerald-50/60 to-green-50/60 py-12 border-t border-green-200/30">
        <div className="container mx-auto px-4 sm:px-6">
          <CategoryBar />
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gradient-to-b from-white via-emerald-50/30 to-white py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-green-950 mb-3">
                Top Picked For You
              </h2>
              <p className="text-lg text-green-900/60 font-light">
                Fresh produce selected from our partner farms this morning.
              </p>
            </div>
            <Link
              to="/marketplace"
              className="hidden sm:inline-block text-green-700 font-bold hover:text-green-900 hover:underline px-4 py-2 rounded-xl transition-all duration-300"
            >
              View All →
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 font-semibold">{error}</p>
              <Link to="/login" className="text-red-600 font-semibold hover:underline mt-2 inline-block">
                Go to Login →
              </Link>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
              ))}
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">🌾</span>
            <p className="text-gray-700 text-lg font-semibold">No products available yet.</p>
            <p className="text-gray-500 text-base mt-2">Check back soon for fresh produce from our farmers!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}
        </div>
      </section>

      {/* Trust Banner - Premium Premium Design */}
      <section className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 py-20 relative overflow-hidden">
        {/* Background blur shapes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-40 right-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center text-white group cursor-pointer">
              <div className="text-5xl md:text-6xl font-black mb-3 transform group-hover:scale-110 transition-transform duration-300">🚜</div>
              <h4 className="font-black text-3xl md:text-4xl mb-2">500+</h4>
              <p className="text-green-100/90 font-light">Local Farmers</p>
            </div>
            <div className="text-center text-white group cursor-pointer">
              <div className="text-5xl md:text-6xl font-black mb-3 transform group-hover:scale-110 transition-transform duration-300">📦</div>
              <h4 className="font-black text-3xl md:text-4xl mb-2">10K+</h4>
              <p className="text-green-100/90 font-light">Orders Delivered</p>
            </div>
            <div className="text-center text-white group cursor-pointer">
              <div className="text-5xl md:text-6xl font-black mb-3 transform group-hover:scale-110 transition-transform duration-300">🌿</div>
              <h4 className="font-black text-3xl md:text-4xl mb-2">100%</h4>
              <p className="text-green-100/90 font-light">Organic Verified</p>
            </div>
            <div className="text-center text-white group cursor-pointer">
              <div className="text-5xl md:text-6xl font-black mb-3 transform group-hover:scale-110 transition-transform duration-300">⭐</div>
              <h4 className="font-black text-3xl md:text-4xl mb-2">4.8★</h4>
              <p className="text-green-100/90 font-light">User Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
