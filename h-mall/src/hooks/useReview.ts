'use client';

import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import type { Database } from '@/types/supabase';
import { ReviewItem } from '@/types/review';

export function useReview(productId: string) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const queryClient = useQueryClient();

  // 1) 리뷰 조회: 객체 기반 호출
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

  // 2) 리뷰 작성
  const addReview = useMutation<
    Database['public']['Tables']['reviews']['Row'],
    Error,
    { rating: number; content: string }
  >({
    // mutationFn 안에서 변수 타입을 명시해 주면 암시적 any 에러가 사라집니다
    mutationFn: async ({
      rating,
      content,
    }: {
      rating: number;
      content: string;
    }) => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user)
        throw authError || new Error('User not authenticated');

      const { data, error } = await supabase
        .from('reviews')
        .insert([{ product_id: productId, user_id: user.id, rating, content }]);
      if (error) throw error;
      return data![0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
  });

  // 3) 리뷰 수정
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
        .eq('id', reviewId);
      if (error) throw error;
      return data![0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
  });

  // 4) 리뷰 삭제
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

  return {
    reviews,
    isLoading,
    fetchError,
    addReview,
    updateReview,
    deleteReview,
  };
}
