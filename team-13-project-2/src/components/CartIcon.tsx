'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/contexts/CartContext';
import { usePathname } from 'next/navigation'; // Next.js 13.x에서 경로를 추적하는 데 사용

export default function CartIcon() {
  const { cartItems } = useCart();
  const [isClicked, setIsClicked] = useState(false);  // 클릭 상태 관리
  const router = useRouter();
  const pathname = usePathname();  // 현재 페이지 경로

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);  // 클릭 상태 전환
    router.push('/cart');  // 장바구니 페이지로 이동
  };

  // 페이지가 변경될 때마다 클릭 상태를 초기화
  useEffect(() => {
    setIsClicked(false);
  }, [pathname]);  // pathname이 변경될 때마다 isClicked 상태 초기화

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`text-xl relative px-4 py-2 transition duration-300 
          ${isClicked ? 'bg-[#8c7051]' : 'hover:bg-[#8c7051]'} text-white rounded-lg`}
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
