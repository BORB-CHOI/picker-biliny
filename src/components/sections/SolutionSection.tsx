'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

/* ── 솔루션 카드 데이터 ── */
const SOLUTIONS = [
  {
    label: '공유형 PM',
    title: "BILINY",
    subtitle: '사계절 기후 대응형 1인승 퍼스널 모빌리티',
    features: ['저속 자율주행'],
    image: '/images/solution/2_biliny-doorstep.png',
    imageAlt: '집 앞에서 빌리니와 함께하는 어르신',
    imageW: 800,
    imageH: 400,
    spec: '50 대',
  },
  {
    label: '스마트 레인',
    title: "SMART LANE",
    subtitle: '시각 인식 기반 저비용 유도 주행',
    features: ['태양광 야간 시인성 확보 및 보행자 안전 경계선 기능'],
    image: '/images/solution/3_smartlane-night.png',
    imageAlt: '야간 스마트레인 주행 장면',
    imageW: 800,
    imageH: 450,
    spec: '1300 개',
  },
  {
    label: '케어워치',
    title: "CAREWATCH",
    subtitle: '이동 현황 모니터링 · 안심 케어',
    features: ['119 자동 신고 기능', '컨디션 맞춤 목적지 제안 기능'],
    image: '/images/solution/4_carewatch-wrist.png',
    imageAlt: '케어워치를 착용한 어르신',
    imageW: 800,
    imageH: 400,
    spec: '',
  },
] as const;

/* ── 시티케어 수익 모델 데이터 ── */
const REVENUE_BLOCKS = [
  {
    time: '주간',
    desc: '출/퇴근 이동 3회, 등/하원 3회, 점심시간 단거리 이동 2회',
    amount: '일 1.45만 원',
    image: '/images/solution/6_biliny-students.png',
    imageAlt: '학생들과 빌리니',
  },
  {
    time: '야간',
    desc: '퀵 배달 2회, 저녁심야배송 3회',
    amount: '일 2.6만 원',
    image: '/images/solution/7_biliny-commute.png',
    imageAlt: '직장인 빌리니 출퇴근',
  },
  {
    time: '심야',
    desc: '야간순찰 3시간, 대리기사이송 1회',
    amount: '일 0.6만 원',
    image: '/images/solution/8_biliny-city-elderly.png',
    imageAlt: '도심 어르신 빌리니 주행',
  },
] as const;

const COST_CATEGORIES = ['복지버스', '복지택시', '우울증', '요양시설 가속'] as const;

export function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // 텍스트 reveal
      section.querySelectorAll<HTMLElement>('.sol-r').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          },
        );
      });

      // fade up
      section.querySelectorAll<HTMLElement>('.sol-f').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          },
        );
      });

      // 이미지 scale + fade
      section.querySelectorAll<HTMLElement>('.sol-i').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%' },
          },
        );
      });

      // countUp
      section.querySelectorAll<HTMLElement>('[data-sol-count]').forEach((el) => {
        const target = Number(el.dataset.solCount);
        const suffix = el.dataset.solSuffix ?? '';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val).toLocaleString()}${suffix}`;
          },
        });
      });

      // 솔루션 카드 stagger
      const cards = section.querySelectorAll<HTMLElement>('.sol-card');
      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: { trigger: cards[0], start: 'top 90%' },
          },
        );
      }

      // 수익 블록 stagger
      const revBlocks = section.querySelectorAll<HTMLElement>('.sol-rev');
      if (revBlocks.length) {
        gsap.fromTo(
          revBlocks,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15,
            scrollTrigger: { trigger: revBlocks[0], start: 'top 88%' },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="solution" className="relative overflow-hidden">

      {/* ═══ Part 1: 사회적 비용 (다크 섹션) ═══ */}
      <div className="bg-[var(--color-dark)] text-white py-[10vw] md:py-[8vw]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10">
          <p className="sol-r solution-text !text-[#a0a0a0] text-center">
            이동권 박탈로 인해 발생하는
          </p>
          <h2 className="sol-r solution-heading !text-white text-center mt-[1vw]">
            사회적 비용
          </h2>

          {/* 비용 카테고리 */}
          <div className="sol-f flex flex-wrap justify-center gap-[2vw] md:gap-[3vw] mt-[4vw]">
            {COST_CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="text-[clamp(13px,1.1vw,17px)] font-medium text-[#999] border border-[#555] rounded-full px-[1.5vw] py-[0.4vw]"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* 310억 핵심 수치 */}
          <div className="text-center mt-[5vw]">
            <p className="sol-r solution-text !text-[#b0b0b0]">중소도시 당 연간</p>
            <p className="solution-number !text-white mt-[1vw]" data-sol-count="310" data-sol-suffix="억">
              0억
            </p>
            <p className="sol-f text-[clamp(11px,0.9vw,14px)] text-[#888] mt-[1vw]">
              인구 10만명 미만 기준
            </p>
          </div>
        </div>
      </div>

      {/* ═══ Part 2: 과연 현실적일까요? ═══ */}
      <div className="bg-white py-[10vw] md:py-[8vw]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 text-center">
          <h2 className="sol-r solution-heading">과연 현실적일까요?</h2>

          <p className="sol-r solution-text mt-[3vw] max-w-[600px] mx-auto">
            막대한 예산 투입, 그러나 여전한 이동의 고립
          </p>

          <div className="sol-f flex items-center justify-center gap-[2vw] mt-[4vw]">
            <span className="solution-text">실제 이용률은</span>
            <span className="text-[clamp(36px,4vw,60px)] font-bold text-[var(--color-blue)]">1/5</span>
          </div>

          {/* 예산 10% 전환 */}
          <div className="sol-f mt-[6vw] bg-[var(--color-bg-subtle)] rounded-[2vw] p-[4vw] md:p-[3vw] max-w-[800px] mx-auto">
            <p className="solution-subheading">
              예산 <span className="text-[var(--color-blue)]">10%</span>
              <span className="solution-text ml-[0.5vw]">(150억)</span>
              만으로
            </p>
            <p className="solution-heading mt-[1.5vw]">
              새로운 이동수단 대안을 제공할 수 있습니다.
            </p>
            <p className="solution-text !text-[#999] mt-[2vw] text-[clamp(11px,0.85vw,14px)]">
              홍성읍 중심지 600m 반경 고령자 1300명을 대상, 초기 서비스 도입 시뮬레이션
            </p>
          </div>
        </div>
      </div>

      {/* ═══ Part 3: 3가지 솔루션 ═══ */}
      <div className="bg-white pb-[10vw] md:pb-[8vw]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2vw] md:gap-[1.5vw]">
            {SOLUTIONS.map((sol) => (
              <div key={sol.title} className="sol-card solution-card bg-[var(--color-bg-subtle)]">
                {/* 카드 이미지 */}
                <div className="relative w-full aspect-[2/1] overflow-hidden rounded-t-[2vw]">
                  <Image
                    src={sol.image}
                    alt={sol.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* 카드 콘텐츠 */}
                <div className="p-[2vw] md:p-[1.5vw]">
                  <p className="solution-label">{sol.label}</p>
                  <h3 className="solution-card-title mt-[0.5vw]">{sol.title}</h3>
                  <p className="solution-card-desc mt-[0.8vw]">{sol.subtitle}</p>
                  <ul className="mt-[1vw] space-y-[0.3vw]">
                    {sol.features.map((f) => (
                      <li key={f} className="solution-card-desc !text-[var(--color-blue)] flex items-start gap-[0.3vw]">
                        <span className="mt-[0.3em]">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {sol.spec && (
                    <p className="mt-[1.5vw] text-[clamp(18px,1.5vw,24px)] font-bold text-[var(--color-text-tertiary)]">
                      {sol.spec}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 케어워치 확장: 가디언 관제 시스템 */}
          <div className="sol-i mt-[4vw] relative w-full aspect-[16/5] rounded-[2vw] overflow-hidden">
            <Image
              src="/images/solution/5_guardian-dashboard.png"
              alt="PICKER 가디언 관제 시스템 2.0"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </div>

      {/* ═══ Part 4: 시티 케어 솔루션 (수익 모델) ═══ */}
      <div className="bg-[var(--color-bg-subtle)] py-[10vw] md:py-[8vw]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10">
          <div className="text-center">
            <p className="sol-r solution-text">자율주행이잖아?</p>
            <h2 className="sol-r solution-heading mt-[1vw]">게다가</h2>
            <p className="sol-r solution-subheading mt-[2vw]">
              <span className="text-[var(--color-blue)]">비활동시간</span> 추가 비즈니스를 통한 부가가치 확장
            </p>
          </div>

          <h3 className="sol-r solution-heading text-center mt-[6vw]">시티 케어 솔루션</h3>

          {/* 수익 블록 3열 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2vw] mt-[4vw]">
            {REVENUE_BLOCKS.map((block) => (
              <div key={block.time} className="sol-rev bg-white rounded-[1.5vw] overflow-hidden shadow-sm">
                <div className="relative w-full aspect-[2/1] overflow-hidden">
                  <Image
                    src={block.image}
                    alt={block.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-[2vw] md:p-[1.2vw]">
                  <p className="solution-label">{block.time}</p>
                  <p className="solution-card-desc mt-[0.5vw]">{block.desc}</p>
                  <p className="mt-[1vw] text-[clamp(16px,1.4vw,22px)] font-bold text-[var(--color-blue)]">
                    {block.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 수익 요약 */}
          <div className="sol-f flex flex-col md:flex-row items-center justify-center gap-[3vw] mt-[5vw] text-center">
            <div>
              <p className="solution-text">연간 수익</p>
              <p className="text-[clamp(28px,3vw,44px)] font-bold text-[var(--color-text)]">2.7<span className="text-[0.6em] font-medium">억 원</span></p>
            </div>
            <div className="hidden md:block w-[0.1vw] h-[4vw] bg-[var(--color-border)]" />
            <div>
              <p className="solution-text">순이익</p>
              <p className="text-[clamp(28px,3vw,44px)] font-bold text-[var(--color-text)]">1.1<span className="text-[0.6em] font-medium">억 원</span></p>
            </div>
            <p className="solution-text !text-[#999] text-[clamp(10px,0.8vw,13px)]">*50대 운영기준</p>
          </div>
        </div>
      </div>

      {/* ═══ Part 5: ROI 요약 — 2600% ═══ */}
      <div className="bg-white py-[10vw] md:py-[8vw]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 text-center">
          <p className="sol-r solution-text" data-sol-count="2600" data-sol-suffix="%">0%</p>
          <h2 className="sol-r text-[clamp(32px,4vw,60px)] font-bold text-[var(--color-text)] mt-[1vw]">
            을 이루는 솔루션
          </h2>

          {/* 투자 요약 */}
          <div className="sol-f mt-[5vw] grid grid-cols-2 md:grid-cols-3 gap-[2vw] max-w-[700px] mx-auto">
            <div className="bg-[var(--color-bg-subtle)] rounded-[1.5vw] p-[2vw]">
              <p className="solution-card-desc">스마트레인</p>
              <p className="solution-subheading mt-[0.5vw]">9.6<span className="text-[0.7em] font-medium">억</span></p>
            </div>
            <div className="bg-[var(--color-bg-subtle)] rounded-[1.5vw] p-[2vw]">
              <p className="solution-card-desc">공유 PM</p>
              <p className="solution-subheading mt-[0.5vw]">2.5<span className="text-[0.7em] font-medium">억</span></p>
            </div>
            <div className="bg-[var(--color-bg-subtle)] rounded-[1.5vw] p-[2vw] col-span-2 md:col-span-1">
              <p className="solution-card-desc">관리운영</p>
              <p className="solution-subheading mt-[0.5vw]">0.5<span className="text-[0.7em] font-medium">억</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
