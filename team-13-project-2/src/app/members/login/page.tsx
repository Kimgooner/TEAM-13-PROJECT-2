"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement;

    emailInput.value = emailInput.value.trim();
    passwordInput.value = passwordInput.value.trim();

    if (emailInput.value.length === 0) {
      alert("이메일을 입력해주세요.");
      emailInput.focus();
      return;
    }

    if (passwordInput.value.length === 0) {
      alert("비밀번호를 입력해주세요.");
      passwordInput.focus();
      return;
    }

    // ✅ 백엔드 연동은 추후 예정
    // 지금은 메뉴 페이지로 이동
    router.push("/menu");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          로그인
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="border border-gray-300 p-3 rounded-lg"
            type="text"
            name="email"
            placeholder="이메일"
            autoFocus
            maxLength={50}
          />
          <input
            className="border border-gray-300 p-3 rounded-lg"
            type="password"
            name="password"
            placeholder="비밀번호"
            maxLength={30}
          />
          <button
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            type="submit"
          >
            로그인
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          계정이 없으신가요?{" "}
          <a href="/join" className="text-blue-500 hover:underline">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}
