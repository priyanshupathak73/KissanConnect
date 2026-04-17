import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderApi } from '../services/api';

const CART_FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="%23FFF8F0"/><circle cx="32" cy="26" r="10" fill="%23E7D8C7"/><rect x="16" y="44" width="32" height="6" rx="3" fill="%23D9C5B0"/></svg>';

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  const [buyerName, setBuyerName] = useState(user?.name || '');
  const [buyerPhone, setBuyerPhone] = useState(user?.phone || '');
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || '');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState('');

  const checkoutItems = useMemo(
    () => items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
    [items]
  );

  const placeOrder = async () => {
    if (!items.length) return;

    setPlacingOrder(true);
    setError('');

    try {
      await orderApi.createOrder({
        userId: user._id,
        buyerName,
        buyerPhone,
        deliveryAddress,
        items: checkoutItems,
      });

      clearCart();
      navigate('/user-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!items.length) {
    return (
      <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-extrabold text-green-950 mb-2">Your cart is empty</h2>
          <p className="text-green-900/60 mb-5">Add fresh products from the marketplace.</p>
          <Link className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold" to="/marketplace">
            Browse Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-6xl grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-extrabold text-green-950 mb-5">Your Cart</h1>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="border border-gray-100 rounded-xl p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-green-50 overflow-hidden flex items-center justify-center">
                  {process.env.NODE_ENV === 'development' && item.image && console.log('KissanConnect cart item.image:', item.image)}
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = CART_FALLBACK_IMAGE;
                      }}
                    />
                  ) : (
                    <span>🥦</span>
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-bold text-green-950">{item.name}</p>
                  <p className="text-sm text-green-900/60">₹{item.price} /kg</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 bg-gray-100 rounded" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
                  <span className="w-8 text-center font-semibold text-green-950">{item.quantity}</span>
                  <button className="w-8 h-8 bg-gray-100 rounded" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                </div>
                <p className="font-bold text-green-950 w-20 text-right">₹{item.price * item.quantity}</p>
                <button className="text-red-500 text-sm font-semibold" onClick={() => removeFromCart(item.productId)}>Remove</button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-lg p-6 h-fit">
          <h2 className="text-xl font-extrabold text-green-950 mb-4">Checkout</h2>

          {error && <div className="bg-red-50 text-red-500 rounded-lg px-3 py-2 text-sm mb-3">{error}</div>}

          <div className="space-y-3">
            <input className="w-full border border-gray-200 rounded-xl px-4 py-2" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} placeholder="Your name" />
            <input className="w-full border border-gray-200 rounded-xl px-4 py-2" value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} placeholder="Phone number" />
            <textarea className="w-full border border-gray-200 rounded-xl px-4 py-2" rows="3" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Delivery address" />
          </div>

          <div className="mt-5 bg-green-50/60 rounded-xl p-4 flex items-center justify-between">
            <span className="font-semibold text-green-700/70">Total</span>
            <span className="text-2xl font-black text-green-950">₹{cartTotal}</span>
          </div>

          <button
            onClick={placeOrder}
            disabled={placingOrder}
            className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold shadow-md disabled:opacity-60"
          >
            {placingOrder ? 'Placing order...' : 'Place Order'}
          </button>
        </section>
      </div>
    </div>
  );
};

export default CartPage;
