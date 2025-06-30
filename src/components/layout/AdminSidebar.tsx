'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  const menus = [
    { href: '/admin/dashboard', label: '대시보드' },
    { href: '/admin/users', label: '유저' },
    { href: '/admin/product', label: '상품관리' },
    { href: '/admin/banner', label: '배너관리' },
  ];

  return (
    <aside className="w-64 h-full flex flex-col bg-white border-r border-hr-gray-20">
      {onClose && (
        <div className="flex justify-end p-2 lg:hidden">
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6 text-hr-gray-50 hover:text-hr-gray-70" />
          </button>
        </div>
      )}

      {/* 헤더 */}
      <div className="mt-4 px-5 py-5 border-b border-hr-gray-20">
        <span className="text-lg md:text-xl font-hr-bold text-hr-gray-80">
          Admin Dashboard
        </span>
      </div>

      {/* 네비게이션 */}
      <nav className="flex flex-col px-3 py-4 gap-1 text-hr-b4 sm:text-sm text-hr-gray-60">
        {menus.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={`block px-4 py-2 rounded-md transition 
              ${
                pathname.startsWith(href)
                  ? 'bg-hr-gray-10 font-hr-semi-bold text-hr-gray-80'
                  : 'hover:bg-hr-gray-5'
              }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
