'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { HrInput } from '@/components/common/HrInput';

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

export default function CheckoutShippingForm() {
  const { register } = useFormContext<ShippingFormValues>();

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">배송 정보</h2>
      <div className="flex border-b mb-4">
        <button className="px-4 py-2 border-b-2 border-transparent text-gray-500">
          기존 배송지
        </button>
        <button className="px-4 py-2 border-b-2 border-orange-500 font-medium">
          신규입력
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1">배송지명</label>
          <HrInput<ShippingFormValues>
            name="label"
            placeholder="배송지명 입력"
          />
        </div>

        <div>
          <label className="block mb-1">
            수령인 <span className="text-red-500">*</span>
          </label>
          <HrInput<ShippingFormValues>
            name="receiver"
            placeholder="수령인 입력"
            required
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block mb-1">
              배송지 <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <HrInput<ShippingFormValues>
                name="postcode"
                placeholder="우편번호 검색"
                required
                containerClassName="flex-1 rounded-l"
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

        <HrInput<ShippingFormValues>
          name="addressDetail"
          placeholder="상세주소 입력"
        />

        <div className="grid grid-cols-3 gap-2">
          <HrInput<ShippingFormValues>
            name="phone1"
            placeholder="연락처1"
            required
          />
          <HrInput<ShippingFormValues> name="phone2" placeholder="연락처2" />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="defaultAddress"
            {...register('isDefault')}
            className="h-4 w-4"
          />
          <label htmlFor="defaultAddress">기본배송지로 등록</label>
        </div>

        <div>
          <label className="block mb-1">배송시 요청사항을 선택해 주세요</label>
          <select
            {...register('request')}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">선택</option>
            <option value="경비실">부재 시 경비실에 맡겨주세요</option>
            <option value="직접전달">직접 전달해주세요</option>
          </select>
        </div>
      </div>
    </section>
  );
}
