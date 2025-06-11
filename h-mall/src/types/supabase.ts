export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          code: string;
          id: string;
          name: string | null;
        };
        Insert: {
          code: string;
          id?: string;
          name?: string | null;
        };
        Update: {
          code?: string;
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      products: {
        Row: {
          created_date: string | null;
          description: string | null;
          detail_image: string;
          discount_rate: number | null;
          final_price: number | null;
          id: string;
          images: string;
          name: string;
          price: number;
          subsection_id: string | null;
          subtab_id: string | null;
        };
        Insert: {
          created_date?: string | null;
          description?: string | null;
          detail_image: string;
          discount_rate?: number | null;
          final_price?: number | null;
          id?: string;
          images: string;
          name: string;
          price: number;
          subsection_id?: string | null;
          subtab_id?: string | null;
        };
        Update: {
          created_date?: string | null;
          description?: string | null;
          detail_image?: string;
          discount_rate?: number | null;
          final_price?: number | null;
          id?: string;
          images?: string;
          name?: string;
          price?: number;
          subsection_id?: string | null;
          subtab_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_subtab_id_fkey';
            columns: ['subtab_id'];
            isOneToOne: false;
            referencedRelation: 'subtabs';
            referencedColumns: ['id'];
          },
        ];
      };
      sections: {
        Row: {
          category_id: string;
          id: string;
          slug: string | null;
          title: string | null;
        };
        Insert: {
          category_id?: string;
          id?: string;
          slug?: string | null;
          title?: string | null;
        };
        Update: {
          category_id?: string;
          id?: string;
          slug?: string | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'sections_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      subsections: {
        Row: {
          id: string;
          section_id: string;
          slug: string | null;
          title: string | null;
        };
        Insert: {
          id?: string;
          section_id: string;
          slug?: string | null;
          title?: string | null;
        };
        Update: {
          id?: string;
          section_id?: string;
          slug?: string | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'subsections_section_id_fkey';
            columns: ['section_id'];
            isOneToOne: false;
            referencedRelation: 'sections';
            referencedColumns: ['id'];
          },
        ];
      };
      subtabs: {
        Row: {
          id: string;
          label: string | null;
          slug: string | null;
          subsection_id: string;
        };
        Insert: {
          id?: string;
          label?: string | null;
          slug?: string | null;
          subsection_id?: string;
        };
        Update: {
          id?: string;
          label?: string | null;
          slug?: string | null;
          subsection_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subtabs_subsection_id_fkey';
            columns: ['subsection_id'];
            isOneToOne: false;
            referencedRelation: 'subsections';
            referencedColumns: ['id'];
          },
        ];
      };
      userinfo: {
        Row: {
          created_at: string | null;
          email: string;
          id: string;
          nickname: string | null;
          role: string;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id: string;
          nickname?: string | null;
          role?: string;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: string;
          nickname?: string | null;
          role?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
