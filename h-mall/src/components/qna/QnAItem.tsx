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
import LockSVG from '@/assets/icons/lock.svg';

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
  const isAdmin = user?.role === 'admin' || user?.role === 'readAdmin';
  const [editMode, setEditMode] = useState(false);
  const [answerMode, setAnswerMode] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);

  const isPrivate = qna.is_private;
  const canView = !isPrivate || isOwner || isAdmin;
  const canViewAnswer = !isPrivate ? !!user : isOwner || isAdmin;

  return (
    <div className="border rounded p-4">
      {/* 질문 요약 영역 */}
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => setAnswerOpen(!answerOpen)}
      >
        <div className="space-x-1">
          <span className="font-semibold">
            {qna.userinfo?.email ?? '비회원'}
          </span>
          <span className="text-hr-gray-60">[{qna.category ?? '문의'}]</span>
          <span className="text-hr-b4 text-black">
            {canView ? (
              qna.question.length > 50 ? (
                qna.question.slice(0, 50) + '...'
              ) : (
                qna.question
              )
            ) : (
              <span className="text-hr-gray-40 flex items-center">
                <LockSVG className="w-4 h-4 mr-1" />
                비밀글입니다.
              </span>
            )}
          </span>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-hr-gray-50 text-hr-c1">
            {new Date(qna.created_at ?? '').toLocaleDateString()}
          </span>
          {qna.answer ? (
            <span className="px-2 py-0.5 mt-1 bg-hr-purple-bg text-hr-purple-default text-hr-c1 rounded">
              답변완료
            </span>
          ) : (
            <span className="px-2 py-0.5 mt-1 bg-hr-gray-10 text-hr-gray-60 text-hr-c1 rounded">
              답변대기중
            </span>
          )}
        </div>
      </div>

      {/* 펼쳐진 상세 영역 */}
      {answerOpen && (
        <div className="mt-4 space-y-3">
          {/* 수정 모드 */}
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
              onCancel={() => setEditMode(false)}
            />
          ) : (
            <div className="font-medium">
              {canView ? (
                qna.question
              ) : (
                <div className="text-hr-gray-40 flex items-center">
                  <LockSVG className="w-4 h-4 mr-1" />
                  비밀글입니다.
                </div>
              )}
            </div>
          )}

          {/* 버튼 (작성자만) */}
          {isOwner && (
            <div className="flex gap-2">
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

          {/* 답변 영역 */}
          {qna.answer ? (
            canViewAnswer ? (
              <div className="bg-neutral-50 border rounded p-3">
                <div className="text-hr-b4 text-hr-gray-50 mb-1">
                  판매자 답변
                </div>
                <div>{qna.answer}</div>
              </div>
            ) : (
              <div className="flex items-center text-hr-gray-40 text-hr-b4">
                <LockSVG width={16} height={16} className="mr-1" />
                작성자와 관리자만 확인할 수 있습니다.
              </div>
            )
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
              <button
                onClick={() => setAnswerMode(true)}
                className="text-blue-500"
              >
                답변달기
              </button>
            )
          ) : (
            <div className="text-hr-gray-40 text-hr-b4">답변 대기중</div>
          )}
        </div>
      )}
    </div>
  );
}
