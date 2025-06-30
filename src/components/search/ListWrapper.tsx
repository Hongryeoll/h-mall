'use client';

import { useSearchParams } from 'next/navigation';
import SearchList from '@/components/search/SearchList';

export default function ListWrapper() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';

  return (
    <>
      <h1 className="text-hr-h3 font-bold mb-4">
        <span className="text-primary">{`"${keyword}"`}</span> 검색 결과
      </h1>
      <SearchList keyword={keyword} />
    </>
  );
}
