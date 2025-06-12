'use client';

import { useSearchParams } from 'next/navigation';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import ProductGrid from '@/components/category/ProductGrid';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/types/constants';

export default function CategoryListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const subtabSlug = searchParams.get('sub') ?? undefined;
  const subsectionSlug = searchParams.get('subsection') ?? undefined;

  const { data: products, isLoading } = useFilteredProducts({
    subtabSlug,
    subsectionSlug,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (!products) return <p>상품이 없습니다.</p>;

  return (
    <div className="max-w-screen-xl mx-auto">
      <ProductGrid
        products={products}
        onClick={() => router.push(ROUTES.MALL_CATALOG)}
      />
    </div>
  );
}
