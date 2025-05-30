import { supabaseMiddleware } from "@/library/supabase";
import { NextRequest } from "next/server";



export async function middleware(req: NextRequest) {
  return await supabaseMiddleware(req);
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/login/:path*",
    "/signup/:path*",
    "/mall/mypage",
    "/mall/mypage/:path*",
    "/mall/order/cart",
    "/mall/order/cart/:path*",
    "/admin",
    "/admin/:path*",
    "/api/:path*",
  ],
};