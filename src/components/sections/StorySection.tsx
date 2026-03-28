'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.story-label', {
      scrollTrigger: { trigger: '.story-label', start: 'top 85%' },
      y: 30, opacity: 0, duration: 0.7,
    });

    gsap.from('.story-title', {
      scrollTrigger: { trigger: '.story-title', start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8,
    });

    gsap.from('.story-subtitle', {
      scrollTrigger: { trigger: '.story-subtitle', start: 'top 85%' },
      y: 30, opacity: 0, duration: 0.7, delay: 0.2,
    });

    gsap.from('.timeline-item', {
      scrollTrigger: { trigger: '.timeline-container', start: 'top 75%' },
      y: 50, opacity: 0, stagger: 0.3, duration: 0.8, ease: 'power2.out',
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="story" className="py-24 md:py-40 px-5 md:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="story-label text-sm font-bold tracking-widest text-[var(--color-primary)] uppercase mb-4">
          Story
        </p>
        <h2 className="story-title text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-[var(--color-text)]">
          인구감소 중소도시,
          <br />
          박탈된 고령자의 이동권
        </h2>
        <p className="story-subtitle mt-4 text-xl md:text-2xl font-bold text-[var(--color-text-secondary)]">
          빼앗긴 두 다리
        </p>

        <div className="timeline-container mt-16 md:mt-24 grid md:grid-cols-2 gap-12 md:gap-16">
          <div className="timeline-item relative">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl font-black text-[var(--color-primary)]/20">1970</span>
            </div>
            <div className="rounded-2xl bg-[var(--color-bg-subtle)] p-8 md:p-10">
              <p className="text-lg font-bold text-[var(--color-text)] leading-relaxed">
                젊은 시절, 차량으로 어디든 돌아다니시던 할아버지
              </p>
              <p className="mt-3 text-base text-[var(--color-text-secondary)] leading-relaxed">
                어디든지 힘차게 다닐 수 있던 두 다리로,
                가고 싶은 곳은 어디든 갈 수 있었습니다.
              </p>
            </div>
          </div>

          <div className="timeline-item relative">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl font-black text-[var(--color-accent)]/20">2026</span>
            </div>
            <div className="rounded-2xl bg-[var(--color-bg-subtle)] p-8 md:p-10">
              <p className="text-lg font-bold text-[var(--color-text)] leading-relaxed">
                이젠 할아버지의 두 다리는 벤치에 묶였습니다
              </p>
              <p className="mt-3 text-base text-[var(--color-text-secondary)] leading-relaxed">
                보조바퀴가 없으면 쉽게 다니기 어렵고,
                혼자서는 외출조차 망설이게 됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
