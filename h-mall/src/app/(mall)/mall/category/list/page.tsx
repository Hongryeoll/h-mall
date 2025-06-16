'use client';

import { useSearchParams } from 'next/navigation';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import ProductGrid from '@/components/category/ProductGrid';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/types/constants';
import { ProductGridSkeleton } from '@/components/skeleton/ProductSkeletonComponents';
import { Tables } from '@/types/supabase';

export default function CategoryListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categorySlug = searchParams.get('category') ?? undefined;
  const sectionSlug = searchParams.get('section') ?? undefined;
  const subsectionSlug = searchParams.get('subsection') ?? undefined;
  const subtabSlug = searchParams.get('sub') ?? undefined;

  const { data: products, isLoading } = useFilteredProducts({
    categorySlug,
    sectionSlug,
    subsectionSlug,
    subtabSlug,
  });

  if (isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto">
        <ProductGridSkeleton count={products} />
      </div>
    );
  }
  if (!products || products.length === 0) {
    return <p className="text-center py-10">상품이 없습니다.</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <ProductGrid
        products={products}
        onClick={() => router.push(ROUTES.MALL_CATALOG)}
      />
    </div>
  );
}
