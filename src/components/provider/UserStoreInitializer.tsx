'use client';

import { useEffect } from 'react';
import {
  fetchUser,
  subscribeAuthListener,
  unsubscribeAuthListener,
} from '@/store/user/userService';
import { useUserStore } from '@/store/user/useUserStore';
import { UserProfile } from '@/types/user';

type Props = {
  user: UserProfile | null;
};

export default function UserStoreInitializer({ user }: Props) {
  const setUser = useUserStore((state) => state.setUser);
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    if (user) {
      setUser(user);
      setLoading(false);
    } else {
      fetchUser();
    }

    subscribeAuthListener();

    return () => {
      unsubscribeAuthListener();
    };
  }, [user, setUser, setLoading]);

  return null;
}
