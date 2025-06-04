'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MEGA_MENU } from '@/data/megaMenu';

export default function CategorySidebar() {
  const params = useSearchParams();
  const categoryKey = params.get('category') ?? '';
  const sectionSlug = params.get('section') ?? '';
  const subsectionSlug = params.get('subsection') ?? '';

  if (!categoryKey) return null;

  const megaKey = categoryKey.toUpperCase() as keyof typeof MEGA_MENU;
  const megaItem = MEGA_MENU[megaKey];
  if (!megaItem) return null;

  const currentSection = megaItem.sections.find(
    (sec) => sec.slug === sectionSlug
  );
  if (!currentSection) return null;

  return (
    <nav className="space-y-6 min-w-[200px] max-w-[260px] pr-4">
      <h2 className="text-xl font-bold border-b-2 pb-2">
        {currentSection.title}
      </h2>
      <ul className="flex flex-col gap-2">
        {currentSection.links.map(({ label, href, slug }) => {
          const queryString = href.split('?')[1] || '';
          const searchParams = new URLSearchParams(queryString);
          const hrefCategory = searchParams.get('category') ?? '';
          const hrefSection = searchParams.get('section') ?? '';
          const hrefSubsection = searchParams.get('subsection') ?? '';

          const isActive =
            hrefCategory === categoryKey &&
            hrefSection === sectionSlug &&
            hrefSubsection === subsectionSlug;

          return (
            <li key={slug}>
              <Link
                href={href}
                className={`block pl-2 transition-colors duration-200 ${
                  isActive
                    ? 'font-semibold text-hr-purple-default'
                    : 'text-hr-gray-50 hover:text-hr-gray-90'
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
