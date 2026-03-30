'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { phase } from '@/lib/animationState';

gsap.registerPlugin(ScrollTrigger);

/* ── 텍스트 clip-path reveal 유틸 ── */
function clipReveal(el: Element, trigger?: Element) {
  gsap.fromTo(
    el,
    { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
    {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: trigger ?? el, start: 'top 88%' },
    },
  );
}

/* ── 이미지 parallax + fade ── */
function imgParallax(el: Element) {
  gsap.fromTo(
    el,
    { y: 60, opacity: 0, scale: 0.96 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%' },
    },
  );
  // subtle scroll-linked parallax
  gsap.to(el, {
    yPercent: -8,
    ease: 'none',
    scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
  });
}

/* ── countUp 숫자 애니메이션 ── */
function countUp(el: HTMLElement, target: number, suffix: string, duration = 1.5) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%' },
    onUpdate: () => {
      el.textContent = `${Math.round(obj.val).toLocaleString()}${suffix}`;
    },
  });
}

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // 초기 상태 설정
      gsap.set(section.querySelectorAll('.sr'), { clipPath: 'inset(100% 0 0 0)', opacity: 0 });
      gsap.set(section.querySelectorAll('.si'), { y: 60, opacity: 0, scale: 0.96 });
      gsap.set(section.querySelectorAll('.sf'), { opacity: 0, y: 30 });

      let rafId: number;
      const unsubscribe = phase.header.on(() => {
        rafId = requestAnimationFrame(() => {
          // 텍스트 clip-path reveal
          section.querySelectorAll<HTMLElement>('.sr').forEach((el) => clipReveal(el));

          // 이미지 parallax + fade
          section.querySelectorAll<HTMLElement>('.si').forEach((el) => imgParallax(el));

          // 부드러운 fade up
          section.querySelectorAll<HTMLElement>('.sf').forEach((el) => {
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 90%' },
            });
          });

          // countUp 애니메이션 대상
          section.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
            const target = Number(el.dataset.count);
            const suffix = el.dataset.suffix ?? '';
            countUp(el, target, suffix);
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
      <div className="max-w-[1440px] mx-auto relative px-5 md:px-0">

        {/* ═══ STORY 헤더 ═══ */}
        <div className="sf flex items-center gap-[0.5vw] pt-[6vw] justify-center md:justify-start md:ml-[46%]">
          <div className="w-[0.15vw] h-[2.2vw] bg-[#3a3a3a]" />
          <span className="text-[3vw] md:text-[3vw] font-bold text-[#3a3a3a] tracking-wider">STORY</span>
        </div>

        {/* ═══ 인트로 ═══ */}
        <div className="mt-[5vw] text-center md:text-left md:ml-[43%]">
          <p className="sr story-intro leading-snug">인구감소</p>
          <p className="sr story-intro leading-snug mt-[0.5vw]">중소도시,</p>
        </div>
        <p className="sr story-intro font-bold text-center md:text-left md:ml-[33%] mt-[2.5vw]">
          박탈된 고령자의 이동권
        </p>

        {/* ═══ 대제목 ═══ */}
        <h2 className="sr story-heading text-center md:text-left md:ml-[14%] mt-[8vw]">빼앗긴 두 다리</h2>

        {/* ── 1970 할아버지: 트럭 운전 ── */}
        <div className="relative mt-[4vw]">
          <p className="sf story-year text-center md:text-left md:ml-[47%]">1970</p>
          <div className="si relative mt-[2vw] w-[85%] md:w-[55%] mx-auto md:mx-0 md:ml-[-3%]">
            <Image
              src="/images/story/1_grandfather-driving.png"
              alt="젊은 시절 트럭을 운전하는 할아버지"
              width={1000}
              height={560}
              className="story-img rounded-[1vw]"
            />
          </div>
          <p className="sr story-text mt-[2vw] md:mt-0 md:absolute md:right-[5%] md:top-[60%] max-w-[90%] md:max-w-[45%] text-center md:text-left">
            젊은시절, 차량으로 어디든 돌아다니시던 할아버지
          </p>
        </div>

        {/* ── 2026 할아버지: 벤치 ── */}
        <div className="relative mt-[12vw]">
          <p className="sf story-year text-center md:text-left md:ml-[47%]">2026</p>
          <div className="si relative mt-[2vw] w-[60%] md:w-[35%] mx-auto md:mx-0 md:ml-[18%]">
            <Image
              src="/images/story/2_grandfather-bench.png"
              alt="벤치에 앉아 지팡이를 짚고 있는 할아버지"
              width={500}
              height={890}
              className="story-img"
            />
          </div>
          <p className="sr story-text mt-[2vw] md:mt-0 md:absolute md:left-[7%] md:bottom-[-6%] max-w-[90%] md:max-w-[80%] text-center md:text-left">
            이젠 할아버지의 <span className="font-bold">두다리</span>는 밴치에 묶였습니다.
          </p>
        </div>

        {/* ── 1970 할머니: 힘차게 걷는 ── */}
        <div className="relative mt-[12vw]">
          <p className="sf story-year text-center md:text-left md:ml-[47%]">1970</p>
          <div className="si relative mt-[2vw] w-[65%] md:w-[48%] mx-auto md:mx-0 md:ml-[45%]">
            <Image
              src="/images/story/3_grandmother-walking.png"
              alt="보따리를 이고 힘차게 걷는 젊은 시절의 할머니"
              width={690}
              height={855}
              className="story-img"
            />
          </div>
          <p className="sr story-text mt-[2vw] md:mt-0 md:absolute md:left-[52%] md:bottom-[5%] max-w-[90%] md:max-w-[45%] text-center md:text-left">
            어디든지 힘차게 다닐 수 있던 <span className="font-bold">두다리</span>는
          </p>
        </div>

        {/* ── 2026 할머니: 보행보조기 ── */}
        <div className="relative mt-[12vw]">
          <p className="sf story-year text-center md:text-left md:ml-[47%]">2026</p>
          <div className="si relative mt-[2vw] w-[65%] md:w-[45%] mx-auto md:mx-0 md:ml-[40%]">
            <Image
              src="/images/story/4_grandmother-walker.png"
              alt="보행보조기에 의지하여 걷는 할머니"
              width={700}
              height={855}
              className="story-img"
            />
          </div>
          <p className="sr story-text mt-[2vw] md:mt-0 md:absolute md:left-[7%] md:bottom-[5%] max-w-[90%] md:max-w-[50%] text-center md:text-left">
            이젠 보조바퀴가 없으면 쉽게 다니기 어렵습니다.
          </p>
        </div>

        {/* ═══ 불편한 대안들 ═══ */}
        <h2 className="sr story-heading text-center md:text-left md:ml-[14%] mt-[18vw]">불편한 대안들</h2>

        {/* ── 대안 Ⅰ 전동스쿠터 ── */}
        <div className="mt-[3vw] text-center">
          <p className="sf story-alt-label">대안 Ⅰ</p>
          <p className="sr story-subtitle mt-[0.8vw]">전동스쿠터</p>
        </div>

        {/* Scooter 1: 어디든지 다니기 쉽지만 */}
        <div className="relative mt-[5vw]">
          <div className="si w-[80%] md:w-[52%] mx-auto md:mx-0 md:ml-[48%]">
            <Image
              src="/images/story/5_scooter-riding.png"
              alt="전동스쿠터를 타는 어르신"
              width={750}
              height={600}
              className="story-img"
            />
          </div>
          <p className="sr story-text mt-[2vw] md:mt-0 md:absolute md:left-[14%] md:top-[40%] max-w-[90%] md:max-w-[38%] text-center md:text-left">
            <span className="font-bold">전동스쿠터</span>는 어디든지 다니기 쉽지만
          </p>
        </div>

        {/* Scooter 2: 비가 올 땐 무방비 */}
        <div className="relative mt-[10vw]">
          <div className="si w-[80%] md:w-[52%] mx-auto md:mx-0 md:ml-[1%]">
            <Image
              src="/images/story/6_scooter-rain.png"
              alt="비를 맞으며 전동스쿠터를 타는 어르신"
              width={750}
              height={600}
              className="story-img"
            />
          </div>
          <p className="sr story-text mt-[2vw] md:mt-0 md:absolute md:left-[14%] md:bottom-[-6%] max-w-[90%] md:max-w-[45%] text-center md:text-left">
            비가 올 땐 <span className="font-bold">무방비</span>하고
          </p>
        </div>

        {/* Scooter 3: 길을 잃어버리면 */}
        <div className="relative mt-[10vw]">
          <div className="si w-[80%] md:w-[52%] mx-auto md:mx-0 md:ml-[3%]">
            <Image
              src="/images/story/7_scooter-lost.png"
              alt="길을 잃어 당황하는 어르신"
              width={750}
              height={600}
              className="story-img"
            />
          </div>
          <p className="sr story-text mt-[2vw] md:mt-0 md:absolute md:right-[5%] md:top-[38%] max-w-[90%] md:max-w-[40%] text-center md:text-left">
            만약 <span className="font-bold">길을 잃어버리면</span> 돌아갈 방법이 없습니다.
          </p>
        </div>

        {/* Scooter 4: 긴급한 상황 */}
        <div className="relative mt-[10vw]">
          <div className="si w-[80%] md:w-[60%] mx-auto md:mx-0 md:ml-[2%]">
            <Image
              src="/images/story/8_scooter-accident.png"
              alt="전동스쿠터 전복 사고"
              width={870}
              height={650}
              className="story-img"
            />
          </div>
          <div className="sr mt-[2vw] md:mt-0 md:absolute md:right-[5%] md:bottom-[15%] max-w-[90%] md:max-w-[35%] text-center md:text-left">
            <p className="story-text leading-[2]"><span className="font-bold">긴급한 상황</span>에서 어르신을</p>
            <p className="story-text leading-[2]">도와드릴 수 없습니다</p>
          </div>
        </div>

        {/* Scooter 5: 고장 */}
        <div className="relative mt-[10vw]">
          <div className="si w-[80%] md:w-[60%] mx-auto md:mx-0 md:ml-[2%]">
            <Image
              src="/images/story/9_scooter-breakdown.png"
              alt="전동스쿠터 고장"
              width={870}
              height={650}
              className="story-img"
            />
          </div>
          <p className="sr story-text mt-[2vw] md:mt-0 md:absolute md:right-[5%] md:top-[35%] max-w-[90%] md:max-w-[40%] text-center md:text-left">
            <span className="font-bold">고장</span>이 난다면 어떻게 해야할지 <span className="font-bold">난감</span>합니다.
          </p>
        </div>

        {/* ── 대안 Ⅱ 버스 ── */}
        <div className="mt-[18vw] text-center">
          <p className="sf story-alt-label">대안 Ⅱ</p>
          <p className="sr story-subtitle mt-[0.8vw]">버스</p>
        </div>

        {/* Bus 1: 버스를 타고 싶지만 */}
        <div className="relative mt-[6vw]">
          <p className="sr story-text text-center mb-[2vw]">버스를 타고 싶지만</p>
          <div className="si w-[55%] md:w-[38%] mx-auto">
            <Image
              src="/images/story/10_bus-dreaming.png"
              alt="버스를 타고 싶어하는 어르신"
              width={580}
              height={940}
              className="story-img"
            />
          </div>
        </div>

        {/* Bus 2: 정류장까지 거리 — 800m */}
        <div className="mt-[8vw]">
          <p className="sr story-text text-center mb-[2vw]">
            <span className="font-bold">정류장</span>까지 거리가 <span className="font-bold">너무 멉니다.</span>
          </p>
          <div className="si relative w-[90%] md:w-[62%] mx-auto">
            <Image
              src="/images/story/11_busstop-faraway.png"
              alt="먼 거리의 정류장"
              width={884}
              height={493}
              className="story-img-wide rounded-[17vw]"
            />
            <div className="sr absolute left-[35%] top-[8%] text-center">
              <p className="story-data-label">정류장 평균 거리</p>
              <p className="story-data-number mt-[0.3vw]" data-count="800" data-suffix="m">0m</p>
            </div>
          </div>
        </div>

        {/* Bus 3: 하루 배차 */}
        <div className="mt-[8vw]">
          <p className="sr story-text text-center mb-[2vw]">
            먼거리를 감수하고 <span className="font-bold">정류장에 도착</span>했지만
          </p>
          <div className="si relative w-[90%] md:w-[62%] mx-auto overflow-hidden rounded-full border-[0.26vw] border-[#e6e6e6]">
            <Image
              src="/images/story/12_busstop-waiting.png"
              alt="정류장에서 버스를 기다리는 어르신"
              width={888}
              height={496}
              className="story-img-wide"
            />
            <div className="sr absolute right-[6%] top-[28%] text-left">
              <p className="story-text !text-[var(--color-text-secondary)]">도심 외곽 정류장 평균</p>
              <p className="story-data-label mt-[0.3vw]">하루 배차</p>
            </div>
          </div>
        </div>

        {/* Bus 4: 4대 */}
        <div className="mt-[8vw]">
          <p className="sr story-text text-center mb-[2vw]">
            <span className="font-bold">언제올지 모르는 버스</span>를 하염없이 <span className="font-bold">기다리기만 합니다.</span>
          </p>
          <div className="si relative w-[90%] md:w-[62%] mx-auto overflow-hidden rounded-[17vw]">
            <Image
              src="/images/story/13_bus-long-wait.png"
              alt="끝없이 버스를 기다리는 어르신"
              width={887}
              height={496}
              className="story-img-wide"
            />
            <div className="sr absolute right-[6%] top-[22%] text-left">
              <p className="story-text !text-white">약 4시간당 1대</p>
              <p className="story-data-number !text-white tracking-[0.4vw]" data-count="4" data-suffix="대">0대</p>
            </div>
          </div>
        </div>

        {/* Bus 5: 36% 포기율 */}
        <div className="mt-[8vw]">
          <p className="sr story-text font-bold text-center mb-[2vw]">결국 포기하고 돌아갑니다.</p>
          <div className="si relative w-[90%] md:w-[65%] mx-auto">
            <Image
              src="/images/story/14_bus-giving-up.png"
              alt="결국 포기하고 돌아가는 어르신"
              width={925}
              height={568}
              className="story-img-wide rounded-[25vw]"
            />
            <div className="sr absolute right-[3%] md:right-[-35%] top-[15%] text-left">
              <p className="story-data-label">대기로 인한</p>
              <p className="story-data-label">이동 포기율</p>
              <p className="story-data-number mt-[0.5vw]" data-count="36" data-suffix="%">0%</p>
            </div>
          </div>
        </div>

        {/* ── 대안 Ⅲ 택시 ── */}
        <div className="mt-[18vw] text-center">
          <p className="sf story-alt-label">대안 Ⅲ</p>
          <p className="sr story-subtitle mt-[0.8vw]">택시</p>
        </div>

        {/* Taxi 1: 30,000원 */}
        <div className="mt-[6vw]">
          <p className="sr story-text text-center mb-[2vw]">
            1달에 두번정도 이용할 수 있는 택시는 매우 비쌉니다.
          </p>
          <div className="si relative w-[90%] md:w-[72%] mx-auto md:mx-0 md:ml-[14%]">
            <Image
              src="/images/story/15_taxi-expensive.png"
              alt="택시 비용에 놀라는 어르신"
              width={1032}
              height={831}
              className="story-img-wide"
            />
            <div className="sr absolute right-[3%] md:right-[-28%] top-[22%] text-left">
              <p className="story-data-label">왕복 평균</p>
              <div className="flex items-baseline gap-[0.3vw] mt-[0.3vw]">
                <p className="story-data-number !text-[var(--color-text)]" data-count="30000" data-suffix="">0</p>
                <p className="story-data-label">원</p>
              </div>
            </div>
          </div>
        </div>

        {/* Taxi 2: 35% 포기율 */}
        <div className="mt-[8vw]">
          <p className="sr story-text text-center mb-[2vw]">
            간단한 외출을 하기 위해 택시를 타는 것은 너무 큰 부담입니다
          </p>
          <div className="si relative w-[90%] md:w-[72%] mx-auto md:mx-0 md:ml-[14%]">
            <div className="w-[55%] md:w-[45%]">
              <Image
                src="/images/story/16_taxi-burden.png"
                alt="택시 비용에 괴로워하는 어르신"
                width={461}
                height={640}
                className="story-img"
              />
            </div>
            <div className="sr absolute right-[5%] top-[30%] text-left">
              <p className="story-data-label">비용으로 인한</p>
              <p className="story-data-label">이동 포기율</p>
              <p className="story-data-number mt-[0.5vw]" data-count="35" data-suffix="%">0%</p>
            </div>
          </div>
        </div>

        {/* ═══ 결론 ═══ */}
        <div className="mt-[18vw]">
          <h2 className="sr story-heading !text-[2.4vw] !font-bold text-center">
            결국, 두다리가 얼어붙으신 어르신
          </h2>

          {/* 3열 그리드: 불안해/힘들어/부담스러워 */}
          <div className="sf grid grid-cols-3 w-[85%] md:w-[60%] mx-auto mt-[3vw] gap-[1vw]">
            <div className="text-center">
              <p className="story-conclusion-label">전동스쿠터</p>
              <p className="story-conclusion-quote mt-[0.5vw]">&ldquo;불안해&rdquo;</p>
            </div>
            <div className="text-center">
              <p className="story-conclusion-label">버스</p>
              <p className="story-conclusion-quote mt-[0.5vw]">&ldquo;힘들어&rdquo;</p>
            </div>
            <div className="text-center">
              <p className="story-conclusion-label">택시</p>
              <p className="story-conclusion-quote mt-[0.5vw]">&ldquo;부담스러워&rdquo;</p>
            </div>
          </div>

          {/* 17 고립 이미지 + 우울 데이터 */}
          <div className="si relative mt-[5vw] w-[90%] md:w-[75%] mx-auto">
            <div className="w-[55%] md:w-[50%] md:ml-[5%]">
              <Image
                src="/images/story/17_isolation.png"
                alt="주저앉은 어르신의 뒷모습"
                width={857}
                height={755}
                className="story-img"
              />
            </div>
            <div className="sr absolute right-[3%] bottom-[10%] text-right">
              <p className="story-conclusion-quote">&ldquo;집에 있을래.&rdquo;</p>
              <p className="story-conclusion-quote mt-[1.5vw] whitespace-pre">{'고립  우울 가속화'}</p>
              <p className="story-data-number mt-[0.8vw]">1.5배</p>
            </div>
          </div>
        </div>

        <div className="h-[8vw]" />
      </div>
    </section>
  );
}
