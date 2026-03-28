'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.timeline({ delay: 4.0 });

    tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })
      .from('.hero-title-line', { y: 40, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }, '-=0.3')
      .from('.hero-desc', { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
      .from('.hero-cta', { y: 20, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .from('.hero-find-text', { y: 60, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out' }, '-=0.2');

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
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden pt-14"
    >
      <div className="hero-content relative z-10 mx-auto w-full max-w-3xl px-5 md:px-10 flex-1 flex flex-col justify-center">
        {/* PICKER PROJECT badge */}
        <div className="hero-badge flex items-center gap-2 mb-6">
          <Image
            src="/images/logo-left-top.svg"
            alt=""
            width={12}
            height={12}
          />
          <Image
            src="/images/logo-right-bottom.svg"
            alt=""
            width={12}
            height={12}
            className="-ml-[1px]"
          />
          <span className="text-xs font-medium tracking-[0.24em] text-[var(--color-nav-text)]">
            PICKER PROJECT
          </span>
        </div>

        {/* Title */}
        <h1 className="leading-tight">
          <span className="hero-title-line block text-[2.5rem] md:text-[3.2rem] lg:text-[3.8rem] font-medium tracking-[0.06em] text-[var(--color-hero-title)]">
            중소도시의 이동권을
          </span>
          <span className="hero-title-line block text-[2.5rem] md:text-[3.2rem] lg:text-[3.8rem] font-medium tracking-[0.06em] text-[var(--color-accent-dark)]">
            다시 설계합니다.
          </span>
        </h1>

        {/* Description */}
        <div className="hero-desc mt-6 max-w-md">
          <p className="text-sm md:text-base leading-relaxed text-[var(--color-text-desc)]">
            피커 프로젝트 &apos;빌리니(BILINY)&apos; 는 일상 속{' '}
            <strong className="font-bold text-[var(--color-text)]">이동의 비효율 사각지대를 해결</strong>하는{' '}
            공유형 자율주행 모빌리티 솔루션입니다.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#story"
            className="hero-cta inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[10px] md:text-xs font-bold text-white transition-all hover:shadow-lg"
            style={{
              background: '#F77F4C',
              boxShadow: '0px 0.63px 1.64px 0px rgba(255,139,57,0.25)',
            }}
          >
            빌리니 스토리 →
          </a>
          <a
            href="#biliny"
            className="hero-cta inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[10px] md:text-xs font-bold text-white transition-all hover:shadow-lg"
            style={{
              background: '#2675FF',
              boxShadow: '0px 0.631px 1.642px 0px rgba(57,57,255,0.25)',
            }}
          >
            빌리니 둘러보기 →
          </a>
        </div>
      </div>

      {/* FIND BLIND SPOT large text */}
      <div className="relative z-10 px-5 md:px-10 pb-8 md:pb-16">
        <div className="mx-auto max-w-3xl">
          <p className="hero-find-text text-[4rem] md:text-[6rem] lg:text-[8rem] font-black leading-none tracking-tight text-[var(--color-text)] opacity-10">
            FIND
          </p>
          <p className="hero-find-text text-[4rem] md:text-[6rem] lg:text-[8rem] font-black leading-none tracking-tight text-[var(--color-text)] opacity-10">
            BLIND
          </p>
          <p className="hero-find-text text-[4rem] md:text-[6rem] lg:text-[8rem] font-black leading-none tracking-tight text-[var(--color-text)] opacity-10">
            SPOT
          </p>
        </div>
      </div>
    </section>
  );
}
