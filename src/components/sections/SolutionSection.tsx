'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const SOLUTIONS = [
  {
    id: 'biliny',
    title: '빌려타는 "빌리니"',
    description:
      '필요할 때 언제든지 부르시면 빌려드립니다. 눈 앞까지 와주고, 가고자하는 모든 길을 갑니다. 모든 여정을 마치면 스스로 돌아갑니다.',
    imageSrc: '/images/solution-biliny-2.png',
    imageAlt: '빌리니 공유 모빌리티 이용 모습',
  },
  {
    id: 'annae-gil',
    title: '서로에게 안전한 "안내길"',
    description:
      "가는 길이 약속된 '안내길'을 깔아드려요. 탑승자/보행자/운전자 모두가 안전하게 길을 사용하도록 안내합니다.",
    imageSrc: '/images/solution-lane-1.png',
    imageAlt: '안내길 스마트 레인 시스템',
  },
  {
    id: 'dolbomi',
    title: '모든 과정을 지켜봐주는 "돌봄이"',
    description:
      '안전과 편의를 위해 탑승자가 이동하기 전부터 이동한 후까지, 모든 과정을 지켜봐드립니다.',
    imageSrc: '/images/carewatch-system.png',
    imageAlt: 'PICKER 가디언 관제 시스템',
    hasCareWatch: true,
  },
  {
    id: 'fair-mobility',
    title: '모두에게 "공평한" 모빌리티',
    description:
      '모두가 타실 수 있어요 학생부터 고령자까지 모두 이용할 수 있습니다.',
    imageSrc: '/images/solution-fair-1.png',
    imageAlt: '다양한 이용자가 빌리니를 사용하는 모습',
  },
] as const;

export function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('.solution-header', {
        scrollTrigger: { trigger: '.solution-header', start: 'top 85%' },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from('.solution-card', {
        scrollTrigger: { trigger: '.solution-cards', start: 'top 75%' },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="py-24 md:py-40 px-5 md:px-10"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="solution-header mb-16 md:mb-24">
          <p className="text-[11px] font-bold tracking-[1.21px] uppercase text-[#202020]">
            에 대한 해결책을 제시합니다
          </p>
        </div>

        {/* Solution Cards */}
        <div className="solution-cards flex flex-col gap-20 md:gap-28">
          {SOLUTIONS.map((solution) => (
            <article
              key={solution.id}
              className="solution-card flex flex-col gap-6"
            >
              {/* Image Area */}
              <div className="relative w-full aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden bg-[var(--color-bg-subtle)]">
                <Image
                  src={solution.imageSrc}
                  alt={solution.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                  className="object-cover"
                />

                {/* CareWatch Overlay for dolbomi card */}
                {'hasCareWatch' in solution && solution.hasCareWatch && (
                  <div className="absolute inset-0 flex items-end justify-center p-4 md:p-8">
                    <div className="w-full max-w-md rounded-xl bg-[#1a1a2e]/80 backdrop-blur-md p-4 md:p-6 text-white">
                      <p className="text-[10px] md:text-xs font-medium tracking-wider opacity-70 mb-2">
                        PICKER 가디언 관제 시스템 2.0
                      </p>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs md:text-sm font-bold text-[var(--color-primary)]">
                            NO. 32
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-2.5 py-0.5 text-[10px] md:text-xs font-medium text-green-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                            이동중
                          </span>
                        </div>
                        <span className="text-[10px] md:text-xs font-medium text-emerald-400">
                          양호
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-3 max-w-lg">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-text)]">
                  {solution.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-[var(--color-text-secondary)]">
                  {solution.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
