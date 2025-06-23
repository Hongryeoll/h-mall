import type { CartItemProps } from '@/types/cart';

export interface OrderItemInput {
  id: string;
  product_id: string;
  size: string;
  quantity: number;
  price: number;
}

export interface CreateOrderInput {
  items: OrderItemInput[];
  shipping_label: string;
  recipient_name: string;
  recipient_phone: string;
  postcode: string;
  address: string;
  address_detail: string;
  shipping_request?: string;
  payment_method: string;
  card_company?: string;
  shipping_fee: number;
  admin_discount: number;
  coupon_discount: number;
  mileage_used: number;
  instant_discount: number;
  total_price: number;
  total_payable: number;
  receipt_type?: '소득공제용' | '지출증빙용' | '미발행' | null;
  receipt_phone?: string | null;
}

export interface ShippingFormValues {
  label: string;
  receiver: string;
  postcode: string;
  address: string;
  addressDetail: string;
  phone: string;
  isDefault: boolean;
  request: string;
}

export interface CheckoutFormValues extends ShippingFormValues {
  paymentMethod: 'toss' | 'kakao' | 'naver' | 'card';
  cardCompany: string;
  receipt_type?: '소득공제용' | '지출증빙용' | '미발행';
  receipt_phone?: string;
  items: {
    id: string;
    product_id: string;
    size: string;
    quantity: number;
    price: number;
    discount_rate: number;
  }[];
  totalProductPrice: number;
  adminDiscount: number;
  shippingFee: number;
  totalPayable: number;
  phone: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  size: string;
  product: {
    id: string;
    name: string;
    brand: string;
    product_images: string[];
    final_price: number;
  };
}

export interface OrderData {
  id: string;
  user_id: string;
  payment_method: string;
  card_company: string | null;
  total_price: number;
  shipping_fee: number;
  admin_discount: number;
  coupon_discount: number;
  mileage_used: number;
  instant_discount: number;
  total_payable: number;
  recipient_name: string;
  recipient_phone: string;
  postcode: string;
  address: string;
  address_detail: string;
  shipping_request: string;
  order_items: OrderItem[];
  receipt_type: string;
  receipt_phone: string;
  status: string;
  created_at: string;
  updated_at: string;
  shipping_label: string;
}

export interface DaumPostcodeData {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

export interface AgreementState {
  agree1: boolean;
  agree2: boolean;
  agree3: boolean;
}

export interface CheckoutOrderSummaryProps {
  items: CartItemProps[];
  totalProductPrice: number;
  adminDiscount: number;
  shippingFee: number;
  mileageUsed: number;
  instantDiscount: number;
  totalPayable: number;
  agreements: AgreementState;
  setAgreements: React.Dispatch<React.SetStateAction<AgreementState>>;
}
