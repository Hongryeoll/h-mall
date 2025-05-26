'use client';

import { usePathname, useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { ROUTES } from '@/types/constants';
// import SearchSVG from 'public/icons/search.svg';
import SearchSVG from '@/assets/icons/search.svg';
import CartSVG from '@/assets/icons/cart.svg';
import UserSVG from '@/assets/icons/user.svg';

type TProps = {
  user?: User | null;
  // title?: string | JSX.Element; // 헤더 제목 (기본값: ROUTE_TITLES 사용)
  // leftIcon?: React.ReactNode; // 왼쪽 아이콘
  // onHomeClick?: () => void; // 왼쪽 아이콘 클릭 핸들러
  // rightIcon?: React.ReactNode; // 오른쪽 아이콘
  className?: string; // 추가 클래스명
  style?: React.CSSProperties; // 추가 스타일
  isHiddenLeftIcon?: boolean;
};

export const HrHeader = ({
  user,
  // title,
  // leftIcon,
  // onHomeClick,
  // rightIcon,
  className = '',
  style = {},
  isHiddenLeftIcon = false,
}: TProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`relative flex items-center h-[56px] border-b border-gray-200 bg-hr-white px-4 ${className}`}
      style={style}
    >
      {/* 왼쪽 아이콘 묶음 */}
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
        <span className="p-2" onClick={() => router.push(ROUTES.HOME)}>
          <SearchSVG width={20} height={20} className="text-hr-gray-80" />
        </span>
        {/* <span className="p-2" onClick={() => router.push(ROUTES.HOME)}>
          좋아요
        </span> */}
        <span className="p-2" onClick={() => router.push(ROUTES.HOME)}>
          <UserSVG width={20} height={20} className="text-hr-gray-80" />
        </span>
        <span className="p-2" onClick={() => router.push(ROUTES.HOME)}>
          <CartSVG width={20} height={20} className="text-hr-gray-80" />
        </span>
      </div>
    </div>
  );
};
