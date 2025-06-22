'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';
import { HrInput } from '@/components/common/HrInput';
import { HrButton } from '@/components/common/HrButton';
import HrSelectbox from '@/components/common/HrSelectbox';
import { ShippingFormValues, DaumPostcodeData } from '@/types/checkout';

export default function CheckoutShippingForm() {
  const { setValue, watch } = useFormContext<ShippingFormValues>();
  const [openPostcode, setOpenPostcode] = useState(false);

  const handleComplete = (data: DaumPostcodeData) => {
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
      <div className="space-y-3">
        {/* 주소 검색 */}
        <div>
          <label className="block mb-1">
            배송지 <span className="text-hr-danger-default">*</span>
          </label>
          <div className="flex flex-wrap gap-2 items-center">
            <HrInput<ShippingFormValues>
              name="postcode"
              size="xs"
              placeholder="우편번호"
              disabled
              containerClassName="w-[180px] rounded-lg !border-hr-gray-30"
              inputClassName="rounded-lg"
            />
            <div className="w-[120px]">
              <HrButton
                text="우편번호 검색"
                size="m"
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
            size="xs"
            placeholder="주소"
            disabled
          />
        </div>

        {/* 상세주소 */}
        <div>
          <HrInput<ShippingFormValues>
            name="addressDetail"
            size="xs"
            placeholder="상세주소 입력 (예: 101동 202호)"
          />
        </div>

        {/* 수령인 */}
        <div>
          <label className="block mb-1">
            수령인 <span className="text-hr-danger-default">*</span>
          </label>
          <HrInput<ShippingFormValues>
            name="receiver"
            size="xs"
            placeholder="수령인 입력"
            required
          />
        </div>

        {/* 연락처 */}
        <div>
          <label className="block mb-1">연락처</label>
          <HrInput<ShippingFormValues>
            name="phone"
            type="tel"
            placeholder="숫자만 입력해 주세요."
            size="xs"
            maxLength={11}
            containerClassName="w-full"
            inputClassName="rounded"
            rules={{
              required: '필수 항목입니다.',
              pattern: {
                value: /^[0-9]{9,11}$/,
                message: '숫자만 입력해 주세요. (9~11자리)',
              },
            }}
          />
        </div>

        {/* 요청사항 */}
        <div>
          <label className="block mb-1">배송시 요청사항을 선택해 주세요</label>
          <HrSelectbox
            value={request}
            onChange={handleSelectChange}
            options={[
              { value: '', label: '선택해주세요.' },
              {
                value: '부재 시 경비실에 맡겨주세요',
                label: '부재 시 경비실에 맡겨주세요',
              },
              { value: '직접 전달해주세요', label: '직접 전달해주세요' },
            ]}
          />
        </div>
      </div>

      {/* 다음 주소 모달 */}
      {openPostcode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow max-w-lg w-full">
            <DaumPostcode onComplete={handleComplete} />
            <div className="mt-4 text-hr-b4 text-right">
              <HrButton
                text="닫기"
                size="xs"
                type="flat"
                onClick={() => setOpenPostcode(false)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
