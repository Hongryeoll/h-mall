// components/cart/Summary.tsx
import React, { useMemo } from 'react';
import type { CartItem } from '@/hooks/useCart';

export type SummaryProps = {
  items: CartItem[];
};

export default function CasrtSummary({ items }: SummaryProps) {
  const totalOrderAmount = useMemo(
    () =>
      items.reduce((sum, it) => sum + it.quantity * it.product.final_price, 0),
    [items]
  );
  const totalShippingFee = totalOrderAmount >= 49000 ? 0 : 3000;
  const totalPayment = totalOrderAmount + totalShippingFee;

  return (
    <div className="mt-8 border-t pt-4 grid grid-cols-3 text-center">
      <div>
        <p className="text-sm">총 주문금액</p>
        <p className="text-xl font-bold">
          {totalOrderAmount.toLocaleString()}원
        </p>
        <p className="text-xs text-gray-500">총 {items.length}개</p>
      </div>
      <div>
        <p className="text-sm">총 배송비</p>
        <p className="text-xl font-bold">
          {totalShippingFee.toLocaleString()}원
        </p>
      </div>
      <div>
        <p className="text-sm">총 결제금액</p>
        <p className="text-xl font-bold">{totalPayment.toLocaleString()}원</p>
      </div>
    </div>
  );
}
