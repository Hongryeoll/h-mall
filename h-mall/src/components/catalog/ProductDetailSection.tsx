'use client';

import { useState } from 'react';
import { HrButton } from '@/components/common/HrButton';

interface Props {
  id: string;
}

export default function ProductDetailSection({ id }: Props) {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [collapsedScroll, setCollapsedScroll] = useState<number | null>(null);

  return (
    <div
      id={id}
      className="relative bg-white border-b border-hr-gray-20 px-6 py-6"
    >
      <div
        className={`transition-all duration-300 ${
          isShowDetail ? 'max-h-none' : 'max-h-[320px] overflow-hidden'
        }`}
      >
        <div className="mb-4 text-lg font-semibold text-hr-gray-70">
          상품상세 설명
        </div>
        <div className="space-y-2 text-hr-gray-50">
          {[...Array(50)].map((_, i) => (
            <div key={i}>상세 내용 예시 줄 {i + 1}</div>
          ))}
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
        <div className="px-6 pb-6 w-full bg-white">
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
      )}
    </div>
  );
}
