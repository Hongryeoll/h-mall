// app/(mall)/mall/category/list/layout.tsx
import React, { ReactNode, Suspense } from 'react';
import CategorySidebar from '@/components/category/CategorySidebar';
import CategorySubTabs from '@/components/category/CategorySubTabs';

type Props = { children: ReactNode };

export default function CategoryListLayout({ children }: Props) {
  return (
    <div className="flex h-full min-h-0">
      {/* Sidebar: 내부에서 useSearchParams()를 쓰는 클라이언트 컴포넌트 */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-20 bg-white w-44 p-6 border-r
          transform transition-transform duration-200
          md:static md:translate-x-0 hidden md:block
        `}
      >
        <Suspense fallback={<div>사이드바 로딩 중…</div>}>
          <CategorySidebar />
        </Suspense>
      </aside>

      <main className="flex-1 flex flex-col h-full min-h-0">
        {/* SubTabs: 내부에서 useSearchParams()를 쓰는 클라이언트 컴포넌트 */}
        <div className="px-6 pb-6 flex-1 flex flex-col overflow-auto">
          <Suspense fallback={<div>탭 로딩 중…</div>}>
            <CategorySubTabs />
          </Suspense>

          {/* 실제 페이지 콘텐츠 */}
          <div className="mt-6 flex-1 min-h-0">{children}</div>
        </div>
      </main>
    </div>
  );
}
