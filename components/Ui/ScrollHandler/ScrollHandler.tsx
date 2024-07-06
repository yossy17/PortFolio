'use client';

import React, { useState, useEffect, useCallback, useRef, ReactNode } from 'react';

// スクロールの閾値（px）
const SCROLL_THRESHOLD = 299;

// プロパティの型定義
interface ScrollHandlerProps {
  children: (isVisible: boolean) => ReactNode;
}

const ScrollHandler: React.FC<ScrollHandlerProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // スクロールハンドラー
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < SCROLL_THRESHOLD) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });

      ticking.current = true;
    }
  }, []);

  // スクロールイベントリスナーの設定と解除
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return <>{children(isVisible)}</>;
};

export default ScrollHandler;
