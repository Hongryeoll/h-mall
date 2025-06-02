// app/mall/category/layout.tsx
import type { ReactNode } from 'react';
import CategorySidebar from '@/components/category/CategorySidebar';
import CategorySubTabs from '@/components/category/CategorySubTabs';

type Props = {
  children: ReactNode;
  searchParams: {
    category?: string;
    section?: string;
    sub?: string;
  };
};

export default function CategoryListLayout({ children, searchParams }: Props) {
  return (
    <div className="flex h-full min-h-0">
      <aside className="w-64 border-r p-6 h-full">
        <CategorySidebar />
      </aside>
      <main className="flex-1 p-6 flex flex-col h-full min-h-0">
        <CategorySubTabs />
        <div className="mt-6 flex-1 min-h-0 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
