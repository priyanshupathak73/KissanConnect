import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { productService } from '../services/api';
import { useCart } from '../context/CartContext';

const FALLBACK_IMAGE =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="480" viewBox="0 0 600 480"><rect width="600" height="480" fill="%23F0FDF4"/><circle cx="300" cy="190" r="72" fill="%23DCFCE7"/><rect x="180" y="320" width="240" height="20" rx="10" fill="%23BBF7D0"/></svg>';
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await productService.getById(id);
        setProduct(data);
      } catch (err) {
        setError('Unable to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="py-24 text-center text-green-950 font-semibold">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="py-24 text-center">
        <p className="text-green-900/70 mb-4">{error || 'Product not found.'}</p>
        <Link to="/marketplace" className="text-green-600 font-semibold hover:underline">Back to marketplace</Link>
      </div>
    );
  }

  if (process.env.NODE_ENV === 'development' && product?.image) {
    // Debug helper for checking backend image filename/path values.
    console.log('KissanConnect ProductDetails product.image:', product.image);
  }

  const imageSrc = product.image || null;

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="kc-btn-press text-green-900/70 hover:text-green-950 font-semibold mb-5 px-3 py-1 rounded-md"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
          <div className="bg-green-50 p-10 flex items-center justify-center">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={product.name}
                className="h-80 w-full object-contain mx-auto"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
            ) : (
              <span className="text-9xl">🥦</span>
            )}
          </div>

          <div className="p-8 md:p-10">
            <span className="inline-block bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              {product.category || 'Vegetables'}
            </span>
            <h1 className="text-3xl font-extrabold text-green-950">{product.name}</h1>
            <p className="text-green-900/60 mt-3 leading-relaxed">{product.description || 'Farm fresh produce from verified farmers.'}</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-black text-green-600">₹{product.price}</span>
              <span className="text-green-900/50 text-sm">/kg</span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                className="w-10 h-10 rounded-lg bg-gray-100 font-bold text-green-950"
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="w-10 text-center text-lg font-bold text-green-950">{qty}</span>
              <button
                className="w-10 h-10 rounded-lg bg-gray-100 font-bold text-green-950"
                onClick={() => setQty((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => addToCart(product, qty)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-md"
              >
                Add to Cart
              </button>
              <Link
                to="/cart"
                className="bg-green-950 hover:bg-black text-white px-6 py-3 rounded-xl font-bold shadow-md"
              >
                Go to Cart
              </Link>
            </div>

            {product.farmerId?.name && (
              <p className="mt-6 text-sm text-green-900/60">
                Sold by <span className="font-semibold text-green-950">{product.farmerId.name}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
