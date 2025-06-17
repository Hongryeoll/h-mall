// import HrScrollTopButton from '@/components/common/HrScrollTopButton';
import ProductInfo from '@/components/catalog/ProductInfo';
import ProductTabsHeader from '@/components/catalog/ProductTabsHeader';
import ProductDetailSection from '@/components/catalog/ProductDetailSection';
import ProductGuideSection from '@/components/catalog/ProductGuideSection';
import ProductQnASection from '@/components/catalog/ProductQnASection';
import { getProductById } from '@/actions/product/product.action';

const tabs = [
  { title: '상품상세', id: 'product-detail' },
  { title: '상품안내', id: 'usage-guide' },
  { title: '리뷰', id: 'reviews' },
  { title: 'Q&A', id: 'question-answer' },
];

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* <HrScrollTopButton /> */}
      {/* productInfo START */}
      <ProductInfo product={product} />
      {/* productInfo END */}

      <div className="relative">
        {/* productTabsHeader START */}
        <ProductTabsHeader tabs={tabs} />
        {/* productTabsHeader END */}
        {/* productDetail Section START */}
        <ProductDetailSection id="product-detail" product={product} />
        {/* productDetail Section END*/}

        {/* productGuide Section START */}
        <ProductGuideSection id="usage-guide" product={product} />
        {/* productGuide Section END*/}

        {/* productQ&A Section START */}
        <ProductQnASection id="question-answer" />
        {/* productQ&A Section END*/}
      </div>
    </div>
  );
}
