'use client';

import React, { useMemo } from 'react';
import type { CartItemProps } from '@/types/cart';

export type SummaryProps = {
  selectedItems: CartItemProps[];
};

export default function CartSummary({ selectedItems }: SummaryProps) {
  const totalOrderAmount = useMemo(
    () =>
      selectedItems.reduce(
        (sum, it) => sum + it.quantity * it.product.final_price,
        0
      ),
    [selectedItems]
  );

  const totalShippingFee =
    selectedItems.length === 0 ? 0 : totalOrderAmount >= 49000 ? 0 : 3000;

  const totalPayment = totalOrderAmount + totalShippingFee;

  return (
    <div className="mt-8 border-t pt-4 grid grid-cols-3 text-center">
      <div>
        <p className="text-hr-b4">총 주문금액</p>
        <p className="text-hr-h5 font-hr-bold">
          {totalOrderAmount.toLocaleString()}원
        </p>
        <p className="text-hr-c1 text-hr-gray-50">
          총 {selectedItems.length}개
        </p>
      </div>
      <div>
        <p className="text-hr-b4">총 배송비</p>
        <p className="text-hr-h5 font-hr-bold">
          {totalShippingFee.toLocaleString()}원
        </p>
      </div>
      <div>
        <p className="text-hr-b4">총 결제금액</p>
        <p className="text-hr-h5 font-hr-bold">
          {totalPayment.toLocaleString()}원
        </p>
      </div>
    </div>
  );
}
