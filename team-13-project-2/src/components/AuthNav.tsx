"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/app/lib/backend/client";
import { useRouter } from "next/navigation";

export default function AuthNav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        apiFetch("/api/v1/members/me")
            .then((res) => {
                if (res.resultCode.startsWith("202")) {
                    setIsLoggedIn(true);
                }
            })
            .catch(() => setIsLoggedIn(false));
    }, []);

    const handleLogout = async () => {
        await apiFetch("/api/v1/members/logout", { method: "POST" });
        setIsLoggedIn(false);
        router.refresh();
    };

    if (isLoggedIn) {
        return (
            <div className="flex gap-2">
                <button
                    onClick={handleLogout}
                    className="hover:bg-[#8c7051] px-3 py-2 rounded-lg transition-colors"
                >
                    로그아웃
                </button>
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
