'use client';

import { useState } from 'react';
import Input from '@/components/search/Input';
import Suggestion from '@/components/search/Suggestion';
import XSVG from '@/assets/icons/x.svg';

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [keyword, setKeyword] = useState('');

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
        <Input keyword={keyword} setKeyword={setKeyword} />
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto">
        <Suggestion keyword={keyword} />
      </div>
    </div>
  );
}
