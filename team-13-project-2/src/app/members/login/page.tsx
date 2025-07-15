"use client";

import React from "react";

import { apiFetch } from "@/app/lib/backend/client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const emailInput = form.elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    emailInput.value = emailInput.value.trim();
    if (emailInput.value.length === 0) {
      alert("이메일을 입력해주세요.");
      emailInput.focus();
      return;
    }

    passwordInput.value = passwordInput.value.trim();
    if (passwordInput.value.length === 0) {
      alert("비밀번호를 입력해주세요.");
      passwordInput.focus();
      return;
    }

    apiFetch(`/api/v1/members/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value,
        }),
      })
      .then((res) => {
        alert(`환영합니다, ${res.name}님!`);
        router.replace("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <h1>로그인</h1>

      <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
        <input
          className="border p-2 rounded"
          type="text"
          name="email"
          placeholder="이메일"
          autoFocus
          maxLength={50}
        />
        <input
          className="border p-2 rounded"
          type="password"
          name="password"
          placeholder="비밀번호"
          maxLength={30}
        />
        <button className="border p-2 rounded" type="submit">
          로그인
        </button>
      </form>
    </>
  );
}