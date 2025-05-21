'use client';

import { HrButton } from '@/components/common/HrButton';
import { ROUTES } from '@/types/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex-1 flex flex-col justify-center items-cetner">
        <div className="mb-6 flex justify-center">
          {/* <Image
            src="/images/404.png"
            alt="404"
            width={240}
            height={135}
            priority
          /> */}
        </div>
        <div className="text-center flex flex-col gap-2">
          <h5 className="font-ls-semi-bold text-ls-h5 text-ls-gray-90">
            페이지를 찾을 수 없습니다.
          </h5>
          <p className="text-ls-gray-50 text-ls-b5">
            존재하지 않는 주소를 입력하셨거나,
            <br />
            요청하신 페이지의 주소가 변경, 삭제되어
            <br />
            찾을 수 없습니다.
          </p>
        </div>
      </div>
      <div className="px-4 pb-3">
        <HrButton
          text="홈 바로가기"
          size="xl"
          onClick={() => router.push(ROUTES.MALL)}
        />
      </div>
    </div>
  );
}
