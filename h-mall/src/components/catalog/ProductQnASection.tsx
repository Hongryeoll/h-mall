'use client';

import { useState } from 'react';
import { useQna } from '@/hooks/useQna';
import { useUserContext } from '@/components/provider/UserProvider';
import QnAForm from '@/components/qna/QnAForm';
import QnAItem from '@/components/qna/QnAItem';
import { ProductFormProps } from '@/types/products';

type Props = {
  id: string;
  product: ProductFormProps;
};

export default function ProductQnASection({ id, product }: Props) {
  const { user, loading: userLoading } = useUserContext();
  const { qnas, isLoading, addQna, updateQna, deleteQna, answerQna } = useQna(
    product.id
  );

  const [showForm, setShowForm] = useState(false);

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

  return (
    <section id={id} className="w-full px-6 py-10 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-hr-h4 font-hr-bold">상품 Q&A</h2>

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
        <QnAForm
          productId={product.id}
          userId={user.id}
          onSubmit={handleQnaSubmit}
          onCancel={toggleForm}
        />
      )}

      {isPageLoading ? (
        <div className="text-center py-10 text-hr-gray-40">로딩 중...</div>
      ) : qnas?.length === 0 ? (
        <div className="text-center py-10 text-hr-gray-40">
          등록된 Q&A가 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {qnas?.map((qna) => (
            <QnAItem
              key={qna.id}
              qna={qna}
              user={user}
              onUpdate={updateQna.mutate}
              onDelete={deleteQna.mutate}
              onAnswer={answerQna.mutate}
            />
          ))}
        </div>
      )}
    </section>
  );
}
