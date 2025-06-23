'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { createSupabaseBrowserClient } from '@/library/client/supabase';

export type UserProfile = {
  id: string;
  email: string;
  role: string;
};

type UserContextType = {
  user: UserProfile | null;
  loading: boolean;
  role: string;
  refresh: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be used within UserProvider');
  return ctx;
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
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
      .select('id,email,role')
      .eq('id', authUser.id)
      .single();

    if (!profile) {
      setUser(null);
      setLoading(false);
      return;
    }

    setUser(profile as UserProfile);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchUser]);

  const refresh = useCallback(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider
      value={{ user, loading, role: user?.role || '', refresh }}
    >
      {children}
    </UserContext.Provider>
  );
}
