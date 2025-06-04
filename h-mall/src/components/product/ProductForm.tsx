// 'use client';

// import { useForm } from 'react-hook-form';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createSupabaseBrowserClient } from '@/library/client/supabase';
// import { ProductFormProps } from '@/types/products';

// export default function ProductForm() {
//   const supabase = createSupabaseBrowserClient();
//   const queryClient = useQueryClient();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<ProductFormProps>();

//   const mutation = useMutation({
//     mutationFn: async (data: ProductFormProps) => {
//       const { error } = await supabase.from('products').insert(data);
//       if (error) throw error;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       reset();
//       alert('상품이 등록되었습니다!');
//     },
//     onError: (error) => {
//       alert(`등록 실패: ${error.message}`);
//     },
//   });

//   const onSubmit = (data: ProductFormProps) => {
//     mutation.mutate(data);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="flex flex-col gap-3 bg-white p-4 rounded shadow max-w-lg"
//     >
//       <h2 className="text-lg font-semibold">상품 등록</h2>

//       <input
//         {...register('name', { required: '상품명을 입력해주세요' })}
//         placeholder="상품명"
//         className="border p-2 rounded"
//       />
//       {errors.name && (
//         <p className="text-red-500 text-sm">{errors.name.message}</p>
//       )}

//       <input
//         {...register('image_url', { required: '이미지 URL을 입력해주세요' })}
//         placeholder="이미지 URL"
//         className="border p-2 rounded"
//       />
//       {errors.image_url && (
//         <p className="text-red-500 text-sm">{errors.image_url.message}</p>
//       )}

//       <input
//         type="number"
//         {...register('price', { required: '가격을 입력해주세요' })}
//         placeholder="가격"
//         className="border p-2 rounded"
//       />
//       {errors.price && (
//         <p className="text-red-500 text-sm">{errors.price.message}</p>
//       )}

//       <textarea
//         {...register('description')}
//         placeholder="설명"
//         className="border p-2 rounded"
//       />

//       <input
//         type="number"
//         {...register('subtab_id', { required: '소탭 ID를 선택해주세요' })}
//         placeholder="subtab_id"
//         className="border p-2 rounded"
//       />
//       {errors.subtab_id && (
//         <p className="text-red-500 text-sm">{errors.subtab_id.message}</p>
//       )}

//       <button
//         type="submit"
//         disabled={mutation.isPending}
//         className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
//       >
//         {mutation.isPending ? '등록 중...' : '상품 등록'}
//       </button>
//     </form>
//   );
// }
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { ProductFormProps } from '@/types/products';

type Props = {
  productId: string | null;
  onClose: () => void;
};

export default function ProductForm({ productId, onClose }: Props) {
  const supabase = createSupabaseBrowserClient();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormProps>();

  // 수정 시 기존 데이터 불러오기
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
      }
    };

    fetchProduct();
  }, [productId, reset, supabase]);

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

  const onSubmit = (data: ProductFormProps) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 bg-white p-4 rounded shadow max-w-lg"
    >
      <h2 className="text-lg font-semibold">
        {productId ? '상품 수정' : '상품 등록'}
      </h2>

      <input
        {...register('name', { required: '상품명을 입력해주세요' })}
        placeholder="상품명"
        className="border p-2 rounded"
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <input
        {...register('image_url', { required: '이미지 URL을 입력해주세요' })}
        placeholder="이미지 URL"
        className="border p-2 rounded"
      />
      {errors.image_url && (
        <p className="text-red-500 text-sm">{errors.image_url.message}</p>
      )}

      <input
        type="number"
        {...register('price', { required: '가격을 입력해주세요' })}
        placeholder="가격"
        className="border p-2 rounded"
      />
      {errors.price && (
        <p className="text-red-500 text-sm">{errors.price.message}</p>
      )}

      <textarea
        {...register('description')}
        placeholder="설명"
        className="border p-2 rounded"
      />

      <input
        type="number"
        {...register('subtab_id', { required: '소탭 ID를 선택해주세요' })}
        placeholder="subtab_id"
        className="border p-2 rounded"
      />
      {errors.subtab_id && (
        <p className="text-red-500 text-sm">{errors.subtab_id.message}</p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
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
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
        >
          닫기
        </button>
      </div>
    </form>
  );
}
