'use client';

import { HrButton } from '@/components/common/HrButton';
import type { CartItemProps } from '@/hooks/useCart';
import CheckCircleSVG from '@/assets/icons/check-circle.svg';
import { OrderConfirmedProps } from '@/types/orderConfirmed';

export default function CheckoutConfirmed({
  orderId,
  shippingInfo,
  paymentMethod,
  cardName,
  priceSummary,
  items,
}: OrderConfirmedProps) {
  const paymentLabel = {
    toss: '토스페이',
    kakao: '카카오페이',
    card: `카드결제 (${cardName || '미선택'})`,
    etc: '기타 결제',
  }[paymentMethod];

  return (
    <div className="container mx-auto max-w-2xl p-6 text-sm">
      {/* Step Navigation */}
      <nav className="flex items-center text-sm uppercase mb-6 space-x-2">
        <span className="text-gray-400">01 Shopping Bag</span>
        <span>&gt;</span>
        <span className="text-gray-400">02 Order</span>
        <span className="font-semibold text-black">03 Order Confirmed</span>
      </nav>

      {/* Confirmation Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <CheckCircleSVG className="w-14 h-14 text-black mb-4" />
        <h1 className="text-xl font-medium mb-2">주문이 완료되었습니다</h1>
        <p className="text-gray-500">
          고객님의 소중한 주문을 정상적으로 접수하였습니다.
        </p>
      </div>

      {/* 주문 정보 */}
      <section className="bg-white border rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-base mb-4">주문 정보</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">주문번호</span>
            <span className="font-medium">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">결제수단</span>
            <span>{paymentLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">총 결제금액</span>
            <span className="font-semibold text-black text-base">
              {priceSummary.totalPayable.toLocaleString()}원
            </span>
          </div>
        </div>
      </section>

      {/* 배송 정보 */}
      <section className="bg-white border rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-base mb-4">배송지 정보</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">수령인</span>
            <span>{shippingInfo.receiver}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">연락처</span>
            <span>
              {shippingInfo.phone1}
              {shippingInfo.phone2 && ` / ${shippingInfo.phone2}`}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 mb-1">주소</span>
            <span>
              ({shippingInfo.postcode}) {shippingInfo.address}{' '}
              {shippingInfo.addressDetail}
            </span>
          </div>
          {shippingInfo.request && (
            <div className="flex justify-between">
              <span className="text-gray-500">요청사항</span>
              <span>{shippingInfo.request}</span>
            </div>
          )}
        </div>
      </section>

      {/* 결제 금액 정보 */}
      <section className="bg-white border rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-base mb-4">결제 금액 정보</h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>총 상품 금액</span>
            <span>{priceSummary.totalProductPrice.toLocaleString()}원</span>
          </li>
          <li className="flex justify-between">
            <span>배송비</span>
            <span>
              {priceSummary.shippingFee === 0
                ? '무료'
                : `${priceSummary.shippingFee.toLocaleString()}원`}
            </span>
          </li>
          <li className="flex justify-between">
            <span>주인장 할인</span>
            <span className="text-hr-danger-default">
              -{priceSummary.adminDiscount.toLocaleString()}원
            </span>
          </li>
          <li className="flex justify-between">
            <span>마일리지 사용</span>
            <span>-{priceSummary.mileageUsed.toLocaleString()}P</span>
          </li>
          <li className="flex justify-between">
            <span>즉시 할인</span>
            <span>-{priceSummary.instantDiscount.toLocaleString()}원</span>
          </li>
          <li className="border-t pt-2 flex justify-between font-semibold">
            <span>총 결제금액</span>
            <span>{priceSummary.totalPayable.toLocaleString()}원</span>
          </li>
        </ul>
      </section>

      {/* 상품 정보 */}
      <section className="bg-white border rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-base mb-4">
          주문 상품 정보 ({items.length}개)
        </h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <img
                src={item.product.product_images[0]}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <div className="text-xs text-gray-500">
                  {item.product.brand}
                </div>
                <div className="text-sm font-medium">{item.product.name}</div>
                <div className="text-sm text-gray-600">사이즈: {item.size}</div>
                <div className="text-sm text-gray-600">
                  {item.product.final_price.toLocaleString()}원 / 수량{' '}
                  {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Buttons */}
      <div className="flex gap-3 mt-8">
        <HrButton text="주문 내역 보기" type="line" className="flex-1" />
        <HrButton text="쇼핑 계속하기" type="default" className="flex-1" />
      </div>
    </div>
  );
}
