'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  rowCount?: number;
};

export default function OrderListSkeleton({ rowCount = 3 }: Props) {
  return (
    <section className="px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">
        <Skeleton width={160} height={28} />
      </h1>

      {/* 데스크탑: 테이블 스켈레톤 */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                {[
                  '상품정보',
                  '결제수단',
                  '배송비',
                  '결제금액',
                  '주문일자',
                  '리뷰',
                ].map((title, idx) => (
                  <th key={idx} className="py-3 px-2 text-left text-hr-gray-70">
                    <Skeleton width={60} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rowCount }).map((_, idx) => (
                <tr key={idx} className="border-b">
                  {Array.from({ length: 6 }).map((__, i) => (
                    <td key={i} className="py-4 px-2">
                      <Skeleton height={20} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 모바일: 카드형 스켈레톤 */}
      <div className="sm:hidden space-y-4">
        {Array.from({ length: rowCount }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded-lg overflow-hidden p-4 space-y-3"
          >
            <Skeleton width="60%" height={20} />
            <Skeleton width="40%" height={16} />
            <Skeleton width="80%" height={16} />
            <div className="flex justify-between">
              <Skeleton width="40%" height={18} />
              <Skeleton width="30%" height={18} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
