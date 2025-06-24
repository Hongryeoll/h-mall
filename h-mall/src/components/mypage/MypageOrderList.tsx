'use client';

import { useOrderList } from '@/hooks/useOrder';
import MypageOrderListItem from './MypageOrderListItem';

export default function MypageOrderList() {
  const { data: orders, isLoading, error } = useOrderList();

  if (isLoading) return <p className="p-8 text-center">로딩 중…</p>;
  if (error)
    return <p className="p-8 text-center text-red-500">에러가 발생했습니다.</p>;
  if (!orders || orders.length === 0)
    return <p className="p-8 text-center">주문 내역이 없습니다.</p>;

  return (
    <section className="px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">주문 내역 조회</h1>

      {/* 데스크탑: 그림자·라운드 테이블 */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-2 text-left text-hr-gray-70 min-w-[200px] w-[30%]">
                  상품정보
                </th>
                <th className="py-3 px-2 text-center text-hr-gray-70 min-w-[100px] w-[15%]">
                  결제수단
                </th>
                <th className="py-3 px-2 text-center text-hr-gray-70 min-w-[80px] w-[10%]">
                  배송비
                </th>
                <th className="py-3 px-2 text-center text-hr-gray-70 min-w-[120px] w-[15%]">
                  결제금액
                </th>
                <th className="py-3 px-2 text-center text-hr-gray-70 min-w-[150px] w-[20%]">
                  주문일자
                </th>
                <th className="py-3 px-2 text-center text-hr-gray-70 min-w-[100px] w-[10%]">
                  리뷰
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <MypageOrderListItem key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 모바일: 카드 리스트 */}
      <div className="sm:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <MypageOrderListItem order={order} isCard />
          </div>
        ))}
      </div>
    </section>
  );
}
