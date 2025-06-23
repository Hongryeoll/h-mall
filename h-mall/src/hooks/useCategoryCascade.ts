import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const supabase = createSupabaseBrowserClient();

export function useCategoryCascade() {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [subsectionId, setSubsectionId] = useState<string | null>(null);
  const [subtabId, setSubtabId] = useState<string | null>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) throw error;
      return data;
    },
  });

  const { data: sections = [] } = useQuery({
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

  const { data: subsections = [] } = useQuery({
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

  const { data: subtabs = [] } = useQuery({
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

  useEffect(() => {
    const checkCategories = async () => {
      const { error } = await supabase.from('categories').select('*');
      if (error) {
        console.error('카테고리 로딩 실패:', error);
      }
    };

    checkCategories();
  }, []); 

  return {
    selected: { categoryId, sectionId, subsectionId, subtabId },
    set: {
      category: (id: string) => {
        setCategoryId(id);
        setSectionId(null);
        setSubsectionId(null);
        setSubtabId(null);
      },
      section: (id: string) => {
        setSectionId(id);
        setSubsectionId(null);
        setSubtabId(null);
      },
      subsection: (id: string) => {
        setSubsectionId(id);
        setSubtabId(null);
      },
      subtab: (id: string) => setSubtabId(id),
    },
    options: {
      categories,
      sections,
      subsections,
      subtabs,
    },
  };
}
