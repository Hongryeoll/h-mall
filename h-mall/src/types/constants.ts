export const ROUTES = {
  HOME: '/',
  MALL: '/mall',
  LOGIN: '/login',
  SIGNUP: '/signup',
  MALL_MYPAGE: '/mall/mypage',
  MALL_MYPAGE_ORDERS: '/mall/mypage/orders',
  MALL_MYPAGE_REVIEWS: '/mall/mypage/reviews',
  MALL_CART: '/mall/order/cart',
  MALL_CATALOG: (id: string) => `/mall/catalog/${id}`,
  MALL_CHECKOUT: '/mall/order/checkout',
  MALL_CHECKOUT_CONFIRMED: (id: string) =>
    `/mall/order/checkout/confirmed/${id}`,
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
