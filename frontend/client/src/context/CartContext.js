import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage on app start
    const savedCart = localStorage.getItem('kivra_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart:', error);
        localStorage.removeItem('kivra_cart');
      }
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('kivra_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const addToCart = (product, selectedSize = null, selectedColor = null) => {
    const cartId = `${product.id}-${selectedSize || 'default'}-${selectedColor || 'default'}`;
    
    const cartItem = {
      cartId,
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      pageCategory: product.pageCategory, // Add this to track which page the product came from
      description: product.description,
      selectedSize: selectedSize || (product.sizes && product.sizes[0]) || 'One Size',
      selectedColor: selectedColor || (product.colors && product.colors[0]) || 'Default',
      quantity: 1,
      addedAt: new Date().toISOString()
    };

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.cartId === cartId);
      
      if (existingItemIndex > -1) {
        // Item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // New item, add to cart
        return [...prevItems, cartItem];
      }
    });

    return cartItem;
  };

  const removeFromCart = (cartId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartId === cartId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cartItems.length;
  };

  const value = {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
