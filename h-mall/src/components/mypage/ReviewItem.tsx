'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HrButton } from '@/components/common/HrButton';
import { ReviewItemType } from '@/types/review';
import HrStarRating from '@/components/common/HrStartRating';
import ReviewForm from '@/components/mypage/ReviewForm';
import { useReview } from '@/hooks/useReview';

type Props = {
  review: ReviewItemType;
  isCard?: boolean;
};

export default function ReviewItem({ review, isCard }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { deleteReview } = useReview(review.product_id);

  const date = new Date(review.created_at ?? '').toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const handleDelete = async () => {
    const confirm = window.confirm('리뷰를 삭제하시겠습니까?');
    if (confirm) {
      await deleteReview.mutateAsync({
        reviewId: review.id,
        product_id: review.product_id,
      });
    }
  };

  const product = {
    id: review.product_id,
    name: review.products?.name ?? '',
    images: review.products?.product_images ?? [],
  };

  if (isCard) {
    return (
      <div className="p-4 flex flex-col gap-4">
        {/* 상품 정보 */}
        <div className="flex items-center">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={64}
            height={64}
            className="object-cover rounded mr-4"
          />
          <div>
            <p className="font-hr-regular">{product.name}</p>
            <HrStarRating rating={review.rating} readOnly />
          </div>
          <span className="ml-auto text-xs text-gray-400">{date}</span>
        </div>

        {/* 리뷰 내용 */}
        <p className="text-hr-b4">{review.content}</p>

        {/* 리뷰 이미지 */}
        {review.images && review.images.length > 0 && (
          <div className="flex gap-2">
            {review.images.map((url) => (
              <Image
                key={url}
                src={url}
                alt="리뷰 이미지"
                width={80}
                height={80}
                className="rounded object-cover"
              />
            ))}
          </div>
        )}

        {/* 버튼 */}
        <div className="flex gap-2">
          <HrButton
            text="수정"
            size="s"
            type="default"
            onClick={() => setModalOpen(true)}
          />
          <HrButton text="삭제" size="s" type="danger" onClick={handleDelete} />
        </div>

        {/* 수정용 리뷰 폼 */}
        <ReviewForm
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          orderItemId={review.order_items?.size ?? ''}
          product={product}
          defaultValues={{
            rating: review.rating,
            content: review.content,
          }}
          isEdit
          reviewId={review.id}
        />
      </div>
    );
  }

  // 데스크탑 테이블용
  return (
    <>
      <tr className="hover:bg-hr-gray-10 transition border-b border-hr-gray-20">
        <td className="flex items-center py-4 px-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={64}
            height={64}
            className="object-cover rounded mr-4"
          />
          <div>
            <p className="font-hr-regular">{product.name}</p>
          </div>
        </td>

        <td className="py-4 px-4 text-center">
          <HrStarRating rating={review.rating} readOnly />
        </td>

        <td className="py-4 px-4">{review.content}</td>

        <td className="py-4 px-4 text-center">{date}</td>

        <td className="py-4 px-4 text-center">
          <div className="flex gap-2 justify-center">
            <HrButton
              text="수정"
              size="s"
              type="default"
              onClick={() => setModalOpen(true)}
            />
            <HrButton
              text="삭제"
              size="s"
              type="danger"
              onClick={handleDelete}
            />
          </div>
        </td>
      </tr>

      {/* 수정용 리뷰 폼 */}
      <ReviewForm
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        orderItemId={review.order_items?.size ?? ''}
        product={product}
        defaultValues={{
          rating: review.rating,
          content: review.content,
        }}
        isEdit
        reviewId={review.id}
      />
    </>
  );
}
