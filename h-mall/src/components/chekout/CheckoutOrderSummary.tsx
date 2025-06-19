'use client';

import React from 'react';

export default function CheckoutOrderSummary() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">결제금액</h2>
        <ul className="space-y-2 mb-4">
          <li className="flex justify-between">
            <span>총 상품 금액</span>
            <span>64,800원</span>
          </li>
          <li className="flex justify-between">
            <span>배송비</span>
            <span>무료</span>
          </li>
          <li className="flex justify-between">
            <span>쿠폰 할인 금액</span>
            <span className="text-red-500">-9,072원</span>
          </li>
          <li className="flex justify-between">
            <span>마일리지 사용</span>
            <span>0P</span>
          </li>
          <li className="flex justify-between">
            <span>결제 즉시 할인</span>
            <span>0원</span>
          </li>
        </ul>
        <div className="flex justify-between text-xl font-bold">
          <span>총 결제 금액</span>
          <span>55,728원</span>
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
