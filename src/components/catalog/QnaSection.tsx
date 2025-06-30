'use client';

import { useState } from 'react';
import { useQna } from '@/hooks/useQna';
import { useUserContext } from '@/components/provider/UserProvider';
import QnaForm from '@/components/qna/QnaForm';
import QnaItem from '@/components/qna/QnaItem';
import { QnaSectionItemSkeleton } from '@/components/skeleton/QnaSectionItemSkeleton';
import HrPagination from '@/components/common/HrPagination';
import { ProductFormProps } from '@/types/products';

type Props = {
  id: string;
  product: ProductFormProps;
};

export default function QnaSection({ id, product }: Props) {
  const { user, loading: userLoading } = useUserContext();
  const { qnas, isLoading, addQna, updateQna, deleteQna, answerQna } = useQna(
    product.id
  );

  const [showForm, setShowForm] = useState(false);

  // 페이지네이션 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const isPageLoading = isLoading || userLoading;

  const toggleForm = () => setShowForm((prev) => !prev);

  const handleQnaSubmit = (input: {
    question: string;
    is_private: boolean;
  }) => {
    if (!user) return;
    addQna.mutate({
      product_id: product.id,
      user_id: user.id,
      question: input.question,
      is_private: input.is_private,
    });
    setShowForm(false);
  };

  // 페이지별 데이터 슬라이싱
  const totalQnas = qnas?.length ?? 0;
  const totalPages = Math.ceil(totalQnas / itemsPerPage);

  const paginatedQnas = qnas?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id={id} className="w-full p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-hr-h4 font-hr-bold text-hr-gray-90">상품 Q&A</h2>

        {user ? (
          <button
            onClick={toggleForm}
            className="text-hr-b4 text-hr-gray-60 underline hover:text-black"
          >
            {showForm ? '닫기' : 'Q&A 쓰기'}
          </button>
        ) : (
          <div className="text-hr-b4 text-hr-gray-40">
            로그인 후 Q&A 작성 가능
          </div>
        )}
      </div>

      {showForm && user && (
        <QnaForm
          productId={product.id}
          userId={user.id}
          onSubmit={handleQnaSubmit}
          onCancel={toggleForm}
        />
      )}

      {isPageLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <QnaSectionItemSkeleton key={i} />
          ))}
        </div>
      ) : totalQnas === 0 ? (
        <div className="text-center py-10 text-hr-gray-40">
          등록된 Q&A가 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedQnas?.map((qna) => (
            <QnaItem
              key={qna.id}
              qna={qna}
              user={user}
              onUpdate={updateQna.mutate}
              onDelete={deleteQna.mutate}
              onAnswer={answerQna.mutate}
            />
          ))}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="pt-6">
              <HrPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
