'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SUB_TABS } from '@/data/megaSubmenu';

export default function CategorySubTabs() {
  const params = useSearchParams();
  const category = params.get('category');
  const section = params.get('section');
  const sub = params.get('sub');

  if (!category || !section || !sub) return null;

  const megaKey = category.toUpperCase() as keyof typeof SUB_TABS;
  const tabsForSection = SUB_TABS[megaKey]?.[sub] || [];

  return (
    <div className="border-b mb-6">
      <ul className="flex space-x-4 px-4">
        {tabsForSection.map((tab) => (
          <li key={tab.slug}>
            <Link
              href={`/mall/category/list?category=${megaKey}&section=${section}&sub=${tab.slug}`}
              className={`
                py-2
                ${
                  tab.slug === sub
                    ? 'border-b-2 border-hr-purple-default font-semibold text-hr-purple-default'
                    : 'text-hr-gray-600 hover:text-hr-gray-800'
                }
              `}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
