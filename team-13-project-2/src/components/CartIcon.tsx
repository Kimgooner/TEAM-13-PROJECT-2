'use client';

import { useCart } from '@/app/contexts/CartContext';
import { useLoginStatus } from '@/app/hooks/useLoginStatus';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-toastify';

export default function CartIcon() {
  const { cartItems } = useCart();
  const isLoggedIn = useLoginStatus();
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleClick = () => {
    if (!isLoggedIn) {
      toast.info('로그인 후 이용해주세요.', {
        position: 'top-center',
        autoClose: 2000,
      });
      router.push('/members/login');
      return;
    }

    setIsClicked((prev) => !prev);
    router.push('/cart');
  };

  useEffect(() => {
    setIsClicked(false);
  }, [pathname]);

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`text-xl relative px-4 py-2 transition duration-300 
          ${isClicked ? 'bg-[#8c7051]' : 'hover:bg-[#8c7051]'} text-white rounded-lg`}
      >
        🛒
        {totalCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {totalCount}
          </span>
        )}
      </button>
    </div>
  );
}
