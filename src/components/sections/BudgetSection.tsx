'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    name: "공유형 PM 'BILINY'",
    scale: '50대',
    cost: '2.5억 원',
    features: ['사계절 기후 대응형 1인승 퍼스널 모빌리티', '스마트 레인 기반 저속 자율주행 기능'],
  },
  {
    name: '스마트 레인',
    scale: '16km',
    cost: '9.6억 원',
    features: ['시각 인식 기반의 저비용 유도 주행 레인 인프라', '태양광 야간 시인성 확보 및 보행자 안전 경계선'],
  },
  {
    name: '케어워치',
    scale: '1,300개',
    cost: '0.3억 원',
    features: ['고령자 이동 현황 모니터링 안심 케어 디바이스', '119 자동 신고, 컨디션 맞춤 목적지 제안'],
  },
];

export function BudgetSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.budget-title', {
      scrollTrigger: { trigger: '.budget-title', start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8,
    });

    gsap.from('.budget-card', {
      scrollTrigger: { trigger: '.budget-cards', start: 'top 75%' },
      y: 60, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out',
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-40 px-5 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="budget-title text-center mb-16">
          <p className="text-sm font-bold tracking-widest text-[var(--color-accent)] uppercase mb-4">
            현실적으로?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--color-text)]">
            교통 복지 예산의 <span className="text-[var(--color-primary)]">10%</span>면
            <br className="hidden md:block" />
            충분히 가능합니다
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            낭비되는 예산의 단 10%만으로 고령자 생활에 맞춘
            새로운 이동수단 대안을 제공할 수 있습니다.
          </p>
        </div>

        <div className="budget-cards grid md:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              className="budget-card relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[var(--color-dark)] to-[#1a1a1a] p-8 text-white transition-transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="relative z-10">
                <h3 className="text-lg font-black">{product.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[var(--color-primary)]">{product.cost}</span>
                </div>
                <p className="mt-1 text-sm text-white/50">{product.scale}</p>
                <ul className="mt-6 space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-white/70 leading-relaxed">
                      <span className="mt-1 h-1 w-1 rounded-full bg-[var(--color-primary)] shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
