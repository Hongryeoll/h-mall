import { supabaseMiddleware } from "@/library/supabase";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  return await supabaseMiddleware(req);
}

export const config = {
  matcher: [
    "/login",
    "/login/:path*",
    "/signup",
    "/signup/:path*",
    "/admin",
    "/admin/:path*",
    "/api/:path*"
  ],
};