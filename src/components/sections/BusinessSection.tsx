"use client";

import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { onMainContentReady } from "@/lib/animationState";
import { useProductAnimations } from "@/hooks/useProductAnimations";
import { WordmarkLogoHorizon } from "@/components/ui/icons/WordmarkLogoHorizon";
import { LeafTopLeft } from "@/components/ui/icons/BlueLeafTopLeft";
import { LeafBottomRight } from "@/components/ui/icons/BlueLeafBottomRight";

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
    mapOpacity: "",
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
function PhaseColumn({ p }: { p: (typeof PHASES)[number] }) {
  return (
    <div className="flex flex-col items-center min-w-0 flex-1">
      {/* 설명 */}
      <p className="biz-phase-desc text-center whitespace-nowrap mb-[clamp(8px,1.1cqw,16px)]">
        {p.desc}
      </p>

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

export function ExpansionPinSection() {
  const expansionRef = useRef<HTMLElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const mobileOuterRef = useRef<HTMLDivElement>(null);
  const mobileEndRef = useRef<HTMLDivElement>(null);

  useProductAnimations(expansionRef);

  useGSAP(
    () => {
      const outer = outerRef.current;
      const sticky = stickyRef.current;
      if (!outer || !sticky) return;

      /* ── 초기 숨김 ── */
      gsap.set(sticky.querySelectorAll(".exp-title"), { y: 40, opacity: 0 });
      gsap.set(sticky.querySelectorAll(".exp-col"), { opacity: 0, y: 30 });
      gsap.set(sticky.querySelectorAll(".exp-connector"), { opacity: 0, scaleX: 0 });

      let timeline: gsap.core.Timeline | null = null;
      let firstRafId: number;
      let secondRafId: number;

      const unsubscribe = onMainContentReady(() => {
        firstRafId = requestAnimationFrame(() => {
          secondRafId = requestAnimationFrame(() => {
            const cols = sticky.querySelectorAll<HTMLElement>(".exp-col");
            const connectors = sticky.querySelectorAll<HTMLElement>(".exp-connector");
            const titles = sticky.querySelectorAll<HTMLElement>(".exp-title");
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
                start: "top top",
                end: "bottom bottom",
                scrub: 0.65,
              },
            });

            /* Step 0: 제목 등장 */
            timeline
              .to(titles, { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: "power2.out" })
              .to({}, { duration: 0.15 })

              /* Step 1: 2027 등장 */
              .to(cols[0], { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" })
              .to({}, { duration: 0.2 })

              /* Step 2: 선 + 2028 등장 */
              .to(connectors[0], { opacity: 1, scaleX: 1, duration: 0.3, ease: "power2.out" })
              .to(cols[1], { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "<0.1")
              .to({}, { duration: 0.2 })

              /* Step 3: 선 + 2030 등장 */
              .to(connectors[1], { opacity: 1, scaleX: 1, duration: 0.3, ease: "power2.out" })
              .to(cols[2], { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "<0.1")

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

  useGSAP(
    () => {
      const outer = mobileOuterRef.current;
      const root = mobileEndRef.current;
      if (!outer || !root) return;

      const steps = root.querySelectorAll<HTMLElement>(".exp-mobile-dissolve-step");
      if (steps.length < 3) return;

      /* 초기 숨김 — 모든 step 숨김 (사전 노출 방지) */
      gsap.set(steps, { autoAlpha: 0, y: 16, filter: "blur(10px)" });

      let timeline: gsap.core.Timeline | null = null;
      let firstRafId: number;
      let secondRafId: number;
      let unsubscribe: (() => void) | null = null;

      const mm = gsap.matchMedia();

      mm.add("(max-width: 639px)", () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          gsap.set(steps, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
          return undefined;
        }

        /*
         * desktop sticky pin 패턴과 동일:
         * 1) 모든 step 초기 숨김
         * 2) onMainContentReady → 2x rAF로 다른 섹션의 -mt/translateY가 settle된 후 ScrollTrigger 위치 계산
         * 3) staggered 등장 — 각 요소가 차례로 등장 후 유지(cross-fade 아님)
         */
        unsubscribe = onMainContentReady(() => {
          firstRafId = requestAnimationFrame(() => {
            secondRafId = requestAnimationFrame(() => {
              timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: outer,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.7,
                },
              });

              timeline
                /* Step 0: 헤딩 등장 */
                .to(steps[0], {
                  autoAlpha: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.35,
                  ease: "power2.out",
                })
                .to({}, { duration: 0.5 })
                /* Step 0 사라짐 → Step 1 등장 */
                .to(steps[0], {
                  autoAlpha: 0,
                  y: -16,
                  filter: "blur(10px)",
                  duration: 0.3,
                })
                .to(
                  steps[1],
                  {
                    autoAlpha: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.35,
                    ease: "power2.out",
                  },
                  "<0.1",
                )
                .to({}, { duration: 0.5 })
                /* Step 1 사라짐 → Step 2 등장 */
                .to(steps[1], {
                  autoAlpha: 0,
                  y: -16,
                  filter: "blur(10px)",
                  duration: 0.3,
                })
                .to(
                  steps[2],
                  {
                    autoAlpha: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.35,
                    ease: "power2.out",
                  },
                  "<0.1",
                )
                /* 최종 유지 */
                .to({}, { duration: 0.5 });
            });
          });
        });

        return () => {
          unsubscribe?.();
          timeline?.kill();
          if (firstRafId) cancelAnimationFrame(firstRafId);
          if (secondRafId) cancelAnimationFrame(secondRafId);
        };
      });

      return () => mm.revert();
    },
    { scope: mobileOuterRef },
  );

  return (
    <section ref={expansionRef} className="relative z-10">
      {/* ═══════════════════════════════════════
          모바일 전용 — sticky pin 비활성, 세로 스택
      ═══════════════════════════════════════ */}
      <div className="block sm:hidden bg-white px-10 py-5">
        <div className="mb-10 text-center">
          <h3 className="b-reveal biz-m-heading text-[19px]!">로컬 실증에서 글로벌 확장까지</h3>
          <p className="b-fade biz-m-body mt-5 text-[16px]! leading-[1.45]! text-[var(--color-text-tertiary)]!">
            <span className="font-bold text-[var(--color-primary)]">10% </span>
            <span className="font-bold text-[var(--color-text)]">예산 전환을 시작으로,</span>
            <br />
            5년간 <span className="font-bold text-[var(--color-primary)]">2600%</span>{" "}
            <span className="font-bold text-[var(--color-text)]">확장성</span>을 이루는 솔루션
          </p>
        </div>
        <div className="flex flex-col gap-5">
          {PHASES.map((p, idx) => (
            <div key={p.year} className="flex flex-col items-center">
              <span className="b-fade rounded-[10px] bg-[var(--color-primary)] p-2 text-[14px] font-bold leading-none text-white">
                {p.year}
              </span>
              <p className="b-fade biz-m-phase-desc mt-4 whitespace-nowrap text-[14px]!">
                {p.desc}
              </p>

              <div className="b-fade mt-1 flex items-center justify-center">
                <div className="relative size-[166px] shrink-0">
                  <Image
                    src={p.map}
                    alt={p.mapAlt}
                    fill
                    className={`object-contain ${p.mapOpacity}`}
                    sizes="166px"
                  />
                </div>
                <div className="flex flex-col justify-center gap-2">
                  {p.stats.map((s) => (
                    <p key={s.number} className="whitespace-nowrap text-[16px]">
                      <span className="font-bold text-[var(--color-text-tertiary)]">
                        {s.number}
                      </span>
                      <span className="font-normal text-[var(--color-text-tertiary)]">
                        {s.unit}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              {/* 재정 카드 */}
              <div className="b-fade mt-5 w-[86%] rounded-[28px] border border-[rgba(210,210,220,0.5)] bg-[rgba(243,244,248,0.9)] px-5 py-5 shadow-[0_4px_32px_rgba(98,98,98,0.15)]">
                <div className="grid grid-cols-2 gap-x-3">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-x-1 gap-y-1 items-baseline">
                    {p.finance.left.map((item) => (
                      <Fragment key={item.label}>
                        <span className="text-[10px] font-medium text-[#6d6d6d]">{item.label}</span>
                        <span className="text-[12px] font-bold text-[#6d6d6d] text-right">
                          {item.value}
                        </span>
                        <span className="text-[10px] text-[#6d6d6d]">{item.tag}</span>
                      </Fragment>
                    ))}
                  </div>
                  <div className="grid grid-cols-[1fr_auto_auto] gap-x-1 gap-y-1 items-baseline">
                    {p.finance.right.map((item) => (
                      <Fragment key={item.label}>
                        <span className="text-[10px] font-medium text-[#6d6d6d] text-right">
                          {item.label}
                        </span>
                        <span className="text-[12px] font-bold text-[#6d6d6d] text-right">
                          {item.value}
                        </span>
                        <span className="text-[10px] text-[#6d6d6d]">{item.tag}</span>
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div className="mt-2 flex items-start justify-between border-t border-black/5 pt-1.5">
                  <div className="flex flex-col items-start">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[15px] font-bold text-[var(--color-primary)]">
                        {p.finance.totalLeft}
                      </span>
                      <span className="text-[15px] font-bold text-[var(--color-text-tertiary)]">
                        {p.finance.totalLeftUnit}
                      </span>
                      <span className="text-[10px] font-bold text-[var(--color-text-tertiary)]">
                        {p.finance.totalLeftNote}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[auto_auto_auto_auto] gap-x-1 items-baseline">
                    <div className="flex relative h-5 w-9 shrink-0 self-center">
                      <Image
                        src="/images/busniess/16_fin-card-shadow.png"
                        alt=""
                        fill
                        className="object-contain"
                        sizes="36px"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-[13px] font-bold text-[var(--color-text-tertiary)] text-right">
                      {p.finance.totalRightNote}
                    </span>
                    <span className="text-[15px] font-bold text-[var(--color-primary)] text-right">
                      {p.finance.totalRight}
                    </span>
                    <span className="text-[13px] font-bold text-[var(--color-text-tertiary)]">
                      {p.finance.totalRightUnit}
                    </span>
                    <span className="col-span-2 text-[13px] font-bold text-[var(--color-text-tertiary)] text-right whitespace-nowrap">
                      5년누적
                    </span>
                    <span className="text-[15px] font-bold text-[var(--color-primary)] text-right">
                      {p.finance.cumulative}
                    </span>
                    <span className="text-[13px] font-bold text-[var(--color-text-tertiary)]">
                      {p.finance.cumulativeUnit}
                    </span>
                  </div>
                </div>
              </div>

              {idx < PHASES.length - 1 && (
                <div className="b-fade mt-6 flex flex-col items-center">
                  <div className="h-10 w-0.5 bg-[var(--color-primary)]" />
                  <div className="size-3 rounded-full bg-[var(--color-primary)]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 엔딩 — sticky pin (desktop과 동일 패턴) */}
        <div ref={mobileOuterRef} className="relative mt-16" style={{ height: "260vh" }}>
          <div
            ref={mobileEndRef}
            className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
          >
            {/* 3개 step이 모두 중앙에 overlap — cross-fade로 한 번에 하나씩 표시 */}
            <div className="relative h-[80px] w-full">
              <div className="exp-mobile-dissolve-step absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-[50px] w-[88%] items-center justify-center">
                  <LeafTopLeft size={24} fill="#0060EF" className="absolute left-0 top-0" />
                  <h3 className="biz-m-heading text-[14px]!">
                    이동의 자유가 모두에게 채워지는 그날까지
                  </h3>
                  <LeafBottomRight size={24} fill="#0060EF" className="absolute bottom-0 right-0" />
                </div>
              </div>

              <div className="exp-mobile-dissolve-step absolute inset-0 flex items-center justify-center">
                <div className="relative h-[50px] w-full text-[18px] font-bold leading-none text-[#3c3c3c]">
                  <span className="absolute left-[5%] top-0 text-[var(--color-primary)]">FIND</span>
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    BLIND
                  </span>
                  <span className="absolute bottom-0 right-[5%]">SPOT</span>
                </div>
              </div>

              <div className="exp-mobile-dissolve-step absolute inset-0 flex items-center justify-center">
                <WordmarkLogoHorizon width={160} fill="#3C3C3C" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          데스크톱 전용 — sticky pin
      ═══════════════════════════════════════ */}
      <div
        ref={outerRef}
        className="relative bg-white hidden sm:block"
        style={{ height: "calc(165vh * var(--zoom-inverse, 1))" }}
      >
        <div
          ref={stickyRef}
          className="sticky top-16 flex flex-col justify-center overflow-hidden"
          style={{ height: "calc((100vh - 4rem) * var(--zoom-inverse, 1))" }}
        >
          {/* 제목 */}
          <div className="product-container text-center mb-12">
            <h3 className="exp-title biz-title">로컬 실증에서 글로벌 확장까지</h3>
            <p className="exp-title biz-expansion-sub mt-8">
              <span className="font-bold text-(--color-blue)">10% </span>
              <span className="font-bold">예산 전환을 시작으로,</span> 5년간{" "}
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
    </section>
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
      {/* ═══════════════════════════════════════
          데스크톱 전용 본문 (sm 이상)
      ═══════════════════════════════════════ */}
      <div className="hidden sm:block">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 1: 과연 현실적인 해결책일까요?
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="bg-white text-center py-50">
          <h2 className="b-fade biz-title">과연 현실적인 해결책일까요?</h2>
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
                  <p className="absolute biz-small left-0 mt-2 ml-0.5" data-anim-item>
                    인구 10만명 미만기준
                  </p>
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
                        <path
                          d="M13 8V14"
                          stroke="#7a7a8a"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
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
              <p className="biz-desc whitespace-nowrap" data-anim-item>
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
                <span className="font-bold text-(--color-blue)">10%</span>
                만으로 고령자 생활에 맞춘{" "}
                <span className="font-bold">새로운 이동수단 대안을 제공</span>할 수 있습니다.
              </p>
              <p className="biz-note mt-2" data-anim-item>
                홍성읍 중심지{" "}
                <span className="font-bold">
                  <span className="font-bold text-(--color-blue)">600m</span> 반경
                </span>{" "}
                고령자 1300명을 대상, 초기 서비스 도입 시뮬레이션
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
                      <span className="font-bold text-(--color-blue)">사계절 기후 대응형</span>{" "}
                      1인승 퍼스널 모빌리티
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
                      고령자{" "}
                      <span className="font-bold text-(--color-blue)">이동 현황 모니터링</span> -{" "}
                      <span className="font-bold text-(--color-blue)">안심 케어</span> 디바이스
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
              케어 업무 이외 <span className="font-bold text-(--color-blue)">남는 시간</span>, 도심
              속 <span className="font-bold text-(--color-blue)">업무 확장</span>이 가능한
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
         Part 7: 로컬 실증에서 글로벌 확장까지 (별도 ScaleWrapper에서 렌더링)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      </div>

      {/* ═══════════════════════════════════════
          모바일 전용 본문 (< sm)
      ═══════════════════════════════════════ */}
      <div className="block sm:hidden">
        {/* Part 1: 과연 현실적인 해결책일까요? */}
        <div className="bg-white text-center px-[5%] py-14">
          <h2 className="b-fade biz-m-heading text-[20px]!">과연 현실적인 해결책일까요?</h2>
        </div>

        {/* Part 2+3: 다크 배경 — 사회적 비용 + 막대한 예산 */}
        <div className="relative">
          <div
            className="pointer-events-none absolute"
            style={{
              top: "6px",
              bottom: "6px",
              left: "-60px",
              right: "-60px",
              background: "#2C2C2C",
              filter: "blur(36px)",
            }}
          />
          <div className="relative z-10 px-[5%] pt-20 pb-16 mt-5">
            {/* 사회적 비용 */}
            <h3 className="b-reveal biz-m-heading-white whitespace-nowrap text-[17px]!">
              이동권 박탈로 인해 발생하는 사회적 비용
            </h3>
            <div className="b-fade flex flex-col items-center">
              <div className="flex items-baseline justify-center gap-1 whitespace-nowrap">
                <span className="biz-m-body-white">중소도시 당 연간</span>
                <span className="relative inline-flex flex-col items-center">
                  <span className="biz-m-body-white font-bold! text-white!">310억 원 상당</span>
                  <span className="biz-m-label absolute top-full left-1 whitespace-nowrap text-[6px]!">
                    인구 10만명 미만기준
                  </span>
                </span>
              </div>
            </div>

            {/* 아이콘 그룹 */}
            <div className="b-fade mt-12 flex w-full items-start justify-center gap-7">
              <div className="flex w-fit shrink-0 flex-col items-center gap-1">
                <div className="flex h-8 items-end justify-center gap-6">
                  <div className="relative size-7">
                    <Image
                      src="/images/busniess/1_welfare-bus-icon.png"
                      alt="복지버스"
                      fill
                      className="object-contain object-bottom"
                      sizes="44px"
                    />
                  </div>
                  <div className="relative size-7">
                    <Image
                      src="/images/busniess/2_welfare-taxi-icon.png"
                      alt="복지택시"
                      fill
                      className="object-contain object-bottom"
                      sizes="44px"
                    />
                  </div>
                </div>
                <p className="biz-m-card-title whitespace-nowrap text-center">
                  복지버스&nbsp;&nbsp;/&nbsp;&nbsp;복지택시
                </p>
                <p className="biz-m-big mt-1.5 text-[14px]!">연 150억원</p>
              </div>

              <span className="pt-8 text-md font-bold text-white">+</span>

              <div className="flex w-fit shrink-0 flex-col items-center gap-1">
                <div className="flex h-8 items-end justify-center gap-5">
                  <div className="relative size-8">
                    <Image
                      src="/images/busniess/3_depression-icon.png"
                      alt="우울증"
                      fill
                      className="object-contain object-bottom"
                      sizes="44px"
                    />
                  </div>
                  <div className="relative size-9">
                    <Image
                      src="/images/busniess/4_nursing-facility-icon.png"
                      alt="요양시설"
                      fill
                      className="object-contain object-bottom"
                      sizes="44px"
                    />
                  </div>
                </div>
                <p className="biz-m-card-title whitespace-nowrap text-center">
                  우울증&nbsp;&nbsp;/&nbsp;&nbsp;요양시설 가속
                </p>
                <p className="biz-m-big mt-1.5 text-[14px]!">연 160억원</p>
              </div>
            </div>

            {/* 막대한 예산 투입 */}
            <div className="b-fade mt-2 flex justify-center">
              <div className="relative w-18 aspect-square">
                <Image
                  src="/images/busniess/red_arrow.png"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="64px"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="mt-7 text-center">
              <h3 className="b-reveal biz-m-heading-white">
                막대한 예산 투입,
                <br />
                그러나 여전한 이동의 고립
              </h3>
              <p className="b-fade biz-m-body-white mt-6">
                기존 복지버스/무료 택시는 연간 150억원을 투입하지만,
                <br />
                실제 이용률은 <span className="font-bold text-white">
                  대도심 대중교통 대비
                </span>{" "}
                <span className="align-baseline text-[18px] font-bold leading-none text-[#FF6666]">
                  {" "}
                  1/5
                </span>
                에 불과합니다.
              </p>
            </div>

            {/* 3 카드: 1행 2개, 2행 1개 */}
            <div
              className="b-fade relative z-10 mt-10 mx-5 grid grid-cols-2 gap-3"
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
                        stroke="#9a9aa8"
                        strokeWidth="1.2"
                        fill="none"
                      />
                      <path d="M13 8V14" stroke="#9a9aa8" strokeWidth="1.2" strokeLinecap="round" />
                      <path
                        d="M13 8L16 11"
                        stroke="#9a9aa8"
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
                        stroke="#9a9aa8"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 7H22V12"
                        stroke="#9a9aa8"
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
                        stroke="#9a9aa8"
                        strokeWidth="1.2"
                        fill="none"
                      />
                      <circle
                        cx="17"
                        cy="10"
                        r="3.5"
                        stroke="#9a9aa8"
                        strokeWidth="1.2"
                        fill="none"
                      />
                      <path
                        d="M4 22C4 18.5 6.5 16 9 16C10.5 16 12 16.5 13 17C14 16.5 15.5 16 17 16C19.5 16 22 18.5 22 22"
                        stroke="#9a9aa8"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                  title: "생존권의 위협",
                  subtitle: "사회적 고립 가속",
                  desc: "이동권의 빈틈은 병원 방문 단절과 우울증, 치매 가속으로 이어집니다.",
                },
              ].map((card, idx) => (
                <div
                  key={card.title}
                  className={`rounded-xl border border-white/10 bg-white/5 p-3 text-left ${
                    idx === 2 ? "col-span-2 w-[calc(50%-0.375rem)] justify-self-center" : ""
                  }`}
                >
                  <div className="mb-2 h-4 w-4">{card.icon}</div>
                  <p className="biz-m-card-title text-[9px]!">{card.title}</p>
                  <p className="mt-1 text-[9px]! font-bold tracking-[0.02em] text-white">
                    {card.subtitle}
                  </p>
                  <p className="biz-m-card-desc mt-2">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* 전환 화살표 */}
            <div className="b-fade relative z-0 flex justify-center -mt-40">
              <div className="relative w-26 aspect-[1/2]">
                <Image
                  src="/images/busniess/5_transition-arrow.png"
                  alt=""
                  fill
                  className="object-contain translate-y-43"
                  sizes="128px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Part 5: 10%만으로 + 3 제품 카드 */}
        <div className="bg-white px-[5%] py-20 mt-20 text-center">
          <h3 className="b-reveal biz-m-heading">
            교통 복지 예산의 <span className="text-[var(--color-primary)]">10%</span>만으로!
          </h3>
          <div className="b-fade mt-6" data-anim-split="children">
            <p className="biz-m-body">
              <span className="relative inline-block pb-5">
                중소도시 1년 교통 복지 <span className="font-bold">예산</span>
                <span className="absolute left-0 right-0 top-full -mt-5 flex flex-col items-center">
                  <span
                    className="h-px w-full"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, #c0c0c0 30%, #c0c0c0 70%, transparent)",
                    }}
                  />
                  <span className="biz-m-label">(150억)</span>
                </span>
              </span>
              <span className="font-bold">의 단 </span>
              <span className="font-bold text-[var(--color-primary)]">10%</span>만으로
            </p>
            <p className="biz-m-body">
              고령자 생활에 맞춘 <span className="font-bold">새로운 이동수단 대안을 제공</span>할 수
              있습니다.
            </p>
          </div>
          <p className="biz-m-label mt-4">
            홍성읍 중심지 600m 반경 고령자 1300명을 대상, 초기 서비스 도입 시뮬레이션
          </p>

          {/* 3 제품 카드 */}
          <div className="mt-12 flex flex-col" data-anim-split="children">
            <div className="b-fade">
              <div className="relative flex flex-col items-center ">
                <div className="relative z-0 mb-[-6px] aspect-[5/4] w-[70%]">
                  <Image
                    src="/images/busniess/6_biliny-pm.png"
                    alt="공유형 PM BILINY"
                    fill
                    className="object-contain"
                    sizes="70vw"
                  />
                </div>
                <div className="relative z-10 w-[72%] max-w-[290px] rounded-[24px] border border-[#ebebeb] bg-[var(--color-bg-subtle)] px-4 py-4 text-center shadow-[0_4px_32px_rgba(98,98,98,0.15)] translate-y-[-20%]">
                  <p className="biz-m-product-title">{"① 공유형 PM 'BILINY'"}</p>
                  <p className="biz-m-product-qty mt-1">50 대</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <p className="biz-m-product-price">2.5</p>
                    <p className="biz-m-product-text">억 원</p>
                  </div>
                  <div className="">
                    <p className="biz-m-product-card-text">
                      스마트 레인 기반{" "}
                      <span className="font-bold text-[var(--color-primary)]">저속 자율주행</span>{" "}
                      기능
                    </p>
                    <p className="biz-m-product-card-text mt-1">
                      <span className="font-bold text-[var(--color-primary)]">
                        사계절 기후 대응형
                      </span>{" "}
                      1인승 퍼스널 모빌리티
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="b-fade">
              <div className="relative flex flex-col items-center pb-6 translate-y-[-24%]">
                <div className="relative z-0 mb-[-26px] aspect-[5/4] w-[105%]">
                  <Image
                    src="/images/busniess/7_smart-lane.png"
                    alt="스마트 레인"
                    fill
                    className="object-contain translate-x-[-5%]"
                    sizes="100vw"
                  />
                </div>
                <div className="relative z-10 w-[72%] max-w-[290px] rounded-[24px] border border-[#ebebeb] bg-[var(--color-bg-subtle)] px-4 py-4 text-center shadow-[0_4px_32px_rgba(98,98,98,0.15)] translate-y-[-20%]">
                  <p className="biz-m-product-title">② 스마트 레인</p>
                  <p className="biz-m-product-qty mt-1">16km</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <p className="biz-m-product-price">9.6</p>
                    <p className="biz-m-product-text">억 원</p>
                  </div>
                  <div className="">
                    <p className="biz-m-product-card-text">
                      시각 인식 기반의{" "}
                      <span className="font-bold text-[var(--color-primary)]">
                        저비용 유도 주행
                      </span>{" "}
                      레인 인프라
                    </p>
                    <p className="biz-m-product-card-text mt-1">
                      태양광 야간 시인성 확보 및 보행자 안전 경계선 기능
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="b-fade">
              <div className="relative flex flex-col items-center translate-y-[-45%]">
                <div className="relative z-0 mb-[-14px] aspect-[5/4] w-[64%]">
                  <Image
                    src="/images/busniess/8_carewatch.png"
                    alt="케어워치"
                    fill
                    className="object-contain"
                    sizes="64vw"
                  />
                </div>
                <div className="relative z-10 w-[72%] mt-2 max-w-[290px] rounded-[24px] border border-[#ebebeb] bg-[var(--color-bg-subtle)] px-4 py-4 text-center shadow-[0_4px_32px_rgba(98,98,98,0.15)]">
                  <p className="biz-m-product-title">③ 케어워치</p>
                  <p className="biz-m-product-qty mt-1">1300 개</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <p className="biz-m-product-price">0.3</p>
                    <p className="biz-m-product-text">억 원</p>
                  </div>
                  <div className="">
                    <p className="biz-m-product-card-text">
                      고령자{" "}
                      <span className="font-bold text-[var(--color-primary)]">
                        이동 현황 모니터링
                      </span>{" "}
                      - <span className="font-bold text-[var(--color-primary)]">안심 케어</span>{" "}
                      디바이스
                    </p>
                    <p className="biz-m-product-card-text mt-1">
                      119 자동 신고 기능, 컨디션 맞춤 목적지 제안 기능
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part 6: 게다가 자율주행이잖아 + 시티 케어 솔루션 */}
        <div className="bg-white -mt-60 px-[5%] py-20 text-center">
          <div className="flex justify-center mb-16">
            <span className="text-[22px] font-bold text-[var(--color-text-tertiary)]">+</span>
          </div>
          <h3 className="b-reveal biz-m-heading text-[20px]! leading-[1.55]!">
            스스로 움직이는
            <br />
            자율주행이니까!
          </h3>
          <p className="b-fade mt-12 text-[13px] font-medium tracking-[0.02em] text-[var(--color-text-tertiary)]">
            <span className="font-bold">비활동시간 추가 비즈니스</span>를 통한 부가가치 확장
          </p>
          <p className="b-fade mt-4 text-[15px] font-medium leading-[1.55] tracking-[0.02em] text-[var(--color-text-tertiary)]">
            케어 업무 이외 <span className="font-bold text-[var(--color-primary)]">남는 시간</span>,
            도심 속 <span className="font-bold text-[var(--color-primary)]">업무 확장</span>이
            가능한
          </p>
          <p className="b-fade mt-1 text-[18px] font-bold tracking-[0.02em] text-[var(--color-text-tertiary)]">
            시티 케어 솔루션
          </p>

          {/* 3 Revenue 카드 세로 스택 */}
          <div className="b-fade mt-12 flex flex-col gap-9" data-anim-split="children">
            <div className="flex flex-col items-center">
              <p className="text-[16px] font-bold tracking-[0.02em] text-[var(--color-text-tertiary)]">
                ① 중단거리 출퇴근 / 학교·학원 등하교
              </p>
              <div className="relative h-[300px] w-full">
                <div className="absolute left-[10%] top-0 w-[50%]">
                  <Image
                    src="/images/busniess/9_elderly-commute.png"
                    alt="출퇴근 보조"
                    width={400}
                    height={300}
                    className="h-auto w-full"
                    sizes="58vw"
                  />
                </div>
                <div className="absolute right-[12%] bottom-0 z-1 w-[55%] -translate-y-12">
                  <Image
                    src="/images/busniess/10_urban-boarding.png"
                    alt="승하차 보조"
                    width={400}
                    height={300}
                    className="h-auto w-full"
                    sizes="64vw"
                  />
                </div>
              </div>
              <div className="relative flex items-baseline justify-center gap-1 -mt-10">
                <span className="text-[16px] font-bold text-[var(--color-text-tertiary)]">연</span>
                <span className="text-[18px] font-bold leading-none text-[var(--color-primary)]">
                  2.7
                </span>
                <span className="text-[16px] font-bold text-[var(--color-text-tertiary)]">
                  억 원
                </span>
                <span className="absolute text-[10px] font-bold text-[#929292] translate-x-[130%] translate-y-1/2">
                  *50대 운영기준
                </span>
              </div>
              <p className="mt-3 text-[10px] font-medium tracking-[0.02em] text-[#929292]">
                출/퇴근 이동 3회, 등/하원 3회, 점심시간 단거리 이동 2회
              </p>
              <p className="mt-1 text-[10px] font-bold tracking-[0.02em] text-[#929292]">
                일 1.45만 원
              </p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-[16px] font-bold tracking-[0.02em] text-[var(--color-text-tertiary)]">
                ② 점심시간 단거리 이동 / 퀵 배달 · 배송서비스
              </p>
              <div className="flex w-[86%] items-center justify-center">
                <Image
                  src="/images/busniess/11_delivery-service.png"
                  alt="택배 배송"
                  width={600}
                  height={420}
                  className="h-auto w-full"
                  sizes="86vw"
                />
              </div>
              <div className="mt-1 flex items-baseline justify-center gap-1">
                <span className="text-[16px] font-bold text-[var(--color-text-tertiary)]">연</span>
                <span className="text-[18px] font-bold leading-none text-[var(--color-primary)]">
                  5
                </span>
                <span className="text-[16px] font-bold text-[var(--color-text-tertiary)]">
                  억 원
                </span>
              </div>
              <p className="mt-3 text-[10px] font-medium tracking-[0.02em] text-[#929292]">
                퀵 배달 2회, 저녁심야배송 3회
              </p>
              <p className="mt-1 text-[10px] font-bold tracking-[0.02em] text-[#929292]">
                일 2.6만 원
              </p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-[16px] font-bold tracking-[0.02em] text-[var(--color-text-tertiary)]">
                ③ 대리 기사 복귀 이동수단 / 야간 순찰
              </p>
              <div className=" flex w-[72%] items-center justify-center">
                <Image
                  src="/images/busniess/12_night-patrol.png"
                  alt="야간 순찰"
                  width={500}
                  height={370}
                  className="h-auto w-full"
                  sizes="72vw"
                />
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[16px] font-bold text-[var(--color-text-tertiary)]">연</span>
                <span className="text-[18px] font-bold leading-none text-[var(--color-primary)]">
                  1.1
                </span>
                <span className="text-[16px] font-bold text-[var(--color-text-tertiary)]">
                  억 원
                </span>
              </div>
              <p className="mt-3 text-[10px] font-medium tracking-[0.02em] text-[#929292]">
                야간순찰 3시간, 대리기사이송 1회
              </p>
              <p className="mt-1 text-[10px] font-bold tracking-[0.02em] text-[#929292]">
                일 0.6만 원
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
