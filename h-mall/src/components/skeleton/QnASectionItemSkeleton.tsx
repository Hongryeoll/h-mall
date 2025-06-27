'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  isExpanded?: boolean; // 펼침 상태 여부 (선택)
};

export const QnASectionItemSkeleton = ({ isExpanded = false }: Props) => {
  return (
    <div className="border rounded p-4">
      {/* 헤더 */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          {/* 이메일 */}
          <Skeleton width={120} height={14} />

          {/* 카테고리 */}
          <Skeleton width={60} height={10} />

          {/* 질문 내용 */}
          <Skeleton count={2} height={12} width="100%" />
        </div>

        <div className="flex flex-col items-end min-w-[80px] gap-1">
          {/* 작성일 */}
          <Skeleton width={60} height={10} />
          {/* 상태 뱃지 */}
          <Skeleton width={50} height={16} borderRadius={8} />
        </div>
      </div>

      {/* 본문 - 펼침 상태일 때 */}
      {isExpanded && (
        <div className="mt-4 space-y-3">
          {/* 수정/삭제 버튼 */}
          <div className="flex gap-2">
            <Skeleton width={40} height={14} />
            <Skeleton width={40} height={14} />
          </div>

          {/* 답변 박스 */}
          <div className="bg-neutral-50 border rounded p-3">
            <Skeleton width={80} height={10} />
            <Skeleton count={2} height={12} width="100%" className="mt-2" />
          </div>
        </div>
      )}
    </div>
  );
};
