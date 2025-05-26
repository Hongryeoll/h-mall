import Link from 'next/link';
import AuthUI from '@/components/auth/AuthUI';
import Login from '@/components/login/Login';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <>
      <div className="w-full max-w-lg mx-auto space-y-6 p-4">
        <Login />
        <hr className="border-hr-gray-20" />
        <AuthUI />
        <Link
          href="/signup"
          className="block text-center text-hr-purple-default hover:underline"
        >
          회원가입
        </Link>
      </div>
    </>
  );
}
