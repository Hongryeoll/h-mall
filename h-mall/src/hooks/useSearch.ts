'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { ProductFormProps } from '@/types/products';

export function useSearch(keyword: string, sort: string = 'RECOMMEND') {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const {
    data: products,
    isLoading,
    error: fetchError,
  } = useQuery<ProductFormProps[], Error>({
    queryKey: ['search-products', keyword, sort],
    queryFn: async (): Promise<ProductFormProps[]> => {
      if (!keyword) return [];

      const { data, error } = await supabase.rpc('search_products', {
        keyword,
        sort,
      });

      if (error) throw error;

      return (data ?? []).map((item) => ({
        id: item.id ?? '',
        name: item.name ?? '',
        price: item.price ?? 0,
        brand: item.brand ?? '',
        discount_rate: item.discount_rate ?? null,
        final_price: item.final_price ?? 0,
        product_images: item.product_images ?? [],
        detail_images: item.detail_images ?? [],
        avg_rating: item.avg_rating ?? null,
        review_count: item.review_count ?? null,
        created_date: item.created_date ?? '',
        category_id: item.category_id ?? null,
        section_id: item.section_id ?? null,
        subsection_id: item.subsection_id ?? null,
        subtab_id: item.subtab_id ?? null,
        description: item.description ?? null,
      }));
    },
    enabled: !!keyword,
    staleTime: 1000 * 60 * 5,
  });

  return {
    products,
    isLoading,
    fetchError,
  };
}
