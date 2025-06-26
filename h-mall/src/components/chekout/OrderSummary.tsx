'use client';

import React from 'react';
import type { CheckoutOrderSummaryProps } from '@/types/checkout';

export default function OrderSummary({
  totalProductPrice,
  adminDiscount,
  shippingFee,
  mileageUsed,
  instantDiscount,
  totalPayable,
  agreements,
  setAgreements,
}: CheckoutOrderSummaryProps) {
  const agreementItems: {
    id: 'selectAll' | keyof typeof agreements;
    label: string;
    isSelectAll?: boolean;
  }[] = [
    {
      id: 'selectAll',
      label: '주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.',
      isSelectAll: true,
    },
    { id: 'agree1', label: '(필수) 개인정보 수집/이용 동의' },
    { id: 'agree2', label: '(필수) 개인정보 제3자 제공 동의' },
    { id: 'agree3', label: '(필수) 결제대행 서비스 이용약관' },
  ];

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

      <div className="space-y-4 text-sm text-gray-500">
        {agreementItems.map(({ id, label, isSelectAll }) => {
          const isChecked = isSelectAll
            ? agreements.agree1 && agreements.agree2 && agreements.agree3
            : agreements[id as keyof typeof agreements];

          return (
            <div
              className={`flex items-center ${isSelectAll ? '' : 'pl-6'}`}
              key={id}
            >
              <input
                type="checkbox"
                id={id}
                className="h-4 w-4 rounded-sm border border-hr-gray-40 
                    checked:bg-hr-purple-bg checked:border-transparent 
                    accent-hr-purple-default"
                checked={isChecked}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (isSelectAll) {
                    setAgreements({
                      agree1: checked,
                      agree2: checked,
                      agree3: checked,
                    });
                  } else {
                    setAgreements((prev) => ({
                      ...prev,
                      [id]: checked,
                    }));
                  }
                }}
              />
              <label htmlFor={id} className="ml-2">
                {label}
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}
