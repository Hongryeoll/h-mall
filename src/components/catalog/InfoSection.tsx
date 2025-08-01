'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { HrButton } from '@/components/common/HrButton';
import HrSelectbox from '@/components/common/HrSelectbox';
import { ProductFormProps } from '@/types/products';
import { useModalStore } from '@/store/modal/useModalStore';
import { ROUTES } from '@/types/constants';
import { useUserStore } from '@/store/user/useUserStore';
import { useBuyNowStore } from '@/store/order/useBuyNowStore';

type Props = {
  product: ProductFormProps;
};

type SelectedOption = {
  size: string;
  quantity: number;
  price: number;
};

export default function InfoSection({
  product: {
    id,
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
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { setItems } = useBuyNowStore();
  const showModal = useModalStore((state) => state.showModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const { addItem } = useCart();
  const [sizeValue, setSizeValue] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<SelectedOption[]>([]);
  const ClothesSizeOptions = ['2XL', 'XL', 'L', 'M', 'S'].map((sz) => ({
    value: sz,
    label: sz,
  }));

  const handleBuyNow = () => {
    if (!user) {
      router.push(ROUTES.LOGIN);
      return;
    }

    if (selectedSizes.length === 0) {
      showModal({
        title: '옵션을 선택해주세요',
        description: '구매를 위해 사이즈와 수량을 먼저 선택해주세요.',
      });
      return;
    }
    const buyNowItems = selectedSizes.map((opt) => ({
      product_id: id,
      product_name: name,
      brand: brand ?? '',
      product_images: product_images ?? [],
      size: opt.size,
      quantity: opt.quantity,
      price: opt.price,
      discount_rate: discount_rate ?? 0,
    }));

    setItems(buyNowItems);
    router.push(ROUTES.MALL_CHECKOUT);
  };

  const handleSizeSelect = (selectedSize: string) => {
    if (!selectedSize) return;
    if (selectedSizes.some((opt) => opt.size === selectedSize)) return;
    if (typeof final_price !== 'number') {
      console.error('상품가격이 유효하지 않습니다:', final_price);
      return;
    }
    setSelectedSizes((prev) => [
      ...prev,
      { size: selectedSize, quantity: 1, price: final_price },
    ]);
    setSizeValue(null);
  };

  const changeQuantity = (size: string, delta: number) => {
    setSelectedSizes((prev) =>
      prev.map((opt) =>
        opt.size === size
          ? { ...opt, quantity: Math.max(1, opt.quantity + delta) }
          : opt
      )
    );
  };

  const totalPrice = selectedSizes.reduce(
    (sum, opt) => sum + opt.quantity * opt.price,
    0
  );

  const handleAddToCart = () => {
    if (!user) {
      router.push(ROUTES.LOGIN);
      return;
    }

    if (selectedSizes.length === 0) {
      showModal({
        title: '옵션을 선택해주세요',
        description: '상품을 담으려면 먼저 사이즈를 선택해주세요.',
      });
      return;
    }

    selectedSizes.forEach(({ size, quantity }) => {
      addItem.mutate({
        product_id: id,
        size,
        quantity,
      });
    });

    showModal({
      title: '장바구니 담기 완료',
      description: '상품이 장바구니에 추가되었습니다.',
      children: (
        <div className="mt-6 flex justify-end gap-2">
          <HrButton
            text="계속 쇼핑"
            type="line"
            size="m"
            onClick={closeModal}
          />
          <HrButton
            text="장바구니로 이동"
            type="default"
            size="m"
            onClick={() => {
              closeModal();
              router.push(ROUTES.MALL_CART);
            }}
          />
        </div>
      ),
    });
    setSelectedSizes([]);
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mt-8 px-4 md:px-0">
        <div className="flex-1 w-full md:min-w-[340px] flex flex-col items-center justify-center">
          <div className="relative w-full aspect-square md:w-[340px] md:h-[340px] rounded-xl overflow-hidden bg-gray-100">
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
        <div className="flex-1 w-full md:min-w-[340px] flex flex-col gap-2">
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
          {/* 사이즈 선택 */}
          <div className="mt-3">
            <label className="block text-base font-medium mb-1">사이즈</label>
            <HrSelectbox
              value={sizeValue}
              onChange={handleSizeSelect}
              options={ClothesSizeOptions}
              placeholder="사이즈 선택"
              className="w-full z-40"
            />
          </div>

          {/* 선택된 사이즈 리스트 */}
          {selectedSizes.length > 0 && (
            <div className="mt-4 space-y-2">
              {selectedSizes.map(({ size, quantity, price }) => (
                <div
                  key={size}
                  className="flex items-center justify-between border-b py-2"
                >
                  <span className="font-hr-semi-bold">{size}</span>
                  <div className="flex items-center border border-hr-gray-30 rounded">
                    <button
                      onClick={() => changeQuantity(size, -1)}
                      className="px-2"
                    >
                      -
                    </button>
                    <span className="px-3">{quantity}</span>
                    <button
                      onClick={() => changeQuantity(size, 1)}
                      className="px-2"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-hr-semi-bold">
                    {(price * quantity).toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 총 상품 금액 */}
          {selectedSizes.length > 0 && (
            <div className="flex justify-between mt-4 text-hr-h5 font-hr-bold">
              <span>총 상품 금액</span>
              <span className="text-hr-yellow-default">
                {totalPrice.toLocaleString()}원
              </span>
            </div>
          )}
          {/* 버튼영역 */}
          <div className="flex gap-2 mt-5">
            <HrButton
              text="장바구니 담기"
              type="line"
              size="xl"
              onClick={handleAddToCart}
              className="flex-1"
            />
            <HrButton
              text="바로 구매하기"
              type="default"
              size="xl"
              onClick={handleBuyNow}
              className="flex-1"
            />
          </div>
        </div>
      </div>
      <div className="p-6 text-2xl font-bold text-hr-gray-70"></div>
    </>
  );
}
