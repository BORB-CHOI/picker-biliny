'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  text: string;
  image: {
    src: string;
    alt: string;
  };
}

const timelineItems: TimelineItem[] = [
  {
    year: '1970',
    text: '젊은시절, 차량으로 어디든 돌아다니시던 할아버지',
    image: {
      src: '/images/story-1970-1.png',
      alt: '1970년대 차량을 운전하는 할아버지 일러스트',
    },
  },
  {
    year: '2026',
    text: '이젠 할아버지의 두다리는 벤치에 묶였습니다.',
    image: {
      src: '/images/story-elderly-seated-1.png',
      alt: '벤치에 앉아있는 할아버지 일러스트',
    },
  },
  {
    year: '1970',
    text: '어디든지 힘차게 다닐 수 있던 두다리는',
    image: {
      src: '/images/story-1970-2.png',
      alt: '1970년대 활발하게 걸어다니는 할머니 일러스트',
    },
  },
  {
    year: '2026',
    text: '이젠 보조바퀴가 없으면 쉽게 다니기 어렵습니다.',
    image: {
      src: '/images/story-elderly-walker-1.png',
      alt: '보행보조기를 사용하는 고령자 일러스트',
    },
  },
];

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Section header cascading entrance
    gsap.from('.story-label', {
      scrollTrigger: {
        trigger: '.story-header',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    gsap.from('.story-subtitle', {
      scrollTrigger: {
        trigger: '.story-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
    });

    gsap.from('.story-title', {
      scrollTrigger: {
        trigger: '.story-header',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    gsap.from('.story-sub-title', {
      scrollTrigger: {
        trigger: '.story-header',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
    });

    // Timeline items — each animates independently with staggered children
    const items = gsap.utils.toArray<HTMLElement>('.story-timeline-item');
    items.forEach((item, index) => {
      const yearEl = item.querySelector('.story-year');
      const textEl = item.querySelector('.story-text');
      const imageEl = item.querySelector('.story-image');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Year label with subtle scale
      if (yearEl) {
        tl.from(yearEl, {
          y: 20,
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: 'back.out(1.4)',
        });
      }

      // Description text slides up
      if (textEl) {
        tl.from(
          textEl,
          { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3',
        );
      }

      // Image fades in with slight scale
      if (imageEl) {
        tl.from(
          imageEl,
          {
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 0.7,
            ease: 'power2.out',
            delay: index * 0.05,
          },
          '-=0.4',
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative bg-[var(--color-bg)] py-20 md:py-32 lg:py-40"
    >
      <div className="mx-auto w-full max-w-3xl px-5 md:px-10 lg:max-w-5xl">
        {/* Section Header */}
        <div className="story-header mb-16 md:mb-24">
          <span className="story-label block text-[11px] font-medium tracking-[1.21px] uppercase text-[var(--color-text-light)] mb-4">
            Story
          </span>
          <p className="story-subtitle text-sm md:text-base font-medium tracking-[0.88px] text-[var(--color-text-secondary)] mb-2">
            인구감소 / 중소도시,
          </p>
          <h2 className="story-title text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] font-bold tracking-tight text-[var(--color-text)]">
            박탈된 고령자의 이동권
          </h2>
          <p className="story-sub-title mt-6 text-base md:text-lg font-semibold text-[var(--color-text-tertiary)]">
            빼앗긴 두 다리
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical center line — visible on desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-[var(--color-border)] lg:block" />

          <div className="space-y-16 md:space-y-24 lg:space-y-0">
            {timelineItems.map((item, index) => {
              const isLeft = index % 2 === 0;
              const is2026 = item.year === '2026';

              return (
                <div
                  key={`${item.year}-${index}`}
                  className="story-timeline-item lg:flex lg:items-center lg:min-h-[360px]"
                >
                  {/* Text column */}
                  <div
                    className={`lg:w-1/2 lg:px-8 ${
                      isLeft ? 'lg:text-right' : 'lg:order-2 lg:text-left'
                    }`}
                  >
                    <span
                      className={`story-year inline-block text-[11px] font-medium tracking-[1.21px] mb-3 ${
                        is2026
                          ? 'text-[var(--color-primary)]'
                          : 'text-[var(--color-text-light)]'
                      }`}
                    >
                      {item.year}
                    </span>

                    <p className="story-text text-sm md:text-base font-medium leading-relaxed tracking-[0.88px] text-[var(--color-text-secondary)]">
                      {item.text}
                    </p>
                  </div>

                  {/* Center dot — desktop only */}
                  <div className="relative z-10 hidden lg:flex lg:w-0 lg:items-center lg:justify-center">
                    <div
                      className={`h-3 w-3 rounded-full border-2 border-white ${
                        is2026
                          ? 'bg-[var(--color-primary)]'
                          : 'bg-[var(--color-text-light)]'
                      }`}
                      style={{ boxShadow: '0 0 0 4px var(--color-bg)' }}
                    />
                  </div>

                  {/* Image column */}
                  <div
                    className={`mt-6 lg:mt-0 lg:w-1/2 lg:px-8 ${
                      isLeft ? '' : 'lg:order-1'
                    }`}
                  >
                    <div className="story-image relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl bg-[var(--color-bg-subtle)] mx-auto lg:mx-0">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 400px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
