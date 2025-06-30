'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { SearchProduct } from '@/types/products';
import { useMemo } from 'react';

const PAGE_SIZE = 3;

export function useInfiniteSearch(keyword: string, sort: string) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const fetchProducts = async ({ pageParam = 1 }) => {
    const { data, error } = await supabase.rpc('search_products', {
      keyword,
      sort,
      page: pageParam,
      page_size: PAGE_SIZE,
    });

    if (error) throw error;

    const products: SearchProduct[] = (data ?? []).map((item) => ({
      id: item.id ?? '',
      name: item.name ?? '',
      price: item.price ?? 0,
      brand: item.brand ?? '',
      discount_rate: item.discount_rate ?? null,
      final_price: item.final_price ?? 0,
      product_images: item.product_images ?? [],
      avg_rating: item.avg_rating ?? null,
      review_count: item.review_count ?? null,
      created_date: item.created_date ?? '',
    }));

    const hasNext = products.length === PAGE_SIZE;

    return { products, hasNext };
  };

  return useInfiniteQuery({
    queryKey: ['search-products', keyword, sort],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length + 1 : undefined,
    enabled: !!keyword,
    staleTime: 1000 * 60 * 5,
  });
}