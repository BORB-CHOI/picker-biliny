'use client';

import { useRef } from 'react';
import { useViewportScale } from '@/hooks/useViewportScale';

interface ScaleWrapperProps {
  children: React.ReactNode;
}

/**
 * 1440px 기준 디자인을 뷰포트 너비에 비례하여 축소하는 최상위 래퍼.
 *
 * - outer div: 스크롤 높이 보정용 컨테이너 (훅이 height를 직접 조작)
 * - inner div: transform 적용 대상 (훅이 scale/width/position을 직접 조작)
 *
 * SSR 시에는 transform 없는 기본 상태로 렌더링된다.
 */
export function ScaleWrapper({ children }: ScaleWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useViewportScale({
    baseWidth: 1440,
    minScale: 0.25,
    wrapperRef,
  });

  return (
    <div className="relative w-full overflow-x-clip">
      <div ref={wrapperRef}>
        {children}
      </div>
    </div>
  );
}
