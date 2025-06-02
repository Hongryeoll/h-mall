'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
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
            (pathname.startsWith('/admin/product')
              ? 'bg-gray-100 font-medium'
              : 'hover:bg-gray-50')
          }
        >
          상품관리
        </Link>
        <Link
          href="/admin/banner"
          className={
            `block px-4 py-2 text-sm rounded-md ` +
            (pathname.startsWith('/admin/banner')
              ? 'bg-gray-100 font-medium'
              : 'hover:bg-gray-50')
          }
        >
          배너관리
        </Link>
        {/* 추가 메뉴 */}
      </nav>
    </aside>
  );
}
