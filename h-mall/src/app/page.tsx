import '@/app/globals.css';
import OverlayLogo from '@/components/loader/OverlayLogo';
import PromotionBanner from '@/components/home/PromotionBanner';
import ProductRecommendation from '@/components/home/ProductRecommendation';

export default async function Home() {
  return (
    <>
      <OverlayLogo>
        <div className="p-4">
          <PromotionBanner />
          <div className="mt-10">
            <ProductRecommendation title="MEN 상품 추천" categorySlug="men" />
            <ProductRecommendation
              title="WOMEN 상품 추천"
              categorySlug="women"
            />
            <ProductRecommendation
              title="INTERIOR 상품 추천"
              categorySlug="interior"
            />
            <ProductRecommendation
              title="KITCHEN 상품 추천"
              categorySlug="kitchen"
            />
          </div>
        </div>
      </OverlayLogo>
    </>
  );
}
