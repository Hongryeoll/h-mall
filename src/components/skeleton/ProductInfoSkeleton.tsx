'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProductInfoSkeleton({
  rowCount = 8,
}: {
  rowCount?: number;
}) {
  return (
    <div className="flex flex-col h-full px-4 py-4">
      {/* 상단 제목 */}
      <div className="pb-3 shrink-0">
        <Skeleton width={160} height={28} />
        <Skeleton width={260} height={16} className="mt-2" />
      </div>

      {/* 검색 및 필터 */}
      <div className="space-y-3 shrink-0">
        {/* 검색 바 */}
        <div className="flex gap-2 flex-wrap">
          <Skeleton width="60%" height={40} />
          <Skeleton width={80} height={40} />
          <Skeleton width={80} height={40} />
        </div>

        {/* 셀렉트박스 필터 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} height={40} />
          ))}
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-2 justify-between">
          <Skeleton width={100} height={36} />
          <Skeleton width={100} height={36} />
        </div>
      </div>

      {/* 테이블 */}
      <div className="flex-1 rounded-lg overflow-hidden mt-4">
        <div className="w-full h-full overflow-x-auto">
          <div className="min-w-[768px] h-full flex flex-col">
            {/* 헤더 */}
            <table className="table-fixed w-full">
              <thead className="bg-hr-gray-10">
                <tr className="h-10">
                  {[
                    '수정',
                    '대분류',
                    '중분류',
                    '소분류',
                    '상품명',
                    '등록일',
                  ].map((col, idx) => (
                    <th
                      key={idx}
                      className={`text-left px-2 text-xs sm:text-sm md:text-base font-hr-semi-bold text-hr-gray-60 ${
                        idx === 0 ? 'w-16' : idx === 4 ? 'w-48' : 'w-24'
                      }`}
                    >
                      <Skeleton width={50} />
                    </th>
                  ))}
                </tr>
              </thead>
            </table>

            {/* 바디 */}
            <div className="flex-1 overflow-y-auto">
              <table className="table-fixed w-full">
                <tbody className="divide-y divide-hr-gray-20">
                  {Array.from({ length: rowCount }).map((_, idx) => (
                    <tr key={idx} className="h-12">
                      <td className="w-16 px-2">
                        <Skeleton width={40} height={24} />
                      </td>
                      <td className="w-24 px-2">
                        <Skeleton width={60} />
                      </td>
                      <td className="w-24 px-2">
                        <Skeleton width={60} />
                      </td>
                      <td className="w-24 px-2">
                        <Skeleton width={60} />
                      </td>
                      <td className="w-48 px-2">
                        <Skeleton width="80%" />
                      </td>
                      <td className="w-24 px-2">
                        <Skeleton width={80} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="pt-3 shrink-0 flex justify-center">
        <Skeleton width={200} height={32} />
      </div>
    </div>
  );
}
