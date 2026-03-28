'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SocialCostSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.cost-question', {
      scrollTrigger: { trigger: '.cost-question', start: 'top 85%' },
      y: 30, opacity: 0, duration: 0.6,
    });

    gsap.from('.cost-title', {
      scrollTrigger: { trigger: '.cost-title', start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8,
    });

    gsap.from('.cost-main-number', {
      scrollTrigger: { trigger: '.cost-main-number', start: 'top 80%' },
      textContent: 0,
      duration: 2,
      ease: 'power1.inOut',
      snap: { textContent: 1 },
      onUpdate: function () {
        const target = this.targets()[0] as HTMLElement;
        if (target) {
          target.textContent = Math.ceil(Number(target.textContent || 0)).toString();
        }
      },
    });

    gsap.from('.cost-detail', {
      scrollTrigger: { trigger: '.cost-details', start: 'top 80%' },
      y: 30, opacity: 0, stagger: 0.15, duration: 0.6,
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-5 md:px-10 bg-[var(--color-dark)] text-white">
      <div className="mx-auto max-w-4xl">
        {/* 현실적으로? */}
        <p className="cost-question text-sm font-bold tracking-widest text-white/60 mb-6">
          현실적으로?
        </p>

        {/* Title */}
        <p className="cost-title text-base md:text-lg text-white/70 leading-relaxed tracking-[0.11em]">
          이동권 박탈로 인해 발생하는 사회적 비용
        </p>

        {/* Main stat */}
        <div className="mt-4">
          <p className="text-4xl md:text-5xl font-black tracking-tight">
            중소도시 당 연간{' '}
            <span className="cost-main-number">310</span>억
          </p>
        </div>

        {/* Detail cards */}
        <div className="cost-details mt-10 flex flex-wrap gap-4">
          <div className="cost-detail flex items-baseline gap-2">
            <span className="text-sm text-white/50">우울증</span>
            <span className="text-2xl md:text-3xl font-black">연 160억</span>
          </div>
          <div className="cost-detail flex items-baseline gap-2">
            <span className="text-sm text-white/50">복지버스/ 복지택시</span>
            <span className="text-2xl md:text-3xl font-black">연 150억</span>
          </div>
          <div className="cost-detail flex items-baseline gap-2">
            <span className="text-sm text-white/50">요양비 가속</span>
            <span className="text-2xl md:text-3xl font-black text-[var(--color-orange)]">+α</span>
          </div>
        </div>
      </div>
    </section>
  );
}
