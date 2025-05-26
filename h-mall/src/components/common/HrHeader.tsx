'use client';

import { usePathname, useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { ROUTES } from '@/types/constants';
import SearchSVG from '@/assets/icons/search.svg';
import ShoppingBagSVG from '@/assets/icons/shopping-bag.svg';
import UserSVG from '@/assets/icons/user.svg';
import LoginSVG from '@/assets/icons/login.svg'
import LogoutSVG from '@/assets/icons/logout.svg'

type TProps = {
  user?: User | null;
  className?: string; // 추가 클래스명
  style?: React.CSSProperties; // 추가 스타일
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

  return (
    <div
      className={`
        sticky top-0 z-50 w-full flex items-center h-[56px] border-b border-gray-200 bg-hr-white px-4 ${className}
      `}
      style={style}
    >
      {/* 왼쪽 로고 */}
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

      {/* 오른쪽 아이콘 묶음 */}
      <div className="flex items-center gap-2 ml-auto">
        {/* 1) 각 클릭 영역을 inline-flex 컨테이너로 바꾸고 */}
        {/* 2) 텍스트용 <div> 대신 inline 요소 <span> 사용 */}
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
          onClick={() => router.push(ROUTES.LOGIN)}
        >
          <LoginSVG width={16} height={16} className="text-hr-gray-80" />
          <span className="text-hr-c3 text-hr-gray-50 leading-none hidden lg:inline">
            LOGIN
          </span>
        </span>
      </div>
    </div>
  );
};
