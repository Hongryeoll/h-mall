'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import ProductGrid from '@/components/category/ProductGrid';
import { ROUTES } from '@/types/constants';
import { ProductGridSkeleton } from '@/components/skeleton/ProductSkeletonComponents';
import type { ProductFormProps } from '@/types/products';

export default function CategoryListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categorySlug = searchParams.get('category') ?? undefined;
  const sectionSlug = searchParams.get('section') ?? undefined;
  const subsectionSlug = searchParams.get('subsection') ?? undefined;
  const subtabSlug = searchParams.get('sub') ?? undefined;

  const { data: products = [], isLoading } = useFilteredProducts({
    categorySlug,
    sectionSlug,
    subsectionSlug,
    subtabSlug,
  });

  if (isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto p-6">
        <ProductGridSkeleton count={products.length || 8} />
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-center py-10">상품이 없습니다.</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <ProductGrid
        products={products}
        onClick={(p: ProductFormProps) => {
          router.push(ROUTES.MALL_CATALOG(p.id));
        }}
      />
    </div>
  );
}
