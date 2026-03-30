'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

/* ═══ 데이터 ═══ */

interface PhaseFinance {
  items: { label: string; tag: string; value: string }[];
  totalInvest: string;
  totalUnit: string;
  annual: string;
  annualUnit: string;
  cumulative: string;
  cumulativeUnit: string;
}

interface PhaseData {
  year: string;
  highlight: string;
  desc: string;
  map: string;
  mapAlt: string;
  mapOpacity: number;
  stats: { value: string; unit: string }[];
  finance: PhaseFinance;
}

const PHASES: PhaseData[] = [
  {
    year: '2027',
    highlight: '600m 반경',
    desc: '부분적 실증',
    map: '/images/busniess/11.png',
    mapAlt: '홍성읍 600m 반경',
    mapOpacity: 0.3,
    stats: [
      { value: '16', unit: 'km' },
      { value: '50', unit: ' 대' },
      { value: '1300', unit: '명' },
    ],
    finance: {
      items: [
        { label: '스마트레인', tag: '투자', value: '9.6억' },
        { label: '교통복지비', tag: '감축', value: '7.5억' },
        { label: '공유 PM', tag: '투자', value: '2.5억' },
        { label: '사회복지비', tag: '감축', value: '8억' },
        { label: '관리운영', tag: '투자', value: '0.5억' },
        { label: '부가서비스', tag: '수익', value: '9억' },
      ],
      totalInvest: '12.6', totalUnit: '억 원',
      annual: '22.5', annualUnit: '억 원',
      cumulative: '112.5', cumulativeUnit: '억 원',
    },
  },
  {
    year: '2028',
    highlight: '2km 반경',
    desc: '전범위 실증',
    map: '/images/busniess/12.png',
    mapAlt: '홍성군 2km 반경',
    mapOpacity: 1,
    stats: [
      { value: '110', unit: 'km' },
      { value: '1000', unit: ' 대' },
      { value: '2.7만', unit: ' 명' },
    ],
    finance: {
      items: [
        { label: '스마트레인', tag: '투자', value: '67억' },
        { label: '교통복지비', tag: '감축', value: '150억' },
        { label: '공유 PM', tag: '투자', value: '50억' },
        { label: '사회복지비', tag: '감축', value: '160억' },
        { label: '관리운영', tag: '투자', value: '5억' },
        { label: '부가서비스', tag: '수익', value: '180억' },
      ],
      totalInvest: '122', totalUnit: '억 원',
      annual: '490', annualUnit: '억 원',
      cumulative: '2450', cumulativeUnit: '억 원',
    },
  },
  {
    year: '2030',
    highlight: '89개군',
    desc: '확장',
    map: '/images/busniess/13.png',
    mapAlt: '전국 89개 중소도시',
    mapOpacity: 1,
    stats: [
      { value: '6930', unit: 'km' },
      { value: '63000', unit: ' 대' },
      { value: '171만', unit: ' 명' },
    ],
    finance: {
      items: [
        { label: '스마트레인', tag: '투자', value: '4220억' },
        { label: '교통복지비', tag: '감축', value: '1조' },
        { label: '공유 PM', tag: '투자', value: '1890억' },
        { label: '사회복지비', tag: '감축', value: '1조' },
        { label: '관리운영', tag: '투자', value: '100억' },
        { label: '부가서비스', tag: '수익', value: '1.1조' },
      ],
      totalInvest: '0.6', totalUnit: '조 원',
      annual: '3.1', annualUnit: '조 원',
      cumulative: '15.5', cumulativeUnit: '조 원',
    },
  },
];

/* ═══ Phase 카드 컴포넌트 ═══ */
function PhaseCard({ phase, className = '' }: { phase: PhaseData; className?: string }) {
  return (
    <div className={`flex flex-col gap-[clamp(12px,1.5vw,20px)] ${className}`}>
      {/* 연도 뱃지 */}
      <span className="business-badge self-start">{phase.year}</span>

      {/* 설명 */}
      <p className="business-phase-desc">
        <span className="text-[var(--color-blue)]">{phase.highlight}</span> {phase.desc}
      </p>

      {/* 지도 + 통계 */}
      <div className="flex items-start gap-[clamp(12px,1.5vw,24px)]">
        <div className="relative w-[45%] aspect-square shrink-0">
          <Image
            src={phase.map} alt={phase.mapAlt} fill
            className="object-contain"
            style={{ opacity: phase.mapOpacity }}
            sizes="(max-width: 768px) 40vw, 15vw"
          />
        </div>
        <div className="flex flex-col gap-1 pt-1">
          {phase.stats.map((s) => (
            <p key={s.unit} className="business-stat">
              {s.value}<span className="business-stat-unit">{s.unit}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Glassmorphism 재무 카드 */}
      <div className="glass-card p-[clamp(12px,1.2vw,20px)]">
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          {phase.finance.items.map((item) => (
            <div key={`${item.label}-${item.tag}`} className="flex items-baseline justify-between">
              <span className="business-card-label">{item.label} <span className="business-card-tag">{item.tag}</span></span>
              <span className="business-card-value">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="h-px bg-[rgba(49,49,49,0.1)] my-2" />

        {/* 총계 */}
        <div className="flex items-baseline gap-1.5">
          <span className="business-card-total">{phase.finance.totalInvest}</span>
          <span className="business-card-label">{phase.finance.totalUnit}</span>
          <span className="business-card-note">1회성 투자</span>
          <span className="text-[clamp(10px,0.9vw,14px)] mx-1">➜</span>
          <span className="business-card-label">연</span>
          <span className="business-card-total">{phase.finance.annual}</span>
          <span className="business-card-label">{phase.finance.annualUnit}</span>
        </div>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="business-card-label">5년누적</span>
          <span className="business-card-total">{phase.finance.cumulative}</span>
          <span className="business-card-label">{phase.finance.cumulativeUnit}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══ 메인 컴포넌트 ═══ */
export function BusinessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* 헤더 fade */
      section.querySelectorAll<HTMLElement>('.biz-f').forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' } },
        );
      });

      /* 3개 row를 순차 등장 — pin 대신 간단한 stagger로 겹침 방지 */
      const rows = section.querySelectorAll<HTMLElement>('.biz-row');
      rows.forEach((row, i) => {
        if (i === 0) return; // 첫번째는 보이는 상태
        gsap.fromTo(row,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 85%' },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="business" className="relative bg-white overflow-hidden py-[10vw]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-[5%]">

        <h2 className="biz-f business-heading text-center">
          로컬 실증에서 글로벌 확장까지
        </h2>

        {/* ── Row 1: 2027만 ── */}
        <div className="biz-row mt-[5vw]">
          <div className="flex items-start gap-[2vw]">
            {/* 2027 뱃지 + 타임라인 */}
            <div className="flex items-center gap-3 mb-4">
              <span className="business-badge">2027</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PhaseCard phase={PHASES[0]} />
          </div>
        </div>

        {/* ── Row 2: 2027 + 2028 ── */}
        <div className="biz-row mt-[8vw]">
          <div className="flex items-center gap-3 mb-4">
            <span className="business-badge">2027</span>
            <div className="hidden md:block w-[clamp(60px,8vw,120px)] h-0.5 bg-[var(--color-blue)] relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-blue)]" />
            </div>
            <span className="business-badge">2028</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-[66%]">
            <PhaseCard phase={PHASES[0]} />
            <PhaseCard phase={PHASES[1]} />
          </div>
        </div>

        {/* ── Row 3: 2027 + 2028 + 2030 (풀 타임라인) ── */}
        <div className="biz-row mt-[8vw]">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="business-badge">2027</span>
            <div className="hidden md:block w-[clamp(60px,8vw,120px)] h-0.5 bg-[var(--color-blue)] relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-blue)]" />
            </div>
            <span className="business-badge">2028</span>
            <div className="hidden md:block w-[clamp(60px,8vw,120px)] h-0.5 bg-[var(--color-blue)] relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-blue)]" />
            </div>
            <span className="business-badge">2030</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PhaseCard phase={PHASES[0]} />
            <PhaseCard phase={PHASES[1]} />
            <PhaseCard phase={PHASES[2]} />
          </div>
        </div>

      </div>
    </section>
  );
}
