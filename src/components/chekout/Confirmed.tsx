'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import CheckCircleSVG from '@/assets/icons/check-circle.svg';
import { HrButton } from '@/components/common/HrButton';
import { useOrderDetail } from '@/hooks/useOrder';
import Image from 'next/image';

export default function Confirmed() {
  const params = useParams();
  const rawId = params.id;
  const router = useRouter();

  const orderId =
    typeof rawId === 'string' ? rawId : Array.isArray(rawId) ? rawId[0] : null;

  const { data: order, isLoading, isError } = useOrderDetail(orderId);

  if (!orderId || isError) {
    router.push('/');
    return null;
  }

  if (isLoading) {
    return <p className="p-6 text-center">주문 정보를 불러오는 중…</p>;
  }
  if (!order) {
    return null;
  }

  const paymentMethodLabels: Record<string, string> = {
    naver: '네이버페이',
    toss: '토스페이',
    kakao: '카카오페이',
    card: order.card_company ?? '신용카드',
  };

  // 가격 요약 객체
  const priceSummary = {
    totalProductPrice: order.total_price,
    shippingFee: order.shipping_fee,
    adminDiscount: order.admin_discount,
    couponDiscount: order.coupon_discount,
    mileageUsed: order.mileage_used,
    instantDiscount: order.instant_discount,
    totalPayable: order.total_payable,
  };

  // 배송 정보 객체
  const shippingInfo = {
    receiver: order.recipient_name,
    phone: order.recipient_phone,
    postcode: order.postcode,
    address: order.address,
    addressDetail: order.address_detail,
    request: order.shipping_request,
  };

  // 주문 상품 목록
  const items = order.order_items;

  return (
    <div className="container mx-auto max-w-2xl p-6 text-hr-b4">
      {/* Step Navigation */}
      <nav className="flex items-center text-hr-b4 uppercase mb-6 space-x-2">
        <span className="text-gray-400">01 Shopping Bag</span>
        <span>&gt;</span>
        <span className="text-gray-400">02 Order</span>
        <span>&gt;</span>
        <span className="font-hr-semi-bold text-black">03 Order Confirmed</span>
      </nav>

      {/* Confirmation Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <CheckCircleSVG className="w-14 h-14 text-black mb-4" />
        <h1 className="text-xl font-medium mb-2">주문이 완료되었습니다</h1>
        <p className="text-hr-gray-50">
          고객님의 소중한 주문을 정상적으로 접수하였습니다.
        </p>
      </div>

      {/* 주문 정보 */}
      <section className="bg-white border rounded-xl p-5 mb-6">
        <h2 className="font-hr-semi-bold text-base mb-4">주문 정보</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-hr-gray-50">주문번호</span>
            <span className="font-medium">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-hr-gray-50">결제수단</span>
            <span>
              {paymentMethodLabels[order.payment_method] ||
                order.payment_method}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-hr-gray-50">총 결제금액</span>
            <span className="font-hr-semi-bold text-base text-black">
              {priceSummary.totalPayable.toLocaleString()}원
            </span>
          </div>
          {/* 현금영수증 정보 */}
          {['kakao', 'toss', 'naver'].includes(order.payment_method) &&
            order.receipt_type &&
            order.receipt_phone && (
              <div className="pt-4 mt-2 border-t space-y-2">
                <h3 className="font-medium text-sm text-hr-gray-70">
                  현금영수증 정보
                </h3>
                <div className="flex justify-between">
                  <span className="text-hr-gray-50">발급구분</span>
                  <span>{order.receipt_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-hr-gray-50">휴대폰 번호</span>
                  <span>
                    {order.receipt_phone.replace(
                      /(\d{3})(\d{3,4})(\d{4})/,
                      '$1-$2-$3'
                    )}
                  </span>
                </div>
              </div>
            )}
        </div>
      </section>

      {/* 배송 정보 */}
      <section className="bg-white border rounded-xl p-5 mb-6">
        <h2 className="font-hr-semi-bold text-base mb-4">배송지 정보</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-hr-gray-50">수령인</span>
            <span>{shippingInfo.receiver}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-hr-gray-50">연락처</span>
            <span>
              {shippingInfo.phone.replace(
                /(\d{3})(\d{3,4})(\d{4})/,
                '$1-$2-$3'
              )}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-hr-gray-50 mb-1">주소</span>
            <span>
              ({shippingInfo.postcode}) {shippingInfo.address}{' '}
              {shippingInfo.addressDetail}
            </span>
          </div>
          {shippingInfo.request && (
            <div className="flex justify-between">
              <span className="text-hr-gray-50">요청사항</span>
              <span>{shippingInfo.request}</span>
            </div>
          )}
        </div>
      </section>

      {/* 결제 금액 정보 */}
      <section className="bg-white border rounded-xl p-5 mb-6">
        <h2 className="font-hr-semi-bold text-base mb-4">결제 금액 정보</h2>
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
            <span>쿠폰 할인</span>
            <span>-{priceSummary.couponDiscount.toLocaleString()}원</span>
          </li>
          <li className="flex justify-between">
            <span>마일리지 사용</span>
            <span>-{priceSummary.mileageUsed.toLocaleString()}P</span>
          </li>
          <li className="flex justify-between">
            <span>즉시 할인</span>
            <span>-{priceSummary.instantDiscount.toLocaleString()}원</span>
          </li>
          <li className="border-t pt-2 flex justify-between font-hr-semi-bold">
            <span>총 결제금액</span>
            <span>{priceSummary.totalPayable.toLocaleString()}원</span>
          </li>
        </ul>
      </section>

      {/* 상품 정보 */}
      <section className="bg-white border rounded-xl p-5 mb-6">
        <h2 className="font-hr-semi-bold text-base mb-4">
          주문 상품 정보 ({items.length}개)
        </h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-20 h-20 relative rounded overflow-hidden">
                <Image
                  src={item.product.product_images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-hr-c1 text-hr-gray-50">
                  {item.product.brand}
                </div>
                <div className="text-hr-b4 font-hr-regular">
                  {item.product.name}
                </div>
                <div className="text-hr-b4 text-hr-gray-60">
                  사이즈: {item.size}
                </div>
                <div className="text-hr-b4 text-hr-gray-60">
                  {item.price.toLocaleString()}원 × {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex gap-3 mt-8">
        <HrButton
          text="주문 내역 보기"
          type="line"
          onClick={() => router.push('/orders')}
          className="flex-1"
        />
        <HrButton
          text="쇼핑 계속하기"
          type="default"
          onClick={() => router.push('/')}
          className="flex-1"
        />
      </div>
    </div>
  );
}
