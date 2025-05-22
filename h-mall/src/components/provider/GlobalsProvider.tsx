// src/components/GlobalsProvider.tsx
'use client';

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HeroUIProvider } from '@heroui/react';
import { usePathname, useRouter } from 'next/navigation';

type GlobalsContextProps = {
  user: User | null;
  refreshUser: () => Promise<void>;
};

const defaultValue: GlobalsContextProps = {
  user: null,
  refreshUser: async () => {},
};

export const GlobalsContext = createContext<GlobalsContextProps>(defaultValue);

export const useGlobals = () => useContext(GlobalsContext);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

export default function GlobalsProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const pathname = usePathname();

  const refreshUser = useCallback(async () => {
    const { data, error } = await supabase.auth.getUser();
    setUser(data.user ?? null);
  }, [supabase]);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalsContext.Provider value={{ user, refreshUser }}>
        <HeroUIProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </HeroUIProvider>
      </GlobalsContext.Provider>
    </QueryClientProvider>
  );
}
