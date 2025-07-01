'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useUserStore } from '@/store/user/useUserStore';
import { HrInput } from '@/components/common/HrInput';
import { HrTextarea } from '@/components/common/HrTextarea';
import HrSelectbox from '@/components/common/HrSelectbox';

export type QnaFormValues = {
  email: string;
  question: string;
  is_private: boolean;
  category: string;
};

type Props = {
  productId: string;
  userId: string;
  initialQuestion?: string;
  isPrivate?: boolean;
  onSubmit: (input: QnaFormValues) => void;
  onCancel?: () => void;
};

export default function QnaForm({
  initialQuestion = '',
  isPrivate = false,
  onSubmit,
  onCancel,
}: Props) {
  const user = useUserStore((state) => state.user);

  const methods = useForm<QnaFormValues>({
    defaultValues: {
      email: user?.email || '',
      question: initialQuestion,
      is_private: isPrivate,
      category: '상품문의',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = methods;

  useEffect(() => {
    if (user?.email) {
      setValue('email', user.email);
    }
  }, [user?.email, setValue]);

  const handleFormSubmit = (data: QnaFormValues) => {
    onSubmit(data);
    reset();
  };

  const categoryOptions = [
    { value: '상품문의', label: '상품문의' },
    { value: '재입고문의', label: '재입고문의' },
    { value: '사이즈문의', label: '사이즈문의' },
    { value: '배송문의', label: '배송문의' },
    { value: '기타', label: '기타' },
  ];

  const category = watch('category');

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full border rounded-md p-5 bg-neutral-50 mb-6"
      >
        <div className="space-y-4">
          {/* 아이디 */}
          <div className="flex flex-col gap-1">
            <div className="text-hr-b2 font-hr-semi-bold">아이디</div>
            <div className="text-hr-b4 font-regular">{user?.email}</div>
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-1">
            <div className="text-hr-b2 font-hr-semi-bold">이메일주소</div>
            <HrInput<QnaFormValues>
              name="email"
              size="xs"
              placeholder="이메일"
            />
          </div>

          {/* 체크박스 */}
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input type="checkbox" {...methods.register('is_private')} />
              비밀글
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" defaultChecked />
              답변메일받기
            </label>
          </div>

          {/* 문의 카테고리 */}
          <div className="flex flex-col gap-1">
            <div className="text-hr-b2 font-hr-semi-bold">문의 카테고리</div>
            <HrSelectbox
              value={category}
              onChange={(value) => setValue('category', value)}
              options={categoryOptions}
              placeholder="문의 카테고리를 선택하세요"
            />
          </div>

          {/* 질문 입력 */}
          <div className="flex flex-col gap-1">
            <HrTextarea
              name="question"
              placeholder="질문은 최소 5자 이상 입력해 주세요."
              maxLength={1000}
              rows={5}
            />
            {errors.question && (
              <p className="text-hr-danger-default text-hr-b4">
                {errors.question.message}
              </p>
            )}
          </div>

          {/* 버튼 */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-hr-purple-default text-hr-purple-bg rounded-md px-4 py-2"
            >
              등록
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="text-hr-purple-default border border-hr-purple-border rounded-md px-4 py-2"
              >
                닫기
              </button>
            )}
          </div>
        </div>

        {/* 안내문 */}
        <div className="text-hr-c1 text-hr-gray-50 mt-4 leading-5">
          <p>상품 Q&A 작성 시 유의사항</p>
          <p>· 교환, 반품, 취소는 1:1문의로 접수 부탁드립니다.</p>
          <p>
            · 상품 및 상품 구매 과정과 관련 없는 비방, 욕설, 영업훼손성 게시글은
            삭제될 수 있습니다.
          </p>
          <p>
            · 전화번호, 이메일 등 개인정보가 포함된 글은 비밀글로 작성해 주세요.
          </p>
        </div>
      </form>
    </FormProvider>
  );
}
