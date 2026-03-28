'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const alternatives = [
  { emotion: '불안해', transport: '전동스쿠터' },
  { emotion: '힘들어', transport: '버스' },
  { emotion: '비싸', transport: '택시' },
];

export function IsolationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from('.isolation-title', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
      .from('.isolation-label', {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
      .from('.isolation-illustration', {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.2')
      .from('.isolation-quote', {
        y: 60,
        opacity: 0,
        scale: 0.85,
        duration: 1.0,
        ease: 'power3.out',
      }, '-=0.2')
      .from('.isolation-conclusion', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      }, '-=0.3')
      .from('.isolation-stat', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.2');

    // Parallax scrub on the quote for dramatic feel
    gsap.to('.isolation-quote', {
      scrollTrigger: {
        trigger: '.isolation-quote',
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 1,
      },
      y: -20,
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="isolation"
      className="relative bg-[var(--color-bg)] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-3xl px-5 md:px-10">
        {/* Title */}
        <h2 className="isolation-title text-center text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.06em] text-[#202020] leading-snug">
          결론적으로<br />
          <span className="text-2xl md:text-3xl lg:text-4xl">
            두다리가 얼어붙으신 어르신
          </span>
        </h2>

        {/* Three emotion labels */}
        <div className="mt-12 md:mt-16 flex justify-center gap-6 md:gap-12">
          {alternatives.map(({ emotion, transport }) => (
            <div
              key={transport}
              className="isolation-label flex flex-col items-center gap-2"
            >
              <span className="text-lg md:text-xl lg:text-2xl font-bold tracking-[0.06em] text-[#202020]">
                {emotion}
              </span>
              <span className="text-xs md:text-sm font-bold tracking-[0.04em] text-[#202020]/60">
                {transport}
              </span>
            </div>
          ))}
        </div>

        {/* Illustration */}
        <div className="isolation-illustration relative mx-auto mt-12 md:mt-16 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden">
          <Image
            src="/images/story-elderly-seated-1.png"
            alt="의자에 앉아계신 어르신 일러스트"
            fill
            sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
            className="object-contain"
          />
        </div>

        {/* Quote */}
        <p className="isolation-quote mt-10 md:mt-14 text-center text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#202020] leading-tight">
          &ldquo;집에 있을래.&rdquo;
        </p>

        {/* Conclusion */}
        <div className="isolation-conclusion mt-10 md:mt-14 flex flex-col items-center gap-3">
          <p className="text-lg md:text-xl lg:text-2xl font-bold tracking-[0.04em] text-red-600">
            고립 &middot; 우울 &middot; 가속화
          </p>
        </div>

        {/* Stat */}
        <div className="isolation-stat mt-8 md:mt-12 flex flex-col items-center">
          <span className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#202020]">
            57<span className="text-4xl md:text-5xl lg:text-6xl">%</span>
          </span>
          <span className="mt-2 text-sm md:text-base text-[var(--color-text-secondary)] text-center max-w-xs">
            고령자 외출 감소율
          </span>
        </div>
      </div>
    </section>
  );
}
