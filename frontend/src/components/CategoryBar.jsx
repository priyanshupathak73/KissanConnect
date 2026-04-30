import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    name: 'Vegetables',
    image:
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Fruits',
    image:
      'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Grains',
    image:
      'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Spices',
    image:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Dairy',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Organic',
    image:
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=300&q=80',
  },
];

const CategoryBar = ({ activeCategory, onCategoryChange }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (onCategoryChange) {
      onCategoryChange(category);
      return;
    }

    navigate(`/marketplace?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h3 className="text-lg font-bold text-green-950 mb-5">Shop by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center gap-3 sm:gap-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group text-left w-full"
            >
              <div
                className={`aspect-square w-full rounded-xl bg-white border border-gray-100 shadow-sm p-3 flex items-center justify-center transition-all duration-300 cursor-pointer group-hover:scale-[1.03] group-hover:shadow-md ${
                  isActive
                    ? 'ring-2 ring-green-600 shadow-md'
                    : ''
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              <span
                className={`block mt-2 text-center text-xs sm:text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-green-700'
                    : 'text-green-900/75 group-hover:text-green-900'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
