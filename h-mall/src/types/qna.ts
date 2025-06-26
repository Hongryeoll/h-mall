export interface QnaItem {
  id: number;
  product_id: string;
  user_id: string | null;
  question: string;
  answer?: string | null;
  is_private?: boolean | null;
  created_at: string | null;
  category?: string | null;
  email_masked?: string | null;
  public_nickname?: string | null;
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
