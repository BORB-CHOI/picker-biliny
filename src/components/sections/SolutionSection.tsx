'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOLUTIONS = [
  {
    title: '빌려타는 "빌리니"',
    description: '필요할 때 언제든지 부르시면 빌려드립니다. 눈 앞까지 와주고, 가고자 하는 모든 길을 갑니다. 모든 여정을 마치면 스스로 돌아갑니다.',
    icon: '🚗',
  },
  {
    title: '서로에게 안전한 "안내길"',
    description: '가는 길이 약속된 안내길을 깔아드려요. 탑승자, 보행자, 운전자 모두가 안전하게 길을 사용하도록 안내합니다.',
    icon: '🛤️',
  },
  {
    title: '모두에게 "공평한" 모빌리티',
    description: '모두가 타실 수 있어요. 학생부터 고령자까지 모두 이용할 수 있습니다.',
    icon: '🤝',
  },
];

export function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.sol-intro', {
      scrollTrigger: { trigger: '.sol-intro', start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8,
    });

    gsap.from('.sol-card', {
      scrollTrigger: { trigger: '.sol-cards', start: 'top 75%' },
      y: 60, opacity: 0, stagger: 0.25, duration: 0.8, ease: 'power2.out',
    });

    gsap.from('.sol-care', {
      scrollTrigger: { trigger: '.sol-care', start: 'top 80%' },
      y: 40, opacity: 0, duration: 0.8,
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="solution" className="py-24 md:py-40 px-5 md:px-10 bg-[var(--color-bg-subtle)]">
      <div className="mx-auto max-w-5xl">
        <div className="sol-intro text-center mb-16 md:mb-24">
          <p className="text-sm font-bold tracking-widest text-[var(--color-accent)] uppercase mb-4">
            Solution
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--color-text)]">
            에 대한 해결책을 제시합니다
          </h2>
        </div>

        <div className="sol-cards grid md:grid-cols-3 gap-6 md:gap-8">
          {SOLUTIONS.map((sol) => (
            <div
              key={sol.title}
              className="sol-card rounded-2xl bg-white p-8 md:p-10 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <span className="text-4xl">{sol.icon}</span>
              <h3 className="mt-5 text-xl font-black text-[var(--color-text)]">
                {sol.title}
              </h3>
              <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                {sol.description}
              </p>
            </div>
          ))}
        </div>

        <div className="sol-care mt-16 md:mt-24 rounded-2xl bg-white p-8 md:p-12 text-center shadow-sm">
          <p className="text-sm font-bold tracking-widest text-[var(--color-primary)] uppercase mb-4">
            Care Watch
          </p>
          <h3 className="text-2xl md:text-3xl font-black text-[var(--color-text)]">
            모든 과정을 지켜봐주는 &ldquo;돌봄이&rdquo;
          </h3>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto">
            안전과 편의를 위해 탑승자가 이동하기 전부터 이동한 후까지,
            모든 과정을 지켜봐드립니다.
          </p>
        </div>
      </div>
    </section>
  );
}
