"use client";

import React, { useState } from "react";
import { apiFetch } from "@/app/lib/backend/client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (emailInput.value.length === 0) {
      emailInput.focus();
      return setErrorMsg("이메일을 입력해주세요.");
    }

    if (passwordInput.value.length === 0) {
      passwordInput.focus();
      return setErrorMsg("비밀번호를 입력해주세요.");
    }

    // 로그인 기능

    const endpoint = "/api/v1/members/login";

    try {
      const res = await apiFetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      alert(res.msg);
      const role = res.data?.item?.role;

      if(role == "ADMIN"){
        router.replace("/admin");
      }

      if(role == "USER"){
        router.replace("/user");
      }

    } catch (error: any) {
      let userFriendlyMsg = "알 수 없는 오류가 발생했습니다.";

      switch (error.resultCode) {
        default:
          if (error.msg) userFriendlyMsg = error.msg;
          break;
      }

      setErrorMsg(` ${userFriendlyMsg}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">로그인</h1>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-400">
            {errorMsg}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="text-gray-800 border border-gray-300 p-3 rounded-lg"
            type="text"
            name="email"
            placeholder="이메일"
            autoFocus
            maxLength={50}
          />
          <input
            className="text-gray-800 border border-gray-300 p-3 rounded-lg"
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
          <a href="/members/signup" className="text-blue-500 hover:underline">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}
