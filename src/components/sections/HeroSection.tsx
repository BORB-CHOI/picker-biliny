'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.timeline({ delay: 0.5 });

    tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })
      .from('.hero-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
      .from('.hero-desc', { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
      .from('.hero-cta', { y: 20, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' }, '-=0.3');

    gsap.to('.hero-content', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: -80,
      opacity: 0,
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-subtle)] to-white" />

      <div className="hero-content relative z-10 mx-auto max-w-3xl px-5 md:px-10 text-center">
        <div className="hero-badge inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-4 py-1.5 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
          <span className="text-sm font-semibold tracking-wide text-[var(--color-primary)]">
            Picker Project
          </span>
        </div>

        <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-[var(--color-text)]">
          중소도시의 이동권을
          <br />
          다시 설계합니다.
        </h1>

        <p className="hero-desc mt-6 text-lg md:text-xl leading-relaxed text-[var(--color-text-secondary)] max-w-xl mx-auto">
          피커 프로젝트 &apos;빌리니(BILINY)&apos;는 일상 속 이동의 비효율 사각지대를 해결하는
          공유형 자율주행 모빌리티 솔루션입니다.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#story"
            className="hero-cta w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:shadow-[var(--color-primary)]/25"
          >
            빌리니 스토리
          </a>
          <a
            href="#product"
            className="hero-cta w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-[var(--color-accent-dark)] hover:shadow-lg hover:shadow-[var(--color-accent)]/25"
          >
            빌리니 둘러보기
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[var(--color-text-tertiary)]">
          <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
