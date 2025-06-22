'use client';

import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import HrSelectbox from '@/components/common/HrSelectbox';
import TossSVG from '@/assets/icons/toss-simbol.svg';
import KakaoSVG from '@/assets/icons/kakaopay.svg';
import NaverSVG from '@/assets/icons/naverpay.svg';
import { CheckoutFormValues } from '@/types/checkout';
import { HrInput } from '@/components/common/HrInput';

export default function CheckoutPaymentMethods() {
  const { register, watch, setValue } = useFormContext<CheckoutFormValues>();
  const paymentMethod = watch('paymentMethod');
  const cardCompany = watch('cardCompany');

  useEffect(() => {
    if (paymentMethod !== 'card') {
      setValue('cardCompany', paymentMethod);
    }
  }, [paymentMethod, setValue]);

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">결제 방법</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Toss Pay */}
          <label
            htmlFor="toss"
            className="flex items-center p-3 border rounded-lg cursor-pointer transition hover:shadow peer-checked:ring-2 peer-checked:ring-yellow-400 peer-checked:bg-yellow-50"
          >
            <input
              id="toss"
              type="radio"
              {...register('paymentMethod')}
              value="toss"
              className="sr-only peer"
            />
            <span className="w-4 h-4 mr-1 flex-shrink-0 border-2 border-gray-300 rounded-full peer-checked:border-yellow-400 peer-checked:bg-yellow-400 transition" />
            <TossSVG width={20} height={20} />
            <span className="font-medium">토스페이</span>
          </label>

          {/* Kakao Pay */}
          <label
            htmlFor="kakao"
            className="flex items-center p-3 border rounded-lg cursor-pointer transition hover:shadow peer-checked:ring-2 peer-checked:ring-yellow-400 peer-checked:bg-yellow-50"
          >
            <input
              id="kakao"
              type="radio"
              {...register('paymentMethod')}
              value="kakao"
              className="sr-only peer"
            />
            <span className="w-4 h-4 mr-1 flex-shrink-0 border-2 border-gray-300 rounded-full peer-checked:border-yellow-400 peer-checked:bg-yellow-400 transition" />
            <KakaoSVG width={25} height={25} className="mr-1" />
            <span className="font-medium">카카오페이</span>
          </label>

          {/* Naver Pay */}
          <label
            htmlFor="naver"
            className="flex items-center p-3 border rounded-lg cursor-pointer transition hover:shadow peer-checked:ring-2 peer-checked:ring-yellow-400 peer-checked:bg-green-50"
          >
            <input
              id="naver"
              type="radio"
              {...register('paymentMethod')}
              value="naver"
              className="sr-only peer"
            />
            <span className="w-4 h-4 mr-1 flex-shrink-0 border-2 border-gray-300 rounded-full peer-checked:border-yellow-400 peer-checked:bg-yellow-400 transition" />
            <NaverSVG width={25} height={25} className="mr-1" />
            <span className="font-medium">네이버페이</span>
          </label>

          {/* Card Payment */}
          <label
            htmlFor="card"
            className="flex items-center p-3 border rounded-lg cursor-pointer transition hover:shadow peer-checked:ring-2 peer-checked:ring-yellow-400 peer-checked:bg-yellow-50"
          >
            <input
              id="card"
              type="radio"
              {...register('paymentMethod')}
              value="card"
              checked={paymentMethod === 'card'}
              className="sr-only peer"
            />
            <span className="w-4 h-4 mr-3 flex-shrink-0 border-2 border-gray-300 rounded-full peer-checked:border-yellow-400 peer-checked:bg-yellow-400 transition" />
            <span className="font-medium">카드 결제</span>
          </label>
        </div>

        {/* Card Company Select */}
        {paymentMethod === 'card' && (
          <HrSelectbox
            value={cardCompany}
            onChange={(val) => setValue('cardCompany', val)}
            options={[
              { value: '', label: '카드사를 선택해주세요.' },
              { value: 'HYUNDAI', label: '현대카드' },
              { value: 'SAMSUNG', label: '삼성카드' },
              { value: 'KB', label: 'KB국민카드' },
              { value: 'SHINHAN', label: '신한카드' },
              { value: 'HANA', label: '하나카드' },
              { value: 'WOORI', label: '우리카드' },
              { value: 'LOTTE', label: '롯데카드' },
              { value: 'BC', label: 'BC카드' },
              { value: 'NH', label: 'NH농협카드' },
            ]}
            className="mt-2"
          />
        )}

        {/* Etc Info */}
        {paymentMethod === 'card' && (
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

        {/* 현금영수증 */}
        {['toss', 'kakao', 'naver'].includes(paymentMethod) && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-base mb-2">현금 영수증</h3>
            <p className="text-sm text-gray-400 mb-2">
              선택한 결제수단의 현금결제(머니, 계좌 등)시 현금영수증이
              발급됩니다.
            </p>

            {/* 발급 유형 선택 */}
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register('receipt_phone')}
                  value="소득공제용"
                  defaultChecked
                />
                소득공제용
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register('receipt_type')}
                  value="지출증빙용"
                />
                지출증빙용
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register('receipt_type')}
                  value="미발행"
                />
                미발행
              </label>
            </div>

            {/* 휴대폰 번호 */}
            <div className="mb-2">
              <HrSelectbox
                value="휴대폰 번호"
                onChange={() => {}}
                options={[{ value: '휴대폰 번호', label: '휴대폰 번호' }]}
              />
            </div>
            <HrInput<CheckoutFormValues>
              name="receipt_phone"
              type="tel"
              placeholder="숫자만 입력해 주세요."
              size="s"
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
        )}
      </form>
    </section>
  );
}
