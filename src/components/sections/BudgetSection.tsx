'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    name: "공유형 PM 'BILINY'",
    count: '50 대',
    cost: '2.5',
    features: [
      '사계절 기후 대응형 1인승 퍼스널 모빌리티',
      '스마트 레인 기반 저속 자율주행 기능',
    ],
  },
  {
    name: '케어워치',
    count: '1300 개',
    cost: '0.3',
    features: [
      '고령자 이동 현황 모니터링 - 안심 케어 디바이스',
      '119 자동 신고 기능, 컨디션 맞춤 목적지 제안 기능',
    ],
  },
  {
    name: '스마트 레인',
    count: '16km',
    cost: '9.6',
    features: [
      '시각 인식 기반의 저비용 유도 주행 레인 인프라',
      '태양광 야간 시인성 확보 및 보행자 안전 경계선 기능',
    ],
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

    gsap.from('.budget-note', {
      scrollTrigger: { trigger: '.budget-note', start: 'top 85%' },
      y: 20, opacity: 0, duration: 0.6,
    });

    gsap.from('.budget-card', {
      scrollTrigger: { trigger: '.budget-cards', start: 'top 75%' },
      y: 60, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out',
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-5 md:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="budget-title text-2xl md:text-3xl lg:text-4xl font-black text-[var(--color-text)] leading-snug">
          교통 복지 예산의 10%면
          <br />
          충분히 가능합니다
        </h2>

        <p className="budget-note mt-4 text-sm md:text-base text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
          낭비되는 예산의 단 10%만으로 고령자 생활에 맞춘
          새로운 이동수단 대안을 제공할 수 있습니다.
        </p>
        <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
          홍성읍 중심지 600m 반경 고령자 1300명을 대상, 초기 서비스 도입 시뮬레이션
        </p>

        <div className="budget-cards mt-10 grid md:grid-cols-3 gap-5">
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              className="budget-card rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-transform hover:-translate-y-1"
            >
              <h3 className="text-base font-bold text-[var(--color-text)]">
                {product.name}
              </h3>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                {product.count}
              </p>
              <p className="mt-3 text-2xl font-black text-[var(--color-text)]">
                {product.cost}
                <span className="text-sm font-medium ml-1">억 원</span>
              </p>
              <ul className="mt-4 space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-accent-dark)] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
