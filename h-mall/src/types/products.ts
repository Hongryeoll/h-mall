export interface ProductFormProps {
  id?: string;
  name: string;
  brand?: string | null;
  category_id?: string | null;
  section_id?: string | null;
  subsection_id?: string | null;
  subtab_id?: string | null;
  created_date?: string | null;

  product_images: string[];
  detail_images: string[];

  price: number;
  discount_rate?: number | null;
  final_price?: number | null;

  description?: string | null;
  avg_rating?: number | null;
  review_count?: number | null;
}
