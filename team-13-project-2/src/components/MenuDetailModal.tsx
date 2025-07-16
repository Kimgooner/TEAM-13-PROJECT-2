'use client';

import React, { useState } from 'react';
import { useCart } from '@/app/contexts/CartContext';

interface MenuDetailModalProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  onClose: () => void;
}

export default function MenuDetailModal({ item, onClose }: MenuDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-bold mb-2 text-black">{item.name}</h2>
        <p className="text-gray-600 mb-2">{item.description}</p>
        <p className="font-semibold text-lg mb-4 text-black">
          {item.price.toLocaleString()}원
        </p>

        {/* 수량 조절 */}
        <div className="flex items-center justify-between mb-6">
          <label className="mr-2 text-black">수량:</label>
          <div className="flex items-center gap-2">
            <button
              onClick={decrease}
              className="px-3 py-1 border rounded text-black"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="appearance-none border rounded px-2 py-1 w-16 text-center text-black"
            />
            <button
              onClick={increase}
              className="px-3 py-1 border rounded text-black"
            >
              +
            </button>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              addToCart(item, quantity);
              alert(`${item.name} ${quantity}개가 장바구니에 담겼습니다.`);
              onClose();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            장바구니 담기
          </button>
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded text-black"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
