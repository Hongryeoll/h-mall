import { useQuery } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';

const supabase = createSupabaseBrowserClient();

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) throw error;
      return data;
    },
  });

export const useSections = (categoryId: string | null) =>
  useQuery({
    queryKey: ['sections', categoryId],
    queryFn: async () => {
      if (!categoryId) return [];
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('category_id', categoryId);
      if (error) throw error;
      return data;
    },
    enabled: !!categoryId,
  });

export const useSubsections = (sectionId: string | null) =>
  useQuery({
    queryKey: ['subsections', sectionId],
    queryFn: async () => {
      if (!sectionId) return [];
      const { data, error } = await supabase
        .from('subsections')
        .select('*')
        .eq('section_id', sectionId);
      if (error) throw error;
      return data;
    },
    enabled: !!sectionId,
  });

export const useSubtabs = (subsectionId: string | null) =>
  useQuery({
    queryKey: ['subtabs', subsectionId],
    queryFn: async () => {
      if (!subsectionId) return [];
      const { data, error } = await supabase
        .from('subtabs')
        .select('*')
        .eq('subsection_id', subsectionId);
      if (error) throw error;
      return data;
    },
    enabled: !!subsectionId,
  });
