'use client';

import Link from 'next/link';
import { useOrderList } from '@/hooks/useOrder';
import { ROUTES } from '@/types/constants';
import RightSvg from '@/assets/icons/chevron-right.svg';

export default function CurrentOrders() {
  const { data, isLoading } = useOrderList();

  if (isLoading) return <div>Loading...</div>;

  const orders = data?.slice(0, 3) || [];

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-hr-h5 font-hr-bold">최근 주문</h2>
        <Link
          href={ROUTES.MALL_MYPAGE_ORDERS}
          className="flex items-center text-hr-b4 text-hr-gray-50 hover:underline"
        >
          더보기 <RightSvg width={16} height={16} />
        </Link>
      </div>
      <hr className="border-black mt-1 mb-4" />
      <div className="border border-hr-gray-20 p-4 rounded-lg">
        {orders.length === 0 ? (
          <div className="text-center text-hr-gray-50 font-hr-semi-bold">
            주문 내역이 없습니다.
          </div>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => {
              const productNames = order.order_items
                .map((item) => item.product?.name)
                .filter(Boolean);

              const firstProduct = productNames[0];
              const moreCount = productNames.length - 1;

              return (
                <li
                  key={order.id}
                  className="border border-hr-gray-20 p-4 rounded-lg bg-hr-white"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-hr-c1 text-hr-gray-40">
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-hr-b2 font-hr-semi-bold mt-1">
                        {firstProduct}
                        {moreCount > 0 && ` 외 ${moreCount}개`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-hr-c1 text-hr-gray-40">
                        {`${order.address ?? ''} ${order.address_detail ?? ''}`.trim() ||
                          '배송지 정보 없음'}
                      </div>
                      <div className="text-hr-b1 font-hr-bold text-black mt-1">
                        {order.total_payable.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
