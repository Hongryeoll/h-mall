'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ROUTES } from '@/types/constants';
import SearchSVG from '@/assets/icons/search.svg';
import ShoppingBagSVG from '@/assets/icons/shopping-bag.svg';
import UserSVG from '@/assets/icons/user.svg';
import LoginSVG from '@/assets/icons/login.svg';
import LogoutSVG from '@/assets/icons/logout.svg';
import CogwheelSVG from '@/assets/icons/cogwhell.svg';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { HrHeaderSkeleton } from '@/components/skeleton/HrHeaderSkeleton';
import SearchModal from '@/components/search/SearchModal';
import { useState } from 'react';
import { useUserStore } from '@/store/user/useUserStore';

type Props = {
  className?: string;
  style?: React.CSSProperties;
  isHiddenLeftIcon?: boolean;
};

export const HrHeader = ({
  className = '',
  style = {},
  isHiddenLeftIcon = false,
}: Props) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const loading = useUserStore((state) => state.loading);
  const role = useUserStore((state) => state.user?.role);
  const [openSearch, setOpenSearch] = useState(false);

  if (loading) {
    return (
      <HrHeaderSkeleton showAdmin={role === 'admin' || role === 'readAdmin'} />
    );
  }

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
          // onClick={() => router.push(ROUTES.HOME)}
          onClick={() => setOpenSearch(true)}
        >
          <SearchSVG width={18} height={18} className="text-hr-gray-80" />
          <span className="text-hr-c3 text-hr-gray-50 leading-none hidden lg:inline">
            SEARCH
          </span>
        </span>
        {openSearch && <SearchModal onClose={() => setOpenSearch(false)} />}

        <span
          className="inline-flex items-center gap-1 p-2 cursor-pointer"
          onClick={() => router.push(ROUTES.MALL_MYPAGE)}
        >
          <UserSVG width={16} height={16} className="text-hr-gray-80" />
          <span className="text-hr-c3 text-hr-gray-50 leading-none hidden lg:inline">
            MY PAGE
          </span>
        </span>

        <span
          className="inline-flex items-center gap-1 p-2 cursor-pointer"
          onClick={() => router.push(ROUTES.MALL_CART)}
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

        {(role === 'admin' || role === 'readAdmin') && (
          <span
            className="inline-flex items-center gap-1 p-2 cursor-pointer text-hr-danger-default font-hr-semi-bold"
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
