'use client';

import { useForm } from 'react-hook-form';
import { useModal } from '@/components/provider/ModalProvider';

type Props = {
  initialValue?: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
};

export default function AnswerForm({
  initialValue = '',
  onSubmit,
  onCancel,
}: Props) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { answer: initialValue },
  });
  const { showModal } = useModal();

  const handleFormSubmit = (data: { answer: string }) => {
    if (data.answer.trim().length < 5) {
      showModal({
        title: '답변실패',
        description: '답변은 최소 5자 이상 입력해주세요.',
      });
      return;
    }
    onSubmit(data.answer);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-2 space-y-2">
      <textarea
        rows={3}
        {...register('answer')}
        className="w-full border rounded p-2"
        placeholder="답변을 입력하세요"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-black text-white rounded-md px-4 py-1"
        >
          등록
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border rounded-md px-4 py-1"
        >
          닫기
        </button>
      </div>
    </form>
  );
}
