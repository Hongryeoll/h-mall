'use client';

import { useState } from 'react';
import { HrButton } from '@/components/common/HrButton';
import Image from 'next/image';
import { ProductFormProps } from '@/types/products';

type Props = {
  id: string;
  product: ProductFormProps;
};

export default function DetailSection({
  id,
  product: { detail_images },
}: Props) {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [collapsedScroll, setCollapsedScroll] = useState<number | null>(null);

  return (
    <div id={id} className="relative bg-white border-b border-hr-gray-20 p-6">
      <div
        className={`transition-all duration-300 ${
          isShowDetail ? 'max-h-none' : 'max-h-[320px] overflow-hidden'
        }`}
      >
        <h2 className="mb-4 text-hr-h4 font-hr-bold text-hr-gray-90">
          상품상세 설명
        </h2>
        <div className="space-y-4">
          {detail_images.map((src, idx) => (
            <div
              key={idx}
              className="w-full aspect-square relative overflow-hidden"
            >
              <Image
                src={src}
                alt={`상세 이미지 ${idx + 1}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
          {detail_images.length === 0 && (
            <p className="text-hr-gray-50">등록된 상세 이미지가 없습니다.</p>
          )}
        </div>
      </div>

      {!isShowDetail ? (
        <div className="absolute left-0 bottom-0 w-full">
          <div className="w-full h-[48px] bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
          <div className="px-6 pb-6 w-full bg-white">
            <HrButton
              text="더보기"
              type="default"
              size="xl"
              onClick={() => {
                setCollapsedScroll(window.scrollY);
                setIsShowDetail(true);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="absolute left-0 bottom-0 w-full">
          <div className="w-full h-[48px] bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
          <div className="px-6 pb-6 w-full ">
            <HrButton
              text="접기"
              type="line"
              size="xl"
              onClick={() => {
                setIsShowDetail(false);
                if (collapsedScroll !== null) {
                  window.scrollTo({
                    top: collapsedScroll,
                    behavior: 'auto',
                  });
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
