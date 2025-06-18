import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import type { Database } from '@/types/supabase';

export type CartItemProps = {
  id: string;
  size: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    brand: string;
    final_price: number;
    product_images: string[];
  };
};

export function useCart() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const queryClient = useQueryClient();

  // 장바구니 조회
  const {
    data: items,
    isLoading,
    error: fetchError,
  } = useQuery<CartItemProps[], Error>({
    queryKey: ['cart'],
    queryFn: async (): Promise<CartItemProps[]> => {
      const { data, error } = await supabase.from('cart_items').select(
        `
          id,
          size,
          quantity,
          product:products (
            id,
            name,
            brand,
            final_price,
            product_images
          )
        `
      );
      if (error) throw error;
      return data as CartItemProps[];
    },
  });

  // 장바구니에 아이템 추가
  const addItem = useMutation<
    Database['public']['Tables']['cart_items']['Row'][],
    Error,
    { product_id: string; quantity: number; size: string }
  >({
    mutationFn: async ({ product_id, size, quantity }) => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) throw authError || new Error('User not found');

      const { data, error } = await supabase
        .from('cart_items')
        .upsert(
          { user_id: user.id, product_id, size, quantity },
          { onConflict: 'user_id,product_id,size' }
        );
      if (error) throw error;
      if (!data) throw new Error('Failed to add to cart');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // 3) 수량 업데이트
  type UpdateBySizeInput = {
    product_id: string;
    size: string;
    quantity: number;
  };
  const updateItem = useMutation<void, Error, UpdateBySizeInput>({
    mutationFn: async ({ product_id, size, quantity }) => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) throw authError || new Error('User not found');

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity, updated_at: new Date().toISOString() })
        .match({ user_id: user.id, product_id, size });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // 4) 아이템 삭제
  type RemoveBySizeInput = { product_id: string; size: string };
  const removeItem = useMutation<void, Error, RemoveBySizeInput>({
    mutationFn: async ({ product_id, size }) => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) throw authError || new Error('User not found');

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .match({ user_id: user.id, product_id, size });
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
