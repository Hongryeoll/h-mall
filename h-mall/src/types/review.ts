export interface ReviewUserInfo {
  email: string;
  nickname: string | null;
}

export interface ReviewOrderItem {
  size: string | null;
  price: number;
}

export interface ReviewProduct {
  name: string;
  final_price: number | null;
  discount_rate: number | null;
  product_images: string[];
}

export interface ReviewItemType {
  id: number;
  product_id: string;
  user_id: string | null;
  rating: number;
  content: string;
  created_at: string | null;
  images: string[] | null;
  userinfo: ReviewUserInfo | null;
  order_items: ReviewOrderItem | null;
  products: ReviewProduct | null;
}

export interface ReviewInput {
  product_id: string;
  user_id: string;
  order_item_id: string;
  rating: number;
  content: string;
  images: string[];
};

export interface ReviewUpdateInput {
  reviewId: number;
  rating: number;
  content: string;
  product_id: string;
};

export interface ReviewDeleteInput {
  reviewId: number;
  product_id: string;
};