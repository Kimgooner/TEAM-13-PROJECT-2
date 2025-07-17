'use client';

import { useState } from 'react';

export default function UserOrderListPage() {
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [orders, setOrders] = useState<any[]>([
    {
      id: 1,
      productName: '크리스탈라이트 레몬 아이스티',
      productImage: '/images/product1.jpg',
      status: '배송 준비중',
      deliveryStatus: '배송 준비중',
      totalPrice: 20000,
      deliveryDate: '7/15(화) 도착'
    },
    {
      id: 2,
      productName: '코카콜라',
      productImage: '/images/product2.jpg',
      status: '배송 완료',
      deliveryStatus: '배송 완료',
      totalPrice: 5000,
      deliveryDate: '7/10(토) 도착'
    },
    {
      id: 3,
      productName: '스타벅스 아이스 아메리카노',
      productImage: '/images/product3.jpg',
      status: '배송 중',
      deliveryStatus: '배송 중',
      totalPrice: 4500,
      deliveryDate: '7/13(화) 도착'
    },
  ]);  // 주문 내역 상태

  const [filteredOrders, setFilteredOrders] = useState<any[]>(orders); // 필터된 주문 내역 상태

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // 검색어를 소문자로 변환하여 주문 내역에서 검색
    const filtered = orders.filter(order =>
      order.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  return (
    <div className="p-6">
      {/* 주문목록 검색 */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="주문한 상품을 검색할 수 있어요!"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          검색
        </button>
      </div>

      {/* 주문 목록 */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <p>검색된 주문이 없습니다.</p> // 검색된 결과가 없으면 표시
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="flex justify-between border-b pb-4">
              <div className="flex gap-4">
                {/* 상품 이미지 */}
                <img
                  src={order.productImage} // 상품 이미지 경로
                  alt={order.productName}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h2 className="font-semibold">{order.productName}</h2>
                  <p>주문 상태: {order.status}</p>
                  <p>배송 상태: {order.deliveryStatus}</p>
                  <p>총 금액: {order.totalPrice} 원</p>
                </div>
              </div>

              {/* 버튼들 */}
              <div className="flex flex-col items-end space-y-2">
                <button
                  className="w-full text-sm bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
                >
                  배송조회: {order.deliveryDate} {/* 배송 조회 */}
                </button>
                <button
                  className="w-full text-sm bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600"
                >
                  교환/반품 신청
                </button>
                <button
                  className="w-full text-sm bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700"
                >
                  리뷰 작성하기
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
