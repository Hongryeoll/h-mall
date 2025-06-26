'use client';

import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { ProductFormProps } from '@/types/products';
import { useCategoryCascade } from '@/hooks/useCategoryCascade';
import BasicForm from '@/components/product/BasicForm';
import PriceForm from '@/components/product/PriceForm';
import DetailForm from '@/components/product/DetailForm';
import CategoryForm from '@/components/product/CategoryForm';
import { useUserContext } from '@/components/provider/UserProvider';
import { useModal } from '@/components/provider/ModalProvider';

type TabKey = 'category' | 'basic' | 'price' | 'detail' | 'ship';

export default function ProductForm({
  productId,
  onClose,
}: {
  productId: string | null;
  onClose: () => void;
}) {
  const supabase = createSupabaseBrowserClient();
  const queryClient = useQueryClient();
  const { role } = useUserContext();
  const methods = useForm<ProductFormProps>();
  const { showModal, closeModal } = useModal();
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;
  const { selected, set, options } = useCategoryCascade();
  const [productImage, setProductImage] = useState<(File | string)[]>([]);
  const [productPreview, setProductPreview] = useState<string[]>([]);
  const [detailImage, setDetailImage] = useState<(File | string)[]>([]);
  const [detailPreview, setDetailPreview] = useState<string[]>([]);
  const description = methods.watch('description') || '';
  const [activeTab, setActiveTab] = useState<
    'category' | 'basic' | 'price' | 'detail' | 'ship'
  >('category');
  const tabList: TabKey[] = ['category', 'basic', 'price', 'detail', 'ship'];

  const makePreviews = (files: (File | string)[]): string[] =>
    files.map((f) => (typeof f === 'string' ? f : URL.createObjectURL(f)));

  const syncProductImage = (files: (File | string)[]) => {
    setProductImage(files);
    setProductPreview(makePreviews(files));
  };

  const syncDetailImage = (files: (File | string)[]) => {
    setDetailImage(files);
    setDetailPreview(makePreviews(files));
  };

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select(
          `
          id,
          name,
          created_date,
          price,
          discount_rate,
          final_price,
          review_count,
          avg_rating,
          product_images,
          detail_images,
          description,
          category_id,
          section_id,
          subsection_id,
          subtab_id
        `
        )
        .eq('id', productId)
        .single();

      if (error || !data) {
        showModal({
          title: '상품 로드 실패',
          description:
            '상품 정보를 불러오지 못했습니다.\n잠시 후 다시 시도해주세요.',
        });
        return;
      }

      reset({
        name: data.name,
        created_date: data.created_date ?? undefined,
        product_images: data.product_images,
        detail_images: data.detail_images,
        price: data.price,
        discount_rate: data.discount_rate ?? undefined,
        final_price: data.final_price ?? undefined,
        description: data.description ?? undefined,
        category_id: data.category_id ?? '',
        section_id: data.section_id ?? '',
        subsection_id: data.subsection_id ?? '',
        subtab_id: data.subtab_id ?? undefined,
      });

      set.category(data.category_id || '');
      set.section(data.section_id || '');
      set.subsection(data.subsection_id || '');
      set.subtab(data.subtab_id || '');
      setProductImage(data.product_images || []);
      setProductPreview(data.product_images || []);

      setDetailImage(data.detail_images || []);
      setDetailPreview(data.detail_images || []);
    };

    fetchProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const mutation = useMutation({
    mutationFn: async (data: ProductFormProps) => {
      if (productId) {
        const { error } = await supabase
          .from('products')
          .update(data)
          .eq('id', productId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      reset();
      showModal({
        title: productId ? '수정 완료!' : '상품 등록 완료!',
        description: productId
          ? '상품 정보가 성공적으로 수정되었습니다.'
          : '새 상품이 성공적으로 등록되었습니다.',
        children: (
          <div className="mt-6 flex justify-end">
            <button
              className="px-4 py-2 bg-hr-purple-default text-white rounded"
              onClick={() => {
                onClose();
                closeModal();
              }}
            >
              확인
            </button>
          </div>
        ),
      });

      onClose();
    },
    onError: (error) => {
      showModal({
        title: productId ? '수정 실패' : '등록 실패',
        description: error.message,
      });
    },
  });

  const uploadImagesToSupabase = async (
    files: (File | string)[]
  ): Promise<string[]> => {
    const supabase = createSupabaseBrowserClient();
    const urls: string[] = [];

    for (const file of files) {
      if (typeof file === 'string') {
        urls.push(file);
        continue;
      }

      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      urls.push(data.publicUrl);
    }

    return urls;
  };

  const onSubmit = async (form: ProductFormProps) => {
    let productUrls = form.product_images ?? [];
    let detailUrls = form.detail_images ?? [];

    try {
      productUrls = await uploadImagesToSupabase(productImage);
      detailUrls = await uploadImagesToSupabase(detailImage);
    } catch (err: unknown) {
      if (err instanceof Error) {
        showModal({
          title: '이미지 업로드 실패',
          description: `이미지 업로드 중 오류가 발생했습니다.\n${err.message}`,
        });
      } else {
        showModal({
          title: '이미지 업로드 실패',
          description: '알 수 없는 오류가 발생했습니다.',
        });
      }
      return;
    }

    const payload: ProductFormProps = {
      id: form.id,
      name: form.name,
      product_images: productUrls,
      detail_images: detailUrls,
      price: form.price,
      discount_rate: form.discount_rate,
      final_price: form.final_price,
      description: form.description,
      category_id: form.category_id,
      section_id: form.section_id,
      subsection_id: form.subsection_id,
      subtab_id: form.subtab_id,
    };

    mutation.mutate(payload);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 bg-white p-4 rounded shadow w-full max-w-4xl lg:max-w-5xl"
      >
        <h2 className="text-lg font-semibold">
          {productId ? '상품 수정' : '상품 등록'}
        </h2>

        <div className="flex space-x-4 border-b mb-4">
          {tabList.map((tab) => (
            <button
              type="button"
              key={tab}
              className={`pb-2 text-sm font-semibold ${
                activeTab === tab
                  ? 'border-b-2 border-hr-purple-default text-hr-purple-default'
                  : 'text-gray-400'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {
                {
                  category: '상품 분류',
                  basic: '기본 정보',
                  price: '가격 정보',
                  detail: '상세 설명',
                  ship: '배송',
                }[tab]
              }
            </button>
          ))}
        </div>

        {activeTab === 'category' && (
          <CategoryForm
            selected={selected}
            set={set}
            options={options}
            errors={errors}
          />
        )}
        {activeTab === 'basic' && (
          <BasicForm errors={errors} isEditMode={!!productId} />
        )}
        {activeTab === 'price' && (
          <PriceForm
            errors={errors}
            watch={methods.watch}
            setValue={setValue}
          />
        )}
        {activeTab === 'detail' && (
          <DetailForm
            errors={errors}
            previewProduct={productPreview}
            previewDetail={detailPreview}
            productImage={productImage}
            detailImage={detailImage}
            onSelectProduct={syncProductImage}
            onSelectDetail={syncDetailImage}
            description={description}
            setDescription={(value: string) =>
              setValue('description', value, { shouldValidate: true })
            }
          />
        )}
        {/* 하단 버튼 정렬 */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            disabled={role !== 'admin' || mutation.isPending}
            className={`
            text-white text-sm font-hr-semi-bold py-2 px-4 rounded-md transition
            ${role === 'admin' ? 'bg-hr-purple-default hover:bg-hr-purple-hover' : 'bg-hr-purple-bg cursor-not-allowed'}
          `}
          >
            {mutation.isPending
              ? '처리 중...'
              : productId
                ? '상품 수정'
                : '상품 등록'}
          </button>
          {role !== 'admin' && (
            <div className="text-xs text-red-400 mt-2">
              관리자만 등록/수정 가능합니다.
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="bg-hr-gray-20 hover:bg-hr-gray-30 text-hr-gray-60 text-sm font-hr-semi-bold py-2 px-4 rounded-md transition"
          >
            닫기
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
