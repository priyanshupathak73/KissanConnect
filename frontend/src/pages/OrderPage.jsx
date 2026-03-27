import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  // If no product was passed, redirect
  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5E6D3] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <span className="text-6xl block mb-4">🛒</span>
          <h2 className="text-2xl font-bold text-[#6D4C41] mb-2">No Product Selected</h2>
          <p className="text-[#6D4C41]/60 mb-6">
            Please go back to the marketplace and select a product to buy.
          </p>
          <Link
            to="/products"
            className="inline-block bg-[#FF7043] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#F4511E] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = product.price * quantity;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product._id || product.id,
          buyerName,
          buyerPhone,
        }),
      });

      if (res.ok) {
        setOrderPlaced(true);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (err) {
      alert('Error connecting to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#F5E6D3] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <span className="text-6xl block mb-4">🎉</span>
          <h2 className="text-2xl font-bold text-[#26A69A] mb-2">Order Placed!</h2>
          <p className="text-[#6D4C41]/70 mb-2">
            Your order for <strong>{product.name}</strong> has been placed successfully.
          </p>
          <p className="text-[#6D4C41]/50 text-sm mb-6">
            The farmer will contact you soon at {buyerPhone}.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              to="/products"
              className="bg-[#FF7043] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#F4511E] transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="bg-[#6D4C41] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5D3F37] transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get image source
  const imageSrc = product.image || `/images/${product.name?.toLowerCase().trim()}.png`;

  return (
    <div className="min-h-screen bg-[#F5E6D3] py-10 px-4">
      <div className="container mx-auto max-w-4xl">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#6D4C41]/70 hover:text-[#6D4C41] font-medium mb-6 transition-colors"
        >
          ← Back to Marketplace
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
          
          {/* Product Image Section */}
          <div className="md:w-1/2 bg-[#FFF8F0] flex items-center justify-center p-10">
            <img
              src={imageSrc}
              alt={product.name}
              className="max-h-64 max-w-full object-contain drop-shadow-lg"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <span className="text-9xl hidden items-center justify-center" style={{ filter: 'drop-shadow(0 8px 8px rgba(0,0,0,0.15))' }}>
              {product.icon || '🥦'}
            </span>
          </div>

          {/* Order Form Section */}
          <div className="md:w-1/2 p-8">
            {/* Fresh tag */}
            <span className="inline-block bg-[#26A69A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              Fresh
            </span>

            <h1 className="text-3xl font-extrabold text-[#6D4C41] mb-1">
              {product.name}
            </h1>

            <p className="text-[#6D4C41]/50 text-sm mb-4">
              {product.description || 'Farm-fresh produce delivered to your door.'}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-black text-[#FF7043]">₹{product.price}</span>
              <span className="text-sm text-[#6D4C41]/40">/kg</span>
              {product.oldPrice && (
                <span className="text-lg text-red-400 line-through">₹{product.oldPrice}</span>
              )}
            </div>

            {/* Order Form */}
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6D4C41]/70 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#6D4C41] outline-none focus:ring-2 focus:ring-[#26A69A]/50 focus:border-[#26A69A] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6D4C41]/70 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#6D4C41] outline-none focus:ring-2 focus:ring-[#26A69A]/50 focus:border-[#26A69A] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6D4C41]/70 uppercase tracking-wider mb-1.5">
                  Quantity (Kg)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 text-[#6D4C41] font-bold hover:bg-gray-200 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-xl font-bold text-[#6D4C41] w-8 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-gray-100 text-[#6D4C41] font-bold hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="bg-[#F5E6D3]/50 rounded-lg p-4 flex justify-between items-center">
                <span className="text-sm font-semibold text-[#6D4C41]/70">Total Amount</span>
                <span className="text-2xl font-black text-[#6D4C41]">₹{totalPrice}</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF7043] hover:bg-[#F4511E] text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl active:translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : '🛒 Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
