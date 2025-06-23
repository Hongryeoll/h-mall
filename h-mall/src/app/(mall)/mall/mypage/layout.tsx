'use client';

import MypageSidebar from '@/components/mypage/MypageSidebar';

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* 사이드바 영역 */}
      <MypageSidebar />

      {/* 컨텐츠 영역 */}
      <main className="flex-1 p-4 md:p-8 bg-hr-white">{children}</main>
    </div>
  );
}
