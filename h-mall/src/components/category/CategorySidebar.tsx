'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MEGA_MENU } from '@/data/megaMenu';

export default function CategorySidebar() {
  const params = useSearchParams();
  const categoryKey = params.get('category') ?? '';
  const sectionSlug = params.get('section') ?? '';

  if (!categoryKey) return null;

  const megaKey = categoryKey.toUpperCase() as keyof typeof MEGA_MENU;
  const megaItem = MEGA_MENU[megaKey];
  if (!megaItem) return null;

  const currentSection = megaItem.sections.find(
    (sec) => sec.slug === sectionSlug
  );
  if (!currentSection) return null;

  return (
    <nav className="space-y-6">
      <h2 className="text-xl font-bold border-b-2 pb-2">
        {currentSection.title}
      </h2>
      <ul className="flex flex-col gap-2">
        {currentSection.links.map(({ label, href, slug }) => {
          const isActive = href.includes(`section=${sectionSlug}`);
          return (
            <li key={slug}>
              <Link
                href={href}
                className={`block pl-2 ${
                  isActive
                    ? 'font-semibold text-hr-purple-default'
                    : 'text-hr-gray-70 hover:text-hr-gray-90'
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
