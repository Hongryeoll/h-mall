import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import type { Database } from '@/types/supabase';

export type OrderItemInput = {
  id: string;
  product_id: string;
  size: string;
  quantity: number;
  price: number;
};

export type CreateOrderInput = {
  items: OrderItemInput[];
  recipient_name: string;
  recipient_phone: string;
  shipping_address: string;
  shipping_request?: string;
  payment_method: string;
};

export function useOrder() {
  const supabase = createSupabaseBrowserClient();
  const queryClient = useQueryClient();

  const createOrder = useMutation<void, Error, CreateOrderInput>({
    mutationFn: async (input) => {
      const {
        items,
        recipient_name,
        recipient_phone,
        shipping_address,
        shipping_request = '',
        payment_method,
      } = input;

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) throw authError || new Error('User not found');

      const total_price = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_price,
          recipient_name,
          recipient_phone,
          shipping_address,
          shipping_request,
          payment_method,
        })
        .select('id')
        .single();

      if (orderError) throw orderError;
      const orderId = orderData.id;

      const orderItems = items.map((item) => ({
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
      }));

      const { error: itemError } = await supabase
        .from('order_items')
        .insert(orderItems);
      if (itemError) throw itemError;

      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .in('id', items.map((item) => item.id));
      if (deleteError) throw deleteError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return { createOrder };
}