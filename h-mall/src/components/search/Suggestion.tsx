'use client';

import { useState } from 'react';
import { popularKeywords } from '@/data/keywords/popularKeywords';
import { autoSuggestions } from '@/data/keywords/autoSuggestion';
import { relatedKeywords } from '@/data/keywords/relatedKeywords';

type Props = {
  keyword: string;
  onClickSuggestion: (suggestion: string) => void;
};

export default function Suggestion({ keyword, onClickSuggestion }: Props) {
  const tabs = ['추천', '인기', '연관'];
  const [activeTab, setActiveTab] = useState('추천');

  const filteredAutoSuggestions = autoSuggestions.filter((s) =>
    s.includes(keyword)
  );

  const currentList = (() => {
    if (activeTab === '추천') {
      return keyword ? filteredAutoSuggestions : [];
    }
    if (activeTab === '인기') {
      return popularKeywords;
    }
    if (activeTab === '연관') {
      return keyword ? relatedKeywords[keyword] || [] : [];
    }
    return [];
  })();

  return (
    <div className="p-4">
      {/* 탭 버튼 */}
      <div className="flex gap-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${
              activeTab === tab ? 'text-primary font-semibold' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 검색어 리스트 */}
      {currentList.length === 0 ? (
        <div className="text-gray-400">결과가 없습니다.</div>
      ) : (
        <ul className="space-y-3">
          {currentList.map((item) => (
            <li
              key={item}
              className="text-hr-b2 cursor-pointer hover:underline"
              onClick={() => onClickSuggestion(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
