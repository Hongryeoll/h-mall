import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { useQuery } from '@tanstack/react-query';
import type { Tables } from '@/types/supabase';

type Filters = {
  categorySlug?: string;
  sectionSlug?: string;
  subsectionSlug?: string;
  subtabSlug?: string;
};

export const useFilteredProducts = (filters: Filters) => {
  return useQuery<Tables<'products'>[], Error>({
    queryKey: [
      'filtered-products',
      filters
    ],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient();

      let query = supabase.from('products').select(`
          id, name, price, brand,
          discount_rate, final_price,
          description, product_images, detail_images,
          avg_rating, review_count,
          created_date,
          category_id, section_id,
          subsection_id, subtab_id,
          subtabs:subtab_id ( id, slug, label )
        `);

      let categoryId: string | null = null;
      if (filters.categorySlug) {
        const { data: cat, error: catErr } = await supabase
          .from('categories')
          .select('id')
          .ilike('slug', filters.categorySlug)
          .limit(1)
          .single();
        if (catErr || !cat?.id) return [];
        categoryId = cat.id;
        query = query.eq('category_id', categoryId);
      }

      let sectionId: string | null = null;
      if (filters.sectionSlug) {
        const { data: sec, error: secErr } = await supabase
          .from('sections')
          .select('id')
          .ilike('slug', filters.sectionSlug)
          .eq('category_id', categoryId!)
          .limit(1)
          .single();
        if (secErr || !sec?.id) return [];
        sectionId = sec.id;
        query = query.eq('section_id', sectionId);
      }

      let subsectionId: string | null = null;
      if (filters.subsectionSlug) {
        if (!sectionId) {
          console.warn('❗ sectionSlug가 없어서 subsection 조회 불가');
          return [];
        }
        const { data: subsection, error: subsectionErr } = await supabase
          .from('subsections')
          .select('id')
          .ilike('slug', filters.subsectionSlug)
          .eq('section_id', sectionId)
          .limit(1)
          .single();
        if (subsectionErr || !subsection?.id) return [];
        subsectionId = subsection.id;
      }

      if (subsectionId) {
        const { data: allSubtabs } = await supabase
          .from('subtabs')
          .select('id')
          .eq('subsection_id', subsectionId);
        const subtabIds = (allSubtabs ?? []).map((t) => String(t.id));

        if (filters.subtabSlug && filters.subtabSlug !== 'all') {
          const { data: oneTab, error: oneErr } = await supabase
            .from('subtabs')
            .select('id')
            .ilike('slug', filters.subtabSlug)
            .eq('subsection_id', subsectionId)
            .limit(1)
            .single();
          if (oneErr || !oneTab?.id) return [];
          query = query.eq('subtab_id', oneTab.id);
        } else {
          query = query.in('subtab_id', subtabIds);
        }
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
};
