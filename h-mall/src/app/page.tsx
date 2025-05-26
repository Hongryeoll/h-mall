import '@/app/globals.css';
import OverlayLogo from '@/components/Loader/OverlayLogo';

export default async function Home() {
  return (
    <>
      <OverlayLogo>
        <div className="p-4">home화면</div>
      </OverlayLogo>
    </>
  );
}
