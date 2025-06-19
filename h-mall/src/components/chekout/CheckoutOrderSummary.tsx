'use client';

import React from 'react';
import type { CartItemProps } from '@/hooks/useCart';

interface CheckoutOrderSummaryProps {
  items: CartItemProps[];
}

export default function CheckoutOrderSummary({
  items,
}: CheckoutOrderSummaryProps) {
  const totalProductPrice = items.reduce(
    (sum, item) => sum + item.product.final_price * item.quantity,
    0
  );

  const adminDiscount = items.reduce((sum, item) => {
    const { final_price, discount_rate } = item.product;
    const quantity = item.quantity;
    const discountPerItem = Math.floor(final_price * (discount_rate / 100));
    return sum + discountPerItem * quantity;
  }, 0);

  const shippingFee = totalProductPrice >= 50000 ? 0 : 3000;
  const couponDiscount = 0;
  const mileageUsed = 0;
  const instantDiscount = 0;

  const totalPayable =
    totalProductPrice +
    shippingFee -
    adminDiscount -
    couponDiscount -
    mileageUsed -
    instantDiscount;
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">결제금액</h2>
        <ul className="space-y-2 mb-4">
          <li className="flex justify-between">
            <span>총 상품 금액</span>
            <span>{totalProductPrice.toLocaleString()}원</span>
          </li>
          <li className="flex justify-between">
            <span>배송비</span>
            <span>
              {shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}
            </span>
          </li>
          <li className="flex justify-between">
            <span>주인장 마음대로 할인</span>
            <span className="text-hr-danger-default">
              -{adminDiscount.toLocaleString()}원
            </span>
          </li>
          <li className="flex justify-between">
            <span>마일리지 사용</span>
            <span>{mileageUsed}P</span>
          </li>
          <li className="flex justify-between">
            <span>결제 즉시 할인</span>
            <span>{instantDiscount.toLocaleString()}원</span>
          </li>
        </ul>
        <div className="flex justify-between text-xl font-bold">
          <span>총 결제 금액</span>
          <span>{totalPayable.toLocaleString()}원</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input type="checkbox" id="selectAll" className="h-4 w-4" />
          <label htmlFor="selectAll" className="ml-2">
            주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.
          </label>
        </div>
        <div className="pl-6 space-y-1 text-sm text-gray-500">
          <div className="flex items-center">
            <input type="checkbox" id="agree1" className="h-4 w-4" />
            <label htmlFor="agree1" className="ml-2">
              (필수) 개인정보 수집/이용 동의
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="agree2" className="h-4 w-4" />
            <label htmlFor="agree2" className="ml-2">
              (필수) 개인정보 제3자 제공 동의
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="agree3" className="h-4 w-4" />
            <label htmlFor="agree3" className="ml-2">
              (필수) 결제대행 서비스 이용약관
            </label>
          </div>
        </div>
        <button className="w-full bg-black text-white py-3 rounded">
          55,728원 결제하기
        </button>
      </div>
    </section>
  );
}
