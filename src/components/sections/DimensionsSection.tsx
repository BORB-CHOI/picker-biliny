'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DIMENSIONS = [
  { label: '전폭', value: '700', unit: 'mm' },
  { label: '전고', value: '1,330', unit: 'mm' },
  { label: '전장', value: '1,280', unit: 'mm' },
  { label: '시트높이', value: '625', unit: 'mm' },
];

export function DimensionsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.dim-title', {
      scrollTrigger: { trigger: '.dim-title', start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8,
    });

    gsap.from('.dim-spec', {
      scrollTrigger: { trigger: '.dim-specs', start: 'top 80%' },
      y: 30, opacity: 0, stagger: 0.1, duration: 0.6,
    });

    gsap.from('.dim-visual', {
      scrollTrigger: {
        trigger: '.dim-visual',
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: 1,
      },
      scale: 0.9, opacity: 0,
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-40 px-5 md:px-10 bg-[var(--color-bg-subtle)]">
      <div className="mx-auto max-w-5xl">
        <div className="dim-title text-center mb-16">
          <p className="text-sm font-bold tracking-widest text-[var(--color-primary)] uppercase mb-4">
            Size
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--color-text)]">
            엘리베이터도
            <br />
            들어갈 수 있는 사이즈
          </h2>
        </div>

        <div className="dim-visual mx-auto max-w-2xl aspect-[4/3] rounded-3xl bg-gradient-to-b from-white to-[var(--color-border)] flex items-center justify-center mb-16">
          <p className="text-[var(--color-text-tertiary)] text-sm">정투상도 영역</p>
        </div>

        <div className="dim-specs grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {DIMENSIONS.map((dim) => (
            <div key={dim.label} className="dim-spec text-center rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-[var(--color-text-tertiary)]">{dim.label}</p>
              <p className="mt-2 text-3xl font-black text-[var(--color-text)]">{dim.value}</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">{dim.unit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
