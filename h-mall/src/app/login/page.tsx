import Link from 'next/link';
import AuthUI from '@/components/auth/AuthUI';
import Login from '@/components/login/Login';

export default function LoginPage() {
  return (
    <>
      <AuthUI />
      <Login />
      <Link href={`/signup`}>회원가입</Link>
    </>
  );
}
