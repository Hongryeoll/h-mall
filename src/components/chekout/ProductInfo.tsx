'use client';

import React from 'react';
import Image from 'next/image';
import type { CheckoutItem } from '@/types/checkout';

interface CheckoutProductInfoProps {
  items: CheckoutItem[];
}

export default function ProductInfo({ items }: CheckoutProductInfoProps) {
  if (!items?.length) return <p>선택된 상품이 없습니다.</p>;

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">
        쿠폰 사용 및 상품 정보 / 총 {totalCount}개
      </h2>
      {items.map((item) => (
        <div key={item.id} className="bg-gray-50 p-4 rounded mb-4 flex">
          <Image
            src={item.product_images[0]}
            alt={item.product_name}
            width={96}
            height={96}
            className="w-24 h-24 object-cover rounded mr-4"
          />
          <div className="flex-1">
            <div className="text-sm text-gray-500">{item.brand}</div>
            <div className="font-medium mb-1">{item.product_name}</div>
            <div className="text-sm text-gray-600 mb-1">
              사이즈 : {item.size}
            </div>
            <div className="text-sm text-gray-600">
              {item.price.toLocaleString()}원 / 수량 {item.quantity}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
