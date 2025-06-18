import React, { useState } from 'react';

interface Product {
  id: number;
  imageUrl: string;
  brand: string;
  name: string;
  option: string;
  price: string;
  quantity: number;
  couponAppliedPrice?: string;
}

const mockProduct: Product = {
  id: 1,
  imageUrl: '/images/product-beige.jpg',
  brand: '브랜드',
  name: '멀티 패커블 보스턴백 - 베이지',
  option: '[색상]01_베이지',
  price: '59,000원',
  quantity: 1,
  couponAppliedPrice: '50,740원',
};

export default function ChekoutInfo() {
  const [paymentMethod, setPaymentMethod] = useState<
    'toss' | 'kakao' | 'card' | 'etc'
  >('card');

  return (
    <div className="container mx-auto p-6">
      {/* Step Indicator */}
      <nav className="flex items-center text-sm uppercase mb-6 space-x-2">
        <span className="text-gray-400">01 Shopping Bag</span>
        <span>&gt;</span>
        <span className="font-semibold">02 Order</span>
        <span>&gt;</span>
        <span className="text-gray-400">03 Order Confirmed</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Shipping Form + Payment Methods */}
        <div className="lg:col-span-2 bg-white p-6 border rounded space-y-8">
          {/* Shipping Info */}
          <section>
            <h2 className="text-lg font-semibold mb-4">배송 정보</h2>
            {/* Tabs */}
            <div className="flex border-b mb-4">
              <button className="px-4 py-2 border-b-2 border-transparent text-gray-500">
                기존 배송지
              </button>
              <button className="px-4 py-2 border-b-2 border-orange-500 font-medium">
                신규입력
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block mb-1">배송지명</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="배송지명 입력"
                />
              </div>

              <div>
                <label className="block mb-1">
                  수령인 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block mb-1">
                    배송지 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      className="flex-1 border px-3 py-2 rounded-l"
                      placeholder="우편번호 검색"
                      required
                    />
                    <button
                      type="button"
                      className="px-4 bg-gray-100 border border-l-0 rounded-r"
                    >
                      검색
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="상세주소 입력"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block mb-1">
                    연락처1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">&nbsp;</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">&nbsp;</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="defaultAddress"
                  className="h-4 w-4"
                />
                <label htmlFor="defaultAddress">기본배송지로 등록</label>
              </div>

              <div>
                <label className="block mb-1">
                  배송시 요청사항을 선택해 주세요
                </label>
                <select className="w-full border px-3 py-2 rounded">
                  <option>선택</option>
                  <option>부재 시 경비실에 맡겨주세요</option>
                  <option>직접 전달해주세요</option>
                </select>
              </div>
            </form>
          </section>

          {/* Payment Methods */}
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
        </div>

        {/* Right: Product & Order Summary */}
        <div className="bg-white p-6 border rounded space-y-6">
          {/* Product Info */}
          <section>
            <h2 className="text-lg font-semibold mb-4">
              쿠폰 사용 및 상품 정보 / 총 {mockProduct.quantity}개
            </h2>
            <div className="bg-gray-50 p-4 rounded mb-4 flex">
              <img
                src={mockProduct.imageUrl}
                alt={mockProduct.name}
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <div className="text-sm text-gray-500">{mockProduct.brand}</div>
                <div className="font-medium mb-1">{mockProduct.name}</div>
                <div className="text-sm text-gray-600 mb-1">
                  옵션 : {mockProduct.option}
                </div>
                <div className="text-sm text-gray-600">
                  {mockProduct.price} / 수량 {mockProduct.quantity}{' '}
                  {mockProduct.couponAppliedPrice && (
                    <span className="text-red-500">
                      쿠폰적용가 : {mockProduct.couponAppliedPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Order Summary */}
          <section>
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
          </section>

          {/* Agreements & Confirm */}
          <section className="space-y-4">
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
          </section>
        </div>
      </div>
    </div>
  );
}
