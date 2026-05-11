'use client';

import { useRef, useEffect, useCallback } from 'react';
import { computeScaleFactor } from '@/lib/scaleUtils';

interface ZoomWrapperProps {
  children: React.ReactNode;
  baseWidth?: number;
  minScale?: number;
  mobileBaseWidth?: number;
  mobileMinScale?: number;
  mobileBreakpoint?: number;
}

/**
 * CSS zoom 기반 뷰포트 비례 축소 래퍼.
 *
 * transform: scale()과 달리 zoom은 containing block을 생성하지 않으므로
 * 내부 position: sticky가 정상 동작한다.
 *
 * - width를 baseWidth(1440px)로 고정
 * - zoom = viewportWidth / baseWidth로 축소
 * - container-type: inline-size로 cqw가 1440px 기준
 */
export function ZoomWrapper({
  children,
  baseWidth = 1440,
  minScale = 0.25,
  mobileBaseWidth,
  mobileMinScale,
  mobileBreakpoint = 640,
}: ZoomWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastVwRef = useRef<number | null>(null);

  const applyZoom = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const vw = window.innerWidth;
    // 모바일 주소창 표시/숨김으로 인한 height-only resize는 무시
    if (lastVwRef.current === vw) return;
    lastVwRef.current = vw;
    const isMobile = mobileBaseWidth !== undefined && vw < mobileBreakpoint;
    const effectiveBaseWidth = isMobile ? mobileBaseWidth : baseWidth;
    const effectiveMinScale = isMobile ? (mobileMinScale ?? minScale) : minScale;
    const factor = computeScaleFactor(vw, effectiveBaseWidth, effectiveMinScale);

    if (factor < 1.0) {
      wrapper.style.width = `${effectiveBaseWidth}px`;
      wrapper.style.zoom = String(factor);
      wrapper.style.setProperty('--zoom-inverse', String(1 / factor));
    } else {
      wrapper.style.width = '100%';
      wrapper.style.zoom = '1';
      wrapper.style.setProperty('--zoom-inverse', '1');
    }
  }, [baseWidth, minScale, mobileBaseWidth, mobileMinScale, mobileBreakpoint]);

  useEffect(() => {
    applyZoom();
    window.addEventListener('resize', applyZoom);
    return () => window.removeEventListener('resize', applyZoom);
  }, [applyZoom]);

  return (
    <div className="overflow-x-clip">
      <div
        ref={wrapperRef}
        style={{ containerType: 'inline-size' }}
      >
        {children}
      </div>
    </div>
  );
}
