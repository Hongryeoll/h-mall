'use client';

import { useMemo, useState } from 'react';
import { useReview } from '@/hooks/useReview';
import HrPagination from '@/components/common/HrPagination';
import HrSelectbox from '@/components/common/HrSelectbox';
import { ReviewSectionItemSkeleton } from '@/components/skeleton/ReviewSectionItemSkeleton';
import ReviewSectionItem from '@/components/catalog/ReviewSectionItem';
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

  if (isLoading) return <ReviewSectionItemSkeleton count={5} />;
  if (fetchError)
    return (
      <div className="p-8 text-center text-hr-danger-default">
        리뷰 로딩 실패
      </div>
    );
  if (!reviews || reviews.length === 0)
    return (
      <div className="p-8 text-center text-hr-gray-40">
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
          <HrSelectbox
            value={sortBy}
            onChange={(value) => {
              setSortBy(value as 'latest' | 'rating');
              setPage(1);
            }}
            options={[
              { value: 'latest', label: '최신순' },
              { value: 'rating', label: '평점 높은순' },
            ]}
          />

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
        {currentPageReviews.map((review) => (
          <ReviewSectionItem key={review.id} review={review} />
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
