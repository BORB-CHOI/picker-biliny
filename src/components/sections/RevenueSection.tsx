'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVENUE_ITEMS = [
  {
    label: '중단거리 출퇴근 / 학교·학원 등하교',
    revenue: '2.7',
    daily: '일 1.45만 원',
    details: '출/퇴근 이동 3회, 등/하원 3회, 점심시간 단거리 이동 2회',
  },
  {
    label: '점심시간 단거리 이동 / 퀵 배달 · 배송서비스',
    revenue: '5',
    daily: '일 2.6만 원',
    details: '퀵 배달 2회, 저녁심야배송 3회',
  },
  {
    label: '대리 기사 복귀 이동수단 / 야간 순찰',
    revenue: '1.1',
    daily: '일 0.6만 원',
    details: '야간순찰 3시간, 대리기사이송 1회',
  },
];

export function RevenueSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.rev-header', {
      scrollTrigger: { trigger: '.rev-header', start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8,
    });

    gsap.from('.rev-card', {
      scrollTrigger: { trigger: '.rev-cards', start: 'top 75%' },
      y: 50, opacity: 0, stagger: 0.2, duration: 0.7,
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-5 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="rev-header mb-12">
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)]">
            게다가
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--color-text)]">
            자율주행이잖아?
          </h2>

          <div className="mt-8">
            <p className="text-sm text-[var(--color-text-secondary)]">
              비활동시간 추가 비즈니스를 통한 부가가치 확장
            </p>
            <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
              케어 업무 이외 남는 시간, 도심 속 업무 확장이 가능한
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-[var(--color-accent-dark)] mt-2">
              시티 케어 솔루션
            </h3>
          </div>

          {/* Business items */}
          <div className="mt-6 space-y-1">
            {REVENUE_ITEMS.map((item) => (
              <p key={item.label} className="text-xs text-[var(--color-text-secondary)]">
                {item.label}
              </p>
            ))}
          </div>
        </div>

        {/* Revenue cards */}
        <div className="rev-cards grid grid-cols-3 gap-4">
          {REVENUE_ITEMS.map((item) => (
            <div key={item.revenue} className="rev-card text-center">
              <p className="text-xs text-[var(--color-text-secondary)]">연</p>
              <p className="text-2xl md:text-3xl font-black text-[var(--color-text)]">
                {item.revenue}
                <span className="text-sm font-medium ml-1">억 원</span>
              </p>
              <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
                {item.daily}
              </p>
              <p className="mt-2 text-[10px] text-[var(--color-text-tertiary)] leading-relaxed">
                {item.details}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[10px] text-[var(--color-text-secondary)]">
          *50대 운영기준
        </p>
      </div>
    </section>
  );
}
