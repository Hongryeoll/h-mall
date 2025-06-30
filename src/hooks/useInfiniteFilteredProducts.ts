'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { useMemo } from 'react';

const PAGE_SIZE = 3;

type Filters = {
  categorySlug?: string;
  sectionSlug?: string;
  subsectionSlug?: string;
  subtabSlug?: string;
};

export const useInfiniteFilteredProducts = (filters: Filters) => {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const fetchProducts = async ({ pageParam = 1 }) => {
    let query = supabase.from('products').select(`
        id, name, price, brand,
        discount_rate, final_price,
        description, product_images, detail_images,
        avg_rating, review_count,
        created_date,
        category_id, section_id,
        subsection_id, subtab_id,
        subtabs:subtab_id ( id, slug, label )
      `)
      .order('created_date', { ascending: false })
      .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1);

    // 필터 적용
    let categoryId: string | null = null;
    if (filters.categorySlug) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .ilike('slug', filters.categorySlug)
        .single();
      if (!cat?.id) return { products: [], hasNext: false };
      categoryId = cat.id;
      query = query.eq('category_id', categoryId);
    }

    let sectionId: string | null = null;
    if (filters.sectionSlug) {
      const { data: sec } = await supabase
        .from('sections')
        .select('id')
        .ilike('slug', filters.sectionSlug)
        .eq('category_id', categoryId!)
        .single();
      if (!sec?.id) return { products: [], hasNext: false };
      sectionId = sec.id;
      query = query.eq('section_id', sectionId);
    }

    let subsectionId: string | null = null;
    if (filters.subsectionSlug) {
      if (!sectionId) return { products: [], hasNext: false };
      const { data: subsection } = await supabase
        .from('subsections')
        .select('id')
        .ilike('slug', filters.subsectionSlug)
        .eq('section_id', sectionId)
        .single();
      if (!subsection?.id) return { products: [], hasNext: false };
      subsectionId = subsection.id;
    }

    if (subsectionId) {
      const { data: allSubtabs } = await supabase
        .from('subtabs')
        .select('id')
        .eq('subsection_id', subsectionId);
      const subtabIds = (allSubtabs ?? []).map((t) => String(t.id));

      if (filters.subtabSlug && filters.subtabSlug !== 'all') {
        const { data: oneTab } = await supabase
          .from('subtabs')
          .select('id')
          .ilike('slug', filters.subtabSlug)
          .eq('subsection_id', subsectionId)
          .single();
        if (!oneTab?.id) return { products: [], hasNext: false };
        query = query.eq('subtab_id', oneTab.id);
      } else {
        query = query.in('subtab_id', subtabIds);
      }
    }

    const { data, error } = await query;
    if (error) throw error;

    const products = data ?? [];
    const hasNext = products.length === PAGE_SIZE;

    return { products, hasNext };
  };

  return useInfiniteQuery({
    queryKey: ['filtered-products', filters],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length + 1 : undefined,
    staleTime: 1000 * 60 * 5,
    enabled: !!filters,
  });
};