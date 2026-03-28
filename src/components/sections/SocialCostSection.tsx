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

    gsap.from('.cost-title', {
      scrollTrigger: { trigger: '.cost-title', start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8,
    });

    gsap.from('.cost-number', {
      scrollTrigger: { trigger: '.cost-number', start: 'top 80%' },
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
    <section ref={sectionRef} className="py-24 md:py-40 px-5 md:px-10 bg-[var(--color-dark)] text-white">
      <div className="mx-auto max-w-4xl text-center">
        <p className="cost-title text-lg md:text-xl text-white/70 leading-relaxed">
          이동권 박탈로 인해 발생하는 사회적 비용
        </p>

        <div className="mt-8 md:mt-12">
          <p className="text-sm text-white/50 mb-2">중소도시 당 연간</p>
          <p className="text-5xl md:text-7xl font-black">
            <span className="cost-number">310</span>
            <span className="text-[var(--color-primary)]">억</span>
          </p>
        </div>

        <div className="cost-details mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="cost-detail rounded-xl bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-2xl md:text-3xl font-black">160<span className="text-lg">억</span></p>
            <p className="mt-2 text-sm text-white/60">우울증 관련 비용</p>
          </div>
          <div className="cost-detail rounded-xl bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-2xl md:text-3xl font-black">150<span className="text-lg">억</span></p>
            <p className="mt-2 text-sm text-white/60">복지버스 / 복지택시</p>
          </div>
          <div className="cost-detail col-span-2 md:col-span-1 rounded-xl bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-2xl md:text-3xl font-black text-[var(--color-primary)]">+α</p>
            <p className="mt-2 text-sm text-white/60">요양비 가속</p>
          </div>
        </div>
      </div>
    </section>
  );
}
