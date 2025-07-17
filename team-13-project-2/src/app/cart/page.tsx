// src/app/cart/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/app/contexts/CartContext';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';
import Checkout from '@/components/Checkout';
import { apiFetch } from "@/app/lib/backend/client";

interface WishlistItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  itemTotalPrice: number;
  email: string;
}

export default function CartPage() {
  const { cartItems, clearCart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userRes = await apiFetch('/api/v1/members/me');
        const userId = userRes.data?.id;

        if(!userId) throw new Error('사용자 정보를 불러올 수 없습니다.');

        const cartRes = await fetch(`api/v1/wishlist/member/${userId}`);
      } catch (err) {
        console.error('장바구니 불러오기 실패')
      }
    };

    fetchCart();

  }, []);

  const total = cartItems.reduce(
    (sum: number, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <button
        onClick={() => router.push('/menu')}
        className="mb-4 px-4 py-2 border rounded hover:bg-gray-100"
      >
        상품 추가하기
      </button>

      <h1 className="text-2xl font-bold mb-4">🛒 장바구니</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">장바구니가 비어 있습니다.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-4 rounded-lg shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-800 px-2 py-1 bg-white rounded"
                      >
                        -
                      </button>
                      <span className="appearance-none border rounded px-2 py-1 w-16 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-800 px-2 py-1 bg-white rounded"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold mt-1">
                      {item.price.toLocaleString()}원
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <p className="font-bold">
                    {(item.price * item.quantity).toLocaleString()}원
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    🗑 삭제
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              장바구니 비우기
            </button>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              결제하기
            </button>
          </div>

          <div className="text-right text-xl font-bold mt-6">
            총 합계: {total.toLocaleString()}원
          </div>
        </>
      )}

      {/* 결제 모달 */}
      {isCheckoutOpen && (
        <Modal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cartItems={cartItems}
        >
          <Checkout totalPrice={total} />
        </Modal>
      )}
    </div>
  );
}
