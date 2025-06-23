// app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/library/supabase";

export async function GET(request: Request) {
  const redirectHome = process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME!;
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const nextPath = searchParams.get("next") ?? "";

  // auth 페이지 URL을 origin 기반으로 직접 지정
  // const authPage = `${origin}/auth`;
  const authPage = `${origin}/login`;

  // const supabase = await createServerSupabaseClient();
  const supabase = await createServerSupabaseClient();

  if (code) {
    // ── 로그인 콜백 ──
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      // 교환 실패하면 auth 페이지로
      return NextResponse.redirect(authPage);
    }
    // 성공하면 nextPath가 있으면 home+next, 없으면 home
    const homeTarget = nextPath ? `${redirectHome}${nextPath}` : redirectHome;
    return NextResponse.redirect(homeTarget);
  } else {
    // ── 로그아웃 분기 ──
    await supabase.auth.signOut();
    // 항상 auth 페이지로만 리다이렉트
    return NextResponse.redirect(authPage);
  }
}