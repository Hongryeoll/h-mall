'use client';

import { useSearch } from '@/hooks/useSearch';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HrSelectbox from '@/components/common/HrSelectbox';
import { ROUTES } from '@/types/constants';

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
  const { products, isLoading, fetchError } = useSearch(keyword, sort);
  const router = useRouter();

  if (isLoading) return <div className="p-4">검색 중...</div>;
  if (fetchError) return <div className="p-4">에러가 발생했습니다.</div>;
  if (!products || products.length === 0)
    return <div className="p-4">검색 결과가 없습니다.</div>;

  return (
    <div className="p-4">
      {/* 상단 정렬 및 개수 */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-hr-b2 text-gray-500">
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
      <div
        className={`
          grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))]
          gap-3 sm:gap-4
        `}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className={`
              border border-hr-gray-20 rounded-md p-2
              cursor-pointer hover:shadow-md
              space-y-1
            `}
            onClick={() => router.push(ROUTES.MALL_CATALOG(product.id))}
          >
            {/* 이미지 */}
            <div className="relative w-full aspect-square bg-gray-100 rounded overflow-hidden">
              {product.product_images?.[0] && (
                <Image
                  src={product.product_images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* 브랜드 */}
            <div className="text-hr-c1 text-gray-500 truncate">
              {product.brand}
            </div>

            {/* 상품명 */}
            <div className="text-hr-b3 font-semibold line-clamp-2">
              {product.name}
            </div>

            {/* 가격 */}
            <div className="text-hr-b3 font-bold">
              {product.final_price?.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
