'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  { label: '1회 충전 주행거리', value: '140', unit: 'km' },
  { label: '무료 탑승 횟수', value: '∞', unit: '회' },
  { label: '대당가격', value: '300', unit: '만원' },
];

const FEATURES = [
  { text: '정해진 길을 자동으로 따라가는 ', bold: '스마트 레인 주행' },
  { text: '집 앞에서 목적지까지 ', bold: '기다림 없는', after: ' 이동 경험' },
  { text: '사용자 건강/기분 ', bold: '데이터를 기반으로 한 여정', after: ' 제안' },
  { text: '119 자동 신고 및 ', bold: '실시간 모니터링 시스템 ', after: '탑재' },
];

const DIMENSIONS = [
  { label: '전폭', value: '700' },
  { label: '전고', value: '1330' },
  { label: '전장', value: '1280' },
  { label: '시트높이', value: '625' },
];

export function BilinyProductSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.biliny-label', {
      scrollTrigger: { trigger: '.biliny-label', start: 'top 85%' },
      y: 20, opacity: 0, duration: 0.6,
    });

    gsap.from('.biliny-title', {
      scrollTrigger: { trigger: '.biliny-title', start: 'top 85%' },
      y: 30, opacity: 0, duration: 0.8,
    });

    gsap.from('.biliny-spec', {
      scrollTrigger: { trigger: '.biliny-specs', start: 'top 80%' },
      y: 30, opacity: 0, stagger: 0.1, duration: 0.6,
    });

    gsap.from('.biliny-feature', {
      scrollTrigger: { trigger: '.biliny-features', start: 'top 80%' },
      x: -20, opacity: 0, stagger: 0.1, duration: 0.5,
    });

    gsap.from('.biliny-design-item', {
      scrollTrigger: { trigger: '.biliny-design-section', start: 'top 80%' },
      y: 50, opacity: 0, stagger: 0.15, duration: 0.7,
    });

    gsap.from('.biliny-speed-item', {
      scrollTrigger: { trigger: '.biliny-speed', start: 'top 80%' },
      y: 40, opacity: 0, stagger: 0.2, duration: 0.7,
    });

    gsap.from('.biliny-overview', {
      scrollTrigger: { trigger: '.biliny-overview', start: 'top 80%' },
      scale: 0.95, opacity: 0, duration: 0.8,
    });

    gsap.from('.biliny-dim', {
      scrollTrigger: { trigger: '.biliny-dims', start: 'top 80%' },
      y: 30, opacity: 0, stagger: 0.1, duration: 0.5,
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="biliny" className="py-20 md:py-32 px-5 md:px-10">
      <div className="mx-auto max-w-5xl">

        {/* ── LINE-UP Header ── */}
        <div className="mb-12">
          <p className="biliny-label text-xs font-bold tracking-[0.3em] text-[var(--color-accent-dark)] uppercase">
            LINE-UP
          </p>
          <p className="biliny-title mt-2 text-sm md:text-base tracking-[0.11em] text-[var(--color-text)]">
            이동의 자유를 나누는
          </p>
          <h2 className="biliny-title text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.05em] text-[var(--color-text)]">
            스마트 모빌리티 생태계
          </h2>
        </div>

        {/* ── Product Info ── */}
        <div className="mb-16">
          <h3 className="text-lg md:text-xl font-bold tracking-[0.1em] text-[var(--color-text)]">
            공유형 시니어 PM &apos;빌리니&apos;
          </h3>
          <p className="mt-3 text-xs md:text-sm leading-relaxed max-w-md text-[var(--color-feature-text)]">
            사계절 기후에 대응하는 4면 커버형 디자인과 스마트 레인 기반의
            저속 자율주행이 결합된 고령자 특화 이동수단입니다.
          </p>
        </div>

        {/* ── Product Image + Specs ── */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Product image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--color-bg-subtle)]">
            <Image
              src="/images/product-lineup.png"
              alt="빌리니 제품"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Specs and features */}
          <div>
            <div className="biliny-specs space-y-4 mb-8">
              {SPECS.map((spec) => (
                <div key={spec.label} className="biliny-spec flex items-baseline justify-between border-b border-[var(--color-border)] pb-3">
                  <span className="text-xs text-[var(--color-spec-text)]">
                    {spec.label}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
                      {spec.value}
                    </span>
                    <span className="text-sm font-bold text-[var(--color-spec-text)]">
                      {spec.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="biliny-features space-y-3">
              {FEATURES.map((feature, i) => (
                <div key={i} className="biliny-feature flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--color-accent-dark)] shrink-0" />
                  <p className="text-xs leading-relaxed text-[var(--color-feature-text)]">
                    {feature.text}
                    <strong className="font-bold">{feature.bold}</strong>
                    {feature.after}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Design Section ── */}
        <div className="biliny-design-section mt-24">
          <p className="text-xs font-medium text-[var(--color-label-gray)] mb-8">
            Design
          </p>

          {/* Design item 1: 위에서 아래로 */}
          <div className="biliny-design-item mb-16">
            <p className="text-sm text-[var(--color-text-secondary)]">위에서 아래로,</p>
            <p className="text-base md:text-lg font-bold text-[var(--color-text)] mt-1">
              스스로 이동할땐 부담없는 크기로
            </p>
            <div className="mt-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-bg-subtle)]">
              <Image
                src="/images/biliny-top-view.png"
                alt="빌리니 위에서 본 모습"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </div>

          {/* Design item 2: 아래에서 위로 */}
          <div className="biliny-design-item mb-16">
            <p className="text-sm text-[var(--color-text-secondary)]">아래에서 위로,</p>
            <p className="text-base md:text-lg font-bold text-[var(--color-text)] mt-1">
              안전을 위해 누구에게나 눈에 띄도록
            </p>
            <div className="mt-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-bg-subtle)]">
              <Image
                src="/images/biliny-quarter.png"
                alt="빌리니 아래에서 본 모습"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </div>
        </div>

        {/* ── Speed Section ── */}
        <div className="biliny-speed mt-16">
          {/* 앉아서 */}
          <div className="biliny-speed-item mb-12">
            <p className="text-lg font-bold text-[var(--color-text)]">앉아서</p>
            <p className="text-sm text-[var(--color-text-secondary)]">천천히 뛰는 속도에서</p>
            <p className="text-3xl md:text-4xl font-black text-[var(--color-text)] mt-2">
              최대시속 13km
            </p>
            <div className="mt-6 relative aspect-video rounded-2xl overflow-hidden bg-[var(--color-bg-subtle)]">
              <Image
                src="/images/vehicle-road-2.png"
                alt="앉아서 주행"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </div>

          {/* 서서 */}
          <div className="biliny-speed-item mb-12">
            <p className="text-lg font-bold text-[var(--color-text)]">서서</p>
            <p className="text-sm text-[var(--color-text-secondary)]">빠르게 달리는 속도까지</p>
            <p className="text-3xl md:text-4xl font-black text-[var(--color-text)] mt-2">
              최대시속 25km
            </p>
            <div className="mt-6 relative aspect-video rounded-2xl overflow-hidden bg-[var(--color-bg-subtle)]">
              <Image
                src="/images/vehicle-road-1.png"
                alt="서서 주행"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </div>

          {/* 안전한 길 */}
          <div className="biliny-speed-item">
            <p className="text-lg font-bold text-[var(--color-text)]">안전한 길을 따라</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              쉽고 배려있는 주행 문화를 만들다.
            </p>
            <div className="mt-6 space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-[var(--color-bg-subtle)]">
                <Image
                  src="/images/vehicle-road-3.png"
                  alt="안전한 스마트 레인"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Over View / 360° ── */}
        <div className="biliny-overview mt-24">
          <p className="text-xs font-medium text-[var(--color-label-gray)] mb-4">
            Over View
          </p>
          <p className="text-5xl md:text-6xl font-black text-[var(--color-text)]">
            360°
          </p>
          <p className="text-xl md:text-2xl font-bold text-[var(--color-text)] mt-1">
            빌리니 둘러보기
          </p>
          <div className="mt-8 relative aspect-square max-w-lg rounded-2xl overflow-hidden bg-[var(--color-bg-subtle)]">
            <Image
              src="/images/biliny-360.png"
              alt="빌리니 360도 뷰"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
        </div>

        {/* ── Size / Dimensions ── */}
        <div className="mt-24">
          <p className="text-xs font-medium text-[var(--color-label-gray)] mb-2">
            Size
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
            엘레베이터도 들어갈 수 있는 사이즈
          </h3>

          {/* Elevator + orthographic views */}
          <div className="mt-8 relative aspect-[3/2] rounded-2xl overflow-hidden bg-[var(--color-bg-subtle)]">
            <Image
              src="/images/elevator.png"
              alt="엘리베이터 사이즈 비교"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>

          {/* Orthographic views */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: '/images/orth-front.png', alt: '정면' },
              { src: '/images/orth-side.png', alt: '측면' },
              { src: '/images/orth-back.png', alt: '후면' },
              { src: '/images/orth-top.png', alt: '상면' },
            ].map((view) => (
              <div key={view.alt} className="relative aspect-square rounded-xl overflow-hidden bg-[var(--color-bg-subtle)]">
                <Image
                  src={view.src}
                  alt={view.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>

          {/* Dimension numbers */}
          <div className="biliny-dims mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {DIMENSIONS.map((dim) => (
              <div key={dim.label} className="biliny-dim text-center rounded-xl bg-[var(--color-bg-subtle)] p-5">
                <p className="text-xs text-[var(--color-text-secondary)]">{dim.label}</p>
                <p className="mt-1 text-2xl font-black text-[var(--color-text)]">
                  {dim.value}
                  <span className="text-xs font-normal ml-0.5 text-[var(--color-text-secondary)]">mm</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
