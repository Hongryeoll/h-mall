export interface QnaItemType {
  id: number;
  product_id: string;
  user_id: string | null;

  // QnA 내용
  question: string;
  answer?: string | null;
  is_private?: boolean | null;
  category?: string | null;
  created_at: string;
  updated_at?: string | null;

  // 유저 정보
  email_masked?: string | null;
  public_nickname?: string | null;

  // 상품 정보 (뷰에 포함)
  product_name?: string | null;
  brand?: string | null;
  product_images?: string[] | null;
}

export interface QnaInput {
  product_id: string;
  user_id: string;
  question: string;
  is_private?: boolean;
  category?: string;
}

export interface QnaUpdateInput {
  qnaId: number;
  question: string;
  is_private?: boolean;
}

export interface QnaAnswerInput {
  qnaId: number;
  answer: string;
}

export interface QnaDeleteInput {
  qnaId: number;
  product_id: string;
}
