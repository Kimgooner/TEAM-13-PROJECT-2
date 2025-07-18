"use client";

import React, { useEffect, useState } from "react";
import { apiFetch } from "@/app/lib/backend/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function Page() {
  const router = useRouter();
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await apiFetch("/api/v1/members/me");
        const role = res.data?.role;

        if (role === "ADMIN") {
          window.location.href = "/";
        } else if (role === "USER") {
          window.location.href = "/";
        } else {
          setCheckingLogin(false); // role이 이상하거나 없으면 그대로 페이지 노출
        }
      } catch (err) {
        setCheckingLogin(false); // 로그인 안 된 사용자 → 페이지 보여줌
      }
    };

    checkLoggedIn();
  }, [router]);

  if (checkingLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-600">로그인 상태 확인 중...</span>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value.trim();
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const address = (form.elements.namedItem("address") as HTMLInputElement).value.trim();
    const roleInput = form.elements.namedItem("role") as RadioNodeList;
    const role = roleInput?.value;

    if (!email) return setErrorMsg("이메일을 입력해주세요.");
    if (!password) return setErrorMsg("비밀번호를 입력해주세요.");
    if (!name) return setErrorMsg("이름을 입력해주세요.");
    if (!address) return setErrorMsg("주소를 입력해주세요.");
    if (!role) return setErrorMsg("역할을 선택해주세요.");

    const endpoint =
      role === "USER"
        ? "/api/v1/members/signup/user"
        : "/api/v1/members/signup/admin";

    try {
      const res = await apiFetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, address }),
      });

      router.push("/members/login");
    } catch (error: any) {
      let userFriendlyMsg = "알 수 없는 오류가 발생했습니다.";

      switch (error.resultCode) {
        case "400-1":
          userFriendlyMsg = "이메일 형식의 입력이 아닙니다.";
          break;
        case "400-2":
          userFriendlyMsg = "이미 가입된 이메일입니다.";
          break;
        case 403:
          userFriendlyMsg = "권한이 없습니다.";
          break;
        case 409:
          userFriendlyMsg = "이미 존재하는 사용자입니다.";
          break;
        case 500:
          userFriendlyMsg = "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
          break;
        default:
          if (error.msg) userFriendlyMsg = error.msg;
          break;
      }
      setErrorMsg(` ${userFriendlyMsg}`);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="bg-image flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">회원가입</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="text-gray-800 border border-gray-300 p-3 rounded-lg"
            type="text"
            name="email"
            placeholder="이메일"
            maxLength={50}
          />
          <input
            className="text-gray-800 border border-gray-300 p-3 rounded-lg"
            type="password"
            name="password"
            placeholder="비밀번호"
            maxLength={30}
          />
          <input
            className="text-gray-800 border border-gray-300 p-3 rounded-lg"
            type="text"
            name="name"
            placeholder="이름"
            maxLength={20}
          />
          <input
            className="text-gray-800 border border-gray-300 p-3 rounded-lg"
            type="text"
            name="address"
            placeholder="주소"
            maxLength={100}
          />
          <div className="text-gray-800 flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="USER" className="accent-blue-500" />
              사용자
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="ADMIN" className="accent-blue-500" />
              관리자
            </label>
          </div>
          <button
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            type="submit"
          >
            회원가입
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          이미 계정이 있으신가요?{" "}
          <a href="/members/login" className="text-blue-500 hover:underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
