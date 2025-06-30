'use client';

import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/types/constants';
import RightSvg from '@/assets/icons/chevron-right.svg';
import ProductRecommendationSkeleton from '@/components/skeleton/ProductRecommendationSkeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

type Props = {
  title: string;
  categorySlug: string;
};

export default function ProductRecommendation({ title, categorySlug }: Props) {
  const { data, isLoading, isError } = useFilteredProducts({ categorySlug });
  const router = useRouter();

  if (isLoading) {
    return <ProductRecommendationSkeleton title={title} />;
  }
  if (isError || !data) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <section className="w-full mb-10">
      {/* 상단 타이틀 */}
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-hr-h5 font-hr-semi-bold">{title}</h2>
        <div
          onClick={() =>
            router.push(ROUTES.MALL_CATALOG_CATEGORY(categorySlug))
          }
          className="flex items-center text-hr-b4 text-hr-gray-50 hover:underline cursor-pointer"
        >
          더보기 <RightSvg width={16} height={16} />
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16} // 슬라이드 간격
        slidesPerView={'auto'} // 한 줄에 자동 맞춤
        className="px-2"
      >
        {data.map((product) => (
          <SwiperSlide
            key={product.id}
            className="!w-[180px] flex-shrink-0 border rounded-md p-2 cursor-pointer hover:shadow-md"
            onClick={() => router.push(ROUTES.MALL_CATALOG(product.id))}
          >
            <div className="relative w-full h-44 mb-2">
              <Image
                src={product.product_images?.[0] || '/no-image.png'}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="text-hr-b4 truncate">{product.name}</div>
            <div className="font-hr-semi-bold">
              {product.final_price?.toLocaleString()}원
            </div>
            {product.discount_rate && product.discount_rate > 0 && (
              <div className="text-hr-danger-default text-hr-c1">
                {product.discount_rate}% 할인
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
