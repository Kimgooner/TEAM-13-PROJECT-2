'use client';

import { useCart } from '@/app/contexts/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export default function MiniCart({ onClose }: { onClose: () => void }) {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    toast.clearWaitingQueue();
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg border rounded-lg p-4 text-sm z-50">
        <p className="text-gray-500 text-center">장바구니가 비어 있습니다.</p>
      </div>
    );
  }

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg border rounded-lg p-4 text-sm z-50">
      <ul className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {cartItems.map((item) => {
          const itemTotal = item.price * item.quantity;

          return (
            <li key={item.id} className="border-b pb-2">
              {/* 상단: 이름 + 삭제 */}
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-black">{item.name}</p>
                <button
                  onClick={() => {
                    if (confirm(`${item.name}을(를) 삭제하시겠습니까?`)) {
                      removeFromCart(item.id);
                      toast.success(`${item.name} 삭제됨`);
                    }
                  }}
                  className="text-xs text-red-500 hover:underline"
                >
                  🗑 삭제
                </button>
              </div>

              {/* 하단: 수량 × 가격 = 총액 + 수량조절 */}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-700">
                  {item.quantity}개 × {item.price.toLocaleString()}원 ={' '}
                  <span className="font-semibold text-black">
                    {itemTotal.toLocaleString()}원
                  </span>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-0.5 border rounded text-xs text-black"
                  >
                    -
                  </button>
                  <span className="text-sm text-black">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-0.5 border rounded text-xs text-black"
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 text-right font-bold text-black">
        총합: {total.toLocaleString()}원
      </div>

      {/* 버튼 영역 */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={onClose}
          className="px-4 py-2 border text-sm text-gray-700 rounded hover:bg-gray-100"
        >
          닫기
        </button>

        <button
          onClick={() => {
            router.push('/checkout');
            onClose(); // 동시에 닫기
          }}
          className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
        >
          구매하기
        </button>
      </div>
    </div>
  );
}
