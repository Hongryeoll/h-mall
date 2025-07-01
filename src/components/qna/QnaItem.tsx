import { useState } from 'react';
import QnAForm from '@/components/qna/QnaForm';
import AnswerForm from '@/components/qna/AnswerForm';
import {
  QnaItemType,
  QnaUpdateInput,
  QnaDeleteInput,
  QnaAnswerInput,
} from '@/types/qna';
import { UserProfile } from '@/types/user';
import { useModal } from '@/components/provider/ModalProvider';
import LockSVG from '@/assets/icons/lock.svg';

type Props = {
  qna: QnaItemType;
  user: UserProfile | null;
  onUpdate: (input: QnaUpdateInput) => void;
  onDelete: (input: QnaDeleteInput) => void;
  onAnswer: (input: QnaAnswerInput) => void;
};

export default function QnaItem({
  qna,
  user,
  onUpdate,
  onDelete,
  onAnswer,
}: Props) {
  const isMyQna = user?.id === qna.user_id;
  const isAdmin = user?.role === 'admin' || user?.role === 'readAdmin';
  const [editMode, setEditMode] = useState(false);
  const [answerMode, setAnswerMode] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);

  const isPrivate = qna.is_private;
  const canView = !isPrivate || isMyQna || isAdmin;
  const { showModal } = useModal();

  const previewLength = 30;
  const preview = qna.question.slice(0, previewLength);
  const restContent =
    qna.question.length > previewLength
      ? qna.question.slice(previewLength)
      : '';

  const handleClick = () => {
    if (!canView) {
      showModal({
        title: '비밀글입니다',
        description: '이 문의는 작성자와 관리자만 볼 수 있습니다.',
      });
      return;
    }
    setAnswerOpen(!answerOpen);
  };

  return (
    <div className="border rounded p-4">
      {/* 헤더 */}
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex flex-col gap-0.5">
          {isMyQna && (
            <div className="w-fit px-2 py-0.5 mb-1 rounded bg-hr-gray-10 text-hr-gray-50 text-hr-c1 border border-hr-gray-30">
              내가 남긴 QnA
            </div>
          )}
          <span className="text-hr-b5 font-hr-semi-bold">
            {qna.email_masked}
          </span>
          <span className="text-hr-c1 text-hr-gray-60">
            [{qna.category ?? '문의'}]
          </span>

          {/* 질문 내용 */}
          <div className="text-hr-b3 text-black whitespace-pre-line">
            {canView ? (
              <>
                {preview}
                {restContent && !answerOpen && (
                  <span className="text-hr-gray-40">...</span>
                )}
                {answerOpen && restContent}
              </>
            ) : (
              <div className="text-hr-gray-40 flex items-center">
                <LockSVG className="w-4 h-4 mr-1" />
                비밀글입니다.
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end min-w-[80px]">
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

      {/* 수정/삭제 및 답변 영역 */}
      {answerOpen && (
        <div className="mt-4 space-y-3">
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
            isMyQna && (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="text-hr-purple-default"
                >
                  수정
                </button>
                <button
                  onClick={() =>
                    onDelete({ qnaId: qna.id, product_id: qna.product_id })
                  }
                  className="text-hr-danger-default"
                >
                  삭제
                </button>
              </div>
            )
          )}

          {/* 답변 */}
          {qna.answer ? (
            <div className="bg-neutral-50 border rounded p-3">
              <div className="text-hr-b4 text-hr-gray-50 mb-1">판매자 답변</div>
              <div className="whitespace-pre-line">{qna.answer}</div>
            </div>
          ) : isAdmin && canView ? (
            answerMode ? (
              <AnswerForm
                onSubmit={(value) => {
                  onAnswer({ qnaId: qna.id, answer: value });
                  setAnswerMode(false);
                }}
                onCancel={() => setAnswerMode(false)}
              />
            ) : (
              <button
                onClick={() => setAnswerMode(true)}
                className="text-hr-purple-default"
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
