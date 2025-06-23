'use client';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { User } from '@supabase/supabase-js';
import React from 'react';

interface AuthHeaderProps {
  user?: User | null;
}

export default function AuthHeader({ user }: AuthHeaderProps) {
  const supabase = createSupabaseBrowserClient();

  const authCallbackBase = process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_AUTH!;

  /** ── 로그인 처리 ─────────────────── */
  const handleGoogleLogin = async () => {
    // 로그인 성공 후 홈('/') 으로 이동시키기 위한 next
    const nextPath = '/';
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${authCallbackBase}?next=${encodeURIComponent(nextPath)}`,
      },
    });
  };

  /** ── 로그아웃 처리 ─────────────────── */
  const handleLogout = async () => {
    // 서버사이드 로그아웃 분기로 진입시키기 위해 code 없이 next만 붙여 호출
    // const nextPath = '/auth';
    const nextPath = '/login';
    // 아래 URL 호출 시 route.ts에서 code가 없으므로 로그아웃 분기 실행
    window.location.href = `${authCallbackBase}?next=${encodeURIComponent(nextPath)}`;
  };

  return (
    <header className="h-[50px] bg-white">
      <section className="px-6 h-full flex items-center justify-end">
        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleGoogleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login with Google
          </button>
        )}
      </section>
    </header>
  );
}
