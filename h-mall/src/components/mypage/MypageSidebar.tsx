'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/types/constants';
import UpSvg from '@/assets/icons/chevron-up.svg';
import DownSvg from '@/assets/icons/chevron-down.svg';

type MenuItem = { label: string; href: string };
type Section = { title: string; items: MenuItem[] };

const sections: Section[] = [
  {
    title: '나의 쇼핑정보',
    items: [
      { label: '주문내역 조회', href: ROUTES.MALL_MYPAGE_ORDERS },
      { label: '취소/교환/반품 내역', href: '/mall/mypage/cancellations' },
      { label: '상품 리뷰', href: ROUTES.MALL_MYPAGE_REVIEWS },
      { label: '증빙서류 발급', href: '/mall/mypage/documents' },
    ],
  },
  {
    title: '나의 계정정보',
    items: [
      { label: '회원정보수정', href: '/mall/mypage/profile' },
      { label: '회원등급', href: '/mall/mypage/level' },
      { label: '쿠폰', href: '/mall/mypage/coupons' },
      { label: '마일리지', href: '/mall/mypage/mileage' },
    ],
  },
  {
    title: '고객센터',
    items: [
      { label: '1:1 문의', href: '/mall/mypage/support' },
      { label: '공지사항', href: '/mall/mypage/notice' },
      { label: 'FAQ', href: '/mall/mypage/faq' },
    ],
  },
];

export default function MypageSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 허용된 메뉴(클릭/호버 가능)만 골라내는 헬퍼
  const isEnabled = (href: string) =>
    href === ROUTES.MALL_MYPAGE_ORDERS || href === ROUTES.MALL_MYPAGE_REVIEWS;

  return (
    <aside className="bg-white border-b md:border-b-0 md:border-r w-full md:w-64">
      {/* 모바일 */}
      <div className="block md:hidden p-4 relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex justify-between items-center px-4 py-2 rounded-md bg-hr-white text-hr-gray-80"
        >
          <span className="font-medium">마이페이지 메뉴</span>
          {open ? (
            <UpSvg className="w-5 h-5 text-hr-gray-50" />
          ) : (
            <DownSvg className="w-5 h-5 text-hr-gray-50" />
          )}
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-hr-white shadow-lg rounded-md z-20">
            <nav className="p-4 space-y-4">
              {sections.map((sec) => (
                <div key={sec.title}>
                  <h4 className="px-2 py-1 text-hr-b4 font-hr-semi-bold text-hr-gray-70 border-b border-hr-gray-20">
                    {sec.title}
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {sec.items.map(({ label, href }) => {
                      const enabled = isEnabled(href);
                      const isActive = pathname === href;
                      return (
                        <li key={href}>
                          {enabled ? (
                            <Link
                              href={href}
                              onClick={() => setOpen(false)}
                              className={`block px-2 py-1 rounded transition
                          ${
                            isActive
                              ? 'font-hr-semi-bold text-hr-purple-default bg-hr-gray-10'
                              : 'text-hr-gray-60 hover:text-hr-gray-90 hover:bg-hr-gray-5'
                          }
                        `}
                            >
                              {label}
                            </Link>
                          ) : (
                            <span className="block px-2 py-1 rounded text-hr-gray-40 cursor-default">
                              {label}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* 데스크탑 */}
      <nav className="hidden md:block sticky top-0 h-screen overflow-auto p-6">
        {sections.map((sec) => (
          <div key={sec.title} className="mb-8">
            <h3 className="text-hr-h5 font-hr-bold border-b pb-2 mb-4">
              {sec.title}
            </h3>
            <ul className="space-y-2">
              {sec.items.map(({ label, href }) => {
                const enabled = isEnabled(href);
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    {enabled ? (
                      <Link
                        href={href}
                        className={`
                         block px-2 py-1 rounded transition-colors
                         ${
                           isActive
                             ? 'font-hr-semi-bold text-hr-purple-default'
                             : 'text-hr-gray-50 hover:text-hr-gray-90'
                         }
                       `}
                      >
                        {label}
                      </Link>
                    ) : (
                      <span className="block px-2 py-1 rounded text-hr-gray-40 cursor-default">
                        {label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
