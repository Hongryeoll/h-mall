import type { Tables } from '@/types/supabase';
import StarSvg from '@/assets/icons/star.svg';

export default function ProductGrid({
  products,
  onClick,
}: {
  products: Tables<'products'>[];
  onClick?: (product: Tables<'products'>) => void;
}) {
  return (
    <div
      className="
        grid
        grid-cols-[repeat(auto-fit,minmax(170px,1fr))]
        gap-3 sm:gap-4 md:gap-6
        px-2 sm:px-4 md:px-8
        w-full max-w-screen-2xl mx-auto
      "
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="
            flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg transition
            border border-hr-gray-10 hover:border-hr-purple-default
            cursor-pointer overflow-hidden
            min-w-0
          "
          onClick={() => onClick?.(product)}
        >
          {/* 상품 이미지 */}
          <div className="relative w-full aspect-[3/4] bg-hr-gray-10 overflow-hidden">
            <img
              src={product.images?.[0] || '/img/no-image.png'}
              alt={product.name}
              className="absolute left-0 top-0 w-full h-full object-cover transition-transform duration-200 hover:scale-105"
              loading="lazy"
            />
          </div>
          {/* 텍스트 정보 */}
          <div className="flex flex-col px-3 py-2 gap-1 flex-1 min-h-[120px]">
            <div className="font-hr-semi-bold text-hr-c1 text-hr-gray-50 truncate">
              {product.brand}
            </div>
            <div className="font-hr-semi-bold text-hr-b4 text-hr-gray-90 truncate line-clamp-2 min-h-[2.5em]">
              {product.name}
            </div>
            {/* 원가(취소선) */}
            {product.price && product.discount_rate && (
              <span className="text-hr-c1 text-hr-gray-40 line-through">
                {product.price.toLocaleString()}
              </span>
            )}
            {/* 할인율 + 가격 */}
            <div className="flex justify-between items-baseline mt-1">
              {product.discount_rate && (
                <span className="font-hr-bold text-hr-pink-default text-hr-b2">
                  {product.discount_rate}%
                </span>
              )}
              <span className="font-hr-bold text-hr-gray-90 text-hr-b2">
                {product.final_price?.toLocaleString()}
              </span>
            </div>
            {/* 별점/리뷰 */}
            <div className="flex justify-start items-center gap-2 mt-1 text-hr-c1">
              <span className="flex items-center gap-0.5 text-hr-yellow-default">
                <StarSvg className="w-4 h-4 fill-hr-yellow-default" />
                {/* {product.rating ?? 0} */}4.5
              </span>
              <span className="text-hr-gray-40">
                {/* ({product.review_count ?? 0}) */}1111
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
