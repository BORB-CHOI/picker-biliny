import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * 전역 애니메이션 시퀀스 관리
 *
 * ┌─────────────────────────────────────────────────┐
 * │  intro  →  header  →  hero                      │
 * │                                                  │
 * │  IntroAnimation 완료                             │
 * │    → Header 위에서 슬라이드 다운                  │
 * │      → HeroSection 워드마크 마스크 리빌 + 콘텐츠  │
 * └─────────────────────────────────────────────────┘
 *
 * 사용법:
 *   선행 컴포넌트: phase.intro.emit()  (onComplete 콜백에서)
 *   후행 컴포넌트: phase.header.on(callback)
 */

function createPhase(name: string) {
  const event = `phase:${name}`;
  let fired = false;
  return {
    /** 이 단계 완료를 알림 — 다음 단계 시작 트리거 */
    emit: () => {
      fired = true;
      window.dispatchEvent(new CustomEvent(event));
    },
    /** 이 단계 완료 신호를 구독 — 이미 emit된 경우 즉시 콜백 실행 (래치) */
    on: (cb: () => void) => {
      if (fired) {
        cb();
        return () => {};
      }
      window.addEventListener(event, cb, { once: true });
      return () => window.removeEventListener(event, cb);
    },
  };
}

export const phase = {
  /** IntroAnimation 완료 → Header 시작 */
  intro: createPhase("intro"),
  /** Header 슬라이드 다운 완료 → HeroSection 시작 */
  header: createPhase("header"),
  /** HeroSection 등장 완료 → 이후 섹션 스크롤 애니메이션 활성화 */
  hero: createPhase("hero"),
} as const;

/**
 * 인트로~히어로 진입 전까지 스크롤 잠금
 * 클라이언트 컴포넌트의 useEffect에서 호출해야 hydration mismatch 방지
 *
 * - scrollTo(0,0): 브라우저 스크롤 복원(F5 새로고침 시)을 무력화
 * - scrollRestoration: 히스토리 API 수준에서 복원 차단
 * - phase.header 후 ScrollTrigger.refresh(): 모든 섹션의 ScrollTrigger가
 *   rAF에서 생성된 후(double-rAF) 위치를 재계산하여 조기 발동 방지
 */
export function lockScrollUntilHero() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";
  phase.header.on(() => {
    document.body.style.overflow = "";
    // double-rAF: 모든 섹션이 첫 rAF에서 ScrollTrigger를 생성한 뒤,
    // 두 번째 rAF에서 refresh하여 pin spacer 포함 위치를 재계산
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  });
}
