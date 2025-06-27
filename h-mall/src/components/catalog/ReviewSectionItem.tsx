'use client';

import Image from 'next/image';
import StartSvg from '@/assets/icons/star.svg';
import { ReviewItemType } from '@/types/review';
import { useState } from 'react';

type Props = {
  review: ReviewItemType;
};

export default function ReviewSectionItem({ review }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasImages = Array.isArray(review.images) && review.images.length > 0;

  return (
    <li
      className={`border border-hr-gray-10 rounded-md cursor-pointer p-4 ${
        isExpanded ? 'bg-gray-50' : ''
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={`flex ${isExpanded ? 'flex-col' : 'flex-row'} gap-4`}>
        <div className="flex-1">
          {/* 상단 별점, 날짜 */}
          <div className="flex justify-between mb-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, idx) => (
                <StartSvg
                  key={idx}
                  size={16}
                  className={`${
                    idx < review.rating
                      ? 'text-hr-yellow-default'
                      : 'text-hr-gray-30'
                  }`}
                  fill={idx < review.rating ? '#FFD700' : 'none'}
                />
              ))}
            </div>
            <div className="text-xs text-hr-gray-40">
              {review.created_at
                ? new Date(review.created_at).toLocaleDateString()
                : '작성일자 없음'}
            </div>
          </div>

          {/* 이메일, 옵션, 썸네일 */}
          <div className="flex justify-between">
            <div>
              <div className="font-hr-semi-bold text-hr-gray-80">
                {review.email_mark}
              </div>
              <div className="text-hr-b4 text-hr-gray-50">
                옵션: {review.order_item_size || '옵션 없음'}
              </div>
            </div>
            {!isExpanded && hasImages && (
              <Image
                src={review.images![0]}
                alt="thumbnail"
                width={80}
                height={80}
                className="rounded-md object-cover border border-gray-200"
              />
            )}
          </div>

          {/* 본문 */}
          <p className="text-hr-gray-70 whitespace-pre-line my-4">
            {review.content}
          </p>

          {/* 갤러리 (확장 시) */}
          {isExpanded && hasImages && (
            <div className="flex gap-3 flex-wrap">
              {review.images!.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`review image ${idx}`}
                  width={240}
                  height={240}
                  className="rounded-md object-cover border border-gray-200"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
