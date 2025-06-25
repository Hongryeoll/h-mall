'use client';

import { useMemo, useState } from 'react';
import { useReview } from '@/hooks/useReview';
import { ReviewItem } from '@/types/review';
import HrPagination from '@/components/common/HrPagination';
import Image from 'next/image';
import StartSvg from '@/assets/icons/star.svg';
import FilterSvg from '@/assets/icons/filter.svg';

interface Props {
  id: string;
  productId: string;
}

const REVIEWS_PER_PAGE = 5;

export default function ProductReviewSection({ id, productId }: Props) {
  const { reviews, isLoading, fetchError } = useReview(productId);

  const [sortBy, setSortBy] = useState<'latest' | 'rating'>('latest');
  const [photoOnly, setPhotoOnly] = useState(false);
  const [page, setPage] = useState(1);

  const photoReviews = useMemo(
    () =>
      reviews?.filter((r) => Array.isArray(r.images) && r.images.length > 0) ||
      [],
    [reviews]
  );

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

  const maskUser = (email?: string | null, nickname?: string | null) => {
    const base = nickname || email?.split('@')[0] || 'user';
    return base.length <= 2 ? base + '*****' : base.slice(0, 3) + '*****';
  };

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
    <div
      id={id}
      className="bg-white px-6 py-10 border-t border-gray-200 max-w-4xl mx-auto"
    >
      {/* 포토 리뷰 섹션 */}
      {photoReviews.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {photoReviews.slice(0, 5).map((r, idx) => (
              <Image
                key={idx}
                src={r.images?.[0] || '/no-image.png'}
                alt="review"
                width={160}
                height={160}
                className="rounded-md object-cover aspect-square"
              />
            ))}
            {photoReviews.length > 5 && (
              <div className="relative rounded-md bg-black/30 flex items-center justify-center aspect-square">
                <div className="text-white text-sm font-semibold">
                  더보기 +{photoReviews.length - 5}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            리뷰{' '}
            <span className="text-hr-purple-default">
              ({filteredReviews.length})
            </span>
          </h2>
          <div className="flex items-center gap-2 mt-1 text-gray-700">
            <StartSvg
              className="text-hr-yellow-default"
              size={18}
              fill="#FFD700"
            />
            <span className="text-lg font-semibold">{averageRating}</span>
            <span className="text-sm text-gray-400">
              ({reviews.length}명 참여)
            </span>
          </div>
        </div>

        {/* 필터/정렬 */}
        <div className="flex gap-2">
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as 'latest' | 'rating');
              setPage(1); // 정렬 변경 시 페이지 초기화
            }}
          >
            <option value="latest">최신순</option>
            <option value="rating">평점 높은순</option>
          </select>

          <button
            onClick={() => {
              setPhotoOnly(!photoOnly);
              setPage(1); // 포토 필터 변경 시 페이지 초기화
            }}
            className={`border rounded px-3 py-1 text-sm flex items-center gap-1 ${
              photoOnly
                ? 'border-hr-purple-default text-hr-purple-default'
                : 'border-gray-300 text-gray-600'
            }`}
          >
            <FilterSvg size={16} />
            포토 리뷰만
          </button>
        </div>
      </div>

      {/* 리뷰 목록 */}
      <ul className="space-y-8">
        {currentPageReviews.map((review: ReviewItem) => (
          <li
            key={review.id}
            className="border border-gray-100 rounded-xl shadow-sm p-6"
          >
            {/* 작성자 및 별점 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">
                  {maskUser(review.userinfo?.email, review.userinfo?.nickname)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, idx) => (
                  <StartSvg
                    key={idx}
                    size={16}
                    className={`${
                      idx < review.rating
                        ? 'text-hr-yellow-default'
                        : 'text-gray-300'
                    }`}
                    fill={idx < review.rating ? '#FFD700' : 'none'}
                  />
                ))}
              </div>
            </div>

            {/* 옵션 정보 */}
            <div className="mb-3 text-sm text-gray-500">
              <span>옵션: {review.order_items?.size || '옵션 없음'}</span>
            </div>

            {/* 리뷰 이미지 */}
            {Array.isArray(review.images) && review.images.length > 0 && (
              <div className="flex gap-3 overflow-x-auto">
                {review.images.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt={`review image ${idx}`}
                    width={100}
                    height={100}
                    className="rounded-md object-cover flex-shrink-0 border border-gray-200"
                  />
                ))}
              </div>
            )}

            {/* 리뷰 텍스트 */}
            <p className="text-gray-700 whitespace-pre-line mt-4 mb-4">
              {review.content}
            </p>

            {/* 작성 날짜 */}
            <div className="mt-4 text-xs text-gray-400 text-right">
              {review.created_at
                ? new Date(review.created_at).toLocaleDateString()
                : '작성일자 없음'}
            </div>
          </li>
        ))}
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
