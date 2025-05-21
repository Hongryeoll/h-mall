import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";

/** 브라우저 전용 클라이언트 (Client Components) */
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}