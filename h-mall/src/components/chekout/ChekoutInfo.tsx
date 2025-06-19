'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import CheckoutShippingForm from '@/components/chekout/CheckoutShippingForm';
import CheckoutPaymentMethods from '@/components/chekout/CheckoutPaymentMethods';
import CheckoutProductInfo from '@/components/chekout/CheckoutProductInfo';
import CheckoutOrderSummary from '@/components/chekout/CheckoutOrderSummary';

interface ShippingFormValues {
  label: string;
  receiver: string;
  postcode: string;
  addressDetail: string;
  phone1: string;
  phone2: string;
  isDefault: boolean;
  request: string;
}

export default function CheckoutInfo() {
  const [paymentMethod, setPaymentMethod] = useState<
    'toss' | 'kakao' | 'card' | 'etc'
  >('card');

  const methods = useForm<ShippingFormValues>({
    defaultValues: {
      label: '',
      receiver: '',
      postcode: '',
      addressDetail: '',
      phone1: '',
      phone2: '',
      isDefault: false,
      request: '',
    },
  });

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
            <CheckoutProductInfo />
            <CheckoutOrderSummary />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
