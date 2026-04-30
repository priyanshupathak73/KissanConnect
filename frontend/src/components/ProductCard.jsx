import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Maps product names (lowercase) to image filenames in /images/
const IMAGE_MAP = {
  tomato: 'tomato.png',
  capsicum: 'capsicum.png',
  broccoli: 'broccoli.png',
  beans: 'beans.png',
  onion: 'onion.png',
  carrot: 'carrot.png',
  cabbage: 'cabbage.png',
  'sweet potato': 'sweetpotato.png',
  sweetpotato: 'sweetpotato.png',
  pumpkin: 'pumpkin.png',
  corn: 'corn.png',
  radish: 'radish.png',
  aubergine: 'aubergine.png',
  eggplant: 'aubergine.png',
  beetroot: 'beetroot.png',
  cucumber: 'cucumber.png',
  'bitter gourd': 'bittergourd.png',
  karela: 'bittergourd.png',
  apple: 'tomato.png',
  rice: 'corn.png',
  lemon: 'capsicum.png',
  watermelon: 'pumpkin.png',
};
const DEFAULT_FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="420" height="320" viewBox="0 0 420 320"><rect width="420" height="320" fill="%23F0FDF4"/><circle cx="210" cy="130" r="48" fill="%23DCFCE7"/><rect x="120" y="210" width="180" height="18" rx="9" fill="%23BBF7D0"/></svg>';

const getImageForProduct = (product) => {
  if (process.env.NODE_ENV === 'development' && product?.image) {
    // Debug helper for validating stored image values from API.
    console.log('KissanConnect product.image:', product.image);
  }

  if (product.image) {
    return product.image;
  }

  if (!product.name) return null;
  const key = product.name.toLowerCase().trim();
  if (IMAGE_MAP[key]) return `/images/${IMAGE_MAP[key]}`;
  for (const [mapKey, file] of Object.entries(IMAGE_MAP)) {
    if (key.includes(mapKey) || mapKey.includes(key)) return `/images/${file}`;
  }
  return null;
};

const ProductCard = ({ product, onAddToCart, showDetails = true }) => {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  const imageSrc = getImageForProduct(product);

  const productId = product._id || product.id;

  const handleBuyNow = () => {
    navigate(`/product/${productId}`);
  };

  const handleDetails = () => {
    navigate(`/product/${productId}`);
  };

  const primaryActionLabel = onAddToCart ? 'Add to Cart' : 'Buy Now';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative group border border-gray-100">
      
      {/* Fresh Tag */}
      <div className="absolute top-3 right-3 z-10 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
        Fresh
      </div>

      {/* Weight Badge */}
      <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-[11px] font-bold text-green-950 px-2.5 py-1 rounded-md shadow-sm">
        1Kg
      </div>

      {/* Product Image */}
      <div className="h-48 bg-green-50 flex items-center justify-center p-5 overflow-hidden">
        {imageSrc && !imgError ? (
          <img 
            src={imageSrc} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
            onError={(event) => {
              if (event.currentTarget.src !== DEFAULT_FALLBACK_IMAGE) {
                event.currentTarget.src = DEFAULT_FALLBACK_IMAGE;
                return;
              }
              setImgError(true);
            }}
          />
        ) : (
          <span className="text-7xl" style={{ filter: 'drop-shadow(0 6px 6px rgba(0,0,0,0.15))' }}>
            {product.icon || '🥦'}
          </span>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
          {product.category || 'Vegetables'}
        </span>

        <h3 className="text-base font-bold text-green-950 mt-1 mb-1 truncate">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-green-900/50 text-xs mb-3 line-clamp-1">
            {product.description}
          </p>
        )}
        
        {/* Price Row */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-green-950">
              ₹{product.price}
            </span>
            <span className="text-xs font-medium text-green-900/40">/kg</span>
            {product.oldPrice && (
              <span className="text-sm text-red-400 line-through font-medium ml-1">
                ₹{product.oldPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {showDetails && (
              <button
                onClick={handleDetails}
                className="kc-btn kc-btn-3d bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-bold shadow-md hover:shadow-lg active:translate-y-[1px] transition-all"
              >
                View Details
              </button>
            )}
            <button
              onClick={() => onAddToCart ? onAddToCart(product) : handleBuyNow()}
              className="kc-btn kc-btn-3d bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-lg active:translate-y-[1px] transition-all"
            >
              {primaryActionLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
