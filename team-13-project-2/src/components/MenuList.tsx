'use client';

import { useState } from 'react';
import Image from 'next/image';

const menus = [
  { name: '아메리카노', category: '커피', price: 4500, image: 'americano.jpg' },
  { name: '바닐라라떼', category: '커피', price: 5000, image: 'vanilla-latte.jpg' },
  { name: '망고주스', category: '주스', price: 5500, image: 'mango.jpg' },
  { name: '레몬에이드', category: '주스', price: 5300, image: 'lemonade.jpg' },
  { name: '유자차', category: '티', price: 4800, image: 'yuzu-tea.jpg' },
  { name: '허니브레드', category: '디저트', price: 5900, image: 'honey-bread.jpg' },
  { name: '콜드브루', category: '커피', price: 4700, image: 'coldbrew.jpg' },
  { name: '초코라떼', category: '커피', price: 5100, image: 'choco-latte.jpg' },
  { name: '카페모카', category: '커피', price: 5300, image: 'cafe-mocha.jpg' },
  { name: '오렌지주스', category: '주스', price: 5500, image: 'orange-juice.jpg' },
  { name: '티라미수', category: '디저트', price: 6200, image: 'tiramisu.jpg' },
  { name: '홍차', category: '티', price: 4700, image: 'black-tea.jpg' },
];

const categories = ['전체', '커피', '주스', '티', '디저트'];

export default function MenuList() {
  const [selected, setSelected] = useState('전체');

  const filteredMenus =
    selected === '전체'
      ? menus
      : menus.filter((menu) => menu.category === selected);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold mt-6">☕ 커피 맛있게 하는 집</h1>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {filteredMenus.map((menu, i) => (
          <div
            key={i}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition transform hover:-translate-y-1"
          >
            <div className="relative w-full h-40 mb-4">
              <Image
                src={`/images/${menu.image}`}
                alt={menu.name}
                fill
                className="rounded object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/default.jpg'; // 기본 이미지 추가 필요
                }}
              />
            </div>
            <div className="text-center font-semibold text-lg text-gray-800">
              {menu.name}
            </div>
            <div className="text-center text-sm text-gray-500">
              {menu.price.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
