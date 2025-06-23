export interface ReviewItem {
  id: number;
  product_id: string;
  user_id: string | null;
  rating: number;
  content: string;
  created_at: string | null;
}
