import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import type { Database } from '@/types/supabase';

export type CartItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    final_price: number;
    product_images: string[];
  };
};

export function useCart() {
  // 브라우저 전용 Supabase 클라이언트
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const queryClient = useQueryClient();

  // 1) 장바구니 조회
  const {
    data: items,
    isLoading,
    error: fetchError,
  } = useQuery<CartItem[], Error>({
    queryKey: ['cart'],
    queryFn: async (): Promise<CartItem[]> => {
      const { data, error } = await supabase
        .from('cart_items')
        .select(
          `
          id,
          quantity,
          product:products (
            id,
            name,
            final_price,
            product_images
          )
        `
        );
      if (error) throw error;
      return data as CartItem[];
    },
  });

  // 2) 장바구니에 아이템 추가 (upsert)
  const addItem = useMutation<any, Error, { product_id: string; quantity: number }>({
    mutationFn: async ({ product_id, quantity }) => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) throw authError || new Error('User not found');

      const { data, error } = await supabase
        .from('cart_items')
        .upsert(
          { user_id: user.id, product_id, quantity },
          { onConflict: 'user_id,product_id' }
        );
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // 3) 수량 업데이트
  const updateItem = useMutation<void, Error, { id: string; quantity: number }>({
    mutationFn: async ({ id, quantity }) => {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // 4) 아이템 삭제
  const removeItem = useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return {
    items,
    isLoading,
    fetchError,
    addItem,
    updateItem,
    removeItem,
  };
}
