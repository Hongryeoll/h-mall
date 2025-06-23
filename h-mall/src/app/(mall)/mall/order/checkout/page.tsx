import { Suspense } from 'react';
import CheckoutInfo from '@/components/chekout/CheckoutInfo';

export default function Checkout() {
  return (
    <>
      <Suspense fallback={<div className="p-6 text-center">로딩 중…</div>}>
        <CheckoutInfo />
      </Suspense>
    </>
  );
}
