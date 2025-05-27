'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function OverlayLogo({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [childrenReady, setChildrenReady] = useState<boolean>(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('seenOverlayLogo');
    if (!seen) {
      setIsFirstVisit(true);
      setShowOverlay(true);

      const timer = setTimeout(() => {
        setShowOverlay(false);
        sessionStorage.setItem('seenOverlayLogo', 'true');
        setChildrenReady(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // 재방문이니까 바로 children 렌더
      setIsFirstVisit(false);
      setChildrenReady(true);
    }
  }, []);

  return (
    <>
      {/* Logo Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2 }}
          >
            <Image
              src="/images/h_logo.png"
              alt="logo"
              width={120}
              height={70}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Children content */}
      {childrenReady &&
        (isFirstVisit ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {children}
          </motion.div>
        ) : (
          <>{children}</>
        ))}
    </>
  );
}
