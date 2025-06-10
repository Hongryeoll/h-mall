import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { useQuery } from '@tanstack/react-query';

export const useFilteredProducts = ({
  subtabSlug,
  subsectionSlug,
}: {
  subtabSlug?: string;
  subsectionSlug?: string;
}) => {
  return useQuery({
    queryKey: ['filtered-products', subtabSlug, subsectionSlug],
    queryFn: async () => {
      const supabase = createSupabaseBrowserClient();

      // 1. subsectionSlug가 있을 경우, 실제 id를 조회
      let subsectionId: string | undefined = undefined;

      if (subsectionSlug) {
        const { data: subsection } = await supabase
          .from('subsections')
          .select('id')
          .eq('slug', subsectionSlug)
          .single();

        subsectionId = subsection?.id;
      }

      // 2. product 데이터 조회 쿼리 구성
      let query = supabase
        .from('products')
        .select(`
          id,
          name,
          price,
          discount_rate,
          final_price,
          description,
          thumbnail_image,
          detaile_image,
          created_date,
          subtab_id,
          subtabs (
            id,
            slug,
            label,
            subsection_id,
            subsections (
              id,
              slug,
              title,
              sections (
                id,
                title,
                categories (
                  id,
                  name
                )
              )
            )
          )
        `);

      if (subtabSlug && subtabSlug !== 'all') {
        query = query.eq('subtabs.slug', subtabSlug);
      } else if (subsectionId) {
        query = query.eq('subtabs.subsection_id', subsectionId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });
};