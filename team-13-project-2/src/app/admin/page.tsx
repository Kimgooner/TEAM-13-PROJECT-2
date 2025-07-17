'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// OrderItemDto 타입
type OrderItem = {
    id: number;
    productName: string;
    quantity: number;
    productPrice: number;
    totalPrice: number;
};

// OrderDto 타입
type Order = {
    id: number;
    createDate: string;
    modifyDate: string;
    totalPrice: number;
    address: string;
    order_status: string;
    orderItems: OrderItem[];
};

export default function AdminPage() {
    const router = useRouter();

    // 더미 주문 데이터
    const dummyOrders: Order[] = [
        {
            id: 1,
            createDate: '2025-07-17T12:20:00.000Z',
            modifyDate: '2025-07-17T12:21:00.000Z',
            totalPrice: 12000,
            address: '서울시 강남구 1번지',
            order_status: 'ORDERED',
            orderItems: [
                {
                    id: 1,
                    productName: '아메리카노',
                    quantity: 2,
                    productPrice: 4000,
                    totalPrice: 8000,
                },
                {
                    id: 2,
                    productName: '카페라떼',
                    quantity: 1,
                    productPrice: 4000,
                    totalPrice: 4000,
                },
            ],
        },
        {
            id: 2,
            createDate: '2025-07-17T12:22:00.000Z',
            modifyDate: '2025-07-17T12:25:00.000Z',
            totalPrice: 5000,
            address: '경기도 성남시 분당구',
            order_status: 'DELIVERED',
            orderItems: [
                {
                    id: 3,
                    productName: '에스프레소',
                    quantity: 1,
                    productPrice: 2500,
                    totalPrice: 2500,
                },
                {
                    id: 4,
                    productName: '아이스티',
                    quantity: 1,
                    productPrice: 2500,
                    totalPrice: 2500,
                },
            ],
        },
        // 필요하다면 다른 상태의 주문도 더 추가 가능
    ];

    // 주문 목록 상태
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    // 상태 필터
    const [statusFilter, setStatusFilter] = useState('ALL');

    // 주문 상태별 옵션 추출 (중복제거, ALL 추가)
    const orderStatusList: string[] = [
        ...Array.from(new Set(dummyOrders.map(o => o.order_status))),
    ];

    useEffect(() => {
        setOrders(dummyOrders);
        setLoading(false);
    }, []);

    // 필터링된 주문 목록
    const filteredOrders =
        statusFilter === 'ALL'
            ? orders
            : orders.filter(order => order.order_status === statusFilter);

    return (
        <div className="p-8 max-w-5xl mx-auto">
            {/* 1. 커피 메뉴 조정 페이지로 이동 */}
            <section className="mb-12">
                <h1 className="text-2xl font-bold mb-6">관리자 페이지</h1>
                <button
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={() => router.push('/admin/edit')}
                >
                    커피 메뉴 조정 페이지로 이동
                </button>
            </section>

            {/* 2. 주문 목록 */}
            <section>
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-xl font-bold">현재 들어온 주문 목록</h2>
                    {/* 상태 필터 */}
                    <select
                        className="ml-4 border px-2 py-1 rounded"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">전체</option>
                        {orderStatusList.map(status => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                {loading && <p>주문 목록을 불러오는 중...</p>}
                {!loading && filteredOrders.length === 0 && (
                    <p>해당 주문 상태의 내역이 없습니다.</p>
                )}
                <ul className="space-y-6">
                    {filteredOrders.map(order => (
                        <li key={order.id} className="border rounded-lg shadow p-5">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <span className="font-semibold">주문 번호:</span> {order.id}
                                </div>
                                <span className="bg-gray-100 px-2 py-1 rounded font-semibold text-sm text-black">
                  {order.order_status}
                </span>
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">주소:</span> {order.address}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">총 금액:</span> {order.totalPrice.toLocaleString()}원
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">주문일:</span>{' '}
                                {new Date(order.createDate).toLocaleString()}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">수정일:</span>{' '}
                                {new Date(order.modifyDate).toLocaleString()}
                            </div>
                            <div className="mt-3">
                                <span className="font-semibold">주문 항목:</span>
                                <ul className="list-disc ml-6 mt-2">
                                    {order.orderItems.map(item => (
                                        <li key={item.id}>
                                            <span className="font-semibold">{item.productName}</span> ({item.productPrice.toLocaleString()}원)
                                            × {item.quantity} = {item.totalPrice.toLocaleString()}원
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
