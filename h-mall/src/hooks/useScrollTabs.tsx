import { useCallback, useEffect, useState } from 'react';

type TProps = { tabs: { title: string; id: string }[]; offset?: number };

export const useScrollTabs = ({ tabs, offset = 0 }: TProps) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = useCallback(() => {
    const viewportHeight = window.innerHeight;

    const foundIdx = tabs.reduce((currentIdx, tab, i) => {
      const section = document.getElementById(tab.id);
      if (section) {
        const { top, height } = section.getBoundingClientRect();
        const isSectionVisible =
          top <= viewportHeight * 0.5 && top + height > 0;

        if (isSectionVisible) {
          return i;
        }
      }
      return currentIdx;
    }, 0);

    setActiveIdx(foundIdx);
  }, [tabs]);

  useEffect(() => {
    const debounceScroll = () => {
      clearTimeout((window as any)._scrollTimeout);
      (window as any)._scrollTimeout = setTimeout(handleScroll, 100);
    };

    handleScroll(); // 초기 상태 확인
    window.addEventListener('scroll', debounceScroll);

    return () => {
      clearTimeout((window as any)._scrollTimeout);
      window.removeEventListener('scroll', debounceScroll);
    };
  }, [handleScroll]);

  const handleTabClick = (index: number) => {
    const section = document.getElementById(tabs[index].id);
    if (section) {
      const sectionTop =
        section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth',
      });
    }
  };

  return { activeIdx, setActiveIdx, handleTabClick };
};
