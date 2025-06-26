'use client';

import { useMemo, useState } from 'react';
import { useReview } from '@/hooks/useReview';
import { ReviewItemType } from '@/types/review';
import HrPagination from '@/components/common/HrPagination';
import Image from 'next/image';
import StartSvg from '@/assets/icons/star.svg';
import FilterSvg from '@/assets/icons/filter.svg';

interface Props {
  id: string;
  productId: string;
}

const REVIEWS_PER_PAGE = 5;

export default function ReviewSection({ id, productId }: Props) {
  const { reviews, isLoading, fetchError } = useReview(productId);

  const [sortBy, setSortBy] = useState<'latest' | 'rating'>('latest');
  const [photoOnly, setPhotoOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);

  const filteredReviews = useMemo(() => {
    if (!reviews) return [];

    let data = [...reviews];

    if (photoOnly) {
      data = data.filter((r) => Array.isArray(r.images) && r.images.length > 0);
    }

    if (sortBy === 'latest') {
      data.sort(
        (a, b) =>
          new Date(b.created_at || '').getTime() -
          new Date(a.created_at || '').getTime()
      );
    } else if (sortBy === 'rating') {
      data.sort((a, b) => b.rating - a.rating);
    }

    return data;
  }, [reviews, sortBy, photoOnly]);

  const totalPage = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);
  const currentPageReviews = filteredReviews.slice(
    (page - 1) * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE
  );

  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  if (isLoading)
    return <div className="p-8 text-center">리뷰를 불러오는 중...</div>;
  if (fetchError)
    return <div className="p-8 text-center text-red-500">리뷰 로딩 실패</div>;
  if (!reviews || reviews.length === 0)
    return (
      <div className="p-8 text-center text-hr-gray-50">
        작성된 리뷰가 없습니다.
      </div>
    );

  return (
    <div id={id} className="bg-white p-6 border-t border-hr-gray-20 w-full ">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-hr-h4 font-hr-bold text-hr-gray-90">
            리뷰{' '}
            <span className="text-hr-purple-default">
              ({filteredReviews.length})
            </span>
          </h2>
          <div className="flex items-center gap-2 mt-1 text-hr-gray-70">
            <StartSvg
              className="text-hr-yellow-default"
              size={18}
              fill="#FFD700"
            />
            <span className="text-lg font-hr-semi-bold">{averageRating}</span>
            <span className="text-hr-b4 text-hr-gray-40">
              ({reviews.length}명 참여)
            </span>
          </div>
        </div>

        {/* 필터/정렬 */}
        <div className="flex gap-2">
          <select
            className="border border-hr-gray-30 rounded px-2 py-1 text-hr-b4"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as 'latest' | 'rating');
              setPage(1);
            }}
          >
            <option value="latest">최신순</option>
            <option value="rating">평점 높은순</option>
          </select>

          <button
            onClick={() => {
              setPhotoOnly(!photoOnly);
              setPage(1);
            }}
            className={`border rounded px-3 py-1 text-hr-b4 flex items-center gap-1 ${
              photoOnly
                ? 'border-hr-purple-default text-hr-purple-default'
                : 'border-hr-gray-30 text-hr-gray-60'
            }`}
          >
            <FilterSvg size={16} />
            포토 리뷰만
          </button>
        </div>
      </div>

      {/* 리뷰 목록 */}
      <ul className="space-y-4">
        {currentPageReviews.map((review: ReviewItemType) => {
          const isExpanded = expandedReviewId === review.id;
          const hasImages =
            Array.isArray(review.images) && review.images.length > 0;

          return (
            <li
              key={review.id}
              className={`border border-hr-gray-10 rounded-md cursor-pointer p-4 ${
                isExpanded ? 'bg-gray-50' : ''
              }`}
              onClick={() => setExpandedReviewId(isExpanded ? null : review.id)}
            >
              <div
                className={`flex ${isExpanded ? 'flex-col' : 'flex-row'} gap-4`}
              >
                <div className="flex-1">
                  {/* 상단 별점, 날짜 */}
                  <div className="flex justify-between">
                    <div className="flex flex-1 mb-2">
                      <div className="flex gap-1 mr-2">
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
                    </div>

                    <div className="flex gap-2 items-start">
                      <div className="text-xs text-hr-gray-40">
                        {review.created_at
                          ? new Date(review.created_at).toLocaleDateString()
                          : '작성일자 없음'}
                      </div>
                    </div>
                  </div>
                  {/* (옵션, 이메일) 오른쪽 썸네일 */}
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <span className="font-hr-semi-bold text-hr-gray-80">
                        {review.email_mark}
                      </span>
                      <div className="mb-2 text-hr-b4 text-hr-gray-50">
                        옵션: {review.order_item_size || '옵션 없음'}
                      </div>
                    </div>
                    {!isExpanded && hasImages && (
                      <div className="w-[80px] h-[80px] flex-shrink-0">
                        <Image
                          src={review.images![0]}
                          alt="thumbnail"
                          width={80}
                          height={80}
                          className="rounded-md object-cover border border-gray-200"
                        />
                      </div>
                    )}
                  </div>

                  {/* 리뷰 텍스트 */}
                  <p className="text-hr-gray-70 whitespace-pre-line mb-4">
                    {review.content}
                  </p>

                  {/* 이미지 (확대일 때는 본문 하단) */}
                  {isExpanded && hasImages && (
                    <div className="flex gap-3 flex-wrap mt-4">
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
        })}
      </ul>

      {/* 페이지네이션 */}
      {totalPage > 1 && (
        <div className="flex justify-center mt-8">
          <HrPagination
            currentPage={page}
            totalPages={totalPage}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
