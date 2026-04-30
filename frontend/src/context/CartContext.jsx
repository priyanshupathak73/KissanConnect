import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'kissanconnect_cart';

const readCart = () => {
  const data = localStorage.getItem(CART_STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readCart);

  const persistItems = useCallback((nextItems) => {
    setItems(nextItems);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextItems));
  }, []);

  const addToCart = useCallback((product, qty = 1) => {
    const productId = product._id || product.id;
    const existing = items.find((item) => item.productId === productId);

    if (existing) {
      const updated = items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
      persistItems(updated);
      return;
    }

    const newItem = {
      productId,
      name: product.name,
      image: product.image,
      price: product.price,
      farmerId: product.farmerId?._id || product.farmerId,
      quantity: qty,
    };

    persistItems([...items, newItem]);
  }, [items, persistItems]);

  const removeFromCart = useCallback((productId) => {
    const updated = items.filter((item) => item.productId !== productId);
    persistItems(updated);
  }, [items, persistItems]);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updated = items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    persistItems(updated);
  }, [items, persistItems, removeFromCart]);

  const clearCart = useCallback(() => persistItems([]), [persistItems]);

  const cartTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      cartTotal,
      cartCount,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [items, cartTotal, cartCount, addToCart, updateQuantity, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
