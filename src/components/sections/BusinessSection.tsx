'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { onMainContentReady } from '@/lib/animationState';
import { useProductAnimations } from '@/hooks/useProductAnimations';

gsap.registerPlugin(ScrollTrigger);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Phase Data
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const PHASES = [
  {
    year: "2027",
    desc: (
      <>
        <span className="text-(--color-blue)">600m 반경 </span>부분적 실증
      </>
    ),
    map: "/images/busniess/13_map-2027.png",
    mapAlt: "홍성읍 600m 반경 지도",
    mapOpacity: "opacity-30",
    stats: [
      { number: "16", unit: "km" },
      { number: "50", unit: " 대" },
      { number: "1300", unit: "명" },
    ],
    finance: {
      left: [
        { label: "스마트레인", value: "9.6억", tag: "투자" },
        { label: "공유 PM", value: "2.5억", tag: "투자" },
        { label: "관리운영", value: "0.5억", tag: "투자" },
      ],
      right: [
        { label: "교통복지비", value: "7.5억", tag: "감축" },
        { label: "사회복지비", value: "8억", tag: "감축" },
        { label: "부가서비스", value: "9억", tag: "수익" },
      ],
      totalLeft: "12.6",
      totalLeftUnit: "억 원",
      totalLeftNote: "1회성 투자",
      totalRight: "22.5",
      totalRightUnit: "억 원",
      totalRightNote: "연",
      cumulative: "112.5",
      cumulativeUnit: "억 원",
    },
  },
  {
    year: "2028",
    desc: (
      <>
        <span className="text-(--color-blue)">2km 반경</span> 전범위 실증
      </>
    ),
    map: "/images/busniess/14_map-2028.png",
    mapAlt: "홍성읍 2km 반경 지도",
    mapOpacity: "",
    stats: [
      { number: "110", unit: "km" },
      { number: "1000", unit: " 대" },
      { number: "2.7만", unit: " 명" },
    ],
    finance: {
      left: [
        { label: "스마트레인", value: "67억", tag: "투자" },
        { label: "공유 PM", value: "50억", tag: "투자" },
        { label: "관리운영", value: "5억", tag: "투자" },
      ],
      right: [
        { label: "교통복지비", value: "150억", tag: "감축" },
        { label: "사회복지비", value: "160억", tag: "감축" },
        { label: "부가서비스", value: "180억", tag: "수익" },
      ],
      totalLeft: "122",
      totalLeftUnit: "억 원",
      totalLeftNote: "1회성 투자",
      totalRight: "490",
      totalRightUnit: "억 원",
      totalRightNote: "연",
      cumulative: "2450",
      cumulativeUnit: "억 원",
    },
  },
  {
    year: "2030",
    desc: (
      <>
        인구감소 중소도시 <span className="text-(--color-blue)">89개군</span> 확장
      </>
    ),
    map: "/images/busniess/15_map-2030.png",
    mapAlt: "전국 89개 인구감소 중소도시 지도",
    mapOpacity: "",
    stats: [
      { number: "6930", unit: "km" },
      { number: "63000", unit: " 대" },
      { number: "171만", unit: " 명" },
    ],
    finance: {
      left: [
        { label: "스마트레인", value: "4220억", tag: "투자" },
        { label: "공유 PM", value: "1890억", tag: "투자" },
        { label: "관리운영", value: "100억", tag: "투자" },
      ],
      right: [
        { label: "교통복지비", value: "1조", tag: "감축" },
        { label: "사회복지비", value: "1조", tag: "감축" },
        { label: "부가서비스", value: "1.1조", tag: "수익" },
      ],
      totalLeft: "0.6",
      totalLeftUnit: "조 원",
      totalLeftNote: "1회성 투자",
      totalRight: "3.1",
      totalRightUnit: "조 원",
      totalRightNote: "연",
      cumulative: "15.5",
      cumulativeUnit: "조 원",
    },
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Expansion Pin Section (로컬 실증에서 글로벌 확장까지)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** 단일 페이즈 컬럼 (지도 + 스탯 + 재정카드) */
function PhaseColumn({ p }: { p: typeof PHASES[number] }) {
  return (
    <div className="flex flex-col items-center min-w-0 flex-1">
      {/* 설명 */}
      <p className="biz-phase-desc text-center whitespace-nowrap mb-[clamp(8px,1.1cqw,16px)]">{p.desc}</p>

      {/* 지도 + 스탯 가로 배치 */}
      <div className="flex items-start justify-center gap-[clamp(6px,1cqw,16px)]">
        <div className="relative w-[clamp(100px,12cqw,180px)] h-[clamp(100px,12cqw,180px)] shrink-0">
          <Image
            src={p.map}
            alt={p.mapAlt}
            fill
            className={`object-contain ${p.mapOpacity}`}
            sizes="12vw"
          />
        </div>
        <div className="flex flex-col justify-center gap-[clamp(4px,0.7cqw,10px)] pt-[clamp(8px,1cqw,14px)]">
          {p.stats.map((s) => (
            <p key={s.number} className="biz-phase-stat whitespace-nowrap">
              <span className="font-bold">{s.number}</span>
              <span className="font-normal">{s.unit}</span>
            </p>
          ))}
        </div>
      </div>

      {/* 재정 카드 */}
      <div className="relative mt-[clamp(12px,1.7cqw,24px)] w-full max-w-[clamp(240px,26cqw,380px)]">
        <div className="rounded-[clamp(20px,2.6cqw,38px)] border border-[rgba(210,210,220,0.5)] bg-[rgba(243,244,248,0.9)] backdrop-blur-sm px-[clamp(10px,1.4cqw,20px)] py-[clamp(8px,1.1cqw,16px)]">
          {/* 투자 / 감축·수익 테이블 */}
          <div className="grid grid-cols-[1fr_1fr] gap-x-2">
            <div className="flex flex-col gap-[clamp(1px,0.2cqw,3px)]">
              {p.finance.left.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[1fr_auto_auto] gap-1 items-baseline justify-between"
                >
                  <span className="biz-fin-label">{item.label}</span>
                  <span className="biz-fin-value">{item.value}</span>
                  <span className="biz-fin-label text-[clamp(5px,0.56cqw,8px)]">{item.tag}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-[clamp(1px,0.2cqw,3px)]">
              {p.finance.right.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[1fr_auto_auto] gap-1 items-baseline justify-between"
                >
                  <span className="biz-fin-label">{item.label}</span>
                  <span className="biz-fin-value">{item.value}</span>
                  <span className="biz-fin-label text-[clamp(5px,0.56cqw,8px)]">{item.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 하단 요약 */}
          <div className="flex items-center justify-between mt-[clamp(6px,0.8cqw,12px)] pt-[clamp(3px,0.4cqw,6px)] border-t border-[rgba(0,0,0,0.06)]">
            <div className="flex items-baseline gap-[clamp(1px,0.2cqw,3px)]">
              <span className="biz-fin-total">{p.finance.totalLeft}</span>
              <span className="biz-fin-label">{p.finance.totalLeftUnit}</span>
              <span className="biz-fin-note">{p.finance.totalLeftNote}</span>
            </div>

            {/* 화살표 */}
            <div className="relative w-[clamp(14px,1.5cqw,22px)] h-[clamp(10px,1.1cqw,16px)] mx-[clamp(2px,0.3cqw,6px)] shrink-0">
              <Image
                src="/images/busniess/16_fin-card-shadow.png"
                alt=""
                fill
                className="object-contain"
                sizes="1.5vw"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-[clamp(1px,0.2cqw,3px)]">
                <span className="biz-fin-note">{p.finance.totalRightNote}</span>
                <span className="biz-fin-total">{p.finance.totalRight}</span>
                <span className="biz-fin-label">{p.finance.totalRightUnit}</span>
              </div>
              <div className="flex items-baseline gap-[clamp(1px,0.2cqw,3px)]">
                <span className="biz-fin-label">5년누적</span>
                <span className="biz-fin-total">{p.finance.cumulative}</span>
                <span className="biz-fin-label">{p.finance.cumulativeUnit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpansionPinSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const outer = outerRef.current;
      const sticky = stickyRef.current;
      if (!outer || !sticky) return;

      /* ── 초기 숨김 ── */
      gsap.set(sticky.querySelectorAll('.exp-title'), { y: 40, opacity: 0 });
      gsap.set(sticky.querySelectorAll('.exp-col'), { opacity: 0, y: 30 });
      gsap.set(sticky.querySelectorAll('.exp-connector'), { opacity: 0, scaleX: 0 });

      let timeline: gsap.core.Timeline | null = null;
      let firstRafId: number;
      let secondRafId: number;

      const unsubscribe = onMainContentReady(() => {
        firstRafId = requestAnimationFrame(() => {
          secondRafId = requestAnimationFrame(() => {
          const cols = sticky.querySelectorAll<HTMLElement>('.exp-col');
          const connectors = sticky.querySelectorAll<HTMLElement>('.exp-connector');
          const titles = sticky.querySelectorAll<HTMLElement>('.exp-title');
          if (cols.length < 3) {
            gsap.set(titles, { y: 0, opacity: 1 });
            gsap.set(cols, { y: 0, opacity: 1 });
            gsap.set(connectors, { opacity: 1, scaleX: 1 });
            return;
          }

          /*
           * CSS sticky + ScrollTrigger scrub (pin: false)
           * 외부 div가 충분한 높이(180vh)를 가지고,
           * 내부 sticky div가 화면에 고정됨.
           * ScrollTrigger는 외부 div의 스크롤 진행도에 따라 애니메이션만 제어.
           * → GSAP pin 없음 → position:fixed 전환 없음 → 튕김 없음
           */
          timeline = gsap.timeline({
            scrollTrigger: {
              trigger: outer,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.65,
            },
          });

          /* Step 0: 제목 등장 */
          timeline.to(titles, { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: 'power2.out' })
            .to({}, { duration: 0.15 })

          /* Step 1: 2027 등장 */
            .to(cols[0], { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
            .to({}, { duration: 0.2 })

          /* Step 2: 선 + 2028 등장 */
            .to(connectors[0], { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power2.out' })
            .to(cols[1], { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '<0.1')
            .to({}, { duration: 0.2 })

          /* Step 3: 선 + 2030 등장 */
            .to(connectors[1], { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power2.out' })
            .to(cols[2], { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '<0.1')

          /* Step 4: 최종 유지 */
            .to({}, { duration: 0.3 });
          });
        });
      });

      return () => {
        unsubscribe();
        timeline?.kill();
        cancelAnimationFrame(firstRafId);
        cancelAnimationFrame(secondRafId);
      };
    },
    { scope: outerRef },
  );

  return (
    <div ref={outerRef} className="relative bg-white h-[165vh]">
      <div
        ref={stickyRef}
        className="sticky top-1/2 -translate-y-1/2 flex flex-col justify-center overflow-hidden"
      >
        {/* 제목 */}
        <div className="product-container text-center mb-12">
          <h3 className="exp-title biz-title">로컬 실증에서 글로벌 확장까지</h3>
          <p className="exp-title biz-expansion-sub mt-8">
            <span className="font-bold text-(--color-blue)">10% </span>
            <span className="font-bold">예산 전환을 시작으로,</span>
            {" "}5년간{" "}
            <span className="font-bold text-(--color-blue)">2600%</span>
            <span className="font-bold"> 확장성</span>을 이루는 솔루션
          </p>
        </div>

        {/* 3컬럼 + 커넥터 */}
        <div className="product-container">
          <div className="flex items-start justify-center">
            <div className="exp-col flex flex-col items-center flex-1 min-w-0">
              <span className="biz-year-badge mb-5">2027</span>
              <PhaseColumn p={PHASES[0]} />
            </div>

            <div className="exp-connector flex items-center self-start mt-1.5 mx-1 origin-left shrink-0">
              <span className="block w-20 h-0.5 bg-(--color-blue)" />
              <span className="block w-2.5 h-2.5 rounded-full bg-(--color-blue) shrink-0" />
            </div>

            <div className="exp-col flex flex-col items-center flex-1 min-w-0">
              <span className="biz-year-badge mb-5">2028</span>
              <PhaseColumn p={PHASES[1]} />
            </div>

            <div className="exp-connector flex items-center self-start mt-1.5 mx-1 origin-left shrink-0">
              <span className="block w-20 h-0.5 bg-(--color-blue)" />
              <span className="block w-2.5 h-2.5 rounded-full bg-(--color-blue) shrink-0" />
            </div>

            <div className="exp-col flex flex-col items-center flex-1 min-w-0">
              <span className="biz-year-badge mb-5">2030</span>
              <PhaseColumn p={PHASES[2]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Main Component
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function BusinessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useProductAnimations(sectionRef);

  return (
    <section ref={sectionRef} className="relative z-10">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 1: 과연 현실적일까요?
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="bg-white text-center py-50">
        <h2 className="b-fade biz-title">과연 현실적일까요?</h2>
      </div>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 2 + 3: 사회적 비용 + 막대한 예산 투입 (다크 통합)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative">
        {/* 단일 요소 blur: 솔리드 사각형 + filter blur → 가우시안 엣지 */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "75px",
            bottom: "75px",
            left: "-100px",
            right: "-100px",
            background: "#2C2C2C",
            filter: "blur(75px)",
          }}
        />
        <div className="relative z-1">
          {/* ── 사회적 비용 ── */}
          <div className="product-container text-center pt-[clamp(200px,27cqw,400px)] pb-[clamp(40px,5.5cqw,80px)]">
            <h3 className="b-reveal biz-heading-lg">이동권 박탈로 인해 발생하는 사회적 비용</h3>
            <div
              className="b-fade mt-[clamp(20px,2.8cqw,40px)] flex flex-col inline-block"
              data-anim-split="children"
            >
              <span className="biz-big-prefix relative" data-anim-item>
                  중소도시 당 연간{" "}
                <span className="biz-big-number">
                  310<span className="biz-big-prefix">억</span>
                </span>
                <p className="absolute biz-small left-0 mt-2 ml-0.5" data-anim-item>인구 10만명 미만기준</p>
              </span>
              
            </div>

            {/* Icon Groups */}
            <div
              className="b-fade flex flex-row items-center justify-center gap-20 mt-[clamp(40px,5.5cqw,80px)]"
              data-anim-split="children"
            >
              {/* 복지버스/택시 */}
              <div className="flex flex-col items-center gap-[clamp(8px,1cqw,14px)]">
                <div className="flex items-center gap-[clamp(16px,2.2cqw,32px)]">
                  <div className="relative w-[clamp(48px,5.5cqw,80px)] h-[clamp(48px,5.5cqw,80px)]">
                    <Image
                      src="/images/busniess/1_welfare-bus-icon.png"
                      alt="복지버스"
                      fill
                      className="object-contain"
                      sizes="5.5vw"
                    />
                  </div>
                  <div className="relative w-[clamp(48px,5.5cqw,80px)] h-[clamp(48px,5.5cqw,80px)]">
                    <Image
                      src="/images/busniess/2_welfare-taxi-icon.png"
                      alt="복지택시"
                      fill
                      className="object-contain"
                      sizes="5.5vw"
                    />
                  </div>
                </div>
                <p className="biz-icon-label">복지버스 / 복지택시</p>
                <p className="biz-cost-number">연 150억</p>
              </div>

              <span className="biz-plus">+</span>

              {/* 우울증/요양 */}
              <div className="flex flex-col items-center gap-[clamp(8px,1cqw,14px)]">
                <div className="flex items-center gap-[clamp(16px,2.2cqw,32px)]">
                  <div className="relative w-[clamp(48px,5.5cqw,80px)] h-[clamp(48px,5.5cqw,80px)]">
                    <Image
                      src="/images/busniess/3_depression-icon.png"
                      alt="우울증"
                      fill
                      className="object-contain"
                      sizes="5.5vw"
                    />
                  </div>
                  <div className="relative w-[clamp(48px,5.5cqw,80px)] h-[clamp(48px,5.5cqw,80px)]">
                    <Image
                      src="/images/busniess/4_nursing-facility-icon.png"
                      alt="요양시설"
                      fill
                      className="object-contain"
                      sizes="5.5vw"
                    />
                  </div>
                </div>
                <p className="biz-icon-label">우울증 / 요양시설 가속</p>
                <p className="biz-cost-number">연 160억</p>
              </div>
            </div>
          </div>

          {/* ── 막대한 예산 투입 ── */}
          <div className="product-container text-center pt-[clamp(80px,11cqw,160px)]">
            <h3 className="b-reveal biz-title-white">
              막대한 예산 투입, 그러나 여전한 이동의 고립
            </h3>
            <p className="b-fade biz-body-dark mt-[clamp(16px,2.2cqw,32px)]">
              기존 복지버스/무료 택시는 연간 150억원을 투입하지만,
            </p>
            <p className="b-fade biz-body-dark">
              실제 이용률은 <span className="font-bold">대도심 대중교통 대비</span>{" "}
              <span className="biz-fraction">1/5</span> 에 불과합니다.
            </p>

            {/* Three Info Cards — Figma 4142:26 */}
            <div
              className="b-fade grid grid-cols-3 gap-[clamp(12px,1.7cqw,24px)] mt-[clamp(40px,5.5cqw,80px)]"
              data-anim-split="children"
            >
              {[
                {
                  icon: (
                    <svg viewBox="0 0 26 26" fill="none" aria-hidden="true">
                      <circle
                        cx="13"
                        cy="13"
                        r="10"
                        stroke="#7a7a8a"
                        strokeWidth="1.2"
                        fill="none"
                      />
                      <path d="M13 8V14" stroke="#7a7a8a" strokeWidth="1.2" strokeLinecap="round" />
                      <path
                        d="M13 8L16 11"
                        stroke="#7a7a8a"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                  title: "66분 / 600m",
                  subtitle: "불친절한 사용성",
                  desc: "평균 배차시간과 정류장까지의 거리는 고령자에게 보행의 한계입니다.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 26 26" fill="none" aria-hidden="true">
                      <path
                        d="M4 18L10 12L15 15L22 7"
                        stroke="#7a7a8a"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 7H22V12"
                        stroke="#7a7a8a"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  title: "127.5억 원 낭비",
                  subtitle: "소모적인 복지예산",
                  desc: "운행 효율 저하로 매년 막대한 지자체 예산이 허공으로 사라집니다.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 26 26" fill="none" aria-hidden="true">
                      <circle
                        cx="9"
                        cy="10"
                        r="3.5"
                        stroke="#7a7a8a"
                        strokeWidth="1.2"
                        fill="none"
                      />
                      <circle
                        cx="17"
                        cy="10"
                        r="3.5"
                        stroke="#7a7a8a"
                        strokeWidth="1.2"
                        fill="none"
                      />
                      <path
                        d="M4 22C4 18.5 6.5 16 9 16C10.5 16 12 16.5 13 17C14 16.5 15.5 16 17 16C19.5 16 22 18.5 22 22"
                        stroke="#7a7a8a"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                  title: "생존권의 위협",
                  subtitle: "사회적 고립 가속",
                  desc: "이동권의 빈틈은 병원 방문 단절과 우울증, 치매 가속으로 이어집니다.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-[clamp(12px,1.1cqw,16px)] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] p-[clamp(20px,2.2cqw,32px)] text-left"
                  data-anim-item
                >
                  <div className="w-[clamp(20px,1.8cqw,26px)] h-[clamp(20px,1.8cqw,26px)] mb-[clamp(16px,2cqw,28px)]">
                    {card.icon}
                  </div>
                  <p className="biz-stat-title">{card.title}</p>
                  <p className="biz-stat-desc font-bold mt-[clamp(4px,0.4cqw,6px)]">
                    {card.subtitle}
                  </p>
                  <p className="biz-stat-desc mt-[clamp(12px,1.4cqw,20px)]">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── 전환 화살표 (그라데이션 영역 안) ── */}
          <div className="b-fade flex justify-center pb-[clamp(30px,4cqw,60px)] translate-y-10 -mt-50">
            <div className="relative w-[clamp(180px,24cqw,360px)] aspect-[1/2]">
              <Image
                src="/images/busniess/5_transition-arrow.png"
                alt=""
                fill
                className="object-contain translate-y-50"
                sizes="30vw"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 5: 교통 복지 예산의 10%만으로
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="bg-white">
        <div className="product-container text-center py-[clamp(60px,8.3cqw,120px)] pt-70">
          <h3 className="b-reveal biz-title">
            교통 복지 예산의 <span className="biz-highlight-blue">10%</span>만으로
          </h3>
          <div
            className="b-fade mt-[clamp(16px,2.2cqw,32px)] mb-[clamp(40px,5.5cqw,80px)]"
            data-anim-split="children"
          >
            <p className="biz-desc" data-anim-item>
              <span className="relative inline-block">
                1년 교통 복지 <span className="font-bold">예산</span>
                <span className="absolute left-0 right-0 top-full flex flex-col items-center mt-[clamp(2px,0.3cqw,4px)]">
                  <span
                    className="w-full h-px"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, #c0c0c0 30%, #c0c0c0 70%, transparent)",
                    }}
                  />
                  <span className="biz-note mt-[clamp(2px,0.3cqw,4px)]">(150억)</span>
                </span>
              </span>
              <span className="font-bold">의 단</span>{" "}
              <span className="font-bold text-(--color-blue)">10%</span>만으로 고령자 생활에 맞춘{" "}
              <span className="font-bold">새로운 이동수단 대안을 제공</span>할 수 있습니다.
            </p>
            <p className="biz-note mt-2" data-anim-item>
              홍성읍 중심지 <span className="font-bold"><span className="font-bold text-(--color-blue)">600m</span> 반경</span> 고령자 1300명을 대상, 초기 서비스 도입 시뮬레이션
            </p>
          </div>

          {/* 3 Product Cards — 이미지 위 + 카드 아래 */}
          <div
            className="b-fade grid grid-cols-3 gap-[clamp(16px,2.2cqw,32px)] mt-[clamp(40px,5.5cqw,80px)]"
            data-anim-split="children"
          >
            {[
              {
                src: "/images/busniess/6_biliny-pm.png",
                alt: "공유형 PM BILINY",
                title: "공유형 PM 'BILINY'",
                qty: "50 대",
                price: "2.5",
                desc1: (
                  <>
                    스마트 레인 기반{" "}
                    <span className="font-bold text-(--color-blue)">저속 자율주행</span> 기능
                  </>
                ),
                desc2: (
                  <>
                    <span className="font-bold text-(--color-blue)">사계절 기후 대응형</span> 1인승
                    퍼스널 모빌리티
                  </>
                ),
              },
              {
                src: "/images/busniess/7_smart-lane.png",
                alt: "스마트 레인",
                title: "스마트 레인",
                qty: "16km",
                price: "9.6",
                wide: true,
                desc1: (
                  <>
                    시각 인식 기반의{" "}
                    <span className="font-bold text-(--color-blue)">저비용 유도 주행</span> 레인
                    인프라
                  </>
                ),
                desc2: <>태양광 야간 시인성 확보 및 보행자 안전 경계선 기능</>,
              },
              {
                src: "/images/busniess/8_carewatch.png",
                alt: "케어워치",
                title: "케어워치",
                qty: "1300 개",
                price: "0.3",
                desc1: (
                  <>
                    고령자 <span className="font-bold text-(--color-blue)">이동 현황 모니터링</span>{" "}
                    - <span className="font-bold text-(--color-blue)">안심 케어</span> 디바이스
                  </>
                ),
                desc2: <>119 자동 신고 기능, 컨디션 맞춤 목적지 제안 기능</>,
              },
            ].map((card) => (
              <div key={card.title} className="flex flex-col items-center" data-anim-item>
                {/* 제품 이미지 (카드 바깥) */}
                <div
                  className={`relative overflow-hidden h-[clamp(160px,18cqw,260px)] ${card.wide ? "w-[clamp(280px,34cqw,500px)]" : "w-[clamp(160px,18cqw,260px)]"} mb-[clamp(12px,1.4cqw,20px)]`}
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    className={`object-contain ${card.wide ? "-translate-y-[10%]" : ""}`}
                    sizes="18vw"
                  />
                </div>
                {/* 카드 */}
                <div className="w-full rounded-[clamp(16px,1.7cqw,24px)] bg-[var(--color-bg-subtle)] border border-[#ebebeb] shadow-[0_4px_32px_rgba(98,98,98,0.15)] px-5 py-5 text-center">
                  <p className="biz-card-title">{card.title}</p>
                  <p className="biz-card-qty mt-[clamp(2px,0.3cqw,4px)]">{card.qty}</p>
                  <p className="biz-card-price mt-[clamp(6px,0.7cqw,10px)]">
                    {card.price}
                    <span className="biz-card-qty">억 원</span>
                  </p>
                  <div className="mt-[clamp(14px,1.7cqw,24px)]">
                    <p className="biz-card-desc">{card.desc1}</p>
                    <p className="biz-card-desc mt-[clamp(2px,0.3cqw,4px)]">{card.desc2}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 6: 게다가 자율주행이잖아?
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="bg-white">
        <div className="product-container text-center py-[clamp(60px,8.3cqw,120px)]">
          <h3 className="b-reveal biz-revenue-heading">게다가</h3>
          <h3 className="b-reveal biz-revenue-heading mt-[clamp(12px,1.7cqw,24px)]">
            자율주행이잖아?
          </h3>
          <p className="b-fade mt-[clamp(24px,3.3cqw,48px)] text-[clamp(16px,1.7cqw,24px)] tracking-[0.05em] text-[var(--color-text-tertiary)]">
            <span className="font-bold">비활동시간 추가 비즈니스</span>를 통한 부가가치 확장
          </p>
          <p className="b-fade biz-subtitle mt-[clamp(16px,2.2cqw,32px)]">
            케어 업무 이외 <span className="font-bold text-(--color-blue)">남는 시간</span>, 도심 속{" "}
            <span className="font-bold text-(--color-blue)">업무 확장</span>이 가능한
          </p>
          <p className="b-fade biz-city-care mt-[clamp(4px,0.5cqw,8px)]">시티 케어 솔루션</p>

          {/* Revenue Cards */}
          <div
            className="b-fade grid grid-cols-3 gap-[clamp(16px,2.2cqw,32px)] mt-[clamp(40px,5.5cqw,80px)]"
            data-anim-split="children"
          >
            {/* Card 1: 9번+10번 겹침 — 배경 없이 이미지만 */}
            <div className="flex flex-col items-center" data-anim-item>
              <p className="biz-revenue-label">중단거리 출퇴근 / 학교·학원 등하교</p>

              <div className="relative w-full h-[clamp(180px,22cqw,300px)] mt-[clamp(8px,1cqw,14px)]">
                <p className="biz-revenue-detail absolute -top-3 left-10 z-2">*50대 운영기준</p>
                {/* Image 9 — 좌상단, 원본 비율 */}
                <div className="absolute left-0 top-[3%] w-[70%]">
                  <Image
                    src="/images/busniess/9_elderly-commute.png"
                    alt="출퇴근 보조"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-[clamp(20px,2.4cqw,35px)]"
                    sizes="15vw"
                  />
                </div>
                {/* Image 10 — 9번과 같은 가로 폭, 원본 비율 유지 */}
                <div className="absolute right-0 bottom-0 w-[70%] z-1">
                  <Image
                    src="/images/busniess/10_urban-boarding.png"
                    alt="승하차 보조"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-[clamp(20px,2.4cqw,35px)]"
                    sizes="15vw"
                  />
                </div>
              </div>

              <div className="flex items-baseline gap-1 mt-[clamp(12px,1.4cqw,20px)]">
                <span className="biz-revenue-unit">연</span>
                <span className="biz-revenue-annual">2.7</span>
                <span className="biz-revenue-unit">억 원</span>
              </div>
              <p className="biz-revenue-detail mt-[clamp(4px,0.5cqw,8px)]">
                출/퇴근 이동 3회, 등/하원 3회, 점심시간 단거리 이동 2회
              </p>
              <p className="biz-revenue-daily mt-[clamp(2px,0.3cqw,4px)]">일 1.45만 원</p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center" data-anim-item>
              <p className="biz-revenue-label">점심시간 단거리 이동 / 퀵 배달 · 배송서비스</p>

              <div className="h-[clamp(180px,22cqw,300px)] mt-[clamp(8px,1cqw,14px)] flex items-center justify-center">
                <Image
                  src="/images/busniess/11_delivery-service.png"
                  alt="택배 배송"
                  width={600}
                  height={420}
                  className="rounded-[clamp(24px,2.8cqw,42px)]"
                  style={{ height: "100%", width: "auto", maxWidth: "none" }}
                  sizes="26vw"
                />
              </div>

              <div className="flex items-baseline gap-1 mt-[clamp(12px,1.4cqw,20px)]">
                <span className="biz-revenue-unit">연</span>
                <span className="biz-revenue-annual">5</span>
                <span className="biz-revenue-unit">억 원</span>
              </div>
              <p className="biz-revenue-detail mt-[clamp(4px,0.5cqw,8px)]">
                퀵 배달 2회, 저녁심야배송 3회
              </p>
              <p className="biz-revenue-daily mt-[clamp(2px,0.3cqw,4px)]">일 2.6만 원</p>
            </div>

            {/* Card 3 — 배경 없이 이미지만 */}
            <div className="flex flex-col items-center" data-anim-item>
              <p className="biz-revenue-label">대리 기사 복귀 이동수단 / 야간 순찰</p>

              <div className="w-full h-[clamp(180px,22cqw,300px)] mt-[clamp(8px,1cqw,14px)] flex items-center justify-center">
                <Image
                  src="/images/busniess/12_night-patrol.png"
                  alt="야간 순찰"
                  width={500}
                  height={370}
                  style={{ height: "100%", width: "auto" }}
                  sizes="20vw"
                />
              </div>

              <div className="flex items-baseline gap-1 mt-[clamp(12px,1.4cqw,20px)]">
                <span className="biz-revenue-unit">연</span>
                <span className="biz-revenue-annual">1.1</span>
                <span className="biz-revenue-unit">억 원</span>
              </div>
              <p className="biz-revenue-detail mt-[clamp(4px,0.5cqw,8px)]">
                야간순찰 3시간, 대리기사이송 1회
              </p>
              <p className="biz-revenue-daily mt-[clamp(2px,0.3cqw,4px)]">일 0.6만 원</p>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 7: 로컬 실증에서 글로벌 확장까지 (GSAP Pin)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <ExpansionPinSection />
    </section>
  );
}
