'use client';

import { usePathname, useRouter } from 'next/navigation';

type Props = {
  tabs: { title: string; link?: string }[];
  activeIdx?: number;
  onClick?: (e: React.MouseEvent<HTMLElement>, i: number) => void;
};

const activeTabClasses =
  'border-b-2 text-hr-purple-default font-hr-semi-bold border-hr-purple-default';
const normalTabClasses = 'text-hr-gray-50 border-b border-hr-gray-20 pb-[1px]';

export const HrTabs = ({ tabs, activeIdx, onClick }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const getTabClasses = (index: number, link?: string) => {
    if (link) {
      return link === pathname ? activeTabClasses : normalTabClasses;
    }
    return activeIdx === index ? activeTabClasses : normalTabClasses;
  };

  return (
    <div className="flex leading-[48px] min-h-[50px] overflow-x-auto bg-hr-white">
      {tabs.map((tab, i) => (
        <div
          key={i}
          onClick={(e) => {
            if (tab.link) router.push(tab.link);
            if (onClick) {
              onClick(e, i);
            }
          }}
          className={`flex-1 text-center text-hr-b4 px-2 whitespace-nowrap cursor-pointer ${getTabClasses(
            i,
            tab.link
          )}`}
        >
          {tab.title}
        </div>
      ))}
    </div>
  );
};
