'use client';

import React from 'react';

interface PaymentMethodsProps {
  paymentMethod: 'toss' | 'kakao' | 'card' | 'etc';
  setPaymentMethod: (method: 'toss' | 'kakao' | 'card' | 'etc') => void;
}

export default function CheckoutPaymentMethods({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodsProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">결제 방법</h2>
      <form className="space-y-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="toss"
            name="payment"
            value="toss"
            onChange={() => setPaymentMethod('toss')}
          />
          <label htmlFor="toss" className="ml-2 flex items-center">
            <img
              src="/icons/toss.svg"
              alt="토스페이"
              className="w-5 h-5 mr-2"
            />
            토스페이
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id="kakao"
            name="payment"
            value="kakao"
            onChange={() => setPaymentMethod('kakao')}
          />
          <label htmlFor="kakao" className="ml-2 flex items-center">
            <img
              src="/icons/kakaopay.svg"
              alt="카카오페이"
              className="w-5 h-5 mr-2"
            />
            카카오페이
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id="card"
            name="payment"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={() => setPaymentMethod('card')}
          />
          <label htmlFor="card" className="ml-2">
            카드 결제
          </label>
        </div>

        {paymentMethod === 'card' && (
          <select className="w-full border px-3 py-2 rounded">
            <option>카드사를 선택해주세요.</option>
            <option>현대카드</option>
            <option>삼성카드</option>
          </select>
        )}

        <div className="flex items-center">
          <input
            type="radio"
            id="etc"
            name="payment"
            value="etc"
            onChange={() => setPaymentMethod('etc')}
          />
          <label htmlFor="etc" className="ml-2">
            다른 결제 방법
          </label>
        </div>

        {paymentMethod === 'etc' && (
          <div className="bg-gray-50 p-4 rounded space-y-2 text-sm">
            <div>
              <strong>안내:</strong> 결제수단별 즉시 할인 안내
            </div>
            <div>
              <strong>혜택:</strong> [현대카드] 5% M포인트 사용
            </div>
            <div>
              <strong>안내:</strong> 품절 취소시 환불 안내
            </div>
            <div>
              <strong>할부:</strong> 신용카드 무이자 할부 안내
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
