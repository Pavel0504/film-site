// src/context/CartContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { products } from '../data/products';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'cart_items_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as CartItem[];
      // basic sanity check: ensure quantity and price are numbers
      return parsed.map(p => ({
        ...p,
        quantity: Number.isFinite(p.quantity) ? Math.max(1, Math.floor(p.quantity)) : 1,
        price: Number.isFinite(p.price) ? p.price : 0,
      }));
    } catch (e) {
      console.warn('Failed to parse cart from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    // minimal validation / normalization
    if (item.id === undefined || item.id === null) {
      console.warn('addToCart called without id', item);
      return;
    }

    const quantityToAdd = Math.max(1, Math.floor(item.quantity ?? 1));
    const priceNumber = typeof item.price === 'number' && Number.isFinite(item.price) ? item.price : 0;

    setItems(prev => {
      // если image не передали — ищем продукт по id
      const product = products.find(p => p.id === item.id);
      const image = item.image ?? product?.image ?? '';

      const existing = prev.find(i => i.id === item.id);
      let next: CartItem[];
      if (existing) {
        next = prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantityToAdd } : i
        );
      } else {
        next = [
          ...prev,
          {
            id: item.id,
            title: item.title,
            price: priceNumber,
            image,
            quantity: quantityToAdd,
          },
        ];
      }

      // лог для отладки — покажет входящий товар и следующий список
      console.log('[Cart] addToCart', { incoming: { ...item, quantity: quantityToAdd, price: priceNumber }, next });
      return next;
    });
  };

  const removeFromCart = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    const q = Math.floor(quantity);
    if (q <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: q } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
