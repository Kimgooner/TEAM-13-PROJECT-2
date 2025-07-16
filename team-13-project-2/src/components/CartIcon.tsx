'use client';

import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/app/contexts/CartContext';
import MiniCart from './MiniCart';

export default function CartIcon() {
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-xl relative"
      >
        🛒
        {totalCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {totalCount}
          </span>
        )}
      </button>

      {isOpen && <MiniCart onClose={() => setIsOpen(false)} />} {/* ✅ 핵심 수정 */}
    </div>
  );
}
