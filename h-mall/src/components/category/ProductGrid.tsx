// components/category/ProductGrid.tsx
import Image from 'next/image';
import type { Tables } from '@/types/supabase';
import StarSvg from '@/assets/icons/star.svg';

type Props = {
  products: Tables<'products'>[];
  onClick?: (p: Tables<'products'>) => void;
};

export default function ProductGrid({ products, onClick }: Props) {
  return (
    <div
      className="
        grid
        grid-cols-[repeat(auto-fit,minmax(170px,340px))]
        gap-3 sm:gap-4 md:gap-6
        px-2 sm:px-4 md:px-8
        w-full max-w-screen-2xl mx-auto
      "
    >
      {products.map((product) => {
        const {
          id,
          product_images,
          brand,
          name,
          price,
          discount_rate,
          final_price,
          review_count,
          avg_rating,
        } = product;

        return (
          <div
            key={id}
            className="
              flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg transition
              border border-hr-gray-10 hover:border-hr-purple-default
              cursor-pointer overflow-hidden
              min-w-0 max-w-full
            "
            onClick={() => onClick?.(product)}
          >
            {/* 상품 이미지 */}
            <div className="relative w-full p-10 aspect-[1] bg-hr-gray-10 overflow-hidden">
              <Image
                src={product_images[0]}
                alt={`썸네일 이미지`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 340px"
              />
            </div>
            {/* 텍스트 정보 */}
            <div className="flex flex-col px-3 py-2 gap-1 flex-1 min-h-[120px]">
              <div className="font-hr-semi-bold text-hr-c1 text-hr-gray-50 truncate">
                {brand}
              </div>
              <div className="font-hr-semi-bold text-hr-b4 text-hr-gray-90 truncate line-clamp-2 min-h-[2.5em]">
                {name}
              </div>
              {/* 원가(취소선) */}
              {price && discount_rate && (
                <span className="text-hr-c1 text-hr-gray-40 line-through">
                  {price.toLocaleString()}
                </span>
              )}
              {/* 할인율 + 가격 */}
              <div className="flex justify-between items-baseline mt-1">
                {discount_rate && (
                  <span className="font-hr-bold text-hr-pink-default text-hr-b2">
                    {discount_rate}%
                  </span>
                )}
                <span className="font-hr-bold text-hr-gray-90 text-hr-b2">
                  {final_price?.toLocaleString()}
                </span>
              </div>
              {/* 별점/리뷰 */}
              <div className="flex justify-start items-center gap-2 mt-1 text-hr-c1">
                <span className="flex items-center gap-0.5 text-hr-yellow-default">
                  <StarSvg className="w-4 h-4 fill-hr-yellow-default" />
                  {avg_rating ?? 0}
                </span>
                <span className="text-hr-gray-40">({review_count ?? 0})</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
