'use client';

import { useState } from 'react';
import MenuList from '@/components/MenuList';
import MenuDetailModal from '@/components/MenuDetailModal';  // MenuDetailModal 임포트

const mockMenu = [
  {
    id: 1,
    name: '아메리카노',
    price: 3000,
    image: '/images/americano.jpg',
    description: '진한 에스프레소에 물을 더한 커피입니다.',
  },
  {
    id: 2,
    name: '카페라떼',
    price: 4000,
    image: '/images/latte.jpg',
    description: '부드러운 우유와 조화로운 커피입니다.',
  },
  {
    id: 3,
    name: '바닐라라떼',
    price: 4500,
    image: '/images/vanilla.jpg',
    description: '달콤한 바닐라 시럽이 들어간 부드러운 라떼입니다.',
  },
];

export default function MenuPage() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">커피 메뉴</h1>

      {/* MenuList 컴포넌트에 mockMenu를 전달 */}
      <MenuList menuItems={mockMenu} setSelectedItem={setSelectedItem} />

      {selectedItem && (
        <MenuDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
