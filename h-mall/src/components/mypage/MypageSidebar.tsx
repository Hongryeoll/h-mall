'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

type MenuItem = { label: string; href: string };

const sections: { title: string; items: MenuItem[] }[] = [
  {
    title: '나의 쇼핑정보',
    items: [
      { label: '주문내역 조회', href: '/mall/mypage/orders' },
      { label: '취소/교환/반품 내역', href: '/mall/mypage/cancellations' },
      { label: '상품 리뷰', href: '/mall/mypage/reviews' },
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
  const router = useRouter();

  // 모바일드롭다운 옵션용 flat list
  const options = sections.flatMap((sec) =>
    sec.items.map((it) => ({ ...it, group: sec.title }))
  );

  return (
    <aside className="bg-white border-b md:border-b-0 md:border-r md:w-64">
      {/* 모바일: select 네비 */}
      <div className="md:hidden p-4">
        <select
          className="w-full border-gray-200 rounded-md"
          value={pathname}
          onChange={(e) => router.push(e.target.value)}
        >
          <option value="" disabled>
            메뉴 선택
          </option>
          {options.map(({ label, href, group }) => (
            <option key={href} value={href}>
              {group} / {label}
            </option>
          ))}
        </select>
      </div>

      {/* 데스크탑: 섹션별 사이드바 */}
      <nav className="hidden md:block sticky top-0 h-screen overflow-auto p-6">
        {sections.map((sec) => (
          <div key={sec.title} className="mb-8">
            <h3 className="text-xl font-bold border-b pb-2 mb-4">
              {sec.title}
            </h3>
            <ul className="space-y-2">
              {sec.items.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`
                        block px-2 py-1 rounded transition-colors
                        ${
                          isActive
                            ? 'font-semibold text-hr-purple-default'
                            : 'text-hr-gray-50 hover:text-hr-gray-90'
                        }
                      `}
                    >
                      {label}
                    </Link>
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
