// components/MenuItem.tsx

import React from 'react';

interface MenuItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  onClick: () => void;
}

export default function MenuItem({ item, onClick }: MenuItemProps) {
  return (
    <div
      className="border p-4 rounded-lg shadow hover:cursor-pointer hover:scale-105 transition"
      onClick={onClick}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-32 object-cover mb-2 rounded"
      />
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.price}원</p>
    </div>
  );
}
