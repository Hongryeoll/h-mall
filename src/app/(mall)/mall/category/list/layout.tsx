import React, { ReactNode, Suspense } from 'react';
import SidebarWrapper from '@/components/category/SidebarWrapper';
import CategorySubTabs from '@/components/category/CategorySubTabs';

type Props = { children: ReactNode };

export default function CategoryListLayout({ children }: Props) {
  return (
    <div className="flex h-full min-h-0">
      {/* Sidebar: 내부에서 useSearchParams()를 쓰는 클라이언트 컴포넌트 */}
      <Suspense fallback={<div>사이드바 로딩 중…</div>}>
        <SidebarWrapper />
      </Suspense>

      <main className="flex-1 flex flex-col h-full min-h-0">
        {/* SubTabs: 내부에서 useSearchParams()를 쓰는 클라이언트 컴포넌트 */}
        <div className="flex-1 flex flex-col overflow-auto">
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
