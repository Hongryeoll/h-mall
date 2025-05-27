// src/components/common/HrNav.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MEGA_MENU } from '@/data/megaMenu';

export default function HrNav() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const keys = Object.keys(MEGA_MENU) as (keyof typeof MEGA_MENU)[];

  const handleNavLeave = () => setOpenKey(null);

  return (
    <nav className="relative bg-white border-b" onMouseLeave={handleNavLeave}>
      <ul className="flex space-x-6 px-4 py-3 max-w-screen-xl mx-auto">
        {keys.map((key) => (
          <li
            key={key}
            className="cursor-pointer"
            onMouseEnter={() => setOpenKey(key)}
          >
            <button className="font-semibold hover:text-primary">
              {MEGA_MENU[key].title}
            </button>
          </li>
        ))}
      </ul>

      {openKey && (
        <div className="absolute inset-x-0 top-full bg-white shadow-lg z-50 max-h-80 overflow-y-auto">
          <div
            className={`
              mx-auto max-w-screen-xl p-6
              ${
                openKey === 'INTERIOR' || openKey === 'KITCHEN'
                  ? 'columns-2 gap-8' /* 두 칼럼으로 분할 */
                  : 'grid grid-cols-4 gap-8'
              }   /* 일반 그리드 레이아웃 유지 */
            `}
          >
            {MEGA_MENU[openKey].sections.map((section) => (
              <div
                key={section.title}
                className="break-inside-avoid-column mb-6"
              >
                <h4 className="font-bold mb-2">{section.title}</h4>
                <ul className="space-y-1">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="block text-sm hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
