// hooks/useProducts.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/actions/product/product.action';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });
};