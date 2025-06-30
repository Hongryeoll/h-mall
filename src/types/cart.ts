export interface CartItemProps {
  id: string;
  size: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    brand: string;
    discount_rate: number;
    price: number;
    final_price: number;
    product_images: string[];
  };
};