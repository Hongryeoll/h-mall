'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  count?: number;
};

export const ReviewSectionSkeleton = ({ count = 5 }: Props) => {
  return (
    <ul className="space-y-4">
      {Array.from({ length: count }).map((_, idx) => (
        <li key={idx} className="border border-hr-gray-10 rounded-md p-4">
          <div className="flex flex-col gap-4">
            {/* 상단 별점과 날짜 */}
            <div className="flex justify-between">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} circle width={16} height={16} />
                ))}
              </div>
              <Skeleton width={60} height={12} />
            </div>

            {/* 이메일, 옵션, 썸네일 */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <Skeleton width={120} height={14} />
                <Skeleton width={80} height={12} />
              </div>

              {/* 썸네일 (리스트 뷰) */}
              <Skeleton width={80} height={80} className="rounded-md" />
            </div>

            {/* 본문 내용 */}
            <div className="flex flex-col gap-2">
              <Skeleton count={2} height={12} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
