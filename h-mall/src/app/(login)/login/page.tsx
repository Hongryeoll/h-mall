import Link from 'next/link';
import AuthUI from '@/components/auth/AuthUI';
import Login from '@/components/login/Login';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <>
      <div className="w-full max-w-md mx-auto space-y-6 p-4">
        <div className="flex justify-center">
          <Image
            src="/images/h_logo.png"
            alt="logo"
            width={120}
            height={70}
            priority
          />
        </div>
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
