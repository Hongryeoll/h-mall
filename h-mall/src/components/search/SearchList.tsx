'use client';

import { useInfiniteSearch } from '@/hooks/useInfiniteSearch';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HrSelectbox from '@/components/common/HrSelectbox';
import { ROUTES } from '@/types/constants';
import { ProductGridSkeleton } from '@/components/skeleton/ProductSkeletonComponents';

type Props = {
  keyword: string;
};

const sortOptions = [
  { label: '추천순', value: 'RECOMMEND' },
  { label: '가격 낮은순', value: 'PRICE_ASC' },
  { label: '가격 높은순', value: 'PRICE_DESC' },
  { label: '리뷰 많은순', value: 'REVIEW_DESC' },
  { label: '리뷰 적은순', value: 'REVIEW_ASC' },
  { label: '할인율 높은순', value: 'DISCOUNT_DESC' },
  { label: '할인율 낮은순', value: 'DISCOUNT_ASC' },
];

export default function SearchList({ keyword }: Props) {
  const [sort, setSort] = useState('RECOMMEND');
  const { ref, inView } = useInView();
  const router = useRouter();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteSearch(keyword, sort);

  const products = data?.pages.flatMap((page) => page.products) ?? [];

  // 스크롤 하단 감지하면 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-hr-b2 text-hr-gray-50">검색 중...</div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProductGridSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }
  if (isError) return <div className="p-4">에러가 발생했습니다.</div>;
  if (!products.length) return <div className="p-4">검색 결과가 없습니다.</div>;

  return (
    <div className="p-4">
      {/* 상단 */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-hr-b2 text-hr-gray-50">
          총 <span className="font-bold">{products.length}</span>개의 상품
        </div>
        <HrSelectbox
          value={sort}
          onChange={setSort}
          options={sortOptions}
          className="w-40"
        />
      </div>

      {/* 상품 목록 */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3 sm:gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-hr-gray-20 rounded-md p-2 cursor-pointer hover:shadow-md space-y-1"
            onClick={() => router.push(ROUTES.MALL_CATALOG(product.id))}
          >
            <div className="relative w-full aspect-square bg-gray-100 rounded overflow-hidden">
              <Image
                src={product.product_images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-hr-c1 text-hr-gray-50 truncate">
              {product.brand}
            </div>
            <div className="text-hr-b3 font-hr-semi-bold line-clamp-2">
              {product.name}
            </div>
            <div className="text-hr-b3 font-hr-bold">
              {product.final_price.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>

      {/* 무한스크롤 트리거 */}
      {hasNextPage && (
        <div ref={ref} className="mt-6 text-center">
          {isFetchingNextPage ? '불러오는 중...' : '스크롤하여 더 보기'}
        </div>
      )}
    </div>
  );
}
