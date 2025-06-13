'use client';

import AdminSidebar from '@/components/layout/AdminSidebar';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import QueryProvider from '@/components/provider/QueryProvider';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full overflow-hidden">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* 모바일 사이드바 */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-50 w-64 bg-white h-full shadow-lg">
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* main 영역 */}
      <main className="flex-1 flex flex-col h-full bg-white overflow-auto">
        <div className="p-3 lg:hidden bg-white">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-hr-gray-60 hover:text-hr-gray-80"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        {/* children */}
        <div className="flex-1 p-4 sm:p-5 md:p-6">
          <QueryProvider>{children}</QueryProvider>
        </div>
      </main>
    </div>
  );
}
