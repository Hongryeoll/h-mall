'use client';

import { useSearchParams } from 'next/navigation';
import CategorySidebar from './CategorySidebar';

export default function SidebarWrapper() {
  const params = useSearchParams();
  const sectionSlug = params.get('section');

  const isShowSidebar = !!sectionSlug;

  if (!isShowSidebar) return null;

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-20 bg-white w-44 p-6 border-r
        transform transition-transform duration-200
        md:static md:translate-x-0 hidden md:block
      `}
    >
      <CategorySidebar />
    </aside>
  );
}
