'use client';

import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import {
  QnaItem,
  QnaInput,
  QnaUpdateInput,
  QnaAnswerInput,
  QnaDeleteInput,
} from '@/types/qna';

export function useQna(productId: string) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const queryClient = useQueryClient();

  // ✅ QnA 목록 조회
  const {
    data: qnas,
    isLoading,
    error: fetchError,
  } = useQuery<QnaItem[], Error>({
    queryKey: ['qna', productId],
    queryFn: async (): Promise<QnaItem[]> => {
      const { data, error } = await supabase
        .from('qna_with_user_info')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as QnaItem[];
    },
    enabled: !!productId,
  });

  // ✅ QnA 등록
  const addQna = useMutation<QnaItem, Error, QnaInput>({
    mutationFn: async (input) => {
      const { data, error } = await supabase
        .from('qnas')
        .insert([input])
        .select('*')
        .single();

      if (error) throw error;
      return data as QnaItem;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData<QnaItem[]>(
        ['qna', variables.product_id],
        (prev) => (prev ? [data, ...prev] : [data])
      );
      queryClient.invalidateQueries({ queryKey: ['qna', variables.product_id] });
    },
  });

  // ✅ QnA 수정
  const updateQna = useMutation<QnaItem, Error, QnaUpdateInput>({
    mutationFn: async ({ qnaId, question, is_private }) => {
      const { data, error } = await supabase
        .from('qnas')
        .update({ question, is_private })
        .eq('id', qnaId)
        .select('*')
        .single();

      if (error) throw error;
      return data as QnaItem;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<QnaItem[]>(['qna', data.product_id], (prev) =>
        prev?.map((item) => (item.id === data.id ? { ...item, ...data } : item))
      );
      queryClient.invalidateQueries({ queryKey: ['qna', data.product_id] });
    },
  });

  // ✅ QnA 삭제
  const deleteQna = useMutation<void, Error, QnaDeleteInput>({
    mutationFn: async ({ qnaId }) => {
      const { error } = await supabase.from('qnas').delete().eq('id', qnaId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData<QnaItem[]>(
        ['qna', variables.product_id],
        (prev) => prev?.filter((item) => item.id !== variables.qnaId)
      );
      queryClient.invalidateQueries({ queryKey: ['qna', variables.product_id] });
    },
  });

  // ✅ QnA 답변 등록/수정
  const answerQna = useMutation<QnaItem, Error, QnaAnswerInput>({
    mutationFn: async ({ qnaId, answer }) => {
      const { data, error } = await supabase
        .from('qnas')
        .update({ answer })
        .eq('id', qnaId)
        .select('*')
        .single();

      if (error) throw error;
      return data as QnaItem;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<QnaItem[]>(['qna', data.product_id], (prev) =>
        prev?.map((item) => (item.id === data.id ? { ...item, ...data } : item))
      );
      queryClient.invalidateQueries({ queryKey: ['qna', data.product_id] });
    },
  });

  return {
    qnas,
    isLoading,
    fetchError,
    addQna,
    updateQna,
    deleteQna,
    answerQna,
  };
}