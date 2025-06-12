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

      let query = supabase.from('products').select(`
          id,
          name,
          price,
          brand,
          discount_rate,
          final_price,
          description,
          images,
          detail_image,
          created_date,
          subtab_id,
          subsection_id,
          subtabs:subtab_id (
            id,
            slug,
            label
          )
        `);

      // 1. sub=bootcut 등 특정 subtab인 경우
      if (subtabSlug && subtabSlug !== 'all') {
        const { data: subtab, error } = await supabase
          .from('subtabs')
          .select('id')
          .ilike('slug', subtabSlug) // 대소문자 구분 없이
          .limit(1)
          .single(); // 조건 느슨하게 유지

        if (error || !subtab?.id) {
          console.warn(
            `❗ subtabSlug "${subtabSlug}"에 해당하는 id를 찾을 수 없습니다.`
          );
          return [];
        }

        query = query.eq('subtab_id', subtab.id);
      }

      // 2. sub=all인 경우 subsection 기준
      else if (subsectionSlug) {
        const { data: subsection, error } = await supabase
          .from('subsections')
          .select('id')
          .ilike('slug', subsectionSlug)
          .limit(1)
          .single();

        if (error || !subsection?.id) {
          console.warn(
            `❗ subsectionSlug "${subsectionSlug}"에 해당하는 id를 찾을 수 없습니다.`
          );
          return [];
        }

        query = query.eq('subsection_id', subsection.id);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data;
    },
  });
};
