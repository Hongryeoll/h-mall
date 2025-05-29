import { redirect } from 'next/navigation';
import { getUser } from '@/actions/auth/user.action';
import { ROUTES } from '@/types/constants';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 서버 사이드에서 user 조회
  const user = await getUser({ serverComponent: true });
  // if (user) {
  //   // 이미 로그인된 사용자는 쇼핑몰 홈으로
  //   redirect(ROUTES.HOME);
  // }

  return (
    <>
      <div className="items-center">{children}</div>
    </>
  );
}
