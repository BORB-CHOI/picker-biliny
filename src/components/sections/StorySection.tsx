'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { phase } from '@/lib/animationState';

gsap.registerPlugin(ScrollTrigger);

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* ── 초기 상태: 보이기 전 숨김 ── */
      gsap.set(section.querySelectorAll('.s-reveal'), {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0,
      });
      gsap.set(section.querySelectorAll('.s-img'), {
        y: 80,
        opacity: 0,
        scale: 0.94,
      });
      gsap.set(section.querySelectorAll('.s-fade'), {
        y: 40,
        opacity: 0,
      });

      let rafId: number;
      /* phase.header가 fire된 후에만 ScrollTrigger 생성 — .claude/rules 준수 */
      const unsubscribe = phase.header.on(() => {
        rafId = requestAnimationFrame(() => {
          /* 텍스트: clip-path reveal (아래→위 마스크) */
          section.querySelectorAll<HTMLElement>('.s-reveal').forEach((el) => {
            gsap.to(el, {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top bottom' },
            });
          });

          /* 이미지: parallax + scale + fade */
          section.querySelectorAll<HTMLElement>('.s-img').forEach((el) => {
            gsap.to(el, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.4,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top bottom' },
            });
            /* 스크롤 연동 미세 패럴랙스 */
            gsap.to(el, {
              yPercent: -6,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            });
          });

          /* 단순 fade up */
          section.querySelectorAll<HTMLElement>('.s-fade').forEach((el) => {
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top bottom' },
            });
          });

          /* countUp 애니메이션 */
          section.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
            const target = Number(el.dataset.count);
            const suffix = el.dataset.suffix ?? '';
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top bottom' },
              onUpdate() {
                el.textContent = `${Math.round(obj.val).toLocaleString()}${suffix}`;
              },
            });
          });
        });
      });

      return () => {
        unsubscribe();
        cancelAnimationFrame(rafId);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="story" className="relative bg-white overflow-hidden">
      <div className="w-full max-w-[94%] md:max-w-[80%] mx-auto px-5 md:px-[5%]">
        {/* ═══════════════════════════════════════
            STORY 헤더
        ═══════════════════════════════════════ */}
        <div className="s-fade section-title-row">
          <div className="section-bar" />
          <span className="text-[clamp(24px,3vw,43px)] font-bold text-[#3a3a3a]">STORY</span>
        </div>

        {/* ═══════════════════════════════════════
            인트로 텍스트
        ═══════════════════════════════════════ */}
        <div className="mt-[6vw] flex flex-col items-center translate-x-1">
          <p className="s-reveal story-intro">
            인구감소
            <br />
            중소도시,
          </p>
        </div>
        <p className="s-reveal story-intro font-bold text-center mt-[3vw]">
          박탈된 고령자의 이동권
        </p>
        <h2 className="s-reveal story-heading mt-[5vw] text-center ">빼앗긴 두 다리</h2>

        {/* ────────────────────────────────────
            1970 할아버지 — 트럭 운전
        ──────────────────────────────────── */}

        <div className="flex flex-col relative items-center mt-40">
          <h2 className="s-fade absolute story-year text-center top-0 z-10">1970</h2>
          <div className="s-img relative w-full">
            <Image
              src="/images/story/1_grandfather-driving.png"
              alt="젊은 시절 트럭을 운전하는 할아버지"
              width={1432}
              height={799}
              className="story-img"
              sizes="(max-width: 768px) 100vw, 70vw"
            />
            <p className="s-reveal story-text text-center mt-[4vw] md:mt-0 md:absolute md:right-[-4%] md:top-[30%]">
              젊은시절, 차량으로 어디든 돌아다니시던 할아버지
            </p>
          </div>
        </div>

        {/* ────────────────────────────────────
            2026 할아버지 — 벤치
        ──────────────────────────────────── */}
        <div className="mt-[12vw] relative flex flex-col items-center md:items-end">
          <h2 className="s-fade w-full absolute story-year text-center z-10 -top-10">2026</h2>
          <div className="s-img relative w-[72%] md:w-[50%]">
            <Image
              src="/images/story/2_grandfather-bench.png"
              alt="벤치에 앉아 지팡이를 짚고 있는 할아버지"
              width={497}
              height={891}
              className="story-img"
              sizes="w-full"
            />
            <p className="s-reveal story-text text-center mt-[4vw] md:mt-0 md:absolute md:left-[-90%] md:top-[50%]">
              이젠 할아버지의 <span className="font-bold">두다리</span>는 밴치에 묶였습니다.
            </p>
          </div>
        </div>

        {/* ────────────────────────────────────
            1970 할머니 — 힘차게 걸음
        ──────────────────────────────────── */}
        <div className="mt-[12vw] relative flex flex-col items-center">
          <h2 className="s-fade w-full absolute story-year text-center z-10 -translate-y-full">
            1970
          </h2>
          <div className="s-img relative w-[70%] md:w-[30%]">
            <Image
              src="/images/story/3_grandmother-walking.png"
              alt="힘차게 걷는 젊은 시절의 할머니"
              width={690}
              height={855}
              className="story-img md:translate-x-[-50%]"
              sizes="w-full"
            />
            <p className="s-reveal story-text text-center mt-[4vw] md:mt-0 md:absolute md:right-[-90%] md:top-[50%] md:w-max md:whitespace-nowrap">
              어디든지 힘차게 다닐 수 있던 <span className="font-bold">두다리</span>는
            </p>
          </div>
        </div>

        {/* ────────────────────────────────────
            2026 할머니 — 보행보조기
        ──────────────────────────────────── */}
        <div className="mt-[12vw] relative flex flex-col items-center">
          <p className="s-fade w-full absolute story-year text-center z-10">2026</p>
          <div className="s-img relative w-[43%]">
            <Image
              src="/images/story/4_grandmother-walker.png"
              alt="보행보조기에 의지하여 걷는 할머니"
              width={688}
              height={855}
              className="story-img md:translate-x-[50%]"
              sizes="(max-width: 768px) 65vw, 48vw"
            />
            <p className="s-reveal story-text text-center absolute top-[50%] -left-[55%] w-max md:whitespace-nowrap">
              이젠 보조바퀴가 없으면 쉽게 다니기 어렵습니다.
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            불편한 대안들
        ═══════════════════════════════════════ */}
        <h2 className="s-reveal story-heading mt-[18vw] text-center ">불편한 대안들</h2>

        {/* ── 대안 Ⅰ: 전동스쿠터 ── */}
        <div className="mt-[4vw] flex flex-col items-center">
          <p className="s-fade story-alt-label">대안 Ⅰ</p>
          <p className="s-reveal story-subtitle mt-2">전동스쿠터</p>
        </div>

        {/* 스쿠터 1 — 어디든지 다니기 쉽지만 */}
        <div className="mt-[12vw] flex items-center flex-row-reverse">
          <div className="s-img relative w-[50%]">
            <Image
              src="/images/story/5_scooter-riding.png"
              alt="전동스쿠터를 타는 어르신"
              width={751}
              height={599}
              className="story-img translate-x-[-10%]"
              sizes="(max-width: 768px) 80vw, 52vw"
            />
            <p className="s-reveal story-text text-center absolute top-[45%] -left-[80%] w-max md:whitespace-nowrap z-10">
              <span className="font-bold">전동스쿠터</span>는 어디든지 다니기 쉽지만
            </p>
          </div>
        </div>

        {/* 스쿠터 2 — 비가 올 땐 무방비 */}
        <div className="mt-[8vw] flex flex-row items-center justify-center">
          <div className="s-img relative w-[50%]">
            <Image
              src="/images/story/6_scooter-rain.png"
              alt="비를 맞으며 전동스쿠터를 타는 어르신"
              width={744}
              height={599}
              className="story-img"
              sizes="(max-width: 768px) 80vw, 52vw"
            />
            <p className="s-reveal story-text text-center absolute top-[45%] -left-[30%] w-max whitespace-nowrap z-10">
              비가 올 땐 <span className="font-bold">무방비</span>하고
            </p>
          </div>
        </div>

        {/* 스쿠터 3 — 길을 잃으면 */}
        <div className="mt-[8vw] flex flex-row items-center">
          <div className="s-img relative w-[50%] ">
            <Image
              src="/images/story/7_scooter-lost.png"
              alt="길을 잃어 당황하는 어르신"
              width={744}
              height={599}
              className="story-img"
              sizes="(max-width: 768px) 80vw, 52vw"
            />
            <p className="s-reveal story-text text-center absolute top-[50%] left-[90%] w-max whitespace-nowrap z-10">
              만약 <span className="font-bold">길을 잃어버리면</span> 돌아갈 방법이 없습니다.
            </p>
          </div>
        </div>

        {/* 스쿠터 4 — 긴급 상황 */}
        <div className="mt-[8vw] flex flex-row-reverse items-center">
          <div className="s-img relative w-[60%]">
            <Image
              src="/images/story/8_scooter-accident.png"
              alt="전동스쿠터 전복 사고"
              width={864}
              height={645}
              className="story-img"
              sizes="(max-width: 768px) 80vw, 60vw"
            />
            <div className="s-reveal absolute text-left -left-[40%] top-[45%] z-10 translate-y-[-50%]">
              <p className="story-text leading-relaxed">
                <span className="font-bold">긴급한 상황</span>에서 어르신을
              </p>
              <p className="story-text leading-relaxed">도와드릴 수 없습니다</p>
            </div>
          </div>
        </div>

        {/* 스쿠터 5 — 고장 */}
        <div className="mt-[8vw] flex flex-row items-center gap-[3vw]">
          <div className="s-img relative w-[60%]">
            <Image
              src="/images/story/9_scooter-breakdown.png"
              alt="전동스쿠터 고장"
              width={864}
              height={645}
              className="story-img"
              sizes="(max-width: 768px) 80vw, 60vw"
            />
            <p className="s-reveal story-text text-center absolute top-[50%] left-[90%] w-max whitespace-nowrap z-10">
              <span className="font-bold">고장</span>이 난다면 어떻게 해야할지{" "}
              <span className="font-bold">난감</span>합니다.
            </p>
          </div>
        </div>

        {/* ── 대안 Ⅱ: 버스 ── */}
        <div className="mt-[18vw] flex flex-col items-center">
          <p className="s-fade story-alt-label">대안 Ⅱ</p>
          <p className="s-reveal story-subtitle mt-2">버스</p>
        </div>

        {/* 버스를 타고 싶지만 */}
        <div className="mt-[8vw] flex flex-col items-center gap-[2vw]">
          <div className="s-img relative w-[55%]">
            <Image
              src="/images/story/10_bus-dreaming.png"
              alt="버스를 타고 싶어하는 어르신"
              width={580}
              height={940}
              className="story-img translate-x-[12%]"
              sizes="(max-width: 768px) 50vw, 35vw"
            />
            <p className="s-reveal story-text absolute top-[50%] left-[25%]">버스를 타고 싶지만</p>
          </div>
        </div>

        {/* 정류장까지 거리 — 800m */}
        <div className="mt-[8vw] flex flex-col items-center gap-[2vw]">
          <p className="s-reveal story-text text-center">
            <span className="font-bold">정류장</span>까지 거리가{" "}
            <span className="font-bold">너무 멉니다.</span>
          </p>
          <div className="s-img relative w-[80%]">
            <Image
              src="/images/story/11_busstop-faraway.png"
              alt="먼 거리의 정류장"
              width={884}
              height={493}
              className="story-img-wide rounded-full "
              sizes="(max-width: 768px) 90vw, 62vw"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-top left-[35%] translate-x-[-50%] top-[12%] text-center">
              <p className="s-reveal story-data-label text-center">정류장 평균 거리</p>
              <p className="story-data-number" data-count="800" data-suffix="m">
                0m
              </p>
            </div>
          </div>
        </div>

        {/* 하루 배차 */}
        <div className="mt-[8vw] flex flex-col items-center gap-[2vw]">
          <p className="s-reveal story-text text-center">
            먼거리를 감수하고 <span className="font-bold">정류장에 도착</span>했지만
          </p>
          <div className="s-img relative w-[80%] overflow-hidden rounded-full border-[3px] border-[#e6e6e6]">
            <Image
              src="/images/story/12_busstop-waiting.png"
              alt="정류장에서 기다리는 어르신"
              width={888}
              height={496}
              className="story-img-wide"
              sizes="(max-width: 768px) 90vw, 62vw"
            />
            <div className="absolute right-[2%] top-[31%] text-left">
              <p className="s-reveal story-text">도심 외곽 정류장 평균</p>
              <p className="s-reveal story-data-number mt-1">하루 배차</p>
            </div>
          </div>
        </div>

        {/* 4대 — 기다림 */}
        <div className="mt-[8vw] flex flex-col items-center gap-[2vw]">
          <p className="s-reveal story-text text-center">
            <span className="font-bold">언제올지 모르는 버스</span>를 하염없이{" "}
            <span className="font-bold">기다리기만 합니다.</span>
          </p>
          <div className="s-img relative w-[90%] md:w-[80%] overflow-hidden rounded-full">
            <Image
              src="/images/story/13_bus-long-wait.png"
              alt="끝없이 버스를 기다리는 어르신"
              width={887}
              height={496}
              className="story-img-wide"
              sizes="(max-width: 768px) 90vw, 62vw"
            />
            <div className="absolute right-[9%] top-[29%] text-left">
              <p className="s-reveal story-text text-white!">약 4시간당 1대</p>
              <p
                className="story-data-number text-white! tracking-wider text-[4rem]!"
                data-count="4"
                data-suffix="대"
              >
                0대
              </p>
            </div>
          </div>
        </div>

        {/* 36% 포기율 */}
        <div className="mt-[8vw] flex flex-col items-center gap-[2vw]">
          <p className="s-reveal story-text text-center font-bold!">결국 포기하고 돌아갑니다.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-[3vw] w-full md:w-[80%] mx-auto">
            <div className="s-img relative w-[90%] md:w-[90%] overflow-hidden rounded-full">
              <Image
                src="/images/story/14_bus-giving-up.png"
                alt="결국 포기하고 돌아가는 어르신"
                width={925}
                height={568}
                className="story-img-wide"
                sizes="(max-width: 768px) 90vw, 52vw"
              />
              <div className="s-reveal absolute right-[10%] top-[20%] text-center md:text-left">
                <p className="story-data-label">대기로 인한</p>
                <p className="story-data-label">이동 포기율</p>
                <p className="story-data-number mt-1 text-[4rem]!" data-count="36" data-suffix="%">
                  0%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 대안 Ⅲ: 택시 ── */}
        <div className="mt-[12vw] flex flex-col items-center">
          <p className="s-fade story-alt-label">대안 Ⅲ</p>
          <p className="s-reveal story-subtitle mt-2">택시</p>
        </div>

        {/* 택시 — 30,000원 */}
        <div className="mt-[6vw] flex flex-col items-center gap-[2vw]">
          <p className="s-reveal story-text text-center">
            1달에 두번정도 이용할 수 있는 택시는 매우 비쌉니다.
          </p>
          <div className="flex flex-col items-center w-[80%] mx-auto">
            <div className="s-img relative w-full mt-5">
              <Image
                src="/images/story/15_taxi-expensive.png"
                alt="택시 비용에 놀라는 어르신"
                width={1032}
                height={831}
                className="story-img"
                sizes="(max-width: 768px) 90vw, 48vw"
              />
              <div className="s-reveal absolute left-[50%] top-[0%] text-center">
                <p className="story-data-label">왕복 평균</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <p
                    className="story-data-number text-foreground! text-[4rem]!"
                    data-count="30000"
                    data-suffix=""
                  >
                    0
                  </p>
                  <p className="story-data-label">원</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 택시 — 35% 포기율 */}
        <div className="mt-[8vw] flex flex-col items-center gap-[2vw]">
          <p className="s-reveal story-text text-center">
            간단한 외출을 하기 위해 택시를 타는 것은 너무 큰 부담입니다
          </p>
          <div className="flex relative flex-col items-center mt-[10%] w-[80%] mx-auto">
            <div className="s-img w-[40%]">
              <Image
                src="/images/story/16_taxi-burden.png"
                alt="택시 비용에 괴로워하는 어르신"
                width={461}
                height={640}
                className="story-img translate-x-[-50%]"
                sizes="(max-width: 768px) 50vw, 28vw"
              />
              <div className="s-reveal absolute -right-[10%] top-[0%] text-left">
                <p className="story-data-label">비용으로 인한</p>
                <p className="story-data-label">이동 포기율</p>
                <p className="story-data-number mt-1 text-[4rem]!" data-count="35" data-suffix="%">
                  0%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            결론: 두다리가 얼어붙으신 어르신
        ═══════════════════════════════════════ */}
        <div className="mt-[12vw] flex flex-col items-center">
          <h2 className="s-reveal text-[clamp(18px,2.4vw,34px)] font-bold text-[var(--color-text)] tracking-wider text-center">
            결국, 두다리가 얼어붙으신 어르신
          </h2>

          {/* 3열 그리드 */}
          <div className="s-fade grid grid-cols-3 w-full mt-[6vw] gap-4">
            <div className="text-center">
              <p className="story-conclusion-label">전동스쿠터</p>
              <p className="story-conclusion-quote mt-1">&ldquo;불안해&rdquo;</p>
            </div>
            <div className="text-center">
              <p className="story-conclusion-label">버스</p>
              <p className="story-conclusion-quote mt-1">&ldquo;힘들어&rdquo;</p>
            </div>
            <div className="text-center">
              <p className="story-conclusion-label">택시</p>
              <p className="story-conclusion-quote mt-1">&ldquo;부담스러워&rdquo;</p>
            </div>
          </div>

          {/* 고립 이미지 */}
          <div className="mt-[6vw] flex flex-col items-center">
            <div className="s-img relative w-[90%] mx-auto">
              <Image
                src="/images/story/17_isolation.png"
                alt="주저앉은 어르신의 뒷모습"
                width={857}
                height={755}
                className="story-img"
                sizes="(max-width: 768px) 60vw, 40vw"
              />
              <div className="s-reveal absolute text-left z-10 top-[50%] -right-[50%]">
                <p className="story-conclusion-quote">&ldquo;집에 있을래.&rdquo;</p>
                <p className="story-conclusion-quote mt-2">고립 우울 가속화</p>
                <p className="story-data-number mt-3 text-[4rem]!">1.5배</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
