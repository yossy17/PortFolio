'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as Header from './Index';

// スクロールの閾値（px）
const SCROLL_THRESHOLD = 300;

const Top = () => {
  // ヘッダーの表示状態を管理
  const [isVisible, setIsVisible] = useState(true);

  // 最後のスクロール位置を記憶
  const lastScrollY = useRef(0);

  // スクロールイベントの連続発火を防ぐためのフラグ
  const ticking = useRef(false);

  // スクロールハンドラー
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < SCROLL_THRESHOLD) {
          // 閾値以下ならヘッダーを表示
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY.current) {
          // 下スクロール時はヘッダーを非表示
          setIsVisible(false);
        } else {
          // 上スクロール時はヘッダーを表示
          setIsVisible(true);
        }

        // 最後のスクロール位置を更新
        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });

      ticking.current = true;
    }
  }, []);

  // スクロールイベントリスナーの設定と解除
  useEffect(() => {
    // パッシブイベントリスナーを使用してパフォーマンスを向上
    window.addEventListener('scroll', handleScroll, { passive: true });

    // コンポーネントのアンマウント時にイベントリスナーを解除
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <header className={`header ${isVisible ? '' : 'header--hidden'}`}>
      <Header.HeaderMain />
      {/* <Header.HeaderNav /> */}
    </header>
  );
};

export default Top;
