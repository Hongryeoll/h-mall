// src/app/(admin)/admin/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex overflow-hidden ">
      {/* sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <span className="text-2xl font-semibold">Admin Panel</span>
        </div>
        <nav className="flex flex-col px-2 py-4 space-y-1">
          <Link
            href="/admin/dashboard"
            className={
              `block px-4 py-2 text-sm rounded-md ` +
              (pathname.startsWith('/admin/dashboard')
                ? 'bg-gray-100 font-medium'
                : 'hover:bg-gray-50')
            }
          >
            대시보드
          </Link>
          <Link
            href="/admin/users"
            className={
              `block px-4 py-2 text-sm rounded-md ` +
              (pathname.startsWith('/admin/users')
                ? 'bg-gray-100 font-medium'
                : 'hover:bg-gray-50')
            }
          >
            유저
          </Link>
          <Link
            href="/admin/product"
            className={
              `block px-4 py-2 text-sm rounded-md ` +
              (pathname.startsWith('/admin/users')
                ? 'bg-gray-100 font-medium'
                : 'hover:bg-gray-50')
            }
          >
            상품관리
          </Link>
          <Link
            href="/admin/product"
            className={
              `block px-4 py-2 text-sm rounded-md ` +
              (pathname.startsWith('/admin/users')
                ? 'bg-gray-100 font-medium'
                : 'hover:bg-gray-50')
            }
          >
            배너관리
          </Link>

          {/* 더 많은 메뉴가 필요하다면 이 아래에 같은 형식으로 추가 */}
        </nav>
      </aside>

      {/* main */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
