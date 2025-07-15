'use client';

import { useState } from 'react';
import Cart from '@/components/Cart';

type MenuItem = {
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
};

const menus: Omit<MenuItem, 'quantity'>[] = [
  { name: '아메리카노', category: '커피', price: 4500, image: '/images/americano.jpg' },
  { name: '바닐라라떼', category: '커피', price: 4800, image: '/images/vanilla-latte.jpg' },
  { name: '망고주스', category: '주스', price: 5000, image: '/images/mango-juice.jpg' },
  { name: '레몬에이드', category: '주스', price: 4700, image: '/images/lemonade.jpg' },
  { name: '유자차', category: '티', price: 4300, image: '/images/citron-tea.jpg' },
  { name: '허니브레드', category: '디저트', price: 5500, image: '/images/honey-bread.jpg' },
  { name: '콜드브루', category: '커피', price: 4600, image: '/images/coldbrew.jpg' },
  { name: '초코라떼', category: '커피', price: 4900, image: '/images/choco-latte.jpg' },
  { name: '카페모카', category: '커피', price: 5000, image: '/images/cafe-mocha.jpg' },
  { name: '오렌지주스', category: '주스', price: 4800, image: '/images/orange-juice.jpg' },
  { name: '티라미수', category: '디저트', price: 5200, image: '/images/tiramisu.jpg' },
  { name: '홍차', category: '티', price: 4400, image: '/images/black-tea.jpg' },
];

export default function MenuList() {
  const [selected, setSelected] = useState('전체');
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);

  const filteredMenus =
    selected === '전체'
      ? menus
      : menus.filter((menu) => menu.category === selected);

  const categories = ['전체', '커피', '주스', '티', '디저트'];

  const addToCart = (item: Omit<MenuItem, 'quantity'>) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.name === item.name);
      if (exists) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [
          ...prev,
          {
            ...item,
            quantity: 1,
          },
        ];
      }
    });
  };

  return (
    <div className="relative min-h-screen">
      <div className="flex flex-col items-center gap-8 pb-40">
        <h1 className="text-3xl font-bold text-center">☕ 커피 메뉴 관리 프로젝트</h1>

        {/* 카테고리 버튼 */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-4 py-2 border rounded-full font-semibold transition ${
                selected === cat
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 메뉴 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
          {filteredMenus.map((menu, i) => (
            <div
              key={i}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition cursor-pointer"
              onClick={() => addToCart(menu)}
            >
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <div className="text-center font-semibold text-lg text-gray-800">
                {menu.name}
              </div>
              <div className="text-center text-sm text-gray-500 mt-1">
                {menu.price.toLocaleString()}원
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 장바구니: 화면 우측 상단 고정 */}
      <div className="fixed top-4 right-4 z-50">
        <Cart cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </div>
  );
}
