import { create } from 'zustand';

export type BuyNowItem = {
  product_id: string;
  product_name: string;
  brand: string;
  product_images: string[];
  size: string;
  quantity: number;
  price: number;
  discount_rate: number;
};

type BuyNowStore = {
  items: BuyNowItem[];
  setItems: (items: BuyNowItem[]) => void;
  clearItems: () => void;
};

export const useBuyNowStore = create<BuyNowStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  clearItems: () => set({ items: [] }),
}));