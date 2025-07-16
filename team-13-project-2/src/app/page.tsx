"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-[#f7f3ef]">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg">
        <h1 className="text-4xl font-bold text-[#6b4f3b] mb-4">
          ☕ 커피 맛있게 하는 집
        </h1>
        <p className="text-[#8c7051] text-lg mb-6">
          카페 메뉴를 관리하고<br />
          손님들에게 최고의 커피를 제공합니다.
        </p>
        <div className="flex flex-col gap-4">
          
          <Link
            href="/members/login"
            className="bg-[#6b4f3b] text-white py-3 rounded-lg hover:bg-[#8c7051] transition-colors"
          >
            로그인
          </Link>

          <Link
            href="/members/signup"
            className="border border-[#6b4f3b] text-[#6b4f3b] py-3 rounded-lg hover:bg-[#d9c1a3] hover:text-white transition-colors"
          >
            회원가입
          </Link>

        </div>
      </div>
    </div>
  );
}
