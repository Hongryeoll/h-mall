import { useCallback, useEffect, useRef, useState } from 'react';

type Props = { tabs: { title: string; id: string }[]; offset?: number };

export const useScrollTabs = ({ tabs, offset = 0 }: Props) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollTimeoutRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    const viewportHeight = window.innerHeight;

    const foundIdx = tabs.reduce((currentIdx, tab, i) => {
      const section = document.getElementById(tab.id);
      if (section) {
        const { top, height } = section.getBoundingClientRect();
        const isVisible = top <= viewportHeight * 0.5 && top + height > 0;
        if (isVisible) return i;
      }
      return currentIdx;
    }, 0);

    setActiveIdx(foundIdx);
  }, [tabs]);

  useEffect(() => {
    const debounceScroll = () => {
      // 기존 타이머가 있으면 클리어
      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }
      // 새 타이머 등록 (window.setTimeout은 number 반환)
      scrollTimeoutRef.current = window.setTimeout(handleScroll, 100);
    };

    // 초기 상태 체크
    handleScroll();
    window.addEventListener('scroll', debounceScroll);

    return () => {
      // 언마운트 시 정리
      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }
      window.removeEventListener('scroll', debounceScroll);
    };
  }, [handleScroll]);

  const handleTabClick = (index: number) => {
    const section = document.getElementById(tabs[index].id);
    if (section) {
      const top =
        section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return { activeIdx, setActiveIdx, handleTabClick };
};