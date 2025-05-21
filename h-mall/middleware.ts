import { supabaseMiddleware } from "@/library/supabase";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  return await supabaseMiddleware(req);
}

export const config = {
  matcher: [
    // "/dashboard", // 인증 보호 필요 경로 추가
    "/mypage",
    "/settings",
    "/api/:path*"
  ],
};