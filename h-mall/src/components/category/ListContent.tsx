'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { useInfiniteFilteredProducts } from '@/hooks/useInfiniteFilteredProducts';
import ProductGrid from '@/components/category/ProductGrid';
import { ROUTES } from '@/types/constants';
import { ProductGridSkeleton } from '@/components/skeleton/ProductSkeletonComponents';

export default function ListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { ref, inView } = useInView();

  const categorySlug = searchParams.get('category') ?? undefined;
  const sectionSlug = searchParams.get('section') ?? undefined;
  const subsectionSlug = searchParams.get('subsection') ?? undefined;
  const subtabSlug = searchParams.get('sub') ?? undefined;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteFilteredProducts({
      categorySlug,
      sectionSlug,
      subsectionSlug,
      subtabSlug,
    });

  const products = data?.pages.flatMap((page) => page.products) ?? [];

  const multiply = 20; // ✅ 데이터를 5배로 늘리기

  const multipliedProducts = Array.from({ length: multiply }).flatMap(
    () => products
  );

  // 무한스크롤 트리거
  if (inView && hasNextPage) {
    fetchNextPage();
  }

  if (isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto">
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-center py-10">상품이 없습니다.</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <ProductGrid
        products={multipliedProducts}
        onClick={(p) => {
          router.push(ROUTES.MALL_CATALOG(p.id));
        }}
      />
      {/* 무한스크롤 감지 영역 */}
      {hasNextPage && (
        <div ref={ref} className="py-6 text-center">
          {isFetchingNextPage ? '불러오는 중...' : '스크롤하여 더 보기'}
        </div>
      )}
    </div>
  );
}
