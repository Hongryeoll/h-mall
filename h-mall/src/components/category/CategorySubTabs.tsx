'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SUB_TABS } from '@/data/megaSubmenu';

export default function CategorySubTabs() {
  const params = useSearchParams();
  const category = params.get('category');
  const subsection = params.get('subsection');
  const selectedSub = params.get('sub') ?? 'all';

  if (!category || !subsection) return null;

  const megaKey = category.toUpperCase() as keyof typeof SUB_TABS;
  const tabsForSection = SUB_TABS[megaKey]?.[subsection] || [];

  return (
    <div className="border-b mb-6 w-full max-w-[840px] mx-auto">
      <ul className="flex flex-wrap items-center px-3 py-1 text-sm">
        {tabsForSection.map((tab, index) => (
          <li key={tab.slug} className="inline-flex items-center">
            <Link
              href={`/mall/category/list?category=${megaKey}&section=${params.get('section')}&subsection=${subsection}&sub=${tab.slug}`}
              className={`
                inline-block px-1.5 py-0.5 transition-colors
                ${
                  tab.slug === selectedSub
                    ? 'font-semibold text-hr-purple-default'
                    : 'text-hr-gray-50 hover:text-hr-gray-90'
                }
              `}
            >
              {tab.label}
            </Link>
            {index < tabsForSection.length - 1 && (
              <span className="mx-2 text-hr-gray-20">|</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}