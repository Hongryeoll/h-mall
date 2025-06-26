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
        .from('reviews')
        .select(`
          id, product_id, user_id, rating, content, created_at, images,
          userinfo:user_id ( email, nickname ),
          order_items:order_item_id ( size, price ),
          products:product_id ( name, final_price, discount_rate, product_images )
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!productId,
  });

  // 리뷰 등록
  const addReview = useMutation<ReviewItemType, Error, ReviewInput>({
    mutationFn: async (input) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert([input])
        .select(`
          id, product_id, user_id, rating, content, created_at, images,
          userinfo:user_id ( email, nickname ),
          order_items:order_item_id ( size, price ),
          products:product_id ( name, final_price, discount_rate, product_images )
        `)
        .single();
  
      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData<ReviewItemType[]>(['reviews', variables.product_id], (prev) =>
        prev ? [data, ...prev] : [data]
      );
      queryClient.setQueryData<ReviewItemType[]>(['myReviews'], (prev) =>
        prev ? [data, ...prev] : [data]
      );
  
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.product_id] });
      queryClient.invalidateQueries({ queryKey: ['myReviews'] });
    },
  });

  // 리뷰 수정
  const updateReview = useMutation<
    Database['public']['Tables']['reviews']['Row'],
    Error,
    ReviewUpdateInput
  >({
    mutationFn: async ({ reviewId, rating, content }) => {
      const { data, error } = await supabase
        .from('reviews')
        .update({ rating, content })
        .eq('id', reviewId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<ReviewItemType[]>(['reviews', data.product_id], (prev) =>
        prev?.map((item) => (item.id === data.id ? { ...item, ...data } : item))
      );
      queryClient.setQueryData<ReviewItemType[]>(['myReviews'], (prev) =>
        prev?.map((item) => (item.id === data.id ? { ...item, ...data } : item))
      );

      queryClient.invalidateQueries({ queryKey: ['reviews', data.product_id] });
      queryClient.invalidateQueries({ queryKey: ['myReviews'] });
    },
  });

  // 리뷰 삭제
  const deleteReview = useMutation<
    void,
    Error,
    ReviewDeleteInput
  >({
    mutationFn: async ({ reviewId }) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData<ReviewItemType[]>(['reviews', variables.product_id], (prev) =>
        prev?.filter((item) => item.id !== variables.reviewId)
      );
      queryClient.setQueryData<ReviewItemType[]>(['myReviews'], (prev) =>
        prev?.filter((item) => item.id !== variables.reviewId)
      );

      queryClient.invalidateQueries({ queryKey: ['reviews', variables.product_id] });
      queryClient.invalidateQueries({ queryKey: ['myReviews'] });
    },
  });

  // order_items 테이블의 reviewed 컬럼 업데이트
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

// 나의 리뷰들 조회
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
        .from('reviews')
        .select(`id, 
          product_id, 
          user_id, 
          rating, 
          content, 
          created_at, 
          images,
          userinfo:user_id (
            email,
            nickname
          ),
          order_items:order_item_id (
            size,
            price
          ),
          products:product_id (
            name,
            final_price,
            discount_rate,
            product_images
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return { data, isLoading, error };
};