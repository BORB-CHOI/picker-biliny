'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVENUE_ITEMS = [
  {
    revenue: '연 2.7억 원',
    details: '출/퇴근 이동 3회, 등/하원 3회, 점심시간 단거리 이동 2회',
    daily: '일 1.45만 원',
  },
  {
    revenue: '연 5억 원',
    details: '퀵 배달 2회, 저녁심야배송 3회',
    daily: '일 2.6만 원',
  },
  {
    revenue: '연 1.1억 원',
    details: '야간순찰 3시간, 대리기사이송 1회',
    daily: '일 0.6만 원',
  },
];

export function RevenueSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.rev-title', {
      scrollTrigger: { trigger: '.rev-title', start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8,
    });

    gsap.from('.rev-card', {
      scrollTrigger: { trigger: '.rev-cards', start: 'top 75%' },
      y: 50, opacity: 0, stagger: 0.2, duration: 0.7,
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-40 px-5 md:px-10 bg-[var(--color-bg-subtle)]">
      <div className="mx-auto max-w-5xl">
        <div className="rev-title text-center mb-16">
          <p className="text-lg text-[var(--color-text-secondary)]">게다가 자율주행이잖아?</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-black text-[var(--color-text)]">
            시티 케어 솔루션
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            비활동시간 추가 비즈니스를 통한 부가가치 확장
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">*50대 운영 기준</p>
        </div>

        <div className="rev-cards grid md:grid-cols-3 gap-6">
          {REVENUE_ITEMS.map((item) => (
            <div
              key={item.revenue}
              className="rev-card rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-xl"
            >
              <p className="text-2xl md:text-3xl font-black text-[var(--color-accent)]">
                {item.revenue}
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">{item.daily}</p>
              <p className="mt-6 text-[var(--color-text-secondary)] leading-relaxed">
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
