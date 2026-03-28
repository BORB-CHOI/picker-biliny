'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CHARGING_FEATURES = [
  { title: '스스로 돌보며', desc: '자동 귀환 후 무선 충전 시작' },
  { title: '혼자일 땐', desc: '유휴 시간 활용한 자동 충전' },
  { title: '모두를 위해', desc: '가로등 인프라 활용 무선 충전' },
];

export function ChargingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.charge-title', {
      scrollTrigger: { trigger: '.charge-title', start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8,
    });

    gsap.from('.charge-card', {
      scrollTrigger: { trigger: '.charge-cards', start: 'top 80%' },
      y: 40, opacity: 0, stagger: 0.2, duration: 0.7,
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-40 px-5 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="charge-title text-center mb-16">
          <p className="text-sm font-bold tracking-widest text-[var(--color-accent)] uppercase mb-4">
            Charge-in
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--color-text)]">
            충전은 가로등 옆
            <br />
            어디서나
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            충전은 무선으로
          </p>
        </div>

        <div className="charge-cards grid md:grid-cols-3 gap-6">
          {CHARGING_FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="charge-card rounded-2xl bg-[var(--color-bg-subtle)] p-8 text-center transition-shadow hover:shadow-lg"
            >
              <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[var(--color-accent)]">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-[var(--color-text)]">{feature.title}</h3>
              <p className="mt-3 text-[var(--color-text-secondary)]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
