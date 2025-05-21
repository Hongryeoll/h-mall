import { createServerSupabaseClient } from "@/library/supabase";

export const getUser = async ({ serverComponent = false }) => {
  const supabase = await createServerSupabaseClient(serverComponent);
  const user = await supabase.auth.getUser();
  return user?.data?.user;
};

export const getProfileById = async ({
  serverComponent = false,
  userId = "",
}) => {
  const supabase = await createServerSupabaseClient(serverComponent);
  const profile = await supabase.from("profiles").select("*").eq("id", userId);
  return profile?.data?.[0];
};