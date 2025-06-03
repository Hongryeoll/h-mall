// actions/product/product.action.ts
'use server';

import { createServerSupabaseClient } from '@/library/supabase';

/** products 테이블 전체 가져오기 */
export const getAllProducts = async () => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data;
};