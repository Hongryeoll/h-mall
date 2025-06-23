import React, { Suspense } from 'react';
import { ProductGridSkeleton } from '@/components/skeleton/ProductSkeletonComponents';
import CategoryListContent from '@/components/category/CategoryListContent';

export default function CategoryListPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-screen-xl mx-auto p-6">
          <ProductGridSkeleton count={8} />
        </div>
      }
    >
      <CategoryListContent />
    </Suspense>
  );
}
