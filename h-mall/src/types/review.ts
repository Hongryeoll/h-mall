export interface ReviewItemType {
  id: number;
  product_id: string;
  user_id: string | null;
  rating: number;
  content: string;
  created_at: string | null;
  images: string[] | null;

  // 유저 정보
  email_mark: string;
  nickname: string | null;

  // 주문 정보
  order_item_id: string;
  order_item_size: string | null;
  order_item_price: number | null;

  // 상품 정보
  product_name: string;
  final_price: number | null;
  discount_rate: number | null;
  product_images: string[];
}

// 리뷰 생성
export interface ReviewInput {
  product_id: string;
  user_id: string;
  order_item_id: string;
  rating: number;
  content: string;
  images: string[];
}

// 리뷰 수정
export interface ReviewUpdateInput {
  reviewId: number;
  rating: number;
  content: string;
  product_id: string;
  images: string[];
}

// 리뷰 삭제
export interface ReviewDeleteInput {
  reviewId: number;
  product_id: string;
}
