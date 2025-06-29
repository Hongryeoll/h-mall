export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          quantity: number
          size: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          quantity: number
          size?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          size?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "userinfo"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          id: string
          name: string | null
          slug: string
        }
        Insert: {
          id?: string
          name?: string | null
          slug: string
        }
        Update: {
          id?: string
          name?: string | null
          slug?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string | null
          price: number
          product_id: string | null
          quantity: number
          reviewed: boolean | null
          size: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          order_id?: string | null
          price: number
          product_id?: string | null
          quantity: number
          reviewed?: boolean | null
          size?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          order_id?: string | null
          price?: number
          product_id?: string | null
          quantity?: number
          reviewed?: boolean | null
          size?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "userinfo"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address: string
          address_detail: string
          admin_discount: number
          card_company: string | null
          coupon_discount: number
          created_at: string | null
          id: string
          instant_discount: number
          mileage_used: number
          payment_method: string
          postcode: string
          receipt_phone: string | null
          receipt_type: string | null
          recipient_name: string
          recipient_phone: string
          shipping_fee: number
          shipping_label: string
          shipping_request: string
          status: string | null
          total_payable: number
          total_price: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address: string
          address_detail?: string
          admin_discount?: number
          card_company?: string | null
          coupon_discount?: number
          created_at?: string | null
          id?: string
          instant_discount?: number
          mileage_used?: number
          payment_method: string
          postcode?: string
          receipt_phone?: string | null
          receipt_type?: string | null
          recipient_name: string
          recipient_phone: string
          shipping_fee?: number
          shipping_label?: string
          shipping_request?: string
          status?: string | null
          total_payable: number
          total_price: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string
          address_detail?: string
          admin_discount?: number
          card_company?: string | null
          coupon_discount?: number
          created_at?: string | null
          id?: string
          instant_discount?: number
          mileage_used?: number
          payment_method?: string
          postcode?: string
          receipt_phone?: string | null
          receipt_type?: string | null
          recipient_name?: string
          recipient_phone?: string
          shipping_fee?: number
          shipping_label?: string
          shipping_request?: string
          status?: string | null
          total_payable?: number
          total_price?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "userinfo"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          avg_rating: number | null
          brand: string | null
          category_id: string | null
          created_date: string | null
          description: string | null
          detail_images: string[]
          discount_rate: number | null
          final_price: number | null
          id: string
          name: string
          price: number
          product_images: string[]
          review_count: number | null
          section_id: string | null
          subsection_id: string | null
          subtab_id: string | null
        }
        Insert: {
          avg_rating?: number | null
          brand?: string | null
          category_id?: string | null
          created_date?: string | null
          description?: string | null
          detail_images: string[]
          discount_rate?: number | null
          final_price?: number | null
          id?: string
          name: string
          price: number
          product_images: string[]
          review_count?: number | null
          section_id?: string | null
          subsection_id?: string | null
          subtab_id?: string | null
        }
        Update: {
          avg_rating?: number | null
          brand?: string | null
          category_id?: string | null
          created_date?: string | null
          description?: string | null
          detail_images?: string[]
          discount_rate?: number | null
          final_price?: number | null
          id?: string
          name?: string
          price?: number
          product_images?: string[]
          review_count?: number | null
          section_id?: string | null
          subsection_id?: string | null
          subtab_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_subtab_id_fkey"
            columns: ["subtab_id"]
            isOneToOne: false
            referencedRelation: "subtabs"
            referencedColumns: ["id"]
          },
        ]
      }
      qnas: {
        Row: {
          answer: string | null
          category: string | null
          created_at: string | null
          id: number
          is_private: boolean | null
          product_id: string
          question: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          answer?: string | null
          category?: string | null
          created_at?: string | null
          id?: number
          is_private?: boolean | null
          product_id: string
          question: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          answer?: string | null
          category?: string | null
          created_at?: string | null
          id?: number
          is_private?: boolean | null
          product_id?: string
          question?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qnas_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qnas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "userinfo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qnas_user_id_fkey_user_public_info"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_public_info"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          content: string
          created_at: string | null
          id: number
          images: string[] | null
          order_item_id: string
          product_id: string
          rating: number
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: number
          images?: string[] | null
          order_item_id: string
          product_id: string
          rating: number
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: number
          images?: string[] | null
          order_item_id?: string
          product_id?: string
          rating?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "userinfo"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          category_id: string
          id: string
          slug: string | null
          title: string | null
        }
        Insert: {
          category_id?: string
          id?: string
          slug?: string | null
          title?: string | null
        }
        Update: {
          category_id?: string
          id?: string
          slug?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      subsections: {
        Row: {
          id: string
          section_id: string
          slug: string | null
          title: string | null
        }
        Insert: {
          id?: string
          section_id: string
          slug?: string | null
          title?: string | null
        }
        Update: {
          id?: string
          section_id?: string
          slug?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subsections_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      subtabs: {
        Row: {
          id: string
          label: string | null
          slug: string | null
          subsection_id: string
        }
        Insert: {
          id?: string
          label?: string | null
          slug?: string | null
          subsection_id?: string
        }
        Update: {
          id?: string
          label?: string | null
          slug?: string | null
          subsection_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subtabs_subsection_id_fkey"
            columns: ["subsection_id"]
            isOneToOne: false
            referencedRelation: "subsections"
            referencedColumns: ["id"]
          },
        ]
      }
      user_public_info: {
        Row: {
          email_masked: string
          id: string
          nickname: string | null
        }
        Insert: {
          email_masked: string
          id: string
          nickname?: string | null
        }
        Update: {
          email_masked?: string
          id?: string
          nickname?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_public_info_userinfo_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "userinfo"
            referencedColumns: ["id"]
          },
        ]
      }
      userinfo: {
        Row: {
          created_at: string | null
          email: string
          id: string
          nickname: string | null
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          nickname?: string | null
          role?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          nickname?: string | null
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      qna_with_product_info: {
        Row: {
          answer: string | null
          created_at: string | null
          id: number | null
          is_private: boolean | null
          product_id: string | null
          product_name: string | null
          question: string | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qnas_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qnas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "userinfo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qnas_user_id_fkey_user_public_info"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_public_info"
            referencedColumns: ["id"]
          },
        ]
      }
      qna_with_user_info: {
        Row: {
          answer: string | null
          category: string | null
          created_at: string | null
          email_masked: string | null
          id: number | null
          is_private: boolean | null
          product_id: string | null
          public_nickname: string | null
          question: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qnas_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qnas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "userinfo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qnas_user_id_fkey_user_public_info"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_public_info"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews_with_userinfo: {
        Row: {
          content: string | null
          created_at: string | null
          discount_rate: number | null
          email_mark: string | null
          final_price: number | null
          id: number | null
          images: string[] | null
          nickname: string | null
          order_item_id: string | null
          order_item_price: number | null
          order_item_size: string | null
          product_id: string | null
          product_images: string[] | null
          product_name: string | null
          rating: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "userinfo"
            referencedColumns: ["id"]
          },
        ]
      }
      user_cart: {
        Row: {
          id: string | null
          product_id: string | null
          product_images: string[] | null
          product_name: string | null
          quantity: number | null
          total_price: number | null
          unit_price: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "userinfo"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
