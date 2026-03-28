'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ALTERNATIVES = [
  {
    name: '전동스쿠터',
    emotion: '힘들어',
    emotionColor: 'text-[var(--color-primary)]',
    problems: ['비 오면 탈 수 없어요', '길을 잃으면 돌아갈 방법이 없어요', '넘어지면 혼자 일어나기 어려워요'],
    stat: null,
  },
  {
    name: '버스',
    emotion: '불안해',
    emotionColor: 'text-[var(--color-accent)]',
    problems: ['정류장까지 평균 거리 800m', '도심 외곽은 약 4시간당 1대', '언제 올지 모르는 버스를 하염없이 기다립니다'],
    stat: { label: '대기로 인한 이동 포기율', value: '36%' },
  },
  {
    name: '택시',
    emotion: '비싸',
    emotionColor: 'text-red-500',
    problems: ['왕복 평균 30,000원', '한 달에 1~2번이 한계', '긴급할 때 잡히지 않아요'],
    stat: { label: '비용으로 인한 이동 포기율', value: '57%' },
  },
];

export function AlternativesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.alt-title', {
      scrollTrigger: { trigger: '.alt-title', start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8,
    });

    gsap.from('.alt-card', {
      scrollTrigger: { trigger: '.alt-cards', start: 'top 75%' },
      y: 60, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out',
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-40 px-5 md:px-10 bg-[var(--color-bg-subtle)]">
      <div className="mx-auto max-w-5xl">
        <h2 className="alt-title text-3xl md:text-4xl lg:text-5xl font-black text-center text-[var(--color-text)]">
          불편한 대안들
        </h2>

        <div className="alt-cards mt-16 grid md:grid-cols-3 gap-6 md:gap-8">
          {ALTERNATIVES.map((alt) => (
            <div
              key={alt.name}
              className="alt-card group rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-xl"
            >
              <span className={`text-sm font-black tracking-widest ${alt.emotionColor}`}>
                {alt.emotion}
              </span>
              <h3 className="mt-3 text-2xl font-black text-[var(--color-text)]">
                {alt.name}
              </h3>
              <ul className="mt-6 space-y-3">
                {alt.problems.map((problem) => (
                  <li
                    key={problem}
                    className="flex items-start gap-2 text-[var(--color-text-secondary)] leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-text-tertiary)] shrink-0" />
                    {problem}
                  </li>
                ))}
              </ul>
              {alt.stat && (
                <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                  <p className="text-sm text-[var(--color-text-tertiary)]">{alt.stat.label}</p>
                  <p className="mt-1 text-3xl font-black text-[var(--color-text)]">{alt.stat.value}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
