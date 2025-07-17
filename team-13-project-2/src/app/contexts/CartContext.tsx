// src/app/contexts/CartContext.tsx

'use client';

import React, { createContext, useEffect, useContext, useState, ReactNode } from 'react';
import { apiFetch } from '../lib/backend/client';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string; // category 추가
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    async function fetchCart() {
      try {
        const memberRes = await apiFetch('/api/v1/members/me');
        const memberId = memberRes.data?.id;
        if (!memberId) throw new Error("사용자 정보 없음");
  
        const wishlistRes = await apiFetch(`/api/v1/wishlist/member/${memberId}`);
        setCartItems(wishlistRes.data || []);
      } catch (error) {
        console.error("장바구니 로드 실패", error);
      }
    }
  
    fetchCart();
  }, []);

  /*
  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        return [...prev, { ...item, quantity }];
      }
    });
  };
  */

  const addToCart = async (item: Omit<CartItem, 'quantity'>, quantity: number) => {
    try {
      const memberRes = await apiFetch('/api/v1/members/me');
      const memberId = memberRes.data?.id;
      if (!memberId) throw new Error("사용자 정보 없음");
  
      // 서버 장바구니에서 해당 상품이 있는지 확인
      const wishlistRes = await apiFetch(`/api/v1/wishlist/member/${memberId}`);
      const existing = wishlistRes.data.find((i: any) => i.productId === item.id);

      if (existing) {
        // 상품이 이미 있으면 수량 증가 API 호출
        const currentQuantity = existing.quantity;
        const newQuantity = currentQuantity + quantity;
        await apiFetch(`/api/v1/wishlist/quantity`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            memberId,
            productId: item.id,
            newQuantity 
          }),
        });
  
      } else {
        // 상품이 없으면 신규 추가 API 호출
        const addRes = await apiFetch('/api/v1/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            memberId,
            productId: item.id,
            quantity,
          }),
        });
      }
      
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
    }
  }

  const updateQuantity = async (id: number, quantity: number) => {
    /*
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
    */

    try {
      const memberRes = await apiFetch('/api/v1/members/me');
      const memberId = memberRes.data?.id;
      if (!memberId) throw new Error("사용자 정보 없음");

      const wishlistRes = await apiFetch(`/api/v1/wishlist/member/${memberId}`);
      const existing = wishlistRes.data.find((i: any) => i.productId === id);
  
      // 서버 장바구니에서 해당 상품이 있는지 확인
      await apiFetch(`/api/v1/wishlist/quantity`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId,
          productId: id,
          quantity
        }),
      });
      
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
