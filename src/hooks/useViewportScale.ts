"use client";

import { type RefObject, useState, useEffect, useCallback, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { computeScaleFactor } from "@/lib/scaleUtils";

// ── 2.1: 인터페이스 정의 ──

export interface ViewportScaleConfig {
  /** 기준 너비 (기본값: 1440) */
  baseWidth?: number;
  /** 최소 scale 비율 (기본값: 0.25, 즉 360px) */
  minScale?: number;
  /** scale 적용 대상 wrapper ref */
  wrapperRef: RefObject<HTMLDivElement | null>;
  /** 모바일 기준 너비 (뷰포트 < mobileBreakpoint일 때 baseWidth 대신 사용) */
  mobileBaseWidth?: number;
  /** 모바일 최소 scale 비율 */
  mobileMinScale?: number;
  /** 모바일/데스크톱 분기점 (기본값: 640) */
  mobileBreakpoint?: number;
}

export interface ViewportScaleResult {
  /** 현재 scale factor (0.25 ~ 1.0) */
  scaleFactor: number;
  /** scale 적용 여부 (factor < 1.0일 때 true) */
  isScaled: boolean;
}

/**
 * 뷰포트 너비에 따라 scale factor를 계산하고,
 * wrapper 요소에 transform / 스크롤 높이 보정 / CSS 변수 / GPU 힌트를 직접 적용하는 훅.
 *
 * React state는 scaleFactor, isScaled만 관리하며,
 * 나머지는 DOM 직접 조작으로 처리한다.
 */
export function useViewportScale(config: ViewportScaleConfig): ViewportScaleResult {
  const {
    baseWidth = 1440,
    minScale = 0.25,
    wrapperRef,
    mobileBaseWidth,
    mobileMinScale,
    mobileBreakpoint = 640,
  } = config;

  // ── 2.1: SSR 안전 기본값 ──
  const [scaleFactor, setScaleFactor] = useState(1);
  const rafIdRef = useRef<number | null>(null);
  const lastVwRef = useRef<number | null>(null);

  // ── 핵심 업데이트 함수: DOM 직접 조작 ──
  const applyScale = useCallback(() => {
    if (typeof window === "undefined") return;

    const vw = window.innerWidth;
    // 모바일 주소창 표시/숨김으로 인한 height-only resize는 무시
    // (transform/ScrollTrigger.refresh 재실행이 pin 스크롤을 뒤로 밀어버림)
    if (lastVwRef.current === vw) return;
    lastVwRef.current = vw;
    const isMobile = mobileBaseWidth !== undefined && vw < mobileBreakpoint;
    const effectiveBaseWidth = isMobile ? mobileBaseWidth : baseWidth;
    const effectiveMinScale = isMobile ? (mobileMinScale ?? minScale) : minScale;
    const factor = computeScaleFactor(vw, effectiveBaseWidth, effectiveMinScale);

    setScaleFactor(factor);

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const isScaled = factor < 1.0;

    // ── 2.5: GPU 가속 + transform 적용 ──
    if (isScaled) {
      wrapper.style.width = `${effectiveBaseWidth}px`;
      wrapper.style.transformOrigin = "top left";
      wrapper.style.transform = `scale(${factor})`;
      wrapper.style.willChange = "transform";
    } else {
      wrapper.style.width = "100%";
      wrapper.style.transformOrigin = "";
      wrapper.style.transform = "none";
      wrapper.style.willChange = "auto";
    }

    // ── 2.2: 스크롤 높이 보정 ──
    const outer = wrapper.parentElement;
    if (outer) {
      if (isScaled) {
        const corrected = Math.round(wrapper.scrollHeight * factor);
        outer.style.height = `${corrected}px`;
      } else {
        outer.style.height = "";
      }
    }

    // ── 2.2: wrapper sticky 배치 ──
    wrapper.style.position = "sticky";
    wrapper.style.top = "0";

    // ── 2.4: CSS 커스텀 속성 전파 ──
    document.documentElement.style.setProperty("--scale-factor", String(factor));
    document.documentElement.style.setProperty("--scale-inverse", String(1 / factor));

    // ── 2.2: ScrollTrigger.refresh() (double-rAF) ──
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  }, [baseWidth, minScale, wrapperRef, mobileBaseWidth, mobileMinScale, mobileBreakpoint]);

  // ── 2.3: 리사이즈 대응 (rAF 스로틀링) ──
  const handleResize = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      applyScale();
    });
  }, [applyScale]);

  useEffect(() => {
    // 초기 적용
    handleResize();

    // resize 리스너 등록
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [applyScale, handleResize]);

  return {
    scaleFactor,
    isScaled: scaleFactor < 1,
  };
}
