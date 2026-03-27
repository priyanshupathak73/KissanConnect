import React from 'react';

const categories = [
  { name: 'Vegetables', emoji: '🥬', color: '#4CAF50' },
  { name: 'Fruits', emoji: '🍎', color: '#E91E63' },
  { name: 'Grains', emoji: '🌾', color: '#FF9800' },
  { name: 'Spices', emoji: '🌶️', color: '#F44336' },
  { name: 'Dairy', emoji: '🥛', color: '#2196F3' },
  { name: 'Organic', emoji: '🌿', color: '#26A69A' },
];

const CategoryBar = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-bold text-[#6D4C41] mb-5">Shop by Category</h3>
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => onCategoryChange && onCategoryChange(cat.name)}
              className="flex flex-col items-center gap-2 min-w-[80px] group"
            >
              <div
                className={`w-[72px] h-[72px] rounded-full flex items-center justify-center text-3xl shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
                  isActive
                    ? 'ring-[3px] ring-[#FF7043] ring-offset-2 scale-110'
                    : ''
                }`}
                style={{ backgroundColor: `${cat.color}18` }}
              >
                {cat.emoji}
              </div>
              <span
                className={`text-xs font-semibold transition-colors ${
                  isActive ? 'text-[#FF7043]' : 'text-[#6D4C41]/70 group-hover:text-[#6D4C41]'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;
