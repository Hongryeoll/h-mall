// /store/userService.ts

import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { useUserStore } from '@/store/user/useUserStore';

const supabase = createSupabaseBrowserClient();

let subscription:
  | ReturnType<typeof supabase.auth.onAuthStateChange>['data']['subscription']
  | null = null;

// 유저 정보 불러오기
export const fetchUser = async () => {
  const { setUser, setLoading } = useUserStore.getState();
  setLoading(true);

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    setUser(null);
    setLoading(false);
    return;
  }

  const { data: profile } = await supabase
    .from('userinfo')
    .select('id, email, role')
    .eq('id', authUser.id)
    .single();

  if (!profile) {
    setUser(null);
    setLoading(false);
    return;
  }

  setUser(profile);
  setLoading(false);
};

// Supabase 구독 시작
export const subscribeAuthListener = () => {
  unsubscribeAuthListener();

  subscription = supabase.auth.onAuthStateChange(() => {
    fetchUser();
  }).data.subscription;
};

// 구독 해제
export const unsubscribeAuthListener = () => {
  if (subscription) {
    subscription.unsubscribe();
    subscription = null;
  }
};
