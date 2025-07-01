import type { Metadata } from 'next';
import { getUser, getProfileById } from '@/actions/auth/user.action';
import { Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './globals.css';
import { HrHeader } from '@/components/common/HrHeader';
import HrNav from '@/components/common/HrNav';
import QueryProvider from '@/components/provider/QueryProvider';
import ModalProvider from '@/components/provider/ModalProvider';
import UserStoreInitializer from '@/components/provider/UserStoreInitializer';

const notoSansKR = Noto_Sans_KR({
  subsets: ['cyrillic', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-notoSansKR',
});
const pretendard = localFont({
  src: '../assets/fonts/PretendardGOVVariable.woff2',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'H-Mall',
  description: '고민은 배송만 늦출 뿐. H-Mall.',
  openGraph: {
    title: 'H-Mall',
    description: '고민은 배송만 늦출 뿐. H-Mall.',
    images: ['/H-Mall-thumbnail.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser({ serverComponent: true });
  let profile = null;

  if (user) {
    profile = await getProfileById({ serverComponent: true, userId: user.id });
  }

  return (
    <html
      lang="ko"
      style={{ fontSize: '16px' }}
      className={`${pretendard.variable} ${notoSansKR.variable} h-full`}
    >
      <body className="h-full flex flex-col font-pretendard">
        <div className="h-full flex flex-col min-h-0">
          <QueryProvider>
            <ModalProvider>
              <UserStoreInitializer user={profile} />
              <HrHeader />
              <HrNav />
              {children}
            </ModalProvider>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
