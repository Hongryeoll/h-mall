import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import type { Database } from '@/types/supabase';
import type { CookieSerializeOptions } from 'cookie';

type UserInfo = {
  id: string;
  role: 'user' | 'admin' | 'readAdmin';
  email: string;
};

/**
 * 서버 전용 클라이언트
 * — Server Components, Server Actions, Route Handlers 에서 사용
 */
export async function createServerSupabaseClient(isServerComponent = false) {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async (): Promise<{ name: string; value: string }[]> => {
          const all = cookieStore.getAll();
          return all.map((c) => ({ name: c.name, value: c.value }));
        },

        /**
         * Supabase 가 갱신하라고 내려보낸 쿠키들을
         * 동기/비동기 상관없이 순회하며 set 해 줌.
         * RSC(Server Component) 모드일 땐 무시하도록 처리.
         */
        setAll: async (
          cookiesToSet: Array<{
            name: string;
            value: string;
            options?: CookieSerializeOptions;
          }>
        ) => {
          if (isServerComponent) return;
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        },
      },
    }
  );
}

/** Server Actions/RSC 전용 (쓰기 무시) */
export function createServerSupabaseClientRSC() {
  return createServerSupabaseClient(true);
}

/** Next.js Middleware 전용 세션 갱신 헬퍼 */
export async function supabaseMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  const res = NextResponse.next();
  const url = req.nextUrl;
  const pathname = url.pathname;

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () =>
          req.cookies.getAll().map((c) => ({ name: c.name, value: c.value })),
        setAll: async (cookiesToSet) => {
          for (const { name, value, options } of cookiesToSet) {
            res.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtectedPath = [
    '/mall/mypage',
    '/mall/order/cart',
    '/settings',
    '/api',
    '/admin',
  ].some((protectedPath) => pathname.startsWith(protectedPath));

  // 로그인 안 된 사용자 보호 경로 접근 시 /login 으로
  if (!user && isProtectedPath) {
    const loginUrl = url.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  // 로그인한 사용자가 /login 또는 /signup 에 접근 시 /mall 으로 리다이렉트
  const isAuthPage =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname.startsWith('/login/') ||
    pathname.startsWith('/signup/');
  if (user && isAuthPage) {
    const mallUrl = url.clone();
    mallUrl.pathname = '/';
    return NextResponse.redirect(mallUrl);
  }

  // 관리자 경로 접근 시 권한 확인
  if (user && pathname.startsWith('/admin')) {
    const { data: profile, error } = await supabase
      .from('userinfo')
      .select('role')
      .eq('id', user.id)
      .single<UserInfo>();

    if (
      error ||
      !profile ||
      (profile.role !== 'admin' && profile.role !== 'readAdmin')
    ) {
      const unauthorizedUrl = url.clone();
      unauthorizedUrl.pathname = '/not-authorized';
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  return res;
}
