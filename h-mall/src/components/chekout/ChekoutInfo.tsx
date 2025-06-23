'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import CheckoutShippingForm from '@/components/chekout/CheckoutShippingForm';
import CheckoutPaymentMethods from '@/components/chekout/CheckoutPaymentMethods';
import CheckoutProductInfo from '@/components/chekout/CheckoutProductInfo';
import CheckoutOrderSummary from '@/components/chekout/CheckoutOrderSummary';
import { useOrder } from '@/hooks/useOrder';
import { CheckoutFormValues } from '@/types/checkout';
import { ROUTES } from '@/types/constants';
import { useModal } from '@/components/provider/ModalProvider';

export default function CheckoutInfo() {
  const router = useRouter();
  const { showModal } = useModal();
  const { items = [] } = useCart();
  const searchParams = useSearchParams();
  const searchIds = searchParams.get('ids')?.split(',') ?? [];
  const selectedItems = items.filter(
    (item) => searchIds.includes(item.id) || searchIds.includes(item.product.id)
  );
  const [agreements, setAgreements] = useState({
    agree1: false,
    agree2: false,
    agree3: false,
  });

  const itemsInput = selectedItems.map((item) => ({
    id: item.id,
    product_id: item.product.id,
    size: item.size,
    quantity: item.quantity,
    price: item.product.final_price,
    discount_rate: item.product.discount_rate,
  }));

  const totalProductPrice = itemsInput.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const adminDiscount = itemsInput.reduce(
    (sum, item) =>
      sum + Math.floor(item.price * (item.discount_rate / 100)) * item.quantity,
    0
  );
  const shippingFee = totalProductPrice >= 50000 ? 0 : 3000;
  const totalPayable = totalProductPrice + shippingFee - adminDiscount;

  const methods = useForm<CheckoutFormValues>({
    defaultValues: {
      // 배송 폼
      label: '',
      receiver: '',
      postcode: '',
      address: '',
      addressDetail: '',
      phone: '',
      isDefault: false,
      request: '',
      // 결제 수단 폼
      paymentMethod: 'card',
      cardCompany: '',
      // 현금영수증 관련 필드
      receipt_type: '소득공제용',
      receipt_phone: '',
      // 계산된 값
      items: itemsInput,
      totalProductPrice,
      adminDiscount,
      shippingFee,
      totalPayable,
    },
  });

  const { handleSubmit } = methods;
  const { createOrder } = useOrder();

  const handleClickSubmit = () => {
    const values = methods.getValues();
    // 필수조건 체크
    if (!values.address || !values.addressDetail || !values.postcode) {
      return showModal({
        title: '입력 확인',
        description: '배송지를 모두 입력해주세요.',
      });
    }
    if (!values.receiver) {
      return showModal({
        title: '입력 확인',
        description: '수령인의 이름을 확인해주세요.',
      });
    }
    if (!values.phone) {
      return showModal({
        title: '입력 확인',
        description: '연락처를 확인해주세요.',
      });
    }
    if (values.phone.length !== 11) {
      return showModal({
        title: '연락처 오류',
        description: '연락처는 숫자 11자리로 입력해주세요.',
      });
    }
    // 약관동의 체크
    if (!agreements.agree1 || !agreements.agree2 || !agreements.agree3) {
      return showModal({
        title: '약관 동의 확인',
        description: '아래 필수사항에 모두 동의해야 합니다.',
      });
    }

    handleSubmit(onSubmit)();
  };

  const onSubmit = (data: CheckoutFormValues) => {
    const payload = {
      items: itemsInput,
      shipping_label: data.label,
      recipient_name: data.receiver,
      recipient_phone: data.phone,
      postcode: data.postcode,
      address: data.address,
      address_detail: data.addressDetail,
      shipping_request: data.request,
      payment_method: data.paymentMethod,
      card_company:
        data.paymentMethod === 'card' ? data.cardCompany : undefined,
      shipping_fee: data.shippingFee,
      admin_discount: data.adminDiscount,
      coupon_discount: 0, // 쿠폰 적용 로직 있을 때 치환
      mileage_used: 0, // 마일리지 로직 있을 때 치환
      instant_discount: 0, // 즉시할인 로직 있을 때 치환
      total_price: data.totalProductPrice,
      total_payable: data.totalPayable,
      receipt_type: data.receipt_type ?? null,
      receipt_phone: data.receipt_phone ?? null,
    };

    createOrder.mutate(payload, {
      onSuccess: (order) => {
        showModal({
          title: '주문완료',
          description: '주문이 정상적으로 완료되었습니다.',
        });
        router.push(ROUTES.MALL_CHECKOUT_CONFIRMED(order.id));
      },
      onError: (error) => {
        showModal({
          title: '주문실패',
          description: '주문 처리 중 오류가 발생했습니다.',
        });
        console.error(error);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-6">
        <nav className="flex items-center text-sm uppercase mb-6 space-x-2">
          <span className="text-hr-gray-40">01 Shopping Bag</span>
          <span>&gt;</span>
          <span className="font-semibold">02 Order</span>
          <span>&gt;</span>
          <span className="text-hr-gray-40">03 Order Confirmed</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 border rounded space-y-8">
            <CheckoutShippingForm />
            <CheckoutPaymentMethods />
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
              agreements={agreements}
              setAgreements={setAgreements}
            />
            <button
              className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
              // onClick={handleSubmit(onSubmit)}
              onClick={handleClickSubmit}
              // disabled={isLoading}
            >
              {/* {isLoading
                ? '처리중...'
                : `${totalPayable.toLocaleString()}원 결제하기`} */}
              {totalPayable.toLocaleString()}원 결제하기
            </button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
