import { CartItemProps } from '@/types/cart';
import { BuyNowItem } from '@/store/order/useBuyNowStore';
import { CheckoutItem } from '@/types/checkout';

export const convertCartItemsToCheckoutItems = (items: CartItemProps[]): CheckoutItem[] =>
  items.map((item) => ({
    id: item.id,
    product_id: item.product.id,
    size: item.size,
    quantity: item.quantity,
    price: item.product.final_price,
    discount_rate: item.product.discount_rate,
    product_name: item.product.name,
    brand: item.product.brand,
    product_images: item.product.product_images,
  }));

export const convertBuyNowItemsToCheckoutItems = (items: BuyNowItem[]): CheckoutItem[] =>
  items.map((item) => ({
    id: item.product_id,
    product_id: item.product_id,
    size: item.size,
    quantity: item.quantity,
    price: item.price,
    discount_rate: item.discount_rate,
    product_name: item.product_name,
    brand: item.brand,
    product_images: item.product_images,
  }));