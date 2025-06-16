// components/skeleton/SkeletonComponents.tsx
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import React from 'react';

// 1. 상품 카드 Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl p-2 animate-pulse">
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <Skeleton width="100%" height={0} style={{ paddingTop: '100%' }} />
      </SkeletonTheme>
      <div className="mt-2 space-y-1">
        <Skeleton width={60} height={16} />
        <Skeleton count={2} height={14} />
        <Skeleton width={80} height={18} />
        <Skeleton width={40} height={14} />
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
