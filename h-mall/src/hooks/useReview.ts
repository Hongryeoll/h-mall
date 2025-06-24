'use client';

import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import type { Database } from '@/types/supabase';
import { ReviewItem } from '@/types/review';

export function useReview(productId: string) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const queryClient = useQueryClient();

  // 리뷰 조회 - 객체 기반 호출
  const {
    data: reviews,
    isLoading,
    error: fetchError,
  } = useQuery<ReviewItem[], Error>({
    queryKey: ['reviews', productId],
    queryFn: async (): Promise<ReviewItem[]> => {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, product_id, user_id, rating, content, created_at')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!productId,
  });

  // 리뷰 작성
  const addReview = useMutation<
    Database['public']['Tables']['reviews']['Row'],
    Error,
    { rating: number; content: string; images: string[] }
  >({
    mutationFn: async ({
      rating,
      content,
      images,
    }: {
      rating: number;
      content: string;
      images: string[];
    }) => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user)
        throw authError || new Error('User not authenticated');

      const { data, error } = await supabase
        .from('reviews')
        .insert([{ product_id: productId, user_id: user.id, rating, content, images }])
        .select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error('No review returned');
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
  });

  // 리뷰 수정
  const updateReview = useMutation<
    Database['public']['Tables']['reviews']['Row'],
    Error,
    { reviewId: number; rating: number; content: string }
  >({
    mutationFn: async ({
      reviewId,
      rating,
      content,
    }: {
      reviewId: number;
      rating: number;
      content: string;
    }) => {
      const { data, error } = await supabase
        .from('reviews')
        .update({ rating, content })
        .eq('id', reviewId)
        .select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error('No review returned');
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
  });

  // 리뷰 삭제
  const deleteReview = useMutation<void, Error, number>({
    mutationFn: async (reviewId: number) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
  });

  // 리뷰 작성 체크
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
