'use client';

import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMainContentReady } from '@/lib/animationState';
import {
  buildEnterStart,
  isScrollMarkerEnabled,
  resolveAnimationTargets,
  resolveVisualTrigger,
} from '@/lib/scrollTriggerUtils';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_PRODUCT_ANIM_START = buildEnterStart(0.05);

type ProductAnimationOptions = {
  start?: string;
};

/**
 * 제품 섹션 공용 스크롤 애니메이션 훅.
 *
 * `.b-reveal` — clip-path 텍스트 리빌
 * `.b-fade`   — 단순 fade up
 * `.b-from-left` / `.b-from-right` — 좌우 슬라이드인 + 패럴랙스
 * `.b-scale`  — 스케일 등장
 * `.b-stagger` — 순차 등장 (feature 목록)
 *
 * 메인 콘텐츠 준비(onMainContentReady) 이후 double-rAF에서 ScrollTrigger를 생성하여
 * Hero pin 유무와 무관하게 위치 계산을 안정화한다.
 */
export function useProductAnimations(
  sectionRef: RefObject<HTMLElement | null>,
  options: ProductAnimationOptions = {},
) {
  const start = options.start ?? DEFAULT_PRODUCT_ANIM_START;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const showMarkers = isScrollMarkerEnabled();

      const revealTargets = resolveAnimationTargets(section, '.b-reveal');
      const fadeTargets = resolveAnimationTargets(section, '.b-fade');
      const fromLeftTargets = resolveAnimationTargets(section, '.b-from-left');
      const fromRightTargets = resolveAnimationTargets(section, '.b-from-right');
      const scaleTargets = resolveAnimationTargets(section, '.b-scale');
      const staggerTargets = resolveAnimationTargets(section, '.b-stagger');

      /* ── 초기 상태: 즉시 숨김 ── */
      gsap.set(revealTargets, {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0,
      });
      gsap.set(fadeTargets, {
        y: 40,
        opacity: 0,
      });
      gsap.set(fromLeftTargets, {
        xPercent: -40,
        opacity: 0,
      });
      gsap.set(fromRightTargets, {
        xPercent: 40,
        opacity: 0,
      });
      gsap.set(scaleTargets, {
        scale: 0.92,
        opacity: 0,
      });

      const animations: gsap.core.Animation[] = [];
      let firstRafId: number;
      let secondRafId: number;

      const unsubscribe = onMainContentReady(() => {
        firstRafId = requestAnimationFrame(() => {
          secondRafId = requestAnimationFrame(() => {
          /* ── 텍스트 clip-path 리빌 ── */
          revealTargets.forEach((el) => {
            const triggerEl = resolveVisualTrigger(el);
            const animation = gsap.to(el, {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: triggerEl, start, markers: showMarkers },
            });
            animations.push(animation);
          });

          /* ── 단순 fade up ── */
          fadeTargets.forEach((el) => {
            const triggerEl = resolveVisualTrigger(el);
            const animation = gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: { trigger: triggerEl, start, markers: showMarkers },
            });
            animations.push(animation);
          });

          /* ── 좌측 슬라이드인 + 패럴랙스 ── */
          fromLeftTargets.forEach((el) => {
            const triggerEl = resolveVisualTrigger(el);
            const revealAnimation = gsap.to(el, {
              xPercent: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: triggerEl, start, markers: showMarkers },
            });
            animations.push(revealAnimation);

            const parallaxAnimation = gsap.to(el, {
              yPercent: -4,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start,
                end: 'bottom top',
                markers: showMarkers,
                scrub: true,
              },
            });
            animations.push(parallaxAnimation);
          });

          /* ── 우측 슬라이드인 + 패럴랙스 ── */
          fromRightTargets.forEach((el) => {
            const triggerEl = resolveVisualTrigger(el);
            const revealAnimation = gsap.to(el, {
              xPercent: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: triggerEl, start, markers: showMarkers },
            });
            animations.push(revealAnimation);

            const parallaxAnimation = gsap.to(el, {
              yPercent: -4,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start,
                end: 'bottom top',
                markers: showMarkers,
                scrub: true,
              },
            });
            animations.push(parallaxAnimation);
          });

          /* ── 스케일 등장 (이미지/비디오) ── */
          scaleTargets.forEach((el) => {
            const triggerEl = resolveVisualTrigger(el);
            const animation = gsap.to(el, {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: { trigger: triggerEl, start, markers: showMarkers },
            });
            animations.push(animation);
          });

          /* ── 스태거 (feature 목록) ── */
          if (staggerTargets.length > 0) {
            gsap.set(staggerTargets, { y: 20, opacity: 0 });
            const staggerAnimation = gsap.to(staggerTargets, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: resolveVisualTrigger(staggerTargets[0]),
                start,
                markers: showMarkers,
              },
            });
            animations.push(staggerAnimation);
          }
          });
        });
      });

      return () => {
        unsubscribe();
        animations.forEach((animation) => animation.kill());
        cancelAnimationFrame(firstRafId);
        cancelAnimationFrame(secondRafId);
      };
    },
    { scope: sectionRef },
  );
}
