'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import CategorySidebar from '@/components/category/CategorySidebar';
import CategorySubTabs from '@/components/category/CategorySubTabs';
import { MEGA_MENU } from '@/data/megaMenu';
import UpSvg from '@/assets/icons/chevron-up.svg';
import DownSvg from '@/assets/icons/chevron-down.svg';
import { useSearchParams } from 'next/navigation';

type Props = { children: ReactNode };

export default function CategoryListLayout({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const params = useSearchParams();
  const category = params.get('category');
  const section = params.get('section');
  const subSection = params.get('subsection');

  const megaKey = category?.toUpperCase() as keyof typeof MEGA_MENU | undefined;
  const menuItem = megaKey ? MEGA_MENU[megaKey] : undefined;
  const sectionItem = menuItem?.sections.find((s) => s.slug === section);
  const subSectionItem = sectionItem?.links.find((l) => l.slug === subSection);

  const parts = [
    menuItem?.title,
    sectionItem?.title,
    subSectionItem?.label,
  ].filter(Boolean);
  const headingText = parts.length > 0 ? parts.join(' - ') : '카테고리';

  return (
    <div className="flex h-full min-h-0">
      {/* CategorySidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-20 bg-white w-64 p-6 border-r
          transform transition-transform duration-200
          md:static md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <CategorySidebar />
      </aside>
      <main className="flex-1 flex flex-col h-full min-h-0">
        <header className="md:hidden flex items-center justify-between p-4 border-b">
          <h1 className="font-bold">{headingText}</h1>
          <button
            aria-label="메뉴 열기"
            onClick={() => setIsOpen((v) => !v)}
            className="p-2 rounded hover:bg-gray-100"
          >
            {isOpen ? <UpSvg /> : <DownSvg />}
          </button>
        </header>
        {/* CategorySubTabs */}
        <div className="p-6 flex-1 flex flex-col overflow-auto">
          <CategorySubTabs />
          <div className="mt-6 flex-1 min-h-0">{children}</div>
        </div>
      </main>
    </div>
  );
}
