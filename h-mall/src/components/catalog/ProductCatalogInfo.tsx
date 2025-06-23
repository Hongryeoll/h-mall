'use client';

import ProductInfo from '@/components/catalog/ProductInfo';
import ProductTabsHeader from '@/components/catalog/ProductTabsHeader';
import ProductDetailSection from '@/components/catalog/ProductDetailSection';
import ProductGuideSection from '@/components/catalog/ProductGuideSection';
import ProductQnASection from '@/components/catalog/ProductQnASection';
import { ProductFormProps } from '@/types/products';

type Props = {
  product: ProductFormProps;
};

const tabs = [
  { title: '상품상세', id: 'product-detail' },
  { title: '상품안내', id: 'usage-guide' },
  { title: '리뷰', id: 'reviews' },
  { title: 'Q&A', id: 'question-answer' },
];

export default function ProductCatalogInfo({ product }: Props) {
  return (
    <div className="w-full bg-hr-white min-h-screen">
      {/* 상품 기본 정보 */}
      <ProductInfo product={product} />

      {/* 탭, 상세·안내·Q&A 영역 */}
      <div className="relative">
        <ProductTabsHeader tabs={tabs} />
        <ProductDetailSection id="product-detail" product={product} />
        <ProductGuideSection id="usage-guide" product={product} />
        <ProductQnASection id="question-answer" />
      </div>
    </div>
  );
}
