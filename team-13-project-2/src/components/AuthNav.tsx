'use client';

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { apiFetch } from "@/app/lib/backend/client";
import { useRouter } from "next/navigation";

export default function AuthNav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        apiFetch("/api/v1/members/me")
            .then((res) => {
                if (res.resultCode.startsWith("202")) {
                    setIsLoggedIn(true);
                    setUserName(res.data.name);
                }
            })
            .catch(() => {
                setIsLoggedIn(false);
                setUserName("");
            });
    }, []);

    // 드롭다운 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        await apiFetch("/api/v1/members/logout", { method: "POST" });
        setIsLoggedIn(false);
        setUserName("");
        setIsDropdownOpen(false);
        router.replace("/");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    if (isLoggedIn) {
        return (
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={toggleDropdown}
                    className="hover:bg-[#8c7051] px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                    {/* 사용자 아이콘 - username의 첫글자를 원형 아이콘으로 표시 */}
                    <div className="w-6 h-6 bg-[#8c7051] rounded-full flex items-center justify-center text-white text-sm">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <span>{userName}</span>
                    {/* 드롭다운 화살표*/}
                    <svg 
                        className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* 드롭다운 메뉴 */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <Link
                            href="/members/me"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            내 정보
                        </Link>
                        <Link
                            href="/user/list"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            주문 내역
                        </Link>
                        <hr className="border-gray-200 my-1" />
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            로그아웃
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            href="/members/login"
            className="hover:bg-[#8c7051] px-3 py-2 rounded-lg transition-colors"
        >
            로그인
        </Link>
    );
}
