export const ROUTES = {
  HOME: '/',
  MALL: '/mall',
  LOGIN: '/login',
  SIGNUP: '/signup',
  MALL_MYPAGE: '/mall/mypage',
  MALL_CART: '/mall/order/cart',
  MALL_CATALOG: (id: string) => `/mall/catalog/${id}`,
} as const;
// Auth-Helpers가 쿠키를 읽도록 돕는 옵션
export const SUPABASE_COOKIE_OPTIONS = {
  name: 'sb', // cookie prefix: sb-access-token, sb-refresh-token
  domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost',
  path: '/',
  sameSite: 'lax' as const,
};
export const ERROR_MESSAGE = {
  UNKNOWN: '알수없는 오류가 발생했습니다.',
  RETRY: '다시 시도해주세요.',
};
