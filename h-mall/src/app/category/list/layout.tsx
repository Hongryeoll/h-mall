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
    <div className="flex min-h-screen">
      {/* ── 좌측 사이드바 ───────────────────── */}
      <aside className="w-64 border-r p-6">
        <CategorySidebar />
      </aside>
      {/* ── 메인 콘텐츠 ─────────────────────── */}
      <main className="flex-1 p-6">
        {/* 상단 서브탭 (전체, NEW, EXCLUSIVE 등) */}
        <CategorySubTabs />
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}
