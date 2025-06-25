'use client';

import { useMyReviews } from '@/hooks/useReview';
import MypageReviewItem from './MypageReviewItem';

export default function MypageReviewList() {
  const { data: reviews, isLoading, error } = useMyReviews();

  if (isLoading) return <p className="p-8 text-center">로딩 중…</p>;
  if (error)
    return <p className="p-8 text-center text-red-500">에러가 발생했습니다.</p>;
  if (!reviews || reviews.length === 0)
    return <p className="p-8 text-center">작성한 리뷰가 없습니다.</p>;

  return (
    <section className="px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">내가 작성한 리뷰</h1>

      {/* 데스크탑 */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left w-[40%]">상품정보</th>
                <th className="py-3 px-4 text-center w-[10%]">평점</th>
                <th className="py-3 px-4 text-left w-[30%]">리뷰내용</th>
                <th className="py-3 px-4 text-center w-[20%]">작성일</th>
                <th className="py-3 px-4 text-center w-[20%]">관리</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <MypageReviewItem key={review.id} review={review} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 모바일 */}
      <div className="sm:hidden space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <MypageReviewItem review={review} isCard />
          </div>
        ))}
      </div>
    </section>
  );
}
