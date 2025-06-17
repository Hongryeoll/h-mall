// components/skeleton/SkeletonComponents.tsx
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import React from 'react';

// 1. 상품 카드 Skeleton
export function ProductCardSkeleton() {
  return (
    <div
      className={`
          mb-5 pb-3
          bg-white rounded-lg
          space-y-2
          animate-pulse
          cursor-default overflow-hidden
        `}
    >
      {/* 이미지 영역 Skeleton */}
      <div className="w-full bg-hr-gray-10 overflow-hidden">
        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
          {/* aspect-square 유지 */}
          <Skeleton width="100%" height={0} style={{ paddingTop: '100%' }} />
        </SkeletonTheme>
      </div>
      {/* 텍스트 정보 영역 */}
      <div className="px-1 space-y-1">
        {/* 브랜드 */}
        <Skeleton width="40%" height={16} />
        {/* 이름 (2줄 클램프) */}
        <div className="space-y-1">
          <Skeleton width="100%" height={14} />
          <Skeleton width="80%" height={14} />
        </div>
        {/* 원가(취소선) 자리 */}
        <Skeleton width="30%" height={14} />
        {/* 할인율 + 가격 flex */}
        <div className="flex justify-between items-baseline">
          <Skeleton width="15%" height={18} />
          <Skeleton width="25%" height={18} />
        </div>
        {/* 별점/리뷰 flex */}
        <div className="flex items-center gap-2">
          <Skeleton width="20%" height={14} />
          <Skeleton width="15%" height={14} />
        </div>
      </div>
    </div>
  );
}

// 2. 사이드바 항목 Skeleton
export function SidebarSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} height={20} />
      ))}
    </div>
  );
}

// 3. 서브탭 Skeleton
export function SubTabsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex space-x-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} width={80} height={32} />
      ))}
    </div>
  );
}

// 4. 상품 그리드 Skeleton
export function ProductGridSkeleton({ count = 24 }: { count?: number }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-4 px-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
