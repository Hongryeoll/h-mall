'use client';

import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import type { Database } from '@/types/supabase';
import {
  ReviewItemType,
  ReviewInput,
  ReviewUpdateInput,
  ReviewDeleteInput,
} from '@/types/review';

export function useReview(productId: string) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const queryClient = useQueryClient();

  // 리뷰 조회
  const {
    data: reviews,
    isLoading,
    error: fetchError,
  } = useQuery<ReviewItemType[], Error>({
    queryKey: ['reviews', productId],
    queryFn: async (): Promise<ReviewItemType[]> => {
      const { data, error } = await supabase
        .from('reviews_with_userinfo')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data ?? []).map((item) => ({
        id: item.id ?? 0,
        product_id: item.product_id ?? '',
        user_id: item.user_id ?? null,
        rating: item.rating ?? 0,
        content: item.content ?? '',
        created_at: item.created_at ?? null,
        images: item.images ?? [],

        email_mark: item.email_mark ?? '',
        nickname: item.nickname ?? null,

        order_item_id: item.order_item_id ?? '',
        order_item_size: item.order_item_size ?? null,
        order_item_price: item.order_item_price ?? null,

        product_name: item.product_name ?? '',
        final_price: item.final_price ?? null,
        discount_rate: item.discount_rate ?? null,
        product_images: item.product_images ?? [],
      }));
    },
    enabled: !!productId,
  });

  // 리뷰 등록
  const addReview = useMutation<ReviewItemType, Error, ReviewInput>({
    mutationFn: async (input) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert([input])
        .select('*')
        .single();

      if (error) throw error;

      const { data: enrichedData, error: enrichedError } = await supabase
        .from('reviews_with_userinfo')
        .select('*')
        .eq('id', data.id)
        .single();

      if (enrichedError) throw enrichedError;

      return {
        id: enrichedData.id ?? 0,
        product_id: enrichedData.product_id ?? '',
        user_id: enrichedData.user_id ?? null,
        rating: enrichedData.rating ?? 0,
        content: enrichedData.content ?? '',
        created_at: enrichedData.created_at ?? null,
        images: enrichedData.images ?? [],

        email_mark: enrichedData.email_mark ?? '',
        nickname: enrichedData.nickname ?? null,

        order_item_id: enrichedData.order_item_id ?? '',
        order_item_size: enrichedData.order_item_size ?? null,
        order_item_price: enrichedData.order_item_price ?? null,

        product_name: enrichedData.product_name ?? '',
        final_price: enrichedData.final_price ?? null,
        discount_rate: enrichedData.discount_rate ?? null,
        product_images: enrichedData.product_images ?? [],
      };
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData<ReviewItemType[]>(
        ['reviews', variables.product_id],
        (prev) => (prev ? [data, ...prev] : [data])
      );
      queryClient.setQueryData<ReviewItemType[]>(['myReviews'], (prev) =>
        prev ? [data, ...prev] : [data]
      );

      queryClient.invalidateQueries({
        queryKey: ['reviews', variables.product_id],
      });
      queryClient.invalidateQueries({ queryKey: ['myReviews'] });
    },
  });

  // 리뷰 수정
  const updateReview = useMutation<
    Database['public']['Tables']['reviews']['Row'],
    Error,
    ReviewUpdateInput
  >({
    mutationFn: async ({ reviewId, rating, content, images }) => {
      const { data, error } = await supabase
        .from('reviews')
        .update({ rating, content, images })
        .eq('id', reviewId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<ReviewItemType[]>(
        ['reviews', data.product_id],
        (prev) =>
          prev?.map((item) =>
            item.id === data.id
              ? { ...item, rating: data.rating, content: data.content }
              : item
          )
      );
      queryClient.setQueryData<ReviewItemType[]>(['myReviews'], (prev) =>
        prev?.map((item) =>
          item.id === data.id
            ? { ...item, rating: data.rating, content: data.content }
            : item
        )
      );

      queryClient.invalidateQueries({ queryKey: ['reviews', data.product_id] });
      queryClient.invalidateQueries({ queryKey: ['myReviews'] });
    },
  });

  // 리뷰 삭제
  const deleteReview = useMutation<void, Error, ReviewDeleteInput>({
    mutationFn: async ({ reviewId }) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData<ReviewItemType[]>(
        ['reviews', variables.product_id],
        (prev) => prev?.filter((item) => item.id !== variables.reviewId)
      );
      queryClient.setQueryData<ReviewItemType[]>(['myReviews'], (prev) =>
        prev?.filter((item) => item.id !== variables.reviewId)
      );

      queryClient.invalidateQueries({
        queryKey: ['reviews', variables.product_id],
      });
      queryClient.invalidateQueries({ queryKey: ['myReviews'] });
    },
  });

  // 주문 리뷰 완료 상태 업데이트
  const updateReviewedCol = useMutation<void, Error, string>({
    mutationFn: async (orderItemId: string) => {
      const { error } = await supabase
        .from('order_items')
        .update({ reviewed: true })
        .eq('id', orderItemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myOrders'] });
    },
  });

  return {
    reviews,
    isLoading,
    fetchError,
    addReview,
    updateReview,
    deleteReview,
    updateReviewedCol,
  };
}

// 나의 리뷰 조회
export const useMyReviews = () => {
  const supabase = createSupabaseBrowserClient();

  const { data, isLoading, error } = useQuery<ReviewItemType[]>({
    queryKey: ['myReviews'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('로그인 필요');

      const { data, error } = await supabase
        .from('reviews_with_userinfo')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data ?? []).map((item) => ({
        id: item.id ?? 0,
        product_id: item.product_id ?? '',
        user_id: item.user_id ?? null,
        rating: item.rating ?? 0,
        content: item.content ?? '',
        created_at: item.created_at ?? null,
        images: item.images ?? [],

        email_mark: item.email_mark ?? '',
        nickname: item.nickname ?? null,

        order_item_id: item.order_item_id ?? '',
        order_item_size: item.order_item_size ?? null,
        order_item_price: item.order_item_price ?? null,

        product_name: item.product_name ?? '',
        final_price: item.final_price ?? null,
        discount_rate: item.discount_rate ?? null,
        product_images: item.product_images ?? [],
      }));
    },
  });

  return { data, isLoading, error };
};
