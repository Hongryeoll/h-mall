'use client';

import { useState } from 'react';
import ReviewForm from '@/components/mypage/ReviewForm';
import Image from 'next/image';
import { OrderData } from '@/types/checkout';
import { HrButton } from '@/components/common/HrButton';

type Props = {
  order: OrderData;
  isCard?: boolean;
};

export default function OrderListItem({ order, isCard }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const openReview = () => {
    if (isReviewWritable) setModalOpen(true);
  };
  const first = order.order_items?.[0];
  if (!first) return null;

  const createdAt = new Date(order.created_at!);
  const now = new Date();
  const diffDays =
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  const alreadyReviewed = !!first.reviewed;
  const isReviewWritable = diffDays <= 7 && !alreadyReviewed;

  const date = new Date(order.created_at!).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const payMap: Record<string, string> = {
    naver: '네이버페이',
    toss: '토스',
    kakao: '카카오페이',
    card: '카드결제',
  };
  const paymentLabel = payMap[order.payment_method] ?? order.payment_method;

  if (isCard) {
    return (
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center">
          <Image
            src={first.product.product_images[0]}
            alt={first.product.name}
            width={64}
            height={64}
            className="object-cover rounded mr-3"
          />
          <div className="flex-1">
            <p className="font-hr-regular">{first.product.name}</p>
            <p className="text-hr-gray-50 text-hr-b4">
              {first.size}, 수량 {first.quantity}
            </p>
          </div>
          <span className="text-xs text-gray-400">{date}</span>
        </div>

        <div className="flex justify-between text-hr-b4">
          <span>결제수단: {paymentLabel}</span>
        </div>

        <div className="flex justify-between items-center text-hr-b4">
          <span>
            {order.shipping_fee === 0
              ? '배송비 무료'
              : `배송비 ${order.shipping_fee.toLocaleString()}원`}
          </span>
          <span className="font-hr-semi-bold">
            {order.total_payable.toLocaleString()}원
          </span>
        </div>
        <div className="flex justify-end">
          <div className="w-full">
            <HrButton
              text={alreadyReviewed ? '작성 완료' : '리뷰 작성'}
              size="s"
              type="default"
              disabled={!isReviewWritable}
              onClick={openReview}
            />
            {!isReviewWritable && !alreadyReviewed && (
              <p className="text-hr-c3 text-hr-gray-50 mt-2">
                주문 후 7일 이내만 리뷰 작성이 가능합니다.
              </p>
            )}
          </div>
        </div>
        {first && (
          <ReviewForm
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            orderItemId={first.id}
            product={{
              id: first.product.id,
              name: first.product.name,
              images: first.product.product_images,
            }}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <tr className=" hover:bg-hr-gray-10 transition border-b border-hr-gray-20">
        <td className="flex items-center py-4 px-4">
          <Image
            src={first.product.product_images[0]}
            alt={first.product.name}
            width={64}
            height={64}
            className="object-cover rounded mr-4"
          />
          <div className="text-hr-b4">
            <p className="font-hr-regular">{first.product.name}</p>
            <p className="text-hr-gray-50">
              {first.size} 외 {order.order_items.length - 1}건
            </p>
          </div>
        </td>

        <td className="py-4 px-4 text-center text-hr-b4">{paymentLabel}</td>

        <td className="py-4 px-4 text-center text-hr-b4">
          {order.shipping_fee === 0
            ? '무료'
            : `${order.shipping_fee.toLocaleString()}원`}
        </td>

        <td className="py-4 px-4 text-center text-hr-b4 font-hr-semi-bold">
          {order.total_payable.toLocaleString()}원
        </td>

        <td className="py-4 px-4 text-center text-hr-b4">{date}</td>

        <td className="py-4 px-4 text-center">
          <div className="w-24 mx-auto">
            <HrButton
              text={alreadyReviewed ? '작성 완료' : '리뷰 작성'}
              size="s"
              type="default"
              disabled={!isReviewWritable}
              onClick={openReview}
            />
            {!isReviewWritable && !alreadyReviewed && (
              <p className="text-hr-c3 text-hr-gray-50 mt-1">
                7일 이내만 작성 가능
              </p>
            )}
          </div>
        </td>
      </tr>
      {first && (
        <ReviewForm
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          orderItemId={first.id}
          product={{
            id: first.product.id,
            name: first.product.name,
            images: first.product.product_images,
          }}
        />
      )}
    </>
  );
}
