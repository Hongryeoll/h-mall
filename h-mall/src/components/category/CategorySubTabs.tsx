'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SUB_TABS } from '@/data/megaSubmenu';
import UpSvg from '@/assets/icons/chevron-up.svg';
import DownSvg from '@/assets/icons/chevron-down.svg';

export default function CategorySubTabs() {
  const params = useSearchParams();
  const category = params.get('category');
  const subsection = params.get('subsection');
  const selectedSub = params.get('sub') ?? 'all';
  const [open, setOpen] = useState(false);

  if (!category || !subsection) return null;

  const megaKey = category.toUpperCase() as keyof typeof SUB_TABS;
  const tabsForSection = SUB_TABS[megaKey]?.[subsection] || [];

  return (
    <div className="border-b-0 sm:border-b w-full max-w-[450px] sm:max-w-none px-5 p-2">
      <div className="sm:hidden relative flex items-center">
        <ul
          className={`
            flex items-center whitespace-nowrap
            overflow-hidden flex-1
            sm:overflow-visible sm:whitespace-normal sm:flex-wrap
          `}
        >
          {tabsForSection.map((tab, idx) => (
            <li key={tab.slug} className="inline-flex items-center">
              <Link
                href={`/mall/category/list?category=${megaKey}&section=${params.get('section')}&subsection=${subsection}&sub=${tab.slug}`}
                className={`inline-block px-1.5 py-0.5 transition-colors ${
                  tab.slug === selectedSub
                    ? 'font-semibold text-hr-purple-default'
                    : 'text-hr-gray-50 hover:text-hr-gray-90'
                }`}
              >
                {tab.label}
              </Link>
              {idx < tabsForSection.length - 1 && (
                <span className="mx-2 text-hr-gray-20 hidden sm:inline">|</span>
              )}
            </li>
          ))}
        </ul>

        {/* 토글버튼: mobile */}
        <div className="border-b mb-4 w-full pb-2">
          <div className="sm:hidden">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="w-full flex justify-between items-center py-2 text-sm bg-white"
            >
              <span>
                {category} &gt; {params.get('section')} &gt;{' '}
                <strong>{subsection}</strong>
              </span>
              {open ? <UpSvg /> : <DownSvg />}
            </button>
          </div>
        </div>

        {/* 드롭다운: mobile */}
        {open && (
          <div className="absolute top-full left-0 right-0 bg-white shadow mt-1 p-3 z-10">
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {tabsForSection.map((tab) => (
                <li key={tab.slug}>
                  <Link
                    href={`/mall/category/list?category=${megaKey}&section=${params.get('section')}&subsection=${subsection}&sub=${tab.slug}`}
                    className="block px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    {tab.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ul className="hidden sm:flex flex-wrap items-center gap-4 px-4 py-2 text-sm">
        {tabsForSection.map((tab) => (
          <li key={tab.slug}>
            <Link
              href={`/mall/category/list?category=${megaKey}&section=${params.get('section')}&subsection=${subsection}&sub=${tab.slug}`}
              className="block px-2 py-1 hover:bg-gray-100 rounded"
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
