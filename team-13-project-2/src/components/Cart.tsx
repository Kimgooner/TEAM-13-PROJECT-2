'use client';

import React from 'react';

type MenuItem = {
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
};

type CartProps = {
  cartItems: MenuItem[];
  setCartItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

export default function Cart({ cartItems, setCartItems }: CartProps) {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const increase = (name: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (name: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeItem = (name: string) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  return (
    <div className="w-[28rem] bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-lg">
      <h2 className="text-xl font-bold mb-4">🛒 장바구니</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">장바구니가 비어있습니다.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.name} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.price.toLocaleString()}원 × {item.quantity}개
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrease(item.name)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increase(item.name)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.name)}
                  className="ml-2 text-red-500 hover:underline text-sm"
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <div className="mt-6">
          <p className="text-right font-bold text-lg">
            총합: {totalPrice.toLocaleString()}원
          </p>
          <div className="flex justify-end mt-2 gap-2">
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-gray-300 text-sm rounded"
            >
              장바구니 비우기
            </button>
            <button
              onClick={() => alert('결제가 완료되었습니다.')}
              className="px-4 py-2 bg-green-500 text-white text-sm rounded"
            >
              결제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
