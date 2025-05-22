import { redirect } from 'next/navigation';
import { getUser } from '@/actions/auth/user.action';

export default async function MallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser({ serverComponent: true });
  if (!user) {
    redirect('/login');
  }
  return <>{children}</>;
}
