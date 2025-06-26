'use client';

import { useScrollTabs } from '@/hooks/useScrollTabs';
import { HrTabs } from '@/components/common/HrTabs';

interface Props {
  tabs: { title: string; id: string }[];
}

export default function TabsHeader({ tabs }: Props) {
  const { activeIdx, handleTabClick } = useScrollTabs({ tabs, offset: 50 });

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-hr-gray-20">
      <HrTabs
        tabs={tabs}
        activeIdx={activeIdx}
        onClick={(e, i) => handleTabClick(i)}
      />
    </div>
  );
}
