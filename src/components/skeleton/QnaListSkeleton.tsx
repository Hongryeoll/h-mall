'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  rowCount?: number;
};

export default function QnaListSkeleton({ rowCount = 4 }: Props) {
  return (
    <section className="px-4 py-6">
      <h1 className="text-hr-h4 font-hr-semi-bold mb-6">
        <Skeleton width={180} height={28} />
      </h1>

      {/* 데스크탑 테이블 스켈레톤 */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full bg-white shadow rounded-lg">
            <thead className="bg-hr-gray-5">
              <tr>
                {['상품정보', '문의내용', '상태', '작성일'].map(
                  (header, idx) => (
                    <th
                      key={idx}
                      className="py-3 px-4 text-left text-hr-gray-70"
                    >
                      <Skeleton width={60} />
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rowCount }).map((_, idx) => (
                <tr key={idx} className="border-b">
                  {/* 상품정보 */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Skeleton width={50} height={50} />
                      <Skeleton width={120} height={16} />
                    </div>
                  </td>
                  {/* 문의내용 */}
                  <td className="py-4 px-4">
                    <Skeleton width="100%" height={16} />
                  </td>
                  {/* 상태 */}
                  <td className="py-4 px-4 text-center">
                    <Skeleton width={60} height={16} />
                  </td>
                  {/* 작성일 */}
                  <td className="py-4 px-4 text-center">
                    <Skeleton width={80} height={16} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 모바일 카드형 스켈레톤 */}
      <div className="sm:hidden space-y-4">
        {Array.from({ length: rowCount }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded-lg overflow-hidden border p-4"
          >
            <div className="flex gap-3">
              <Skeleton width={70} height={70} />

              <div className="flex-1 space-y-2">
                <Skeleton width="40%" height={14} /> {/* 날짜 */}
                <Skeleton width="70%" height={16} /> {/* 상품명 */}
                <Skeleton width="100%" height={14} /> {/* 문의내용 */}
                <Skeleton width="30%" height={14} /> {/* 상태 */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
