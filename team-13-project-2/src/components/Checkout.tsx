'use client';

import React from 'react';

interface CheckoutProps {
  totalPrice: number;
}

export default function Checkout({ totalPrice }: CheckoutProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">결제 정보</h2>
      <div className="space-y-3">
        {/* 이메일 필드와 우편번호 필드를 제거하고 주소만 남깁니다 */}
        <input
          type="text"
          placeholder="주소"
          className="w-full border p-2 rounded"
        />
      </div>
      <p className="text-sm text-gray-600 mt-3">당일 오후 2시 이후의 주문은 다음날 배송을 시작합니다.</p>
      <div className="flex justify-between items-center mt-4">
        <span className="font-bold text-lg">총금액</span>
        <span className="text-xl font-semibold">{totalPrice.toLocaleString()}원</span>
      </div>
      <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
        결제하기
      </button>
    </div>
  );
}
