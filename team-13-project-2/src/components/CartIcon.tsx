'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/contexts/CartContext';

export default function CartIcon() {
  const { cartItems } = useCart();
  const [isClicked, setIsClicked] = useState(false);  // 클릭 상태 관리
  const router = useRouter();

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);  // 클릭 상태 전환
    router.push('/cart');  // 장바구니 페이지로 이동
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`text-xl relative px-4 py-2 transition duration-300 
          ${isClicked ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
      >
        🛒
        {totalCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {totalCount}
          </span>
        )}
      </button>
    </div>
  );
}
