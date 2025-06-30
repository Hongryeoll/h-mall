'use client';

import MypageSidebar from '@/components/mypage/MypageSidebar';

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full md:flex-row w-full min-h-0">
      {/* 사이드바 영역 */}
      <MypageSidebar />

      {/* 컨텐츠 영역 */}
      <main className="flex-1 flex flex-col h-full min-h-0 bg-hr-white">
        {children}
      </main>
    </div>
  );
}
