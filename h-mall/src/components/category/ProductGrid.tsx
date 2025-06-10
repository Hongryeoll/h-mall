import type { Tables } from '@/types/supabase';

export default function ProductGrid({
  products,
}: {
  products: Tables<'products'>[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded p-4 hover:shadow transition"
        >
          <div className="font-semibold">{product.name}</div>
          <div className="text-sm text-gray-500">
            등록일: {product.created_date?.slice(0, 10) ?? '-'}
          </div>
        </div>
      ))}
    </div>
  );
}
