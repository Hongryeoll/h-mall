// components/catalog/ProductReviewSection.tsx
'use client';

import { useReview } from '@/hooks/useReview';
import { ReviewItem } from '@/types/review';
import Image from 'next/image';

interface Props {
  id: string;
  productId: string;
}

export default function ProductReviewSection({ id, productId }: Props) {
  const { reviews, isLoading, fetchError } = useReview(productId);

  if (isLoading)
    return <div className="p-8 text-center">리뷰를 불러오는 중...</div>;
  if (fetchError)
    return <div className="p-8 text-center text-red-500">리뷰 로딩 실패</div>;
  if (!reviews || reviews.length === 0)
    return (
      <div className="p-8 text-center text-gray-500">
        작성된 리뷰가 없습니다.
      </div>
    );

  return (
    <div id={id} className="bg-white px-6 py-10 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6">리뷰({reviews.length})</h2>
      <ul className="space-y-10">
        {reviews.map((review: ReviewItem) => (
          <li key={review.id} className="border-b pb-6">
            {/* 작성자 및 별점 */}
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-gray-800">
                ⭐️ {review.rating} / 5
              </div>
              <span className="text-sm text-gray-400">
                {review.created_at
                  ? new Date(review.created_at).toLocaleDateString()
                  : '날짜 없음'}
              </span>
            </div>

            {/* 리뷰 텍스트 */}
            <p className="text-gray-700 whitespace-pre-line">
              {review.content}
            </p>

            {/* 이미지가 있을 경우 출력 */}
            {Array.isArray(review.images) && review.images.length > 0 && (
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {review.images.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt={`review image ${idx}`}
                    width={80}
                    height={80}
                    className="rounded-md object-cover flex-shrink-0"
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
