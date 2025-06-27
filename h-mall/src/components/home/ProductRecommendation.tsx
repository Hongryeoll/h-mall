'use client';

import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/types/constants';

type Props = {
  title: string;
  categorySlug: string;
};

export default function ProductRecommendation({ title, categorySlug }: Props) {
  const { data, isLoading, isError } = useFilteredProducts({ categorySlug });
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <section className="w-full mb-10">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div
          onClick={() =>
            router.push(ROUTES.MALL_CATALOG_CATEGORY(categorySlug))
          }
          className="text-sm text-gray-500 hover:underline cursor-pointer"
        >
          더보기 →
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto px-2">
        {data.map((product) => (
          <div
            key={product.id}
            className="min-w-[180px] flex-shrink-0 border rounded-md p-2 cursor-pointer hover:shadow-md"
            onClick={() => router.push(ROUTES.MALL_CATALOG(product.id))}
          >
            <div className="relative w-full h-44 mb-2">
              <Image
                src={product.product_images?.[0] || '/no-image.png'}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="text-sm truncate">{product.name}</div>
            <div className="font-semibold">
              {product.final_price?.toLocaleString()}원
            </div>
            {product.discount_rate && product.discount_rate > 0 && (
              <div className="text-red-500 text-xs">
                {product.discount_rate}% 할인
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
