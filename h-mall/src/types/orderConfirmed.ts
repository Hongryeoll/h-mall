import type { CartItemProps } from '@/types/cart';

export interface OrderConfirmedProps {
  orderId: string;
  shippingInfo: {
    label: string;
    receiver: string;
    postcode: string;
    address: string;
    addressDetail: string;
    phone1: string;
    phone2?: string;
    request?: string;
  };
  paymentMethod: 'toss' | 'kakao' | 'card' | 'etc';
  cardName?: string;
  priceSummary: {
    totalProductPrice: number;
    adminDiscount: number;
    shippingFee: number;
    mileageUsed: number;
    instantDiscount: number;
    totalPayable: number;
  };
  items: CartItemProps[];
}