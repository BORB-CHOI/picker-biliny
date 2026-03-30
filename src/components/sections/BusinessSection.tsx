'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

/* ── Phase 데이터 ── */
interface PhaseFinance {
  smartlane: string;
  welfare: string;
  social: string;
  pm: string;
  service: string;
  operation: string;
  totalInvest: string;
  annual: string;
  cumulative: string;
  unit: string; // '억' or '조'
}

interface PhaseData {
  year: string;
  description: string;
  highlight: string;
  map: string;
  mapAlt: string;
  mapOpacity: number;
  stats: { km: string; units: string; users: string };
  finance: PhaseFinance;
}

const PHASES: PhaseData[] = [
  {
    year: '2027',
    description: '부분적 실증',
    highlight: '600m 반경',
    map: '/images/busniess/11.png',
    mapAlt: '홍성읍 600m 반경 서비스 지역',
    mapOpacity: 0.3,
    stats: { km: '16', units: '50', users: '1300' },
    finance: {
      smartlane: '9.6', welfare: '7.5', social: '8',
      pm: '2.5', service: '9', operation: '0.5',
      totalInvest: '12.6', annual: '22.5', cumulative: '112.5',
      unit: '억',
    },
  },
  {
    year: '2028',
    description: '전범위 실증',
    highlight: '2km 반경',
    map: '/images/busniess/12.png',
    mapAlt: '홍성군 2km 반경 서비스 지역',
    mapOpacity: 1,
    stats: { km: '110', units: '1000', users: '2.7만' },
    finance: {
      smartlane: '67', welfare: '150', social: '160',
      pm: '50', service: '180', operation: '5',
      totalInvest: '122', annual: '490', cumulative: '2450',
      unit: '억',
    },
  },
  {
    year: '2030',
    description: '확장',
    highlight: '89개군',
    map: '/images/busniess/13.png',
    mapAlt: '전국 인구감소 중소도시 89개군',
    mapOpacity: 1,
    stats: { km: '6930', units: '63000', users: '171만' },
    finance: {
      smartlane: '4220', welfare: '1조', social: '1조',
      pm: '1890', service: '1.1조', operation: '100',
      totalInvest: '0.6', annual: '3.1', cumulative: '15.5',
      unit: '조',
    },
  },
];

/* ── 재무 카드 행 ── */
function FinanceRow({ label, tag, value, unit }: { label: string; tag: string; value: string; unit: string }) {
  const isLargeUnit = value.includes('조');
  const displayValue = isLargeUnit ? value : value;
  const displayUnit = isLargeUnit ? '' : ` ${unit}`;
  return (
    <div className="flex items-baseline justify-between">
      <div className="flex items-center gap-[0.4vw]">
        <span className="business-card-label">{label}</span>
        <span className="text-[clamp(7px,0.55vw,9px)] text-[rgba(49,49,49,0.5)]">{tag}</span>
      </div>
      <span className="business-card-value">{displayValue}{displayUnit}</span>
    </div>
  );
}

export function BusinessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinContainer = pinRef.current;
      if (!section || !pinContainer) return;

      const phases = pinContainer.querySelectorAll<HTMLElement>('.biz-phase');
      if (phases.length < 3) return;

      // 헤더 fade
      section.querySelectorAll<HTMLElement>('.biz-f').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' } },
        );
      });

      // 모바일에서는 pin 없이 stagger만
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Phase 2, 3 초기 숨김
        gsap.set(phases[1], { xPercent: 30, opacity: 0 });
        gsap.set(phases[2], { xPercent: 60, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinContainer,
            start: 'top 15%',
            end: '+=200%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Phase 2 등장 (0~0.4)
        tl.to(phases[1], { xPercent: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0);

        // Phase 3 등장 (0.4~0.8)
        tl.to(phases[2], { xPercent: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.4);
      });

      mm.add('(max-width: 1023px)', () => {
        phases.forEach((phase, i) => {
          if (i === 0) return;
          gsap.fromTo(
            phase,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: { trigger: phase, start: 'top 85%' },
            },
          );
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="business" className="relative bg-white overflow-hidden py-[10vw] md:py-[8vw]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">

        {/* 섹션 헤더 */}
        <h2 className="biz-f business-heading text-center">
          로컬 실증에서 글로벌 확장까지
        </h2>

        {/* 타임라인 Pin 컨테이너 */}
        <div ref={pinRef} className="mt-[5vw]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2vw] items-start">
            {PHASES.map((phase, i) => (
              <div key={phase.year} className="biz-phase flex flex-col gap-[1.5vw]">

                {/* 연도 뱃지 + 연결선 */}
                <div className="flex items-center gap-[1vw]">
                  <span className="business-phase-badge">{phase.year}</span>
                  {i < PHASES.length - 1 && (
                    <div className="hidden lg:block flex-1 h-[2px] bg-[var(--color-blue)] relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full bg-[var(--color-blue)]" />
                    </div>
                  )}
                </div>

                {/* Phase 설명 */}
                <p className="business-phase-title">
                  <span className="text-[var(--color-blue)]">{phase.highlight}</span> {phase.description}
                </p>

                {/* 지도 + 통계 */}
                <div className="flex items-start gap-[1.5vw]">
                  <div className="relative w-[45%] aspect-square flex-shrink-0">
                    <Image
                      src={phase.map}
                      alt={phase.mapAlt}
                      fill
                      className="object-contain"
                      style={{ opacity: phase.mapOpacity }}
                      sizes="(max-width: 768px) 45vw, 15vw"
                    />
                  </div>
                  <div className="flex flex-col gap-[0.5vw] pt-[0.5vw]">
                    <p className="business-stat-number">
                      {phase.stats.km}<span className="business-stat-unit">km</span>
                    </p>
                    <p className="business-stat-number">
                      {phase.stats.units} <span className="business-stat-unit">대</span>
                    </p>
                    <p className="business-stat-number">
                      {phase.stats.users}<span className="business-stat-unit">명</span>
                    </p>
                  </div>
                </div>

                {/* Glassmorphism 재무 카드 */}
                <div className="business-card">
                  {/* 블러 배경 데코 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />

                  <div className="relative space-y-[0.6vw]">
                    {/* 투자/감축/수익 행 */}
                    <div className="grid grid-cols-2 gap-x-[1vw] gap-y-[0.4vw]">
                      <FinanceRow label="스마트레인" tag="투자" value={phase.finance.smartlane} unit="억" />
                      <FinanceRow label="교통복지비" tag="감축" value={phase.finance.welfare} unit="억" />
                      <FinanceRow label="공유 PM" tag="투자" value={phase.finance.pm} unit="억" />
                      <FinanceRow label="사회복지비" tag="감축" value={phase.finance.social} unit="억" />
                      <FinanceRow label="관리운영" tag="투자" value={phase.finance.operation} unit="억" />
                      <FinanceRow label="부가서비스" tag="수익" value={phase.finance.service} unit="억" />
                    </div>

                    {/* 구분선 */}
                    <div className="h-[1px] bg-[rgba(49,49,49,0.1)] my-[0.5vw]" />

                    {/* 총계 */}
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="business-card-total">{phase.finance.totalInvest}</span>
                        <span className="business-card-label ml-[0.2vw]">{phase.finance.unit} 원</span>
                        <span className="text-[clamp(8px,0.6vw,10px)] font-bold text-[var(--color-text-tertiary)] ml-[0.3vw]">1회성 투자</span>
                      </div>
                      <span className="text-[clamp(12px,1vw,16px)]">➜</span>
                    </div>

                    <div className="flex items-baseline gap-[1vw]">
                      <div>
                        <span className="business-card-label">연 </span>
                        <span className="business-card-total">{phase.finance.annual}</span>
                        <span className="business-card-label"> {phase.finance.unit} 원</span>
                      </div>
                    </div>

                    <div>
                      <span className="business-card-label">5년누적 </span>
                      <span className="business-card-total">{phase.finance.cumulative}</span>
                      <span className="business-card-label"> {phase.finance.unit} 원</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
