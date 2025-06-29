'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/search/Input';
import Suggestion from '@/components/search/Suggestion';
import XSVG from '@/assets/icons/x.svg';

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (keyword.trim() !== '') {
      router.push(`/mall/search?keyword=${encodeURIComponent(keyword)}`);
      onClose();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    router.push(`/mall/search?keyword=${encodeURIComponent(suggestion)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50"
        aria-label="close"
      >
        <XSVG width={38} height={38} />
      </button>

      {/* Header */}
      <div className="px-6 pt-10 pb-4 mt-16 border-b border-black">
        <Input
          keyword={keyword}
          setKeyword={setKeyword}
          onSearch={handleSearch}
        />
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto">
        <Suggestion
          keyword={keyword}
          onClickSuggestion={handleSuggestionClick}
        />
      </div>
    </div>
  );
}
