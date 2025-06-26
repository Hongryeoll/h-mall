'use client';

import InfoSection from '@/components/catalog/InfoSection';
import TabsHeader from '@/components/catalog/TabsHeader';
import DetailSection from '@/components/catalog/DetailSection';
import GuideSection from '@/components/catalog/GuideSection';
import QnASection from '@/components/catalog/QnASection';
import ReviewSection from '@/components/catalog/ReviewSection';
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
      <InfoSection product={product} />

      {/* 탭, 상세·안내·리뷰·Q&A 영역 */}
      <div className="relative">
        <TabsHeader tabs={tabs} />
        <DetailSection id="product-detail" product={product} />
        <GuideSection id="usage-guide" product={product} />
        <ReviewSection id="reviews" productId={product.id} />
        <QnASection id="question-answer" product={product} />
      </div>
    </div>
  );
}
