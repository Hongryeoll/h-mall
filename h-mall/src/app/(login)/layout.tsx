import { redirect } from 'next/navigation';
import { getUser } from '@/actions/auth/user.action';
import { ROUTES } from '@/types/constants';

export default async function LoginGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 서버 사이드에서 user 조회
  const user = await getUser({ serverComponent: true });
  if (user) {
    // 이미 로그인된 사용자는 쇼핑몰 홈으로
    redirect(ROUTES.HOME);
  }

  // 로그인·회원가입 전용 레이아웃 (헤더 제거 등)
  return (
    <>
      {/* <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        {children}
      </div> */}
      <div className="items-center">
        {children}
      </div>
    </>
  );
}
