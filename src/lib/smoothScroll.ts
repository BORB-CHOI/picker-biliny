"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

/**
 * GSAP ScrollToPlugin 기반 부드러운 스크롤.
 * 네이티브 `scroll-behavior: smooth`는 ScrollTrigger pin과 충돌해
 * "가다가 멈춤" 현상을 일으키므로 anchor navigation은 이 함수를 통해 수행한다.
 */
export function smoothScrollTo(href: string, offsetY = 0) {
  // 네이티브 CSS smooth scroll이 켜져 있으면 GSAP scrollTo와 경쟁하면서
  // "가다가 멈춤" 현상이 발생한다. 애니메이션 동안만 auto로 강제 후 복원.
  const html = document.documentElement;
  const original = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  const restore = () => {
    html.style.scrollBehavior = original;
  };

  if (href === "#") {
    gsap.to(window, {
      duration: 0.6,
      scrollTo: { y: 0 },
      ease: "power3.out",
      onComplete: restore,
      onInterrupt: restore,
    });
    return;
  }
  const target = document.querySelector(href);
  if (!target) {
    restore();
    return;
  }
  gsap.to(window, {
    duration: 0.6,
    scrollTo: { y: target as Element, offsetY },
    ease: "power3.out",
    onComplete: restore,
    onInterrupt: restore,
  });
}

/** 현재 fixed header의 실제 높이 (offset 계산용) */
export function getHeaderOffset(): number {
  const header = document.querySelector("header");
  return (header as HTMLElement | null)?.offsetHeight ?? 0;
}
