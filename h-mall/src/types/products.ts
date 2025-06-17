export interface ProductFormProps {
  name: string;
  product_images: string[];
  detail_images: string[];
  price: number;
  discount_rate: number;
  final_price: number;
  description: string;
  category_id: string;
  section_id: string;
  subsection_id: string;
  subtab_id: string;
  created_date?: string;
}
