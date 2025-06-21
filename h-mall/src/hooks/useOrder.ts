import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupabaseBrowserClient } from '@/library/client/supabase';
import { OrderData, CreateOrderInput } from '@/types/checkout';

export function useOrderDetail(orderId: string | null) {
  return useQuery<OrderData | null>({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!orderId) return null;
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase
        .from('orders')
        .select(
          `
          *,
          order_items (
            *,
            product:products (
              id,
              name,
              brand,
              product_images,
              final_price
            )
          )
        `
        )
        .eq('id', orderId)
        .single();

      if (error || !data) {
        console.error('Order fetch error', error);
        throw new Error('Failed to fetch order');
      }
      return data as OrderData;
    },
    enabled: !!orderId, // orderId가 있어야 쿼리 작동
  });
}

export function useOrder() {
  const supabase = createSupabaseBrowserClient();
  const queryClient = useQueryClient();

  const createOrder = useMutation<{ id: string }, Error, CreateOrderInput>({
    mutationFn: async (input) => {
      const {
        items,
        shipping_label,
        recipient_name,
        recipient_phone,
        postcode,
        address,
        address_detail,
        shipping_request = '',
        payment_method,
        card_company = null,
        shipping_fee,
        admin_discount,
        coupon_discount,
        mileage_used,
        instant_discount,
        total_price,
        total_payable,
      } = input;

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) throw authError || new Error('User not found');

      // 주문 생성
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          shipping_label,
          recipient_name,
          recipient_phone,
          postcode,
          address,
          address_detail,
          shipping_request,
          payment_method,
          card_company,
          total_price,
          shipping_fee,
          admin_discount,
          coupon_discount,
          mileage_used,
          instant_discount,
          total_payable,
        })
        .select('id')
        .single();

      if (orderError) throw orderError;
      const orderId = orderData.id;

      // 주문 항목 생성
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

      // 장바구니 아이템 삭제
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .in(
          'id',
          items.map((item) => item.id)
        );
      if (deleteError) throw deleteError;
      return orderData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return { createOrder };
}
