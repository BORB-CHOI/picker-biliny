'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

/**
 * BusinessSection — Figma node 4123:3565
 *
 * 사회적 비용 (310억) → 예산 현실 점검 → 3대 솔루션 스펙 →
 * 시티 케어 수익 모델 → 2600% ROI → 2027→2030 확장 로드맵
 */

/* ── 비용 카테고리 ── */
const COST_TAGS = ['복지버스', '복지택시', '우울증', '요양시설 가속'] as const;

/* ── 3대 솔루션 스펙 ── */
const SPECS = [
  {
    label: '공유형 PM \'BILINY\'',
    features: ['사계절 기후 대응형 1인승 퍼스널 모빌리티', '저속 자율주행'],
    img: '/images/busniess/5.png',
    alt: 'BILINY PM 제품',
    stat: '50 대',
  },
  {
    label: '케어워치',
    features: ['이동 현황 모니터링', '안심 케어', '119 자동 신고 기능', '컨디션 맞춤 목적지 제안 기능'],
    img: '/images/busniess/7.png',
    alt: '케어워치 스마트워치',
    stat: '1300 개',
  },
  {
    label: '스마트 레인',
    features: ['시각 인식 기반 저비용 유도 주행', '태양광 야간 시인성 확보 및 보행자 안전 경계선 기능'],
    img: '/images/busniess/6.png',
    alt: '스마트 레인 인프라 다이어그램',
    stat: '',
  },
] as const;

/* ── 시티케어 수익 블록 ── */
const REVENUE_BLOCKS = [
  {
    title: '중단거리 출퇴근 / 학교·학원 등하교',
    detail: '출/퇴근 이동 3회, 등/하원 3회, 점심시간 단거리 이동 2회',
    amount: '일 1.45만 원',
    img: '/images/busniess/9.png',
    alt: '출퇴근 이용 장면',
  },
  {
    title: '점심시간 단거리 이동 / 퀵 배달·배송서비스',
    detail: '퀵 배달 2회, 저녁심야배송 3회',
    amount: '일 2.6만 원',
    img: '/images/busniess/10.png',
    alt: '배달 서비스 장면',
  },
  {
    title: '야간순찰 / 대리기사 복귀 이동수단',
    detail: '야간순찰 3시간, 대리기사이송 1회',
    amount: '일 0.6만 원',
    img: '/images/busniess/8.png',
    alt: '야간 순찰 장면',
  },
] as const;

/* ── 로드맵 Phase ── */
const PHASES = [
  {
    year: '2027',
    highlight: '600m 반경',
    desc: '부분적 실증',
    map: '/images/busniess/11.png',
    mapAlt: '홍성읍 600m 반경',
    mapOpacity: 0.3,
    stats: [{ v: '16', u: 'km' }, { v: '50', u: ' 대' }, { v: '1300', u: '명' }],
    finance: {
      rows: [
        { label: '스마트레인', tag: '투자', val: '9.6억' },
        { label: '교통복지비', tag: '감축', val: '7.5억' },
        { label: '공유 PM', tag: '투자', val: '2.5억' },
        { label: '사회복지비', tag: '감축', val: '8억' },
        { label: '관리운영', tag: '투자', val: '0.5억' },
        { label: '부가서비스', tag: '수익', val: '9억' },
      ],
      invest: '12.6', investU: '억 원',
      annual: '22.5', annualU: '억 원',
      cum: '112.5', cumU: '억 원',
    },
  },
  {
    year: '2028',
    highlight: '2km 반경',
    desc: '전범위 실증',
    map: '/images/busniess/12.png',
    mapAlt: '홍성군 2km 반경',
    mapOpacity: 1,
    stats: [{ v: '110', u: 'km' }, { v: '1000', u: ' 대' }, { v: '2.7만', u: ' 명' }],
    finance: {
      rows: [
        { label: '스마트레인', tag: '투자', val: '67억' },
        { label: '교통복지비', tag: '감축', val: '150억' },
        { label: '공유 PM', tag: '투자', val: '50억' },
        { label: '사회복지비', tag: '감축', val: '160억' },
        { label: '관리운영', tag: '투자', val: '5억' },
        { label: '부가서비스', tag: '수익', val: '180억' },
      ],
      invest: '122', investU: '억 원',
      annual: '490', annualU: '억 원',
      cum: '2450', cumU: '억 원',
    },
  },
  {
    year: '2030',
    highlight: '89개군',
    desc: '확장',
    map: '/images/busniess/14.png',
    mapAlt: '전국 89개 중소도시',
    mapOpacity: 1,
    stats: [{ v: '6930', u: 'km' }, { v: '63000', u: ' 대' }, { v: '171만', u: ' 명' }],
    finance: {
      rows: [
        { label: '스마트레인', tag: '투자', val: '4220억' },
        { label: '교통복지비', tag: '감축', val: '1조' },
        { label: '공유 PM', tag: '투자', val: '1890억' },
        { label: '사회복지비', tag: '감축', val: '1조' },
        { label: '관리운영', tag: '투자', val: '100억' },
        { label: '부가서비스', tag: '수익', val: '1.1조' },
      ],
      invest: '0.6', investU: '조 원',
      annual: '3.1', annualU: '조 원',
      cum: '15.5', cumU: '조 원',
    },
  },
] as const;

export function BusinessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const s = sectionRef.current;
      if (!s) return;

      s.querySelectorAll<HTMLElement>('.biz-r').forEach((el) => {
        gsap.fromTo(el,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' } });
      });

      s.querySelectorAll<HTMLElement>('.biz-f').forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' } });
      });

      s.querySelectorAll<HTMLElement>('.biz-i').forEach((el) => {
        gsap.fromTo(el, { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1.3, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%' } });
      });

      /* countUp */
      s.querySelectorAll<HTMLElement>('[data-biz-count]').forEach((el) => {
        const target = Number(el.dataset.bizCount);
        const suffix = el.dataset.bizSuffix ?? '';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate() { el.textContent = `${Math.round(obj.val).toLocaleString()}${suffix}`; },
        });
      });

      /* 로드맵 Row stagger */
      const rows = s.querySelectorAll<HTMLElement>('.biz-row');
      rows.forEach((row, i) => {
        if (i === 0) return;
        gsap.fromTo(row, { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 85%' } });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="business" className="relative overflow-hidden">

      {/* ═══ Part 1: 사회적 비용 — 다크 그라데이션 ═══ */}
      <div className="sol-section-dark">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 pt-[12vw] pb-[10vw]">
          <div className="text-center">
            <p className="biz-r text-[clamp(14px,1.3vw,20px)] font-medium text-[#a0a0a0] tracking-wider">
              이동권 박탈로 인해 발생하는
            </p>
            <h2 className="biz-r text-[clamp(28px,2.8vw,42px)] font-bold text-white tracking-wider mt-2">
              사회적 비용
            </h2>

            <div className="biz-f flex flex-wrap justify-center gap-3 mt-[4vw]">
              {COST_TAGS.map((t) => (
                <span key={t} className="text-[clamp(11px,1vw,16px)] font-medium text-[#999] border border-[#555] rounded-full px-4 py-1.5">{t}</span>
              ))}
            </div>

            <div className="mt-[5vw]">
              <p className="biz-r text-[clamp(14px,1.3vw,20px)] font-medium text-[#b0b0b0] tracking-wider">중소도시 당 연간</p>
              <p className="text-[clamp(48px,5.5vw,80px)] font-bold text-white leading-none mt-2" data-biz-count="310" data-biz-suffix="억">0억</p>
              <p className="biz-f text-[clamp(10px,0.8vw,13px)] text-[#888] mt-2">인구 10만명 미만 기준</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Part 2: 과연 현실적일까요? ═══ */}
      <div className="bg-white py-[10vw]">
        <div className="max-w-[1100px] mx-auto px-5 md:px-10 text-center">
          <h2 className="biz-r text-[clamp(28px,2.8vw,42px)] font-bold text-[var(--color-text)] tracking-wider">과연 현실적일까요?</h2>
          <p className="biz-r text-[clamp(14px,1.3vw,20px)] font-medium text-[var(--color-text-secondary)] tracking-wider mt-[2vw]">
            막대한 예산 투입, 그러나 여전한 이동의 고립
          </p>

          <div className="biz-f flex items-center justify-center gap-4 mt-[4vw]">
            <span className="text-[clamp(14px,1.3vw,20px)] font-medium text-[var(--color-text-secondary)]">실제 이용률은</span>
            <span className="text-[clamp(36px,4vw,60px)] font-bold text-[var(--color-blue)]">1/5</span>
          </div>

          <div className="biz-f mt-[6vw] bg-[var(--color-bg-subtle)] rounded-[clamp(16px,2vw,30px)] p-[clamp(24px,3vw,48px)] max-w-[800px] mx-auto">
            <p className="text-[clamp(18px,1.6vw,24px)] font-bold text-[var(--color-text-tertiary)]">
              예산 <span className="text-[var(--color-blue)]">10%</span>
              <span className="text-[clamp(14px,1.25vw,20px)] font-medium text-[var(--color-text-secondary)] ml-1">(150억)</span>
              만으로
            </p>
            <p className="text-[clamp(22px,2.2vw,34px)] font-bold text-[var(--color-text)] mt-3">
              새로운 이동수단 대안을 제공할 수 있습니다.
            </p>
            <p className="text-[clamp(10px,0.8vw,13px)] text-[#999] mt-4">
              홍성읍 중심지 600m 반경 고령자 1300명을 대상, 초기 서비스 도입 시뮬레이션
            </p>
          </div>
        </div>
      </div>

      {/* ═══ Part 3: 3대 솔루션 스펙 ═══ */}
      <div className="bg-white pb-[10vw]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SPECS.map((spec) => (
              <div key={spec.label} className="biz-i bg-[var(--color-bg-subtle)] rounded-[clamp(16px,2vw,30px)] overflow-hidden">
                <div className="relative w-full aspect-[5/3] bg-white flex items-center justify-center p-4">
                  <Image src={spec.img} alt={spec.alt} width={400} height={240} className="object-contain max-h-full" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <p className="text-[clamp(12px,1vw,16px)] font-bold text-[var(--color-blue)]">{spec.label}</p>
                  <ul className="mt-2 space-y-1">
                    {spec.features.map((f) => (
                      <li key={f} className="text-[clamp(12px,1vw,15px)] font-medium text-[var(--color-text-secondary)] flex items-start gap-1">
                        <span className="mt-[0.3em] text-[var(--color-blue)]">•</span><span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {spec.stat && (
                    <p className="mt-3 text-[clamp(18px,1.5vw,24px)] font-bold text-[var(--color-text-tertiary)]">{spec.stat}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Part 4: 시티 케어 솔루션 — 수익 모델 ═══ */}
      <div className="bg-[var(--color-bg-subtle)] py-[10vw]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10">
          <div className="text-center">
            <p className="biz-r text-[clamp(14px,1.3vw,20px)] font-medium text-[var(--color-text-secondary)] tracking-wider">자율주행이잖아?</p>
            <h2 className="biz-r text-[clamp(28px,2.8vw,42px)] font-bold text-[var(--color-text)] tracking-wider mt-2">게다가</h2>
            <p className="biz-f text-[clamp(16px,1.4vw,22px)] font-bold text-[var(--color-text-tertiary)] tracking-wider mt-[3vw]">
              <span className="text-[var(--color-blue)]">비활동시간</span> 추가 비즈니스를 통한 부가가치 확장
            </p>
          </div>

          <h3 className="biz-r text-[clamp(24px,2.4vw,36px)] font-bold text-[var(--color-text)] text-center mt-[6vw]">시티 케어 솔루션</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-[4vw]">
            {REVENUE_BLOCKS.map((b) => (
              <div key={b.title} className="biz-i bg-white rounded-[clamp(12px,1.5vw,22px)] overflow-hidden shadow-sm">
                <div className="relative w-full aspect-[2/1] overflow-hidden">
                  <Image src={b.img} alt={b.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <p className="text-[clamp(12px,1vw,15px)] font-bold text-[var(--color-text-tertiary)]">{b.title}</p>
                  <p className="text-[clamp(11px,0.9vw,14px)] font-medium text-[var(--color-text-secondary)] mt-1">{b.detail}</p>
                  <p className="mt-3 text-[clamp(16px,1.4vw,22px)] font-bold text-[var(--color-blue)]">{b.amount}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 수익 요약 */}
          <div className="biz-f flex flex-col md:flex-row items-center justify-center gap-[4vw] mt-[6vw]">
            <div className="text-center">
              <p className="text-[clamp(13px,1.1vw,17px)] font-medium text-[var(--color-text-secondary)]">연간 수익</p>
              <p className="text-[clamp(28px,3vw,44px)] font-bold text-[var(--color-text)]">2.7<span className="text-[0.6em] font-medium ml-0.5">억 원</span></p>
            </div>
            <div className="hidden md:block w-px h-12 bg-[var(--color-border)]" />
            <div className="text-center">
              <p className="text-[clamp(13px,1.1vw,17px)] font-medium text-[var(--color-text-secondary)]">순이익</p>
              <p className="text-[clamp(28px,3vw,44px)] font-bold text-[var(--color-text)]">1.1<span className="text-[0.6em] font-medium ml-0.5">억 원</span></p>
            </div>
            <p className="text-[clamp(10px,0.8vw,12px)] text-[#999]">*50대 운영기준</p>
          </div>
        </div>
      </div>

      {/* ═══ Part 5: 2600% ROI ═══ */}
      <div className="bg-white py-[10vw]">
        <div className="max-w-[1100px] mx-auto px-5 md:px-10 text-center">
          <p className="text-[clamp(48px,5.5vw,80px)] font-bold text-[var(--color-blue)] leading-none" data-biz-count="2600" data-biz-suffix="%">0%</p>
          <h2 className="biz-r text-[clamp(28px,2.8vw,42px)] font-bold text-[var(--color-text)] tracking-wider mt-2">을 이루는 솔루션</h2>

          <div className="biz-f mt-[5vw] grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[700px] mx-auto">
            {[
              { n: '스마트레인', v: '9.6' },
              { n: '공유 PM', v: '2.5' },
              { n: '관리운영', v: '0.5' },
            ].map((i) => (
              <div key={i.n} className="bg-[var(--color-bg-subtle)] rounded-[clamp(12px,1.5vw,22px)] p-5 text-center">
                <p className="text-[clamp(12px,1vw,15px)] font-medium text-[var(--color-text-secondary)]">{i.n}</p>
                <p className="text-[clamp(18px,1.6vw,24px)] font-bold text-[var(--color-text-tertiary)] mt-1">{i.v}<span className="text-[0.7em] font-medium">억</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Part 6: 로컬 → 글로벌 확장 로드맵 ═══ */}
      <div className="bg-white pb-[10vw]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-[5%]">
          <h2 className="biz-r text-[clamp(24px,2.4vw,36px)] font-bold text-[var(--color-text)] text-center tracking-wider">
            로컬 실증에서 글로벌 확장까지
          </h2>

          {/* Row 1: 2027만 */}
          <div className="biz-row mt-[5vw]">
            <div className="flex items-center gap-3 mb-4">
              <span className="business-badge">{PHASES[0].year}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PhaseCard phase={PHASES[0]} />
            </div>
          </div>

          {/* Row 2: 2027 + 2028 */}
          <div className="biz-row mt-[8vw]">
            <div className="flex items-center gap-3 mb-4">
              <span className="business-badge">{PHASES[0].year}</span>
              <div className="hidden md:block w-[clamp(60px,8vw,120px)] h-0.5 bg-[var(--color-blue)] relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-blue)]" />
              </div>
              <span className="business-badge">{PHASES[1].year}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-[66%]">
              <PhaseCard phase={PHASES[0]} />
              <PhaseCard phase={PHASES[1]} />
            </div>
          </div>

          {/* Row 3: 2027 + 2028 + 2030 */}
          <div className="biz-row mt-[8vw]">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="business-badge">{PHASES[0].year}</span>
              <div className="hidden md:block w-[clamp(60px,8vw,120px)] h-0.5 bg-[var(--color-blue)] relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-blue)]" />
              </div>
              <span className="business-badge">{PHASES[1].year}</span>
              <div className="hidden md:block w-[clamp(60px,8vw,120px)] h-0.5 bg-[var(--color-blue)] relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-blue)]" />
              </div>
              <span className="business-badge">{PHASES[2].year}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PHASES.map((p) => <PhaseCard key={p.year} phase={p} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Phase 카드 서브컴포넌트 ── */
function PhaseCard({ phase }: { phase: typeof PHASES[number] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="business-phase-desc">
        <span className="text-[var(--color-blue)]">{phase.highlight}</span> {phase.desc}
      </p>

      <div className="flex items-start gap-4">
        <div className="relative w-[45%] aspect-square shrink-0">
          <Image src={phase.map} alt={phase.mapAlt} fill className="object-contain" style={{ opacity: phase.mapOpacity }} sizes="15vw" />
        </div>
        <div className="flex flex-col gap-0.5 pt-1">
          {phase.stats.map((st) => (
            <p key={st.u} className="business-stat">{st.v}<span className="business-stat-unit">{st.u}</span></p>
          ))}
        </div>
      </div>

      <div className="glass-card p-[clamp(10px,1vw,16px)]">
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {phase.finance.rows.map((r) => (
            <div key={`${r.label}-${r.tag}`} className="flex items-baseline justify-between">
              <span className="business-card-label">{r.label} <span className="business-card-tag">{r.tag}</span></span>
              <span className="business-card-value">{r.val}</span>
            </div>
          ))}
        </div>
        <div className="h-px bg-[rgba(49,49,49,0.1)] my-1.5" />
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className="business-card-total">{phase.finance.invest}</span>
          <span className="business-card-label">{phase.finance.investU}</span>
          <span className="business-card-note">1회성 투자</span>
          <span className="mx-0.5">➜</span>
          <span className="business-card-label">연</span>
          <span className="business-card-total">{phase.finance.annual}</span>
          <span className="business-card-label">{phase.finance.annualU}</span>
        </div>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="business-card-label">5년누적</span>
          <span className="business-card-total">{phase.finance.cum}</span>
          <span className="business-card-label">{phase.finance.cumU}</span>
        </div>
      </div>
    </div>
  );
}
