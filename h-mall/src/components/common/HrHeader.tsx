'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { ROUTES } from '@/types/constants';
import SearchSVG from '@/assets/icons/search.svg';
import ShoppingBagSVG from '@/assets/icons/shopping-bag.svg';
import UserSVG from '@/assets/icons/user.svg';
import LoginSVG from '@/assets/icons/login.svg';
import LogoutSVG from '@/assets/icons/logout.svg';
import CogwheelSVG from '@/assets/icons/cogwhell.svg';
import { createSupabaseBrowserClient } from '@/library/client/supabase';

type TProps = {
  user?: User | null;
  className?: string;
  style?: React.CSSProperties;
  isHiddenLeftIcon?: boolean;
};

export const HrHeader = ({
  user,
  className = '',
  style = {},
  isHiddenLeftIcon = false,
}: TProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.id) {
        setRole(null);
        return;
      }
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase
        .from('userinfo')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!error && data?.role) {
        setRole(data.role);
      }
    };

    fetchRole();
  }, [user]);

  return (
    <div
      className={`
        sticky top-0 z-50 w-full flex items-center h-[56px] border-b border-gray-200 bg-hr-white px-4 ${className}
      `}
      style={style}
    >
      <div className="flex items-center">
        {!isHiddenLeftIcon && (
          <span className="p-3" onClick={() => router.push(ROUTES.HOME)}>
            <Image
              src="/images/h_logo.png"
              alt="logo"
              width={30}
              height={30}
              priority
            />
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <span
          className="inline-flex items-center gap-1 p-2 cursor-pointer"
          onClick={() => router.push(ROUTES.HOME)}
        >
          <SearchSVG width={18} height={18} className="text-hr-gray-80" />
          <span className="text-hr-c3 text-hr-gray-50 leading-none hidden lg:inline">
            SEARCH
          </span>
        </span>

        <span
          className="inline-flex items-center gap-1 p-2 cursor-pointer"
          onClick={() => router.push(ROUTES.MYPAGE)}
        >
          <UserSVG width={16} height={16} className="text-hr-gray-80" />
          <span className="text-hr-c3 text-hr-gray-50 leading-none hidden lg:inline">
            MY PAGE
          </span>
        </span>

        <span
          className="inline-flex items-center gap-1 p-2 cursor-pointer"
          onClick={() => router.push(ROUTES.CART)}
        >
          <ShoppingBagSVG width={16} height={16} className="text-hr-gray-80" />
          <span className="text-hr-c3 text-hr-gray-50 leading-none hidden lg:inline">
            SHOPPING BAG
          </span>
        </span>

        <span
          className="inline-flex items-center gap-1 p-2 cursor-pointer"
          onClick={async () => {
            if (user) {
              const supabase = createSupabaseBrowserClient();
              await supabase.auth.signOut();
              router.push(ROUTES.HOME);
              router.refresh();
            } else {
              router.push(ROUTES.LOGIN);
            }
          }}
        >
          {user ? (
            <>
              <LogoutSVG width={16} height={16} className="text-hr-gray-80" />
              <span className="text-hr-c3 text-hr-gray-50 leading-none hidden lg:inline">
                LOGOUT
              </span>
            </>
          ) : (
            <>
              <LoginSVG width={16} height={16} className="text-hr-gray-80" />
              <span className="text-hr-c3 text-hr-gray-50 leading-none hidden lg:inline">
                LOGIN
              </span>
            </>
          )}
        </span>

        {role === 'admin' && (
          <span
            className="inline-flex items-center gap-1 p-2 cursor-pointer text-red-600 font-semibold"
            onClick={() => router.push('/admin')}
          >
            <CogwheelSVG width={16} height={16} className="text-hr-gray-80" />
            <span className="text-hr-c3 leading-none hidden lg:inline">
              ADMIN
            </span>
          </span>
        )}
      </div>
    </div>
  );
};
