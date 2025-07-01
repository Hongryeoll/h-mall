'use client';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Portal,
} from '@headlessui/react';
import { useEffect, useMemo, useState } from 'react';
import ImageUploader from '@/components/uploader/ImageUploader';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/types/constants';
import { useReview } from '@/hooks/useReview';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import HrStarRating from '@/components/common/HrStartRating';
import { HrTextarea } from '@/components/common/HrTextarea';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { useModalStore } from '@/store/modal/useModalStore';
import Image from 'next/image';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: { id: string; name: string; images: string[] };
  orderItemId: string;
  isEdit?: boolean;
  reviewId?: number;
  defaultValues?: {
    rating: number;
    content: string;
    images: string[] | null;
  };
}

type FormValues = {
  rating: number;
  content: string;
};

export default function ReviewForm({
  isOpen,
  onClose,
  product,
  orderItemId,
  isEdit,
  reviewId,
  defaultValues,
}: Props) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const showModal = useModalStore((state) => state.showModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const { reviews, addReview, updateReview, updateReviewedCol } = useReview(
    product.id
  );

  const currentReview = useMemo(() => {
    return isEdit ? reviews?.find((r) => r.id === reviewId) : null;
  }, [isEdit, reviewId, reviews]);

  const methods = useForm<FormValues>({
    defaultValues: {
      rating: currentReview?.rating ?? 0,
      content: currentReview?.content ?? '',
    },
  });

  const { control, setValue, handleSubmit, reset } = methods;
  const rating = useWatch({ control, name: 'rating' });

  const [reviewImages, setReviewImages] = useState<(File | string)[]>(
    defaultValues?.images ?? currentReview?.images ?? []
  );

  // 미리보기 URL
  const previewUrls = useMemo(
    () =>
      reviewImages.map((item) =>
        typeof item === 'string' ? item : URL.createObjectURL(item)
      ),
    [reviewImages]
  );

  // 수정 시 기존 리뷰 데이터 세팅
  useEffect(() => {
    if (isEdit && currentReview) {
      reset({
        rating: currentReview.rating,
        content: currentReview.content,
      });
      setReviewImages(currentReview.images ?? []);
    }
  }, [isEdit, currentReview, reset]);

  // 이미지 선택 처리
  const handleFileSelect = (files: (File | string)[]) => {
    if (files.length <= 3) {
      setReviewImages(files);
    } else {
      showModal({
        title: '이미지 제한',
        description: '리뷰 이미지는 최대 3장까지 등록 가능합니다.',
      });
    }
  };

  // 이미지 업로드 처리
  const uploadImages = async (): Promise<string[]> => {
    const urls: string[] = [];
    const bucket = process.env.NEXT_PUBLIC_REVIEW_BUCKET || 'review-images';

    for (const item of reviewImages) {
      if (typeof item === 'string') {
        urls.push(item);
        continue;
      }

      const safeName = item.name
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9_\-\.]/g, '');
      const path = `${product.id}/${Date.now()}-${safeName}`;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(path, item, { upsert: false });

      if (error) throw error;

      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      urls.push(data.publicUrl);
    }

    return urls;
  };

  // 제출 처리
  const onSubmit = async (formData: FormValues) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      showModal({
        title: '로그인이 필요합니다',
        description: '리뷰를 작성하려면 먼저 로그인을 해주세요.',
        children: (
          <div className="mt-6 flex justify-end">
            <button
              className="px-4 py-2 bg-hr-purple-default text-white rounded"
              onClick={() => {
                router.push(ROUTES.LOGIN);
                closeModal();
              }}
            >
              로그인 하러 가기
            </button>
          </div>
        ),
      });
      return;
    }

    let imageUrls: string[] = [];
    try {
      imageUrls = await uploadImages();
    } catch (error) {
      const err = error as Error;
      showModal({
        title: '업로드 실패',
        description: `이미지 업로드 중 오류가 발생했습니다.\n${err.message}`,
      });
      return;
    }

    try {
      if (isEdit && reviewId) {
        await updateReview.mutateAsync({
          reviewId,
          product_id: product.id,
          rating: formData.rating,
          content: formData.content,
          images: imageUrls,
        });

        showModal({
          title: '리뷰 수정 완료!',
          description: '리뷰가 성공적으로 수정되었습니다.',
          children: (
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-hr-purple-default text-white rounded"
                onClick={() => {
                  closeModal();
                  onClose();
                }}
              >
                확인
              </button>
            </div>
          ),
        });
      } else {
        await addReview.mutateAsync({
          product_id: product.id,
          user_id: user.id,
          order_item_id: orderItemId,
          rating: formData.rating,
          content: formData.content,
          images: imageUrls,
        });

        await updateReviewedCol.mutateAsync(orderItemId);

        showModal({
          title: '리뷰 등록 완료!',
          description: '소중한 리뷰가 성공적으로 등록되었습니다.',
          children: (
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-hr-purple-default text-white rounded"
                onClick={() => {
                  closeModal();
                  onClose();
                }}
              >
                확인
              </button>
            </div>
          ),
        });
      }
    } catch (err) {
      const error = err as Error;
      showModal({
        title: isEdit ? '리뷰 수정 실패' : '리뷰 등록 실패',
        description: error.message || '리뷰 처리 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <Portal>
        <Dialog
          as="div"
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
          <div className="flex items-center justify-center min-h-full px-4">
            <DialogPanel className="bg-hr-white rounded-lg p-6 w-full max-w-xl z-10">
              <DialogTitle className="text-hr-h5 font-hr-semi-bold mb-4">
                리뷰 {isEdit ? '수정' : '작성'}
              </DialogTitle>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* 상품 정보 */}
                <div className="flex items-center gap-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="font-hr-regular">{product.name}</span>
                </div>

                {/* 평점 */}
                <div>
                  <label className="mr-2">평점:</label>
                  <HrStarRating
                    rating={rating || 0}
                    onChange={(newRating) => setValue('rating', newRating)}
                  />
                </div>

                {/* 리뷰 내용 */}
                <HrTextarea
                  name="content"
                  placeholder="리뷰 내용을 입력하세요..."
                  maxLength={1000}
                  rows={4}
                />

                {/* 이미지 업로더 */}
                <ImageUploader
                  files={reviewImages}
                  previewUrls={previewUrls}
                  onFileSelect={handleFileSelect}
                  multiple
                />
                <p className="text-right text-hr-gray-50 text-sm">
                  {previewUrls.length}/3
                </p>

                {/* 액션 버튼 */}
                <div className="flex justify-between gap-2">
                  <button
                    onClick={onClose}
                    type="button"
                    className="px-4 py-2 border border-hr-purple-border text-hr-purple-default rounded"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-hr-purple-default text-hr-purple-bg rounded"
                  >
                    제출하기
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </Dialog>
      </Portal>
    </FormProvider>
  );
}
