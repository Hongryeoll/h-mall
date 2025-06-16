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
    <div className="border-b mb-6 w-full max-w-[450px] md:max-w-none px-5">
      <div className="relative flex items-center">
        <ul
          className={`
            flex items-center whitespace-nowrap
            overflow-hidden flex-1
            md:overflow-visible md:whitespace-normal md:flex-wrap
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
                <span className="mx-2 text-hr-gray-20 hidden md:inline">|</span>
              )}
            </li>
          ))}
        </ul>

        {/* 토글버튼: mobile */}
        <button
          type="button"
          className="ml-2 p-2 rounded md:hidden hover:bg-gray-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="서브탭 토글"
        >
          {open ? <UpSvg /> : <DownSvg />}
        </button>

        {/* 드롭다운: mobile */}
        {open && (
          <div className="absolute top-full left-0 right-0 bg-white shadow mt-1 p-3 z-10">
            <ul className="flex flex-col gap-2">
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
    </div>
  );
}
