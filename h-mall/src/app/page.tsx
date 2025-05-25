import '@/app/globals.css';
import { redirect } from 'next/navigation';
import { getUser } from '@/actions/auth/user.action';

export default async function Home() {
  const user = await getUser({ serverComponent: true });
  if (!user) {
    redirect('/login');
  }
  return (
    <>
      <div className="p-4">home화면</div>
    </>
  );
}
