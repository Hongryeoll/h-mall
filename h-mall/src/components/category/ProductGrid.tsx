import type { Tables } from '@/types/supabase';

export default function ProductGrid({
  products,
  onClick,
}: {
  products: Tables<'products'>[];
  onClick?: () => void;
}) {
  return (
    <div
      className="
    grid grid-cols-2 
    xs:grid-cols-2
    sm:grid-cols-3 
    md:grid-cols-4 
    lg:grid-cols-5 
    xl:grid-cols-6 
    gap-3 sm:gap-4 md:gap-6
    px-2 sm:px-4 md:px-8
    w-full
    max-w-screen-2xl mx-auto
  "
    >
      {products.map((product, idx) => (
        <div
          key={product.id}
          className="
          relative bg-white rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer
          overflow-hidden p-2 sm:p-3 md:p-4
          flex flex-col
        "
          onClick={onClick}
          style={{ minWidth: 0 }}
        >
          {/* 상품 이미지 */}
          <div className="w-full pt-[100%] relative bg-hr-gray-10 rounded-lg overflow-hidden">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="absolute left-0 top-0 w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>

          {/* 텍스트 정보 */}
          <div className="pt-2 sm:pt-3 flex flex-col flex-1 min-h-[100px]">
            <div className="text-hr-c1 sm:text-hr-b3 text-hr-gray-50 font-hr-semi-bold truncate">
              {/* {product.brand}  */}브랜드 추가
            </div>
            <div className="font-hr-semi-bold text-base sm:text-hr-b1 text-hr-gray-90 truncate md:line-clamp-2 mb-1">
              {product.name}
            </div>
            <div className="mt-auto flex flex-col w-full min-w-0">
              {product.price && (
                <span className="text-hr-c1 sm:text-hr-b3 text-hr-gray-40 line-through mb-0.5 sm:mb-1">
                  {product.price.toLocaleString()}원
                </span>
              )}
              <div className="flex flex-row flex-wrap items-baseline gap-x-1 sm:gap-x-2 w-full min-w-0">
                {product.discount_rate && (
                  <span className="text-hr-pink-default font-hr-semi-bold text-base sm:text-hr-b1">
                    {product.discount_rate}%
                  </span>
                )}
                <span className="text-hr-gray-90 font-bold text-hr-b1 sm:text-hr-h5 md:text-hr-h4 leading-none">
                  {product.final_price?.toLocaleString()}
                  <span className="text-hr-b3 ml-0.5">원</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
