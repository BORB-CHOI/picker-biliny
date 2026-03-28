'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function IsolationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'center center',
        scrub: 1,
      },
    });

    tl.from('.iso-conclusion', { y: 30, opacity: 0, duration: 0.5 })
      .from('.iso-quote', { scale: 0.95, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.iso-result', { y: 20, opacity: 0, duration: 0.4 }, '-=0.1');
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-40 px-5 md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="iso-conclusion text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
          결론적으로 두 다리가 얼어붙으신 어르신
        </p>

        <div className="iso-quote my-12 md:my-16">
          <p className="text-4xl md:text-6xl font-black text-[var(--color-text)]">
            &ldquo;집에 있을래.&rdquo;
          </p>
        </div>

        <div className="iso-result flex items-center justify-center gap-6 md:gap-10">
          {['고립', '우울', '가속화'].map((word) => (
            <span
              key={word}
              className="text-lg md:text-xl font-bold text-[var(--color-text-tertiary)]"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
