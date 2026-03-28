'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AlternativesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.alt-section-title', {
      scrollTrigger: { trigger: '.alt-section-title', start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
    });

    gsap.utils.toArray<HTMLElement>('.alt-block').forEach((block) => {
      gsap.from(block, {
        scrollTrigger: { trigger: block, start: 'top 80%' },
        y: 60, opacity: 0, duration: 0.8, ease: 'power2.out',
      });
    });

    gsap.utils.toArray<HTMLElement>('.alt-stat-number').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        scale: 0.8, opacity: 0, duration: 0.6, ease: 'back.out(1.7)',
      });
    });

    gsap.utils.toArray<HTMLElement>('.alt-text-reveal').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%' },
        y: 24, opacity: 0, duration: 0.6, ease: 'power2.out',
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-5 md:px-10 bg-white">
      <div className="mx-auto max-w-3xl">
        {/* Section Title */}
        <h2 className="alt-section-title text-3xl md:text-4xl lg:text-5xl font-black text-[var(--color-text)] tracking-tight text-center">
          불편한 대안들
        </h2>

        {/* === 전동스쿠터 === */}
        <div className="alt-block mt-20 md:mt-28">
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] tracking-[1.1px]">
            전동스쿠터
          </h3>

          {/* Image placeholder */}
          <div className="mt-6 relative aspect-[16/10] w-full rounded-2xl bg-[#F0F0F0] overflow-hidden flex items-center justify-center">
            <span className="text-[var(--color-text-secondary)] text-sm">전동스쿠터 일러스트</span>
          </div>

          <div className="mt-8 space-y-6">
            <div className="alt-text-reveal">
              <p className="text-4xl md:text-5xl font-black text-[var(--color-text)] leading-none">
                ?
              </p>
              <p className="mt-3 text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)]">
                만약 길을 잃어버리면<br />
                <strong className="text-[var(--color-text)] font-semibold">돌아갈 방법이 없습니다.</strong>
              </p>
            </div>

            <div className="alt-text-reveal">
              <p className="text-3xl">😥</p>
              <p className="mt-3 text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)]">
                긴급한 상황에서<br />
                <strong className="text-[var(--color-text)] font-semibold">어르신을 도와드릴 수 없습니다</strong>
              </p>
            </div>

            <div className="alt-text-reveal">
              <p className="text-4xl md:text-5xl font-black text-[var(--color-primary)] leading-none">
                !
              </p>
              <p className="mt-3 text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)]">
                고장이 난다면<br />
                <strong className="text-[var(--color-text)] font-semibold">어떻게 해야할지 난감합니다.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* === 버스 === */}
        <div className="alt-block mt-24 md:mt-32">
          <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] tracking-[1.32px]">
            버스
          </h3>

          {/* Image placeholder */}
          <div className="mt-6 relative aspect-[16/10] w-full rounded-2xl bg-[#F0F0F0] overflow-hidden flex items-center justify-center">
            <span className="text-[var(--color-text-secondary)] text-sm">버스 정류장 일러스트</span>
          </div>

          <div className="mt-8 space-y-8">
            <div className="alt-text-reveal">
              <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)]">
                버스를 타고 싶지만
              </p>
              <p className="mt-1 text-lg md:text-xl font-semibold text-[var(--color-text)]">
                정류장까지 거리가 너무 멉니다.
              </p>
            </div>

            {/* Stat: 800m */}
            <div className="alt-stat-number rounded-2xl bg-[var(--color-bg-subtle)] p-6 md:p-8">
              <p className="text-xs font-medium text-[var(--color-text-secondary)] tracking-wider uppercase">
                마을버스
              </p>
              <p className="mt-2 text-lg md:text-xl text-[var(--color-text-secondary)]">
                정류장 평균 거리
              </p>
              <p className="mt-1 text-5xl md:text-6xl font-black text-[var(--color-accent-dark)]">
                800<span className="text-2xl md:text-3xl font-bold">m</span>
              </p>
            </div>

            <div className="alt-text-reveal">
              <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)]">
                먼거리를 감수하고 정류장에 도착했지만
              </p>
            </div>

            {/* Stat: 배차 */}
            <div className="alt-stat-number rounded-2xl bg-[var(--color-bg-subtle)] p-6 md:p-8">
              <p className="text-xs font-medium text-[var(--color-text-secondary)] tracking-wider">
                도심 외곽 정류장
              </p>
              <p className="mt-2 text-lg md:text-xl text-[var(--color-text-secondary)]">
                평균 하루 배차
              </p>
              <div className="mt-2 flex items-baseline gap-3">
                <p className="text-5xl md:text-6xl font-black text-[var(--color-accent-dark)]">
                  4<span className="text-2xl md:text-3xl font-bold">대</span>
                </p>
              </div>
              <p className="mt-2 text-base md:text-lg text-[var(--color-text-secondary)]">
                약 <strong className="text-[var(--color-text)] font-bold">4시간</strong>당 1대
              </p>
            </div>

            <div className="alt-text-reveal">
              <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)]">
                언제올지 모르는 버스를<br />
                <strong className="text-[var(--color-text)] font-semibold">하염없이 기다리기만 합니다.</strong>
              </p>
            </div>

            <div className="alt-text-reveal">
              <p className="text-lg md:text-xl font-semibold text-[var(--color-text)]">
                결국 포기하고 돌아갑니다.
              </p>
            </div>

            {/* Stat: 포기율 36% */}
            <div className="alt-stat-number rounded-2xl bg-[var(--color-bg-subtle)] p-6 md:p-8 text-center">
              <p className="text-6xl md:text-8xl font-black text-[var(--color-primary)]">
                36<span className="text-3xl md:text-4xl">%</span>
              </p>
              <p className="mt-3 text-base md:text-lg text-[var(--color-text-secondary)]">
                대기로 인한 이동 포기율
              </p>
            </div>
          </div>
        </div>

        {/* === 택시 === */}
        <div className="alt-block mt-24 md:mt-32">
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] tracking-[1.1px]">
            택시
          </h3>

          {/* Image placeholder */}
          <div className="mt-6 relative aspect-[16/10] w-full rounded-2xl bg-[#F0F0F0] overflow-hidden flex items-center justify-center">
            <span className="text-[var(--color-text-secondary)] text-sm">택시 일러스트</span>
          </div>

          <div className="mt-8 space-y-8">
            <div className="alt-text-reveal">
              <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)]">
                1달에 두번정도 이용할 수 있는 택시는
              </p>
              <p className="mt-1 text-lg md:text-xl font-semibold text-[var(--color-text)]">
                매우 비쌉니다.
              </p>
            </div>

            {/* Stat: 30,000원 */}
            <div className="alt-stat-number rounded-2xl bg-[var(--color-bg-subtle)] p-6 md:p-8 text-center">
              <p className="text-xs font-medium text-[var(--color-text-secondary)] tracking-wider mb-2">
                왕복 평균
              </p>
              <p className="text-5xl md:text-6xl font-black text-[var(--color-accent-dark)]">
                30,000<span className="text-2xl md:text-3xl font-bold">원</span>
              </p>
            </div>

            <div className="alt-text-reveal">
              <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)]">
                간단한 외출을 하기 위해 택시를 타는 것은<br />
                <strong className="text-[var(--color-text)] font-semibold">너무 큰 부담입니다</strong>
              </p>
            </div>

            {/* Stat: 포기율 57% */}
            <div className="alt-stat-number rounded-2xl bg-[var(--color-bg-subtle)] p-6 md:p-8 text-center">
              <p className="text-7xl md:text-9xl font-black text-[var(--color-primary)]">
                57<span className="text-3xl md:text-5xl">%</span>
              </p>
              <p className="mt-3 text-base md:text-lg text-[var(--color-text-secondary)]">
                비용으로 인한 이동 포기율
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
