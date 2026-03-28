'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  { label: '1회 충전 주행거리', value: '250', unit: 'km' },
  { label: '무료 탑승 횟수', value: '∞', unit: '회' },
  { label: '대당가격', value: '500', unit: '만원' },
];

const FEATURES = [
  { text: '정해진 길을 자동으로 따라가는 ', bold: '스마트 레인 주행' },
  { text: '집 앞에서 목적지까지 ', bold: '기다림 없는', after: ' 이동 경험' },
  { text: '사용자 건강/기분 ', bold: '데이터를 기반으로 한 여정', after: ' 제안' },
  { text: '119 자동 신고 및 ', bold: '실시간 모니터링 시스템 ', after: '탑재' },
];

const DESIGN_HIGHLIGHTS = [
  { title: '모든 면으로 보호', desc: '어떤 계절과 상황에도 대응이 강한' },
  { title: '완전한 대칭', desc: '극단적으로 효율적인' },
  { title: '쉬운 용도 변경', desc: '다양한 목적으로 사용범위가 넓은' },
  { title: '1인승에서 4인승까지', desc: '어린아이부터 고령자까지 모두를 품는' },
  { title: '넉넉한 내부공간', desc: '여행, 운송에도 거뜬 없는' },
  { title: '일까지 잘하는 트리니 플랫폼', desc: '무엇을 붙여도 그에 맞게 일을 수행하는' },
  { title: '인프라를 자동 관리하는 솔루션', desc: '도로선 보수, 청소, 도로 검사까지' },
];

const DIMENSIONS = [
  { label: '전폭', value: '1200' },
  { label: '전장', value: '1850' },
  { label: '전고', value: '1550' },
  { label: '시트높이', value: '955' },
];

export function TrinyProductSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.triny-label', {
      scrollTrigger: { trigger: '.triny-label', start: 'top 85%' },
      y: 20, opacity: 0, duration: 0.6,
    });

    gsap.from('.triny-title', {
      scrollTrigger: { trigger: '.triny-title', start: 'top 85%' },
      y: 30, opacity: 0, duration: 0.8,
    });

    gsap.from('.triny-spec', {
      scrollTrigger: { trigger: '.triny-specs', start: 'top 80%' },
      y: 30, opacity: 0, stagger: 0.1, duration: 0.6,
    });

    gsap.from('.triny-highlight', {
      scrollTrigger: { trigger: '.triny-highlights', start: 'top 80%' },
      y: 40, opacity: 0, stagger: 0.08, duration: 0.5,
    });

    gsap.from('.triny-dim', {
      scrollTrigger: { trigger: '.triny-dims', start: 'top 80%' },
      scale: 0.9, opacity: 0, stagger: 0.1, duration: 0.5,
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="triny" className="py-24 md:py-40 px-5 md:px-10 bg-[var(--color-bg-subtle)]">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <p
            className="triny-label text-xs font-bold tracking-[0.55em] uppercase mb-3"
            style={{ color: 'var(--color-accent-dark)' }}
          >
            LINE-UP
          </p>
          <p
            className="triny-title text-sm md:text-base tracking-[0.05em]"
            style={{ color: 'var(--color-text)' }}
          >
            이동의 자유를 나누는
          </p>
          <h2
            className="triny-title text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.05em] mt-1"
            style={{ color: 'var(--color-text)' }}
          >
            스마트 모빌리티 생태계
          </h2>
          <p
            className="triny-title text-base md:text-lg font-bold tracking-[0.1em] mt-4"
            style={{ color: 'var(--color-text)' }}
          >
            다목적 플랫폼 &apos;트리니&apos;
          </p>
          <p
            className="mt-3 text-xs md:text-sm leading-relaxed max-w-md"
            style={{ color: 'var(--color-feature-text)' }}
          >
            초소형 다용성 모빌리티 플랫폼으로, 캐빈 결합과 로봇암 장착 등을 통해
            도시 관리의 모든 수요를 대응합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Product image placeholder */}
          <div>
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-white to-[var(--color-border)] flex items-center justify-center">
              <p className="text-[var(--color-text-secondary)] text-sm">트리니 제품 이미지</p>
            </div>
          </div>

          {/* Specs and features */}
          <div>
            <div className="triny-specs space-y-4 mb-8">
              {SPECS.map((spec) => (
                <div key={spec.label} className="triny-spec flex items-baseline justify-between">
                  <span
                    className="text-xs"
                    style={{ color: 'var(--color-spec-text)' }}
                  >
                    {spec.label}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
                      {spec.value}
                    </span>
                    <span className="text-sm font-bold" style={{ color: 'var(--color-spec-text)' }}>
                      {spec.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {FEATURES.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span
                    className="mt-1.5 h-2 w-2 rounded-full shrink-0"
                    style={{ background: 'var(--color-accent-dark)' }}
                  />
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-feature-text)' }}>
                    {feature.text}
                    <strong className="font-bold">{feature.bold}</strong>
                    {feature.after}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Design section label */}
        <div className="mt-24 mb-4">
          <p className="text-xs font-medium" style={{ color: 'var(--color-label-gray)' }}>
            Design
          </p>
        </div>

        {/* Design highlights */}
        <div className="triny-highlights space-y-12 md:space-y-16">
          {DESIGN_HIGHLIGHTS.map((item) => (
            <div key={item.title} className="triny-highlight text-center">
              <h3 className="text-lg md:text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                {item.title}
              </h3>
              <p
                className="mt-1 text-xs tracking-[0.11em]"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {item.desc}
              </p>
              <div className="mt-6 mx-auto max-w-xs aspect-square rounded-2xl bg-gradient-to-br from-white to-[var(--color-border)] flex items-center justify-center">
                <p className="text-xs text-[var(--color-text-secondary)]">제품 이미지</p>
              </div>
            </div>
          ))}
        </div>

        {/* 360 view section */}
        <div className="mt-24 text-center">
          <p className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
            360°
          </p>
          <p className="text-lg md:text-xl font-bold mt-1" style={{ color: 'var(--color-text)' }}>
            빌리니 둘러보기
          </p>
          <div className="mt-8 mx-auto max-w-md aspect-square rounded-3xl bg-gradient-to-br from-white to-[var(--color-border)] flex items-center justify-center">
            <p className="text-xs text-[var(--color-text-secondary)]">360° 뷰어</p>
          </div>
        </div>

        {/* Over View section */}
        <div className="mt-24">
          <p className="text-xs font-medium mb-4" style={{ color: 'var(--color-label-gray)' }}>
            Over View
          </p>
          <div className="mx-auto max-w-md aspect-video rounded-2xl bg-gradient-to-br from-white to-[var(--color-border)] flex items-center justify-center">
            <p className="text-xs text-[var(--color-text-secondary)]">전체 모습</p>
          </div>
        </div>

        {/* Size section */}
        <div className="mt-24">
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-label-gray)' }}>
            Size
          </p>
          <p className="text-lg md:text-xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>
            단지 내 모든 길을 돌아다닐 수 있는 사이즈
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Dimension diagram placeholder */}
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-white to-[var(--color-border)] flex items-center justify-center">
              <p className="text-xs text-[var(--color-text-secondary)]">치수 도면</p>
            </div>

            {/* Dimensions */}
            <div className="triny-dims grid grid-cols-2 gap-4">
              {DIMENSIONS.map((dim) => (
                <div
                  key={dim.label}
                  className="triny-dim rounded-xl p-5 text-center"
                  style={{ background: 'white' }}
                >
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {dim.label}
                  </p>
                  <p className="mt-1 text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                    {dim.value}
                    <span className="text-xs font-normal ml-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                      mm
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
