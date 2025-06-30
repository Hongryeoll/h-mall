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
      className={`
        grid
        grid-cols-[repeat(auto-fill,minmax(170px,1fr))]
        gap-4 sm:gap-6 md:gap-8
        px-4 sm:px-6 md:px-8
        w-full mx-auto
      `}
    >
      {products.map((product, idx) => {
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
            key={`${id}-${idx}`}
            role="button"
            className={`
              mb-5 pb-3 sm:mb-10
              bg-white rounded-lg hover:shadow-lg transition-colors
              hover:border-hr-purple-default border border-hr-gray-20
              cursor-pointer overflow-hidden
              space-y-2 p-2
            `}
            onClick={() => onClick?.(product)}
          >
            {/* 상품 이미지 */}
            <div className="relative aspect-square w-full bg-hr-gray-10 overflow-hidden">
              <Image
                src={product_images[0]}
                alt={`${name} 썸네일 이미지`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 340px"
              />
            </div>

            {/* 텍스트 정보 */}
            <div className="px-1 space-y-1">
              <div className="text-hr-b5 font-hr-semi-bold text-hr-gray-50 truncate">
                {brand}
              </div>
              <div className="text-hr-b2 font-hr-semi-bold text-hr-gray-90 line-clamp-2">
                {name}
              </div>

              {/* 원가(취소선) */}
              {price && discount_rate && (
                <div>
                  <span className="text-hr-c1 text-hr-gray-40 line-through">
                    {/* {price.toLocaleString()} */}
                  </span>
                </div>
              )}

              {/* 할인율 + 가격 */}
              <div className="flex justify-between items-baseline text-hr-b2">
                {discount_rate && (
                  <span className="font-hr-bold text-hr-pink-default">
                    {discount_rate}%
                  </span>
                )}
                <span className="font-hr-bold text-hr-gray-90 text-hr-b2">
                  {final_price?.toLocaleString()}
                </span>
              </div>

              {/* 별점/리뷰 */}
              <div className="flex items-center gap-2 text-hr-c1">
                <span className="flex items-center gap-0.5 text-hr-yellow-default">
                  <StarSvg className="w-4 h-4 fill-hr-yellow-default" />
                  <span>{avg_rating ?? 0}</span>
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
