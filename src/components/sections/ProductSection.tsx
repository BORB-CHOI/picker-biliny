'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  { label: '1회 충전 주행거리', value: '140km' },
  { label: '대당 가격', value: '300만원' },
  { label: '앉아서 최대시속', value: '13km/h' },
  { label: '서서 최대시속', value: '25km/h' },
];

const FEATURES = [
  '정해진 길을 자동으로 따라가는 스마트 레인 주행',
  '집 앞에서 목적지까지 기다림 없는 이동 경험',
  '사용자 건강/기분 데이터를 기반으로 한 여정 제안',
  '119 자동 신고 및 실시간 모니터링 시스템 탑재',
];

export function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.prod-label', {
      scrollTrigger: { trigger: '.prod-label', start: 'top 85%' },
      y: 30, opacity: 0, duration: 0.6,
    });

    gsap.from('.prod-title', {
      scrollTrigger: { trigger: '.prod-title', start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8,
    });

    gsap.from('.prod-spec', {
      scrollTrigger: { trigger: '.prod-specs', start: 'top 80%' },
      y: 30, opacity: 0, stagger: 0.1, duration: 0.6,
    });

    gsap.from('.prod-feature', {
      scrollTrigger: { trigger: '.prod-features', start: 'top 80%' },
      x: -30, opacity: 0, stagger: 0.12, duration: 0.6,
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="product" className="py-24 md:py-40 px-5 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16 md:mb-24">
          <p className="prod-label text-sm font-bold tracking-widest text-[var(--color-primary)] uppercase mb-4">
            Design &middot; Line-up
          </p>
          <h2 className="prod-title text-3xl md:text-4xl lg:text-5xl font-black text-[var(--color-text)]">
            이동의 자유를 나누는
            <br />
            스마트 모빌리티 생태계
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            공유형 시니어 PM &apos;빌리니&apos;
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[var(--color-bg-subtle)] to-[var(--color-border)] flex items-center justify-center">
              <p className="text-[var(--color-text-tertiary)] text-sm">제품 이미지 영역</p>
            </div>
          </div>

          <div>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
              사계절 기후에 대응하는 4면 커버형 디자인과 스마트 레인 기반의
              저속 자율주행이 결합된 고령자 특화 이동수단입니다.
            </p>

            <div className="prod-specs grid grid-cols-2 gap-4 mb-10">
              {SPECS.map((spec) => (
                <div key={spec.label} className="prod-spec rounded-xl bg-[var(--color-bg-subtle)] p-5">
                  <p className="text-sm text-[var(--color-text-tertiary)]">{spec.label}</p>
                  <p className="mt-1 text-2xl font-black text-[var(--color-text)]">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="prod-features space-y-4">
              {FEATURES.map((feature) => (
                <div key={feature} className="prod-feature flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)] shrink-0" />
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
