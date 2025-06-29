'use client';

import { useMyQna } from '@/hooks/useQna';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ROUTES } from '@/types/constants';

export default function QnaList() {
  const { data: qnas, isLoading, error } = useMyQna();
  const router = useRouter();

  if (isLoading) return <p className="p-8 text-center">로딩 중…</p>;
  if (error)
    return <p className="p-8 text-center text-red-500">에러가 발생했습니다.</p>;
  if (!qnas || qnas.length === 0)
    return <p className="p-8 text-center">작성한 QnA가 없습니다.</p>;

  return (
    <section className="px-4 py-6">
      <h1 className="text-hr-h4 font-hr-semi-bold mb-6">
        내가 작성한 상품문의
      </h1>

      {/* 데스크탑 */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full bg-white shadow rounded-lg">
            <thead className="bg-hr-gray-5">
              <tr>
                <th className="py-3 px-4 text-left w-[40%]">상품정보</th>
                <th className="py-3 px-4 text-left">문의내용</th>
                <th className="py-3 px-4 text-center w-[15%]">상태</th>
                <th className="py-3 px-4 text-center w-[15%]">작성일</th>
              </tr>
            </thead>
            <tbody>
              {qnas.map((qna) => (
                <tr
                  key={qna.id}
                  className="border-b hover:bg-hr-gray-5 cursor-pointer"
                  onClick={() =>
                    router.push(ROUTES.MALL_CATALOG(qna.product_id))
                  }
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {qna.product_images && qna.product_images[0] ? (
                        <Image
                          src={qna.product_images[0]}
                          alt={qna.product_name || '상품 이미지'}
                          width={50}
                          height={50}
                          className="rounded border"
                        />
                      ) : (
                        <div className="w-[50px] h-[50px] bg-hr-gray-10 border rounded" />
                      )}
                      <div className="text-sm">{qna.product_name}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-hr-b4">
                    {qna.is_private && (
                      <span className="text-hr-gray-40">[비공개] </span>
                    )}
                    {qna.question.length > 40
                      ? qna.question.slice(0, 40) + '...'
                      : qna.question}
                  </td>
                  <td className="py-3 px-4 text-center text-sm">
                    {qna.answer ? (
                      <span className="text-green-600 font-hr-regular">
                        답변 완료
                      </span>
                    ) : (
                      <span className="text-hr-gray-50">답변 대기</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center text-hr-b4">
                    {new Date(qna.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 모바일 */}
      <div className="sm:hidden space-y-4">
        {qnas.map((qna) => (
          <div
            key={qna.id}
            className="bg-white shadow rounded-lg overflow-hidden border"
            onClick={() => router.push(`/product/${qna.product_id}`)}
          >
            <div className="flex gap-3 p-4">
              {qna.product_images && qna.product_images[0] ? (
                <Image
                  src={qna.product_images[0]}
                  alt={qna.product_name || '상품 이미지'}
                  width={70}
                  height={70}
                  className="rounded border"
                />
              ) : (
                <div className="w-[70px] h-[70px] bg-hr-gray-10 border rounded" />
              )}

              <div className="flex-1">
                <div className="text-sm text-hr-gray-50">
                  {new Date(qna.created_at).toLocaleDateString()}
                </div>
                <div className="font-hr-semi-bold">{qna.product_name}</div>
                <div className="text-hr-b4 text-hr-gray-60 mt-1">
                  {qna.is_private && <span>[비공개] </span>}
                  {qna.question.length > 40
                    ? qna.question.slice(0, 40) + '...'
                    : qna.question}
                </div>
                <div className="text-hr-b4 mt-2">
                  {qna.answer ? (
                    <span className="text-green-600 font-hr-regular">
                      답변 완료
                    </span>
                  ) : (
                    <span className="text-hr-gray-50">답변 대기</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
