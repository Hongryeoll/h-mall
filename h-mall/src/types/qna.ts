export type QnaItem = {
  id: number;
  product_id: string;
  user_id: string | null;
  question: string;
  answer?: string | null;
  is_private?: boolean | null;
  created_at: string | null;
  userinfo?: {
    email: string;
    nickname: string;
  } | null;
};

export type QnaInput = {
  product_id: string;
  user_id: string;
  question: string;
  is_private?: boolean;
};

export type QnaUpdateInput = {
  qnaId: number;
  question: string;
  is_private?: boolean;
};

export type QnaAnswerInput = {
  qnaId: number;
  answer: string;
};

export type QnaDeleteInput = {
  qnaId: number;
  product_id: string;
};