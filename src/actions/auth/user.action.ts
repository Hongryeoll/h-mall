import { createServerSupabaseClient } from '@/library/supabase';
import { UserProfile } from '@/types/user';

export const getUser = async ({ serverComponent = false }) => {
  const supabase = await createServerSupabaseClient(serverComponent);
  const user = await supabase.auth.getUser();
  return user?.data?.user;
};

export const getProfileById = async ({
  serverComponent = false,
  userId = '',
}): Promise<UserProfile | null> => {
  const supabase = await createServerSupabaseClient(serverComponent);
  const { data, error } = await supabase
    .from('userinfo')
    .select('id, email, role, nickname, created_at')
    .eq('id', userId)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    role: data.role,
  };
};
