'use client';

import { useUserContext } from '@/components/provider/UserProvider';
import UserProfileSkeleton from '@/components/skeleton/UserProfileSkeleton';

export default function UserProfile() {
  const { user, loading } = useUserContext();

  if (loading) {
    return <UserProfileSkeleton />;
  }

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row w-full bg-hr-gray-90 text-white rounded-md overflow-hidden">
      {/* 이메일 */}
      <div className="flex-1 flex flex-col justify-between p-4 md:p-6 border-b md:border-b-0 md:border-r border-hr-gray-70">
        <div className="flex items-center gap-1 text-hr-gray-40 text-hr-b4">
          <span>이메일</span>
        </div>
        <div className="mt-2 md:mt-4 text-hr-h5 font-hr-bold break-all">
          {user.email}
        </div>
      </div>

      {/* 권한 */}
      <div className="flex-1 flex flex-col justify-between p-4 md:p-6 border-b md:border-b-0 md:border-r border-hr-gray-70">
        <div className="flex items-center gap-1 text-hr-gray-40 text-hr-b4">
          <span>권한</span>
        </div>
        <div className="mt-2 md:mt-4 text-hr-h5 font-hr-bold">
          {user.role === 'admin'
            ? '관리자'
            : user.role === 'readAdmin'
              ? '읽기권한 관리자'
              : '일반회원'}
        </div>
      </div>
    </div>
  );
}
