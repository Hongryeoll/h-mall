import { useState } from 'react';
import QnAForm from '@/components/qna/QnAForm';
import QnAAnswerForm from '@/components/qna/QnAAnswerForm';
import {
  QnaItem,
  QnaUpdateInput,
  QnaDeleteInput,
  QnaAnswerInput,
} from '@/types/qna';
import { UserProfile } from '@/components/provider/UserProvider';

type Props = {
  qna: QnaItem;
  user: UserProfile | null;
  onUpdate: (input: QnaUpdateInput) => void;
  onDelete: (input: QnaDeleteInput) => void;
  onAnswer: (input: QnaAnswerInput) => void;
};

export default function QnAItem({
  qna,
  user,
  onUpdate,
  onDelete,
  onAnswer,
}: Props) {
  const isOwner = user?.id === qna.user_id;
  const isAdmin = user?.role === 'admin';
  const [editMode, setEditMode] = useState(false);
  const [answerMode, setAnswerMode] = useState(false);

  const isPrivate = qna.is_private;
  const canView = !isPrivate || isOwner || isAdmin;

  return (
    <div className="border rounded p-4">
      {/* 질문 정보 */}
      <div className="flex justify-between text-hr-gray-50 text-hr-b4">
        <div>
          {qna.userinfo?.nickname ?? '비회원'} ·{' '}
          {new Date(qna.created_at ?? '').toLocaleDateString()}
        </div>
        {isOwner && (
          <div className="space-x-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className="text-blue-500"
            >
              수정
            </button>
            <button
              onClick={() =>
                onDelete({ qnaId: qna.id, product_id: qna.product_id })
              }
              className="text-red-500"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {/* 질문 본문 */}
      {editMode ? (
        <QnAForm
          initialQuestion={qna.question}
          isPrivate={qna.is_private ?? false}
          productId={qna.product_id}
          userId={qna.user_id ?? ''}
          onSubmit={(input) => {
            onUpdate({
              qnaId: qna.id,
              question: input.question,
              is_private: input.is_private,
            });
            setEditMode(false);
          }}
        />
      ) : (
        <div className="font-medium my-2">
          {canView ? (
            qna.question
          ) : (
            <div className="text-hr-gray-40">🔒 비밀글입니다.</div>
          )}
        </div>
      )}

      {/* 답변 영역 */}
      {qna.answer ? (
        <div className="bg-hr-gray-50 border rounded p-3 mt-2">
          <div className="text-hr-b4 text-hr-gray-50 mb-1">판매자 답변</div>
          <div>{qna.answer}</div>
        </div>
      ) : isAdmin && canView ? (
        answerMode ? (
          <QnAAnswerForm
            onSubmit={(value) => {
              onAnswer({ qnaId: qna.id, answer: value });
              setAnswerMode(false);
            }}
            onCancel={() => setAnswerMode(false)}
          />
        ) : (
          <button onClick={() => setAnswerMode(true)} className="text-blue-500">
            답변달기
          </button>
        )
      ) : (
        <div className="text-hr-gray-40 text-hr-b4">답변 대기중</div>
      )}
    </div>
  );
}
