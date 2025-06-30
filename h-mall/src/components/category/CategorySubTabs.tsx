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
  const section = params.get('section');
  const selectedSub = params.get('sub') ?? 'all';
  const [open, setOpen] = useState(false);

  if (!category || !subsection) return null;

  const megaKey = category.toUpperCase() as keyof typeof SUB_TABS;
  const tabsForSection = SUB_TABS[megaKey]?.[subsection] || [];

  return (
    <div className="w-full">
      {/* 모바일 토글 */}
      <div className="block sm:hidden px-4 py-2 border-b border-hr-gray-20">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex justify-between items-center px-4 py-2 rounded-md bg-white"
        >
          <span className="truncate">
            {category} &gt; {section} &gt; <strong>{subsection}</strong>
          </span>
          {open ? (
            <UpSvg className="w-5 h-5 text-hr-gray-50" />
          ) : (
            <DownSvg className="w-5 h-5 text-hr-gray-50" />
          )}
        </button>

        {open && (
          <div className="mt-2 bg-white shadow-lg rounded-md z-20">
            <ul className="grid grid-cols-2 gap-2 text-hr-b4 p-4">
              {tabsForSection.map((tab) => (
                <li key={tab.slug}>
                  <Link
                    href={`/mall/category/list?category=${megaKey}&section=${section}&subsection=${subsection}&sub=${tab.slug}`}
                    className={`block px-2 py-1 rounded hover:bg-hr-gray-10 ${
                      tab.slug === selectedSub
                        ? 'font-semibold text-hr-purple-default'
                        : 'text-hr-gray-70'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {tab.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 데스크탑 탭 */}
      <ul className="hidden sm:flex flex-wrap items-center gap-4 px-4 py-2 border-b border-hr-gray-20 text-hr-b4">
        {tabsForSection.map((tab) => (
          <li key={tab.slug}>
            <Link
              href={`/mall/category/list?category=${megaKey}&section=${section}&subsection=${subsection}&sub=${tab.slug}`}
              className={`block px-2 py-1 rounded hover:bg-hr-gray-10 ${
                tab.slug === selectedSub
                  ? 'font-semibold text-hr-purple-default'
                  : 'text-hr-gray-70'
              }`}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
