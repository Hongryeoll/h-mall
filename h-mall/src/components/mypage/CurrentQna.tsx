'use client';

import Link from 'next/link';
import { useMyQna } from '@/hooks/useQna';
import { ROUTES } from '@/types/constants';
import RightSvg from '@/assets/icons/chevron-right.svg';

export default function CurrentQna() {
  const { data, isLoading } = useMyQna();

  if (isLoading) return <div>Loading...</div>;

  const qnas = data?.slice(0, 3) || [];

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-hr-h5 font-hr-bold">나의 Q&A</h2>
        <Link
          href={ROUTES.MALL_MYPAGE_QNA}
          className="flex items-center text-hr-b4 text-hr-gray-50 hover:underline"
        >
          더보기 <RightSvg width={16} height={16} />
        </Link>
      </div>
      <hr className="border-black mt-1 mb-4" />
      <div className="border border-hr-gray-20 p-4 rounded-lg">
        {qnas.length === 0 ? (
          <div className="text-center text-hr-gray-50 font-hr-semi-bold">
            작성한 Q&A가 없습니다.
          </div>
        ) : (
          <ul className="space-y-4">
            {qnas.map((qna) => (
              <li
                key={qna.id}
                className="border border-hr-gray-20 p-4 rounded-lg bg-hr-white"
              >
                <div className="block hover:opacity-80 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-hr-c1 text-hr-gray-40">
                        {new Date(qna.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-hr-b2 font-hr-semi-bold mt-1">
                        {qna.product_name}
                      </div>
                      <div className="text-hr-b3 text-hr-gray-60 mt-1">
                        {qna.question.length > 30
                          ? qna.question.slice(0, 30) + '...'
                          : qna.question}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
