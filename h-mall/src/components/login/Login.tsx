'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { HrInput } from '@/components/common/HrInput';


type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const methods = useForm<FormData>()
  const { handleSubmit, formState: { errors, isSubmitting } } = methods
  const supabase = createSupabaseBrowserClient()
  const router = useRouter()
  const [serverError, setServerError] = useState('');
  const onSubmit = async (data: FormData) => {
    setServerError('');

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setServerError(error.message);
    } else {
      router.replace('/');
    }
  };

  return (
    <>
      <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 w-full max-w-md mx-auto"
      >
        <h1 className="text-2xl font-bold">로그인</h1>
        <HrInput<FormData>
          name="email"
          type="text"
          placeholder="이메일"
          rules={{
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: '올바른 이메일 형식이 아닙니다',
            }
          }}
          containerClassName="w-full"
          inputClassName="px-3"
          size="md"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <HrInput<FormData>
          name="password"
          type="password"
          placeholder="비밀번호"
          rules={{
            required: '비밀번호를 입력해주세요',
            minLength: { value: 6, message: '6자 이상 입력해주세요' }
          }}
          containerClassName="w-full"
          inputClassName="px-3"
          size="md"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-hr-purple-default text-white py-3 rounded-lg font-semibold hover:bg-hr-purple-hover transition"
        >
          {isSubmitting ? '로그인 중…' : '로그인'}
        </button>

        {/* 서버 오류 */}
        {serverError && (
          <p className="text-sm text-center text-red-600 mt-2">{serverError}</p>
        )}
      </form>
    </FormProvider>
    </>
  );
}
