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
/** categories 테이블 전체 */
export const getAllCategories = async () => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data;
};

/** sections - category_id 기준 */
export const getSectionsByCategory = async (categoryId: string) => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .eq('category_id', categoryId);
  if (error) throw error;
  return data;
};

/** subsections - section_id 기준 */
export const getSubsectionsBySection = async (sectionId: string) => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('subsections')
    .select('*')
    .eq('section_id', sectionId);
  if (error) throw error;
  return data;
};

/** subtabs - subsection_id 기준 */
export const getSubtabsBySubsection = async (subsectionId: string) => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('subtabs')
    .select('*')
    .eq('subsection_id', subsectionId);
  if (error) throw error;
  return data;
};
