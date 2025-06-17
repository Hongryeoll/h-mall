'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { HrButton } from '@/components/common/HrButton';
import { ProductFormProps } from '@/types/products';

type Props = {
  product: ProductFormProps;
};

export default function ProductInfo({
  product: {
    name,
    brand,
    product_images,
    price,
    discount_rate,
    final_price,
    avg_rating,
    review_count,
  },
}: Props) {
  return (
    <>
      <div className="w-full max-w-5xl mx-auto flex gap-8 mt-8">
        <div className="flex-1 min-w-[340px] flex flex-col items-center justify-center">
          <div className="relative w-[340px] h-[340px] rounded-xl overflow-hidden bg-gray-100">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              className="h-full"
            >
              {product_images.map((img, idx) => (
                <SwiperSlide key={`${img}-${idx}`}>
                  <Image
                    src={img}
                    alt={`상품 이미지 ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 340px"
                    priority={idx === 0}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* 오른쪽: 상품 상세정보 */}
        <div className="flex-1 min-w-[340px] flex flex-col gap-2">
          <h1 className="text-hr-h2 font-hr-bold leading-tight mb-1">
            {name} <br />
            <span className="font-hr-semi-bold text-hr-h5 text-hr-gray-50 ">
              {brand}
            </span>
          </h1>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-hr-yellow-default text-hr-b1">
              ★ {avg_rating}
            </span>
            <span className="text-base font-semibold text-hr-gray-70">
              {review_count ?? 0}개 리뷰 보기
            </span>
          </div>
          {/* 가격/할인/첫구매 */}
          <div className="flex flex-col gap-1 mb-2">
            <div className="text-hr-gray-40 line-through text-hr-b2">
              {price.toLocaleString()}원
            </div>
            <div>
              <span className="text-hr-pink-default font-hr-bold text-hr-h4">
                {discount_rate}%
              </span>
              <span className="text-hr-h4 font-hr-bold ml-2">
                {final_price?.toLocaleString()}원
              </span>
            </div>
          </div>
          {/* 구매 적립/무이자/배송정보 */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-base text-hr-gray-70 mb-2">
            <div>구매 적립금</div>
            <div className="text-right">최대 573 마일리지 적립 예정</div>
            <div>무이자 할부</div>
            <div className="text-right">
              최대 7개월 무이자 할부 시 월 8,181원 결제
              <br />
              카드사별 할부 혜택 안내
            </div>
            <div>배송정보</div>
            <div className="text-right text-blue-500 font-semibold">
              3일 이내 출고
            </div>
            <div>배송비</div>
            <div className="text-right text-blue-600 font-semibold">
              2,500원
              <br />
              <span className="text-xs text-hr-gray-50">
                50,000원 이상 구매시 무료배송
                <br />
                제주/도서산간 추가 배송비 없음
              </span>
            </div>
          </div>
          {/* 옵션/색상 선택 */}
          <div className="mt-3">
            <label className="block text-base font-medium mb-1">사이즈</label>
            <select className="border border-hr-gray-30 rounded w-full p-2">
              <option>2XL</option>
              <option>Xl</option>
              <option>L</option>
            </select>
          </div>
          {/* 버튼영역 */}
          <div className="flex gap-2 mt-5">
            <HrButton
              text="장바구니 담기"
              type="line"
              size="xl"
              onClick={() => {
                // 장바구니 담기 로직
              }}
              className="flex-1"
            />
            <HrButton
              text="바로 구매하기"
              type="default"
              size="xl"
              onClick={() => {
                // 바로 구매 로직
              }}
              className="flex-1"
            />
          </div>
        </div>
      </div>
      <div className="p-6 text-2xl font-bold text-hr-gray-70"></div>
    </>
  );
}
