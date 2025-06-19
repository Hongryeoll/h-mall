'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import CheckoutShippingForm from '@/components/chekout/CheckoutShippingForm';
import CheckoutPaymentMethods from '@/components/chekout/CheckoutPaymentMethods';
import CheckoutProductInfo from '@/components/chekout/CheckoutProductInfo';
import CheckoutOrderSummary from '@/components/chekout/CheckoutOrderSummary';
import { ShippingFormValues } from '@/types/checkout';
import { useOrder } from '@/hooks/useOrder';

export default function CheckoutInfo() {
  const { items = [] } = useCart();
  const searchParams = useSearchParams();
  const selectedIds = searchParams.get('ids')?.split(',') ?? [];
  const selectedItems = items.filter((item) => selectedIds.includes(item.id));
  const [paymentMethod, setPaymentMethod] = useState<
    'toss' | 'kakao' | 'card' | 'etc'
  >('card');
  const { createOrder, isLoading } = useOrder();
  const methods = useForm<ShippingFormValues>({
    defaultValues: {
      label: '',
      receiver: '',
      postcode: '',
      address: '',
      addressDetail: '',
      phone: '',
      isDefault: false,
      request: '',
    },
  });
  const { handleSubmit, getValues } = methods;

  // ① 요약 데이터 계산 (CheckoutOrderSummary와 동일 로직)
  const totalProductPrice = selectedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const adminDiscount = selectedItems.reduce((sum, item) => {
    const disc = Math.floor(
      item.product.price * (item.product.discount_rate / 100)
    );
    return sum + disc * item.quantity;
  }, 0);
  const shippingFee = totalProductPrice >= 50000 ? 0 : 3000;
  const totalPayable = totalProductPrice + shippingFee - adminDiscount;

  // ② onSubmit 핸들러
  const onSubmit = (data: ShippingFormValues) => {
    // Form에서 받아온 배송정보
    const {
      label: shipping_label,
      receiver: recipient_name,
      postcode,
      address,
      addressDetail: address_detail,
      request: shipping_request = '',
    } = data;

    // 상품 정보 배열을 OrderItemInput 타입으로 매핑
    const itemsInput: OrderItemInput[] = selectedItems.map((item) => ({
      id: item.id,
      product_id: item.product.id,
      size: item.size,
      quantity: item.quantity,
      price: item.product.final_price,
    }));

    // 결제 수단 추가 정보 (카드사 등)
    const card_company =
      paymentMethod === 'card'
        ? getValues('cardCompany') // 별도 input이 있다면
        : undefined;

    const payload: CreateOrderInput = {
      items: itemsInput,
      shipping_label,
      recipient_name,
      recipient_phone: getValues('phone'),
      postcode,
      address,
      address_detail,
      shipping_request,
      payment_method: paymentMethod,
      card_company,
      shipping_fee: shippingFee,
      admin_discount: adminDiscount,
      coupon_discount: 0, // 쿠폰 로직 적용 시 실제 값으로 대체
      mileage_used: 0, // 마일리지 사용 로직 적용 시 대체
      instant_discount: 0, // 즉시 할인 로직 적용 시 대체
      total_price: totalProductPrice,
      total_payable: totalPayable,
    };

    createOrder.mutate(payload, {
      onSuccess: () => {
        alert('주문이 정상적으로 처리되었습니다.');
      },
      onError: (err) => {
        console.error(err);
        alert('주문 처리 중 오류가 발생했습니다.');
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-6">
        <nav className="flex items-center text-sm uppercase mb-6 space-x-2">
          <span className="text-gray-400">01 Shopping Bag</span>
          <span>&gt;</span>
          <span className="font-semibold">02 Order</span>
          <span>&gt;</span>
          <span className="text-gray-400">03 Order Confirmed</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 border rounded space-y-8">
            <CheckoutShippingForm />
            <CheckoutPaymentMethods
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>
          <div className="bg-white p-6 border rounded space-y-6">
            <CheckoutProductInfo items={selectedItems} />
            <CheckoutOrderSummary
              items={selectedItems}
              totalProductPrice={totalProductPrice}
              adminDiscount={adminDiscount}
              shippingFee={shippingFee}
              mileageUsed={0}
              instantDiscount={0}
              totalPayable={totalPayable}
            />
            <button
              className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading
                ? '처리중...'
                : `${totalPayable.toLocaleString()}원 결제하기`}
            </button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
