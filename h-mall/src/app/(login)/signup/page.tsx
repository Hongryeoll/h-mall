'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { useState } from 'react';

type FormData = {
  email: string;
  password: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setServerError('');

    // 이메일 사전 중복 체크
    const { data: existingUser } = await supabase
      .from('userinfo')
      .select('id')
      .eq('email', data.email)
      .maybeSingle();

    if (existingUser) {
      alert('이미 가입된 이메일입니다. 로그인해주세요.');
      router.push('/login');
      return;
    }

    const { error, data: signUpData } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      if (error.message === 'User already registered') {
        alert('이미 인증된 이메일입니다. 로그인해주세요.');
        router.push('/login');
      } else {
        alert(`회원가입 실패: ${error.message}`);
      }
      return;
    }

    if (!signUpData.user) {
      alert('이미 등록된 이메일입니다. 이메일 인증을 완료해주세요.');
      return;
    }

    alert('이메일 확인 후 로그인 해주세요.');
    router.push('/login');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4 max-w-md mx-auto"
    >
      <h1 className="text-2xl font-bold">회원가입</h1>

      <input
        type="email"
        placeholder="이메일"
        {...register('email', {
          required: '이메일을 입력해주세요',
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: '올바른 이메일 형식이 아닙니다',
          },
        })}
        className="border p-2"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input
        type="password"
        placeholder="비밀번호"
        {...register('password', {
          required: '비밀번호를 입력해주세요',
          minLength: {
            value: 6,
            message: '6자 이상 입력해주세요',
          },
        })}
        className="border p-2"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-hr-gray-50 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? '처리 중...' : '가입하기'}
      </button>

      {serverError && <p className="text-red-500">{serverError}</p>}
    </form>
  );
}
