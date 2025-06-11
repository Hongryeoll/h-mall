// import HrScrollTopButton from '@/components/common/HrScrollTopButton';
import ProductInfo from '@/components/catalog/ProductInfo';
import ProductTabsHeader from '@/components/catalog/ProductTabsHeader';
import ProductDetailSection from '@/components/catalog/ProductDetailSection';
import ProductGuideSection from '@/components/catalog/ProductGuideSection';
import ProductQnASection from '@/components/catalog/ProductQnASection';

const tabs = [
  { title: '상품상세', id: 'product-detail' },
  { title: '상품안내', id: 'usage-guide' },
  { title: '리뷰', id: 'reviews' },
  { title: 'Q&A', id: 'question-answer' },
];

export default function CatalogPage() {
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* <HrScrollTopButton /> */}
      {/* productInfo START */}
      <ProductInfo />
      {/* productInfo END */}

      <div className="relative">
        {/* productTabsHeader START */}
        <ProductTabsHeader tabs={tabs} />
        {/* productTabsHeader END */}
        {/* productDetail Section START */}
        <ProductDetailSection id="product-detail" />
        {/* productDetail Section END*/}

        {/* productGuide Section START */}
        <ProductGuideSection id="usage-guide" />
        {/* productGuide Section END*/}

        {/* productReview Section START */}
        <ProductGuideSection id="reviews" />
        {/* productReview Section END*/}

        {/* productQ&A Section START */}
        <ProductQnASection id="question-answer" />
        {/* productQ&A Section END*/}
      </div>
    </div>
  );
}
