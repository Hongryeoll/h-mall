import CurrentOrders from '@/components/mypage/CurrentOrders';
import CurrentQna from '@/components/mypage/CurrentQna';
import UserProfile from '@/components/mypage/UserProfile';

export default async function MyPage() {
  return (
    <>
      <div className="p-4 md:p-8">
        <UserProfile />
        <div className="mt-4 md:mt-8">
          <CurrentOrders />
        </div>
        <div className="mt-4 md:mt-8">
          <CurrentQna />
        </div>
      </div>
    </>
  );
}
