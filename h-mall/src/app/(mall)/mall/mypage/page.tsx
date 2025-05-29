// 'use client';

// import { HrButton } from '@/components/common/HrButton';
// import { ROUTES } from '@/types/constants';
// import { useMutation } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
// import { useContext } from 'react';
import { getUser } from '@/actions/auth/user.action';

export default async function MyPage() {
  // const route = useRouter();
  const user = await getUser({ serverComponent: true });

  return (
    <>
      <span />
      <div className="p-4">Mypage</div>
    </>
  );
}
