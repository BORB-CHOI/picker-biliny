'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

/* ── 비용 카테고리 ── */
const COST_ITEMS = ['복지버스', '복지택시', '우울증', '요양시설 가속'] as const;

/* ── 3대 솔루션 ── */
const SOLUTIONS = [
  {
    label: '공유형 PM',
    title: 'BILINY',
    desc: '사계절 기후 대응형 1인승 퍼스널 모빌리티',
    features: ['저속 자율주행'],
    img: '/images/solution/2_biliny-doorstep.png',
    alt: '집 앞에서 빌리니와 함께하는 어르신',
    spec: '50 대',
  },
  {
    label: '스마트 레인',
    title: 'SMART LANE',
    desc: '시각 인식 기반 저비용 유도 주행',
    features: ['태양광 야간 시인성 확보', '보행자 안전 경계선 기능'],
    img: '/images/solution/3_smartlane-night.png',
    alt: '야간 스마트레인 주행 장면',
    spec: '1300 개',
  },
  {
    label: '케어워치',
    title: 'CAREWATCH',
    desc: '이동 현황 모니터링 · 안심 케어',
    features: ['119 자동 신고 기능', '컨디션 맞춤 목적지 제안'],
    img: '/images/solution/4_carewatch-wrist.png',
    alt: '케어워치를 착용한 어르신',
    spec: '',
  },
];

/* ── 시티케어 시간대별 수익 ── */
const REVENUE = [
  {
    label: '주간',
    desc: '출/퇴근 이동 3회, 등/하원 3회, 점심시간 단거리 이동 2회',
    amount: '일 1.45만 원',
    img: '/images/solution/6_biliny-students.png',
    alt: '학생들과 빌리니',
  },
  {
    label: '석간',
    desc: '퀵 배달 2회, 저녁심야배송 3회',
    amount: '일 2.6만 원',
    img: '/images/solution/7_biliny-commute.png',
    alt: '직장인 빌리니 출퇴근',
  },
  {
    label: '심야',
    desc: '야간순찰 3시간, 대리기사이송 1회',
    amount: '일 0.6만 원',
    img: '/images/solution/8_biliny-city-elderly.png',
    alt: '도심 어르신 빌리니 주행',
  },
];

export function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const s = sectionRef.current;
      if (!s) return;

      /* reveal 텍스트 */
      s.querySelectorAll<HTMLElement>('.sol-r').forEach((el) => {
        gsap.fromTo(el,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' } },
        );
      });

      /* fade up */
      s.querySelectorAll<HTMLElement>('.sol-f').forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' } },
        );
      });

      /* 이미지 */
      s.querySelectorAll<HTMLElement>('.sol-i').forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.3, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%' } },
        );
      });

      /* 솔루션 카드 stagger */
      const cards = s.querySelectorAll<HTMLElement>('.sol-card');
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.2,
            scrollTrigger: { trigger: cards[0], start: 'top 88%' } },
        );
      }

      /* 수익 블록 stagger */
      const revs = s.querySelectorAll<HTMLElement>('.sol-rev');
      if (revs.length) {
        gsap.fromTo(revs,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.15,
            scrollTrigger: { trigger: revs[0], start: 'top 88%' } },
        );
      }

      /* countUp */
      s.querySelectorAll<HTMLElement>('[data-sol-count]').forEach((el) => {
        const target = Number(el.dataset.solCount);
        const suffix = el.dataset.solSuffix ?? '';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate() { el.textContent = `${Math.round(obj.val).toLocaleString()}${suffix}`; },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="solution" className="relative overflow-hidden">

      {/* ═══ Part 1: 사회적 비용 — 다크 그라데이션 ═══ */}
      <div className="sol-section-dark">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 pt-[12vw] pb-[10vw]">

          {/* 히어로 이미지: 도심 어르신 주행 */}
          <div className="sol-i w-full md:w-[70%] mx-auto rounded-[clamp(16px,2vw,30px)] overflow-hidden">
            <Image
              src="/images/solution/8_biliny-city-elderly.png"
              alt="도심에서 빌리니를 타고 이동하는 어르신"
              width={1200} height={600}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </div>

          <div className="mt-[6vw] text-center">
            <p className="sol-r solution-text !text-[#a0a0a0]">
              이동권 박탈로 인해 발생하는
            </p>
            <h2 className="sol-r solution-heading !text-white mt-2">사회적 비용</h2>

            {/* 비용 카테고리 태그 */}
            <div className="sol-f flex flex-wrap justify-center gap-3 mt-[4vw]">
              {COST_ITEMS.map((item) => (
                <span key={item} className="text-[clamp(12px,1vw,16px)] font-medium text-[#999] border border-[#555] rounded-full px-4 py-1.5">
                  {item}
                </span>
              ))}
            </div>

            {/* 310억 */}
            <div className="mt-[5vw]">
              <p className="sol-r solution-text !text-[#b0b0b0]">중소도시 당 연간</p>
              <p className="solution-number !text-white mt-2" data-sol-count="310" data-sol-suffix="억">0억</p>
              <p className="sol-f text-[clamp(10px,0.8vw,13px)] text-[#888] mt-2">인구 10만명 미만 기준</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Part 2: 과연 현실적일까요? ═══ */}
      <div className="bg-white py-[10vw]">
        <div className="max-w-[1100px] mx-auto px-5 md:px-10 text-center">
          <h2 className="sol-r solution-heading">과연 현실적일까요?</h2>
          <p className="sol-r solution-text mt-[2vw]">막대한 예산 투입, 그러나 여전한 이동의 고립</p>

          <div className="sol-f flex items-center justify-center gap-4 mt-[4vw]">
            <span className="solution-text">실제 이용률은</span>
            <span className="text-[clamp(36px,4vw,60px)] font-bold text-[var(--color-blue)]">1/5</span>
          </div>

          {/* 예산 전환 카드 */}
          <div className="sol-f mt-[6vw] bg-[var(--color-bg-subtle)] rounded-[clamp(16px,2vw,30px)] p-[clamp(24px,3vw,48px)] max-w-[800px] mx-auto">
            <p className="solution-subheading">
              예산 <span className="text-[var(--color-blue)]">10%</span>
              <span className="solution-text ml-1">(150억)</span>
              만으로
            </p>
            <p className="solution-heading mt-3">새로운 이동수단 대안을<br />제공할 수 있습니다.</p>
            <p className="sol-f text-[clamp(10px,0.8vw,13px)] text-[#999] mt-4">
              홍성읍 중심지 600m 반경 고령자 1300명을 대상, 초기 서비스 도입 시뮬레이션
            </p>
          </div>
        </div>
      </div>

      {/* ═══ Part 3: 3대 솔루션 카드 ═══ */}
      <div className="bg-white pb-[10vw]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SOLUTIONS.map((sol) => (
              <div key={sol.title} className="sol-card solution-card bg-[var(--color-bg-subtle)]">
                <div className="relative w-full aspect-[2/1] overflow-hidden" style={{ borderRadius: 'inherit' }}>
                  <Image src={sol.img} alt={sol.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5 md:p-6">
                  <p className="solution-label">{sol.label}</p>
                  <h3 className="solution-card-title mt-1">{sol.title}</h3>
                  <p className="solution-card-desc mt-2">{sol.desc}</p>
                  <ul className="mt-3 space-y-1">
                    {sol.features.map((f) => (
                      <li key={f} className="solution-card-desc !text-[var(--color-blue)] flex items-start gap-1">
                        <span className="mt-[0.3em]">•</span><span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {sol.spec && (
                    <p className="mt-4 text-[clamp(18px,1.5vw,24px)] font-bold text-[var(--color-text-tertiary)]">{sol.spec}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 가디언 관제 시스템 */}
          <div className="sol-i mt-8 relative w-full aspect-[16/5] rounded-[clamp(16px,2vw,30px)] overflow-hidden">
            <Image
              src="/images/solution/5_guardian-dashboard.png"
              alt="PICKER 가디언 관제 시스템 2.0"
              fill className="object-cover" sizes="100vw"
            />
          </div>
        </div>
      </div>

      {/* ═══ Part 4: 시티 케어 솔루션 — 수익 모델 ═══ */}
      <div className="bg-[var(--color-bg-subtle)] py-[10vw]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10">
          <div className="text-center">
            <p className="sol-r solution-text">자율주행이잖아?</p>
            <h2 className="sol-r solution-heading mt-2">게다가</h2>
            <p className="sol-r solution-subheading mt-[3vw]">
              <span className="text-[var(--color-blue)]">비활동시간</span> 추가 비즈니스를 통한 부가가치 확장
            </p>
          </div>

          <h3 className="sol-r solution-heading text-center mt-[6vw]">시티 케어 솔루션</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-[4vw]">
            {REVENUE.map((r) => (
              <div key={r.label} className="sol-rev bg-white rounded-[clamp(12px,1.5vw,22px)] overflow-hidden shadow-sm">
                <div className="relative w-full aspect-[2/1] overflow-hidden">
                  <Image src={r.img} alt={r.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <p className="solution-label">{r.label}</p>
                  <p className="solution-card-desc mt-1">{r.desc}</p>
                  <p className="mt-3 text-[clamp(16px,1.4vw,22px)] font-bold text-[var(--color-blue)]">{r.amount}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 수익 요약 */}
          <div className="sol-f flex flex-col md:flex-row items-center justify-center gap-[4vw] mt-[6vw]">
            <div className="text-center">
              <p className="solution-text">연간 수익</p>
              <p className="text-[clamp(28px,3vw,44px)] font-bold">2.7<span className="text-[0.6em] font-medium ml-0.5">억 원</span></p>
            </div>
            <div className="hidden md:block w-px h-12 bg-[var(--color-border)]" />
            <div className="text-center">
              <p className="solution-text">순이익</p>
              <p className="text-[clamp(28px,3vw,44px)] font-bold">1.1<span className="text-[0.6em] font-medium ml-0.5">억 원</span></p>
            </div>
            <p className="solution-text !text-[#999] text-[clamp(10px,0.8vw,13px)]">*50대 운영기준</p>
          </div>
        </div>
      </div>

      {/* ═══ Part 5: ROI — 2600% ═══ */}
      <div className="bg-white py-[10vw]">
        <div className="max-w-[1100px] mx-auto px-5 md:px-10 text-center">
          <p className="solution-number !text-[var(--color-blue)]" data-sol-count="2600" data-sol-suffix="%">0%</p>
          <h2 className="sol-r solution-heading mt-2">을 이루는 솔루션</h2>

          <div className="sol-f mt-[5vw] grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[700px] mx-auto">
            {[
              { name: '스마트레인', val: '9.6' },
              { name: '공유 PM', val: '2.5' },
              { name: '관리운영', val: '0.5' },
            ].map((item) => (
              <div key={item.name} className="bg-[var(--color-bg-subtle)] rounded-[clamp(12px,1.5vw,22px)] p-5 text-center">
                <p className="solution-card-desc">{item.name}</p>
                <p className="solution-subheading mt-1">{item.val}<span className="text-[0.7em] font-medium">억</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
