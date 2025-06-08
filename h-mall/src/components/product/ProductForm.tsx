'use client';

import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { ProductFormProps } from '@/types/products';
import ImageUploader from '@/components/uploader/ImageUploader';
import { useCategoryCascade } from '@/hooks/useCategoryCascade';
import HrSelectbox from '@/components/common/HrSelectbox';
import { HrInput } from '@/components/common/HrInput';

export default function ProductForm({
  productId,
  onClose,
}: {
  productId: string | null;
  onClose: () => void;
}) {
  const supabase = createSupabaseBrowserClient();
  const queryClient = useQueryClient();
  const methods = useForm<ProductFormProps>();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;
  const { selected, set, options } = useCategoryCascade();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
      if (error) {
        alert('상품 정보를 불러오지 못했습니다.');
      } else {
        reset({
          name: data.name,
          image_url: data.image_url,
          price: data.price,
          description: data.description ?? undefined,
          subtab_id: data.subtab_id ?? undefined,
        });
        setImagePreview(data.image_url);
      }
    };
    fetchProduct();
  }, [productId, reset, supabase]);

  useEffect(() => {
    if (selected.subtabId) {
      setValue('subtab_id', selected.subtabId);
    }
  }, [selected.subtabId, setValue]);

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
      alert(productId ? '수정 완료!' : '상품이 등록되었습니다!');
      onClose();
    },
    onError: (error) => {
      alert(`${productId ? '수정 실패' : '등록 실패'}: ${error.message}`);
    },
  });

  const onSubmit = (data: ProductFormProps) => mutation.mutate(data);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 bg-white p-4 rounded shadow w-full max-w-4xl lg:max-w-5xl"
      >
        <h2 className="text-lg font-semibold">
          {productId ? '상품 수정' : '상품 등록'}
        </h2>

        <HrSelectbox
          value={selected.categoryId}
          onChange={(v) => set.category(v)}
          placeholder="카테고리 선택"
          options={options.categories.map((c) => ({
            value: c.id,
            label: c.name,
          }))}
        />
        <HrSelectbox
          value={selected.sectionId}
          onChange={(v) => set.section(v)}
          placeholder="섹션 선택"
          options={options.sections.map((s) => ({
            value: s.id,
            label: s.title,
          }))}
        />
        <HrSelectbox
          value={selected.subsectionId}
          onChange={(v) => set.subsection(v)}
          placeholder="서브섹션 선택"
          options={options.subsections.map((s) => ({
            value: s.id,
            label: s.title,
          }))}
        />
        <HrSelectbox
          value={selected.subtabId}
          onChange={(v) => set.subtab(v)}
          placeholder="서브탭 선택"
          options={options.subtabs.map((s) => ({
            value: s.id,
            label: s.label,
          }))}
        />

        <HrInput name="name" placeholder="상품명" required size="md" />
        {errors.name && (
          <p className="text-hr-danger-default text-sm">
            {errors.name.message}
          </p>
        )}

        <ImageUploader
          value={imagePreview}
          onChange={(img) => {
            setImagePreview(img);
            setValue('image_url', img || '');
          }}
        />
        <input
          type="hidden"
          {...register('image_url', { required: '이미지를 선택해주세요' })}
        />
        {errors.image_url && (
          <p className="text-hr-danger-default text-sm">
            {errors.image_url.message}
          </p>
        )}

        <HrInput name="price" placeholder="가격" required size="md" />
        {errors.price && (
          <p className="text-hr-danger-default text-sm">
            {errors.price.message}
          </p>
        )}

        <textarea
          {...register('description')}
          placeholder="설명"
          className="w-full border border-hr-gray-30 bg-hr-white text-hr-gray-60 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hr-purple-default transition"
        />

        <input
          type="hidden"
          {...register('subtab_id', { required: '소탭 ID를 선택해주세요' })}
        />
        {errors.subtab_id && (
          <p className="text-hr-danger-default text-sm">
            {errors.subtab_id.message}
          </p>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-hr-purple-default hover:bg-hr-purple-dark text-white text-sm font-hr-semi-bold py-2 px-4 rounded-md transition"
          >
            {mutation.isPending
              ? '처리 중...'
              : productId
                ? '상품 수정'
                : '상품 등록'}
          </button>
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
