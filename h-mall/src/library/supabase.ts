import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import type { Database } from '@/types/supabase';
import { ROUTES } from '@/types/constants';

/**
 * 서버 전용 클라이언트
 * — Server Components, Server Actions, Route Handlers 에서 사용
 */
export async function createServerSupabaseClient(
  isServerComponent = false,
) {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * Supabase 에서 호출할 때마다 쿠키를 읽어서
         * { name, value } 배열 형태로 반환합니다.
         */
        getAll: async (): Promise<{ name: string; value: string }[]> => {
          const all = cookieStore.getAll();          // ReadonlyRequestCookies#getAll
          return all.map((c) => ({ name: c.name, value: c.value }));
        },

        /**
         * Supabase 가 갱신하라고 내려보낸 쿠키들을
         * 동기/비동기 상관없이 순회하며 set 해 줍니다.
         * RSC(Server Component) 모드일 땐 무시하도록 처리.
         */
        setAll: async (
          cookiesToSet: Array<{
            name: string;
            value: string;
            options?: any;
          }>
        ) => {
          if (isServerComponent) return;
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);  // ReadonlyRequestCookies#set
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
  let res = NextResponse.next();

  // Middleware 에서는 req.cookies 가 동기 API
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () =>
          req.cookies
            .getAll()
            .map((c) => ({ name: c.name, value: c.value })),

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

  if (!user && !req.nextUrl.pathname.startsWith('/login')) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return res;
}