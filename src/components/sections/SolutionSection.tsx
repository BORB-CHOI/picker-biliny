"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { onMainContentReady } from "@/lib/animationState";
import {
  buildViewportEntryStart,
  isScrollMarkerEnabled,
  resolveAnimationTrigger,
} from "@/lib/scrollTriggerUtils";

gsap.registerPlugin(ScrollTrigger);

const SOLUTION_ANIM_START = buildViewportEntryStart();

export function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const showMarkers = isScrollMarkerEnabled();
      /* ── 초기 상태: 즉시 숨김 ── */
      gsap.set(section.querySelectorAll(".sol-reveal"), {
        clipPath: "inset(100% 0% 0% 0%)",
        opacity: 0,
      });
      gsap.set(section.querySelectorAll(".sol-fade"), {
        y: 40,
        opacity: 0,
      });
      gsap.set(section.querySelectorAll(".sol-from-left"), {
        xPercent: -100,
        opacity: 0,
      });
      gsap.set(section.querySelectorAll(".sol-from-right"), {
        xPercent: 100,
        opacity: 0,
      });

      const animations: gsap.core.Animation[] = [];
      let firstRafId: number;
      let secondRafId: number;

      /*
       * Hero pin 유무와 무관하게 위치 계산을 안정화하기 위해
       * onMainContentReady 이후 double-rAF 시점에 ScrollTrigger를 생성한다.
       */
      const unsubscribe = onMainContentReady(() => {
        firstRafId = requestAnimationFrame(() => {
          secondRafId = requestAnimationFrame(() => {
            /* 텍스트: clip-path reveal (아래→위 마스크) */
            section.querySelectorAll<HTMLElement>(".sol-reveal").forEach((el) => {
              const triggerEl = resolveAnimationTrigger(el);
              const animation = gsap.to(el, {
                clipPath: "inset(0% 0% 0% 0%)",
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: triggerEl,
                  start: SOLUTION_ANIM_START,
                  markers: showMarkers,
                },
              });
              animations.push(animation);
            });

            /* 단순 fade up */
            section.querySelectorAll<HTMLElement>(".sol-fade").forEach((el) => {
              const triggerEl = resolveAnimationTrigger(el);
              const animation = gsap.to(el, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: triggerEl,
                  start: SOLUTION_ANIM_START,
                  markers: showMarkers,
                },
              });
              animations.push(animation);
            });

            /* 이미지: 좌측에서 슬라이드 인 + 패럴랙스 */
            section.querySelectorAll<HTMLElement>(".sol-from-left").forEach((el) => {
              const triggerEl = resolveAnimationTrigger(el);
              const revealAnimation = gsap.to(el, {
                xPercent: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: triggerEl,
                  start: SOLUTION_ANIM_START,
                  markers: showMarkers,
                },
              });
              animations.push(revealAnimation);

              const parallaxAnimation = gsap.to(el, {
                yPercent: -4,
                ease: "none",
                scrollTrigger: {
                  trigger: triggerEl,
                  start: SOLUTION_ANIM_START,
                  end: "bottom top",
                  markers: showMarkers,
                  scrub: true,
                },
              });
              animations.push(parallaxAnimation);
            });

            /* 이미지: 우측에서 슬라이드 인 + 패럴랙스 */
            section.querySelectorAll<HTMLElement>(".sol-from-right").forEach((el) => {
              const triggerEl = resolveAnimationTrigger(el);
              const revealAnimation = gsap.to(el, {
                xPercent: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: triggerEl,
                  start: SOLUTION_ANIM_START,
                  markers: showMarkers,
                },
              });
              animations.push(revealAnimation);

              const parallaxAnimation = gsap.to(el, {
                yPercent: -4,
                ease: "none",
                scrollTrigger: {
                  trigger: triggerEl,
                  start: SOLUTION_ANIM_START,
                  end: "bottom top",
                  markers: showMarkers,
                  scrub: true,
                },
              });
              animations.push(parallaxAnimation);
            });
          });
        });
      });

      return () => {
        unsubscribe();
        animations.forEach((animation) => animation.kill());
        cancelAnimationFrame(firstRafId);
        cancelAnimationFrame(secondRafId);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="solution" className="relative bg-white overflow-hidden">
      {/* ═══════════════════════════════════════
          실루엣 장식 (1_) — 데스크톱 전용
      ═══════════════════════════════════════ */}
      <div className="sol-fade w-[80%] pt-[3.25cqw] mx-auto hidden sm:block">
        <Image
          src="/images/solution/1_biliny-silhouette.png"
          alt=""
          width={2894}
          height={842}
          className="w-full h-auto"
          sizes="100vw"
          priority
        />
      </div>

      {/* ═══════════════════════════════════════
          데스크톱 전용 본문 (sm 이상)
      ═══════════════════════════════════════ */}
      <div className="hidden sm:block">
        {/* ═══════════════════════════════════════
          섹션 헤딩
      ═══════════════════════════════════════ */}
        <div className="w-full max-w-[80%] mx-auto relative z-20">
          <p className="sol-reveal solution-heading text-center mt-[3.2cqw]">
            이에 대한 해결책을 제시합니다
          </p>
        </div>

        {/* ═══════════════════════════════════════
          1. 빌려타는 "빌리니"
      ═══════════════════════════════════════ */}
        <div className="w-full max-w-[50%] mx-auto mt-[10.75cqw] relative z-20">
          <h3 className="sol-reveal solution-title font-black!">빌려타는 &ldquo;빌리니&rdquo;</h3>
          <div className="sol-reveal solution-desc mt-10">
            <p>
              <span className="font-medium">필요할 때 </span>
              <span className="font-bold text-(--color-primary)">
                언제든지 부르시면 빌려드립니다.{" "}
              </span>
            </p>
            <p className="font-medium">
              집 앞까지 와주고,
              <br />
              가고자하는 모든 길을 갑니다.
            </p>
            <p className="mt-1">
              <span className="font-medium">모든 여정을 마치면 </span>
              <span className="font-bold text-(--color-primary)">스스로 돌아갑니다.</span>
            </p>
          </div>
        </div>

        {/* 2_ 빌리니 집 앞 — 좌측 끝, 화면 밖 확장 */}
        <div className="sol-from-left mt-[3cqw] w-[80%] ml-[5%]">
          <Image
            src="/images/solution/2_biliny-doorstep.png"
            alt="빌리니가 집 앞까지 찾아오는 모습"
            width={2938}
            height={1414}
            className="solution-img"
            sizes="100vw"
          />
        </div>

        {/* ═══════════════════════════════════════
          2. 서로에게 안전한 "안내길"
      ═══════════════════════════════════════ */}
        <div className="w-full max-w-[50%] mx-auto mt-[16cqw] relative z-20">
          <div className="text-right">
            <h3 className="sol-reveal solution-title font-black!">
              서로에게 안전한 &ldquo;안내길&rdquo;
            </h3>
            <div className="sol-reveal solution-desc mt-10">
              <p className="font-medium">가는 길이 약속된 &lsquo;안내길&rsquo;을 깔아드려요.</p>
              <p className="mt-1">
                <span className="font-bold text-(--color-primary)">
                  탑승자/보행자/운전자 모두를 안전하게
                </span>
                <span className="font-medium">
                  {" "}
                  안내하기 위해{"\u00A0"}
                  <br />
                  따라가야할 길을 보여드립니다.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 3_ 스마트레인 야간 — 좌측 끝, 화면 밖 확장 */}
        <div className="sol-from-right mt-[3cqw] w-[80%] ml-[15%]">
          <Image
            src="/images/solution/3_smartlane-night.png"
            alt="야간 도로 위 빌리니 안내길 시스템"
            width={2929}
            height={1513}
            className="solution-img"
            sizes="92vw"
          />
        </div>

        {/* ═══════════════════════════════════════
          3. 모든 과정을 지켜봐주는 "돌봄이"
      ═══════════════════════════════════════ */}
        <div className="w-full max-w-[50%] mx-auto mt-[8cqw] relative z-20">
          <h3 className="sol-reveal solution-title">모든 과정을 지켜봐주는 &ldquo;돌봄이&rdquo;</h3>
          <div className="sol-reveal solution-desc mt-10">
            <p>
              <span className="font-medium">
                안전과 편의를 위해
                <br />
                탑승자가 이동을{" "}
              </span>
              <span className="font-bold text-(--color-primary)">시작할 때부터 이동이 끝날 때</span>
              <span className="font-medium">
                까지,
                <br />
                모든 과정을 지켜봐드립니다.
              </span>
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════
          4_ 케어워치 + 5_ 대시보드
          Figma: 4_(top=3355) 위, 5_(top=3540) 아래
          4_가 z-10으로 5_ 위에 오버랩
      ═══════════════════════════════════════ */}
        <div className="relative mt-[3.4cqw]">
          {/* 4_ 케어워치 — 좌측 끝 화면 밖, 위쪽에 위치, z-10 */}
          <div className="sol-from-left w-[48%] ml-[5%] relative z-10">
            <Image
              src="/images/solution/4_carewatch-wrist.png"
              alt="돌봄이 손목 디바이스를 착용한 어르신"
              width={1675}
              height={998}
              className="solution-img"
              sizes="66vw"
            />
          </div>
          {/* 5_ 가디언 대시보드 — 우측 끝, 4_와 겹치며 아래 배치 */}
          <div className="sol-from-right w-[70%] ml-auto mr-[5%] mt-[-18cqw]">
            <Image
              src="/images/solution/5_guardian-dashboard.png"
              alt="PICKER 가디언 관제 시스템 2.0 대시보드"
              width={2465}
              height={1015}
              className="solution-img-sm"
              sizes="82vw"
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════
          4. 모두에게 "공평한" 모빌리티
      ═══════════════════════════════════════ */}
        <div className="w-full max-w-[50%] mx-auto mt-[12.2cqw] relative z-20">
          <h3 className="sol-reveal solution-title">모두에게 &ldquo;공평한&rdquo; 모빌리티</h3>
          <div className="sol-reveal solution-desc mt-10">
            <p>
              <span className="font-medium">
                모두가 타실 수 있어요.
                <br />
              </span>
              <span className="font-bold text-(--color-primary)">학생부터 고령자</span>
              <span className="font-medium">까지 모두 이용할 수 있습니다.</span>
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════
          공평한 모빌리티 이미지들 — 좌/우 화면 끝 밖으로
      ═══════════════════════════════════════ */}
        <div className="mt-[6.75cqw]">
          {/* 6_ 학생들 — 좌측 끝 화면 밖 */}
          <div className="sol-from-left w-[50%] ml-[5%]">
            <Image
              src="/images/solution/6_biliny-students.png"
              alt="빌리니를 이용하는 학생들"
              width={1770}
              height={688}
              className="solution-img"
              sizes="64vw"
            />
          </div>

          {/* 7_ 출퇴근 — 우측 끝 화면 밖 */}
          <div className="sol-from-right w-[55%] ml-auto mr-[5%] mt-[1.9cqw]">
            <Image
              src="/images/solution/7_biliny-commute.png"
              alt="빌리니와 함께하는 출퇴근"
              width={2018}
              height={890}
              className="solution-img"
              sizes="80vw"
            />
          </div>

          {/* 8_ 도심 어르신 — 좌측 끝 화면 밖 */}
          <div className="sol-from-left w-[55%] ml-[5%] mt-[2.6cqw]">
            <Image
              src="/images/solution/8_biliny-city-elderly.png"
              alt="도심에서 빌리니를 이용하는 어르신"
              width={2005}
              height={1075}
              className="solution-img"
              sizes="74vw"
            />
          </div>
        </div>

        {/* 하단 여백 */}
        <div className="h-[5cqw]" />
      </div>

      {/* ═══════════════════════════════════════
          모바일 전용 본문 (< sm)
      ═══════════════════════════════════════ */}
      <div className="block sm:hidden px-[5%] pt-12">
        {/* 인트로 */}
        <p className="sol-reveal sol-m-intro">이에 대한 해결책을 제시합니다.</p>

        {/* Ⅰ 빌려타는 빌리니 */}
        <div className="mt-16 flex flex-col items-center gap-5">
          <h3 className="sol-reveal sol-m-title text-center">Ⅰ 빌려타는 &ldquo;빌리니&rdquo;</h3>
          <p className="sol-reveal sol-m-text text-center">
            <span>필요할 때 </span>
            <span className="sol-m-text-accent">언제든지 부르시면 빌려드립니다.</span>
          </p>
          <div className="sol-from-left relative w-screen -mx-[5%] mt-2">
            <Image
              src="/images/solution/2_biliny-doorstep.png"
              alt="빌리니가 집 앞까지 찾아오는 모습"
              width={2938}
              height={1414}
              className="w-full h-auto"
              sizes="100vw"
            />
          </div>
          <p className="sol-reveal sol-m-text text-center mt-2">
            집 앞까지 와주고,
            <br />
            가고자하는 모든 길을 갑니다.
            <br />
            모든 여정을 마치면 <span className="sol-m-text-accent">스스로 돌아갑니다.</span>
          </p>
        </div>

        {/* Ⅱ 서로에게 안전한 안내길 */}
        <div className="mt-24 flex flex-col items-center gap-5">
          <h3 className="sol-reveal sol-m-title text-center">
            Ⅱ 서로에게 안전한 &ldquo;안내길&rdquo;
          </h3>
          <p className="sol-reveal sol-m-text text-center">
            가는 길을 안내해주는{" "}
            <span className="sol-m-text-accent">&lsquo;안내길&rsquo;을 깔아드려요.</span>
          </p>
          <div className="sol-from-right relative w-screen -mx-[5%] mt-2">
            <Image
              src="/images/solution/3_smartlane-night.png"
              alt="야간 도로 위 빌리니 안내길 시스템"
              width={2929}
              height={1513}
              className="w-full h-auto"
              sizes="100vw"
            />
          </div>
          <p className="sol-reveal sol-m-text text-center mt-2">
            <span className="sol-m-text-accent">탑승자/보행자/운전자 모두를 안전하게 안내</span>
            하기 위해
            <br />
            따라가야할 길을 보여드립니다.
          </p>
        </div>

        {/* Ⅲ 모든 과정을 지켜봐주는 돌봄이 */}
        <div className="mt-24 flex flex-col items-center gap-5">
          <h3 className="sol-reveal sol-m-title text-center">
            Ⅲ 모든 과정을 지켜봐주는 &ldquo;돌봄이&rdquo;
          </h3>
          <p className="sol-reveal sol-m-text text-center">
            가는 길을 지켜봐줄{" "}
            <span className="sol-m-text-accent">&lsquo;돌봄이&rsquo;가 여러분과 동행합니다.</span>
          </p>
          <div className="sol-from-left relative w-[80%] mt-2">
            <Image
              src="/images/solution/4_carewatch-wrist.png"
              alt="돌봄이 손목 디바이스를 착용한 어르신"
              width={1675}
              height={998}
              className="w-full h-auto"
              sizes="80vw"
            />
          </div>
          <div className="sol-from-right relative w-[95%] -mt-6">
            <Image
              src="/images/solution/5_guardian-dashboard.png"
              alt="PICKER 가디언 관제 시스템 2.0 대시보드"
              width={2465}
              height={1015}
              className="w-full h-auto"
              sizes="95vw"
            />
          </div>
          <p className="sol-reveal sol-m-text text-center mt-2">
            안전과 편의를 위해
            <br />
            탑승자가 이동을 <span className="sol-m-text-accent">시작할 때부터 이동이 끝날 때</span>
            까지,
            <br />
            모든 과정을 지켜봐드립니다.
          </p>
        </div>

        {/* Ⅳ 모두에게 공평한 모빌리티 */}
        <div className="mt-24 flex flex-col items-center gap-5">
          <h3 className="sol-reveal sol-m-title text-center">
            Ⅳ 모두에게 &ldquo;공평한&rdquo; 모빌리티
          </h3>
          <p className="sol-reveal sol-m-text text-center">
            모두가 타실 수 있어요.
            <br />
            <span className="sol-m-text-accent">학생부터 고령자까지 모두 이용</span>할 수 있습니다.
          </p>
          <div className="sol-from-left relative w-[75%] mt-4">
            <Image
              src="/images/solution/6_biliny-students.png"
              alt="빌리니를 이용하는 학생들"
              width={1770}
              height={688}
              className="w-full h-auto"
              sizes="75vw"
            />
          </div>
          <div className="sol-from-right relative w-[80%] mt-2">
            <Image
              src="/images/solution/7_biliny-commute.png"
              alt="빌리니와 함께하는 출퇴근"
              width={2018}
              height={890}
              className="w-full h-auto"
              sizes="80vw"
            />
          </div>
          <div className="sol-from-left relative w-[85%] mt-2">
            <Image
              src="/images/solution/8_biliny-city-elderly.png"
              alt="도심에서 빌리니를 이용하는 어르신"
              width={2005}
              height={1075}
              className="w-full h-auto"
              sizes="85vw"
            />
          </div>
        </div>

        {/* 하단 여백 */}
        <div className="h-16" />
      </div>
    </section>
  );
}
