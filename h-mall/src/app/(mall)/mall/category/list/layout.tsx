'use client';

import type { ReactNode } from 'react';
import CategorySidebar from '@/components/category/CategorySidebar';
import CategorySubTabs from '@/components/category/CategorySubTabs';

type Props = { children: ReactNode };

export default function CategoryListLayout({ children }: Props) {
  return (
    <div className="flex h-full min-h-0">
      {/* CategorySidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-20 bg-white w-44 p-6 border-r
          transform transition-transform duration-200
          md:static md:translate-x-0 hidden md:block
        `}
      >
        <CategorySidebar />
      </aside>
      <main className="flex-1 flex flex-col h-full min-h-0">
        {/* CategorySubTabs */}
        <div className="px-6 pb-6 flex-1 flex flex-col overflow-auto">
          <CategorySubTabs />
          <div className="mt-6 flex-1 min-h-0">{children}</div>
        </div>
      </main>
    </div>
  );
}
