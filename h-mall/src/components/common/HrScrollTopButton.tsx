import { useEffect, useState } from 'react';
import ArrowUpSvg from '@/assets/icons/arrow-up.svg';

function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return show ? (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-ls-pink-default text-white shadow-lg flex items-center justify-center hover:bg-ls-pink-dark transition"
      aria-label="최상단 위로"
    >
      <ArrowUpSvg className="text-2xl" />
    </button>
  ) : null;
}

export default ScrollToTopButton;
