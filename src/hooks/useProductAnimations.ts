'use client';

import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { phase } from '@/lib/animationState';

gsap.registerPlugin(ScrollTrigger);

/**
 * 제품 섹션 공용 스크롤 애니메이션 훅.
 *
 * `.b-reveal` — clip-path 텍스트 리빌
 * `.b-fade`   — 단순 fade up
 * `.b-from-left` / `.b-from-right` — 좌우 슬라이드인 + 패럴랙스
 * `.b-scale`  — 스케일 등장
 * `.b-stagger` — 순차 등장 (feature 목록)
 *
 * phase.header 이벤트 이후 ScrollTrigger를 생성하여 조기 발동을 방지한다.
 */
export function useProductAnimations(
  sectionRef: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* ── 초기 상태: 즉시 숨김 ── */
      gsap.set(section.querySelectorAll('.b-reveal'), {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0,
      });
      gsap.set(section.querySelectorAll('.b-fade'), {
        y: 40,
        opacity: 0,
      });
      gsap.set(section.querySelectorAll('.b-from-left'), {
        xPercent: -40,
        opacity: 0,
      });
      gsap.set(section.querySelectorAll('.b-from-right'), {
        xPercent: 40,
        opacity: 0,
      });
      gsap.set(section.querySelectorAll('.b-scale'), {
        scale: 0.92,
        opacity: 0,
      });

      let rafId: number;

      const unsubscribe = phase.header.on(() => {
        rafId = requestAnimationFrame(() => {
          /* ── 텍스트 clip-path 리빌 ── */
          section.querySelectorAll<HTMLElement>('.b-reveal').forEach((el) => {
            gsap.to(el, {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%' },
            });
          });

          /* ── 단순 fade up ── */
          section.querySelectorAll<HTMLElement>('.b-fade').forEach((el) => {
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 90%' },
            });
          });

          /* ── 좌측 슬라이드인 + 패럴랙스 ── */
          section
            .querySelectorAll<HTMLElement>('.b-from-left')
            .forEach((el) => {
              gsap.to(el, {
                xPercent: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 92%' },
              });
              gsap.to(el, {
                yPercent: -4,
                ease: 'none',
                scrollTrigger: {
                  trigger: el,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              });
            });

          /* ── 우측 슬라이드인 + 패럴랙스 ── */
          section
            .querySelectorAll<HTMLElement>('.b-from-right')
            .forEach((el) => {
              gsap.to(el, {
                xPercent: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 92%' },
              });
              gsap.to(el, {
                yPercent: -4,
                ease: 'none',
                scrollTrigger: {
                  trigger: el,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              });
            });

          /* ── 스케일 등장 (이미지/비디오) ── */
          section.querySelectorAll<HTMLElement>('.b-scale').forEach((el) => {
            gsap.to(el, {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 90%' },
            });
          });

          /* ── 스태거 (feature 목록) ── */
          const staggerItems =
            section.querySelectorAll<HTMLElement>('.b-stagger');
          if (staggerItems.length > 0) {
            gsap.set(staggerItems, { y: 20, opacity: 0 });
            gsap.to(staggerItems, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: staggerItems[0],
                start: 'top 90%',
              },
            });
          }
        });
      });

      return () => {
        unsubscribe();
        cancelAnimationFrame(rafId);
      };
    },
    { scope: sectionRef },
  );
}
