"use client";

import dynamic from "next/dynamic";

const MOBILE_BREAKPOINT = 640;

/**
 * 뷰포트 폭에 따라 모바일/데스크톱 인트로를 분기.
 *
 * 두 컴포넌트 모두 ssr:false로 클라이언트에서만 마운트한다.
 * SSR에서 데스크톱을 미리 마운트했다가 hydration 시 모바일로 교체되는
 * 이중 마운트를 방지 — 이중 마운트는 GSAP 타임라인 누적/프리로드 누적으로
 * 새로고침마다 점점 끊기는 문제를 유발한다.
 *
 * 분기는 dynamic import 콜백 내부에서 한 번만 결정되며, 결정된 청크 하나만 로드된다.
 *
 * 프리페치: 모듈 로드 시점에 두 청크 모두 백그라운드로 fetch만 해두어
 * dynamic() 콜백 실행 시 네트워크 대기 없이 즉시 평가되도록 함.
 * (다운로드는 미리, 파싱/평가는 dynamic 콜백 시점)
 */
// 모듈 평가 시점에 분기 결정 후 즉시 prefetch 시작 — dynamic() 콜백 시점에는 캐시 hit
const variantPromise =
  typeof window !== "undefined"
    ? window.innerWidth < MOBILE_BREAKPOINT
      ? import("./IntroAnimation.mobile").then((m) => m.IntroAnimationMobile)
      : import("./IntroAnimation.desktop").then((m) => m.IntroAnimationDesktop)
    : null;

const IntroAnimationVariant = dynamic(
  async () => {
    if (variantPromise) return variantPromise;
    // SSR fallback (실제로는 ssr:false라 도달 안 함)
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (isMobile) {
      const mod = await import("./IntroAnimation.mobile");
      return mod.IntroAnimationMobile;
    }
    const mod = await import("./IntroAnimation.desktop");
    return mod.IntroAnimationDesktop;
  },
  { ssr: false },
);

export function IntroAnimation() {
  return <IntroAnimationVariant />;
}
