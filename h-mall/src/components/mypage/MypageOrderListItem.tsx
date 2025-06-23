'use client';

import Image from 'next/image';
import { OrderData } from '@/types/checkout';

type Props = {
  order: OrderData;
  isCard?: boolean;
  isEven?: boolean;
};

export default function MypageOrderListItem({ order, isCard, isEven }: Props) {
  const first = order.order_items?.[0];
  if (!first) return null;

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
            <p className="font-medium">{first.product.name}</p>
            <p className="text-gray-500 text-sm">
              {first.size}, 수량 {first.quantity}
            </p>
          </div>
          <span className="text-xs text-gray-400">{date}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>결제금액: {order.total_price.toLocaleString()}원</span>
          <span>
            {order.shipping_fee === 0
              ? '배송비 무료'
              : `배송비 ${order.shipping_fee.toLocaleString()}원`}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span>수단: {paymentLabel}</span>
          <span className="font-semibold">
            {order.total_payable.toLocaleString()}원
          </span>
        </div>
      </div>
    );
  }

  return (
    <tr
      className={`${
        isEven ? 'bg-white' : 'bg-gray-50'
      } hover:bg-gray-100 transition`}
    >
      <td className="flex items-center py-4 px-4">
        <Image
          src={first.product.product_images[0]}
          alt={first.product.name}
          width={64}
          height={64}
          className="object-cover rounded mr-4"
        />
        <div className="text-sm">
          <p className="font-medium">{first.product.name}</p>
          <p className="text-gray-500">
            {first.size} 외 {order.order_items.length - 1}건
          </p>
          <p className="mt-1 text-xs text-gray-400">{date}</p>
        </div>
      </td>

      <td className="py-4 px-4 text-center text-sm">
        {order.total_price.toLocaleString()}원
      </td>

      <td className="py-4 px-4 text-center text-sm">
        {order.shipping_fee === 0
          ? '무료'
          : `${order.shipping_fee.toLocaleString()}원`}
      </td>

      <td className="py-4 px-4 text-center text-sm">{paymentLabel}</td>

      <td className="py-4 px-4 text-center text-sm font-semibold">
        {order.total_payable.toLocaleString()}원
      </td>
    </tr>
  );
}
