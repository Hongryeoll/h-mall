import '@/app/globals.css';
import OverlayLogo from '@/components/loader/OverlayLogo';
import PromotionBanner from '@/components/promotion/PromotionBanner';

export default async function Home() {
  return (
    <>
      <OverlayLogo>
        <div className="p-4">
          <PromotionBanner />
          <div className="mt-10">home 화면 콘텐츠 추가 영역</div>
        </div>
      </OverlayLogo>
    </>
  );
}
