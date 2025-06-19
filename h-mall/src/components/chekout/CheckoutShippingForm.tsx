'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';
import { HrInput } from '@/components/common/HrInput';
import { HrButton } from '@/components/common/HrButton';
import HrSelectbox from '@/components/common/HrSelectbox';

export interface ShippingFormValues {
  label: string;
  receiver: string;
  postcode: string;
  address: string;
  addressDetail: string;
  phone1: string;
  phone2: string;
  isDefault: boolean;
  request: string;
}

export default function CheckoutShippingForm() {
  const { register, setValue, watch } = useFormContext<ShippingFormValues>();
  const [openPostcode, setOpenPostcode] = useState(false);

  const handleComplete = (data: any) => {
    const { zonecode, roadAddress } = data;
    setValue('postcode', zonecode);
    setValue('address', roadAddress);
    setOpenPostcode(false);
  };

  const request = watch('request');
  const handleSelectChange = (value: string) => setValue('request', value);

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">배송 정보</h2>
      {/* <div className="flex border-b mb-4">
        <HrButton
          text="기존 배송지"
          size="xs"
          type="flat"
          className="border-b-2 border-transparent text-hr-gray-50 px-4 py-2 rounded-none"
        />
        <HrButton
          text="신규입력"
          size="xs"
          type="flat"
          className="border-b-2 border-hr-yellow-default font-hr-regular px-4 py-2 rounded-none"
        />
      </div> */}

      <div className="space-y-4">
        {/* 주소 검색 */}
        <div>
          <label className="block mb-1">
            배송지 <span className="text-hr-danger-default">*</span>
          </label>
          <div className="flex flex-wrap gap-2 items-center">
            <HrInput<ShippingFormValues>
              name="postcode"
              placeholder="우편번호"
              required
              containerClassName="w-[180px] rounded-lg !border-gray-300"
              inputClassName="rounded-lg"
            />
            <div className="w-[120px]">
              <HrButton
                text="우편번호 검색"
                size="xs"
                type="flat"
                onClick={() => setOpenPostcode(true)}
              />
            </div>
          </div>
        </div>

        {/* 기본 주소 */}
        <div>
          <HrInput<ShippingFormValues>
            name="address"
            placeholder="주소"
            required
            containerClassName="mt-2"
          />
        </div>

        {/* 상세주소 */}
        <div>
          <HrInput<ShippingFormValues>
            name="addressDetail"
            placeholder="상세주소 입력 (예: 101동 202호)"
            containerClassName="mt-2"
          />
        </div>

        {/* 배송지명 */}
        <div>
          <label className="block mb-1">배송지명</label>
          <HrInput<ShippingFormValues>
            name="label"
            placeholder="배송지명 입력"
          />
        </div>

        {/* 수령인 */}
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

        {/* 연락처 */}
        <label className="block">연락처</label>
        <div className="grid grid-cols-2 gap-2">
          <HrInput<ShippingFormValues>
            name="phone1"
            placeholder="연락처1"
            required
          />
          <HrInput<ShippingFormValues> name="phone2" placeholder="연락처2" />
        </div>

        {/* 기본배송지 체크 */}
        {/* <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="defaultAddress"
            {...register('isDefault')}
            className="h-4 w-4"
          />
          <label htmlFor="defaultAddress">기본배송지로 등록</label>
        </div> */}

        {/* 요청사항 */}
        <div>
          <label className="block mb-1">배송시 요청사항을 선택해 주세요</label>
          <HrSelectbox
            value={request}
            onChange={handleSelectChange}
            options={[
              { value: '', label: '선택' },
              { value: '경비실', label: '부재 시 경비실에 맡겨주세요' },
              { value: '직접전달', label: '직접 전달해주세요' },
            ]}
          />
        </div>
      </div>

      {/* 다음 주소 모달 */}
      {openPostcode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-lg w-full">
            <div className="mb-2 text-sm text-right">
              <HrButton
                text="닫기"
                size="xs"
                type="light"
                onClick={() => setOpenPostcode(false)}
              />
            </div>
            <DaumPostcode onComplete={handleComplete} />
          </div>
        </div>
      )}
    </section>
  );
}
