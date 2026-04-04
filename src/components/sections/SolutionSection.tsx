'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { phase } from '@/lib/animationState';

gsap.registerPlugin(ScrollTrigger);

export function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* ── 초기 상태: 즉시 숨김 ── */
      gsap.set(section.querySelectorAll('.sol-reveal'), {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0,
      });
      gsap.set(section.querySelectorAll('.sol-fade'), {
        y: 40,
        opacity: 0,
      });
      gsap.set(section.querySelectorAll('.sol-from-left'), {
        xPercent: -100,
        opacity: 0,
      });
      gsap.set(section.querySelectorAll('.sol-from-right'), {
        xPercent: 100,
        opacity: 0,
      });

      let rafId: number;

      /*
       * HeroSection이 phase.header.on() 안에서 pin ScrollTrigger를 생성하므로,
       * SolutionSection도 같은 시점 이후에 생성해야 position 계산이 정확함.
       * StorySection과 동일한 패턴.
       */
      const unsubscribe = phase.header.on(() => {
        rafId = requestAnimationFrame(() => {
          /* 텍스트: clip-path reveal (아래→위 마스크) */
          section.querySelectorAll<HTMLElement>('.sol-reveal').forEach((el) => {
            gsap.to(el, {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%' },
            });
          });

          /* 단순 fade up */
          section.querySelectorAll<HTMLElement>('.sol-fade').forEach((el) => {
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 88%' },
            });
          });

          /* 이미지: 좌측에서 슬라이드 인 + 패럴랙스 */
          section.querySelectorAll<HTMLElement>('.sol-from-left').forEach((el) => {
            gsap.to(el, {
              xPercent: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 92%' },
            });
            gsap.to(el, {
              yPercent: -4,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            });
          });

          /* 이미지: 우측에서 슬라이드 인 + 패럴랙스 */
          section.querySelectorAll<HTMLElement>('.sol-from-right').forEach((el) => {
            gsap.to(el, {
              xPercent: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 92%' },
            });
            gsap.to(el, {
              yPercent: -4,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
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
    <section ref={sectionRef} id="solution" className="relative bg-white overflow-hidden">
      {/* ═══════════════════════════════════════
          실루엣 장식 (1_)
      ═══════════════════════════════════════ */}
      <div className="sol-fade w-[80%] pt-[3.25vw] mx-auto">
        <Image
          src="/images/solution/1_biliny-silhouette.png"
          alt=""
          width={1446}
          height={421}
          className="w-full h-auto"
          sizes="100vw"
          priority
        />
      </div>

      {/* ═══════════════════════════════════════
          섹션 헤딩
      ═══════════════════════════════════════ */}
      <div className="w-full max-w-[80%] mx-auto relative z-20">
        <p className="sol-reveal solution-heading text-center mt-[3.2vw]">
          이에 대한 해결책을 제시합니다
        </p>
      </div>

      {/* ═══════════════════════════════════════
          1. 빌려타는 "빌리니"
      ═══════════════════════════════════════ */}
      <div className="w-full max-w-[50%] mx-auto mt-[10.75vw] relative z-20">
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
      <div className="sol-from-left mt-[3vw] w-[80%] ml-[5%]">
        <Image
          src="/images/solution/2_biliny-doorstep.png"
          alt="빌리니가 집 앞까지 찾아오는 모습"
          width={1574}
          height={707}
          className="solution-img"
          sizes="100vw"
        />
      </div>

      {/* ═══════════════════════════════════════
          2. 서로에게 안전한 "안내길"
      ═══════════════════════════════════════ */}
      <div className="w-full max-w-[50%] mx-auto mt-[16vw] relative z-20">
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
      <div className="sol-from-right mt-[3vw] w-[80%] ml-[15%]">
        <Image
          src="/images/solution/3_smartlane-night.png"
          alt="야간 도로 위 빌리니 안내길 시스템"
          width={1464}
          height={756}
          className="solution-img"
          sizes="92vw"
        />
      </div>

      {/* ═══════════════════════════════════════
          3. 모든 과정을 지켜봐주는 "돌봄이"
      ═══════════════════════════════════════ */}
      <div className="w-full max-w-[50%] mx-auto mt-[8vw] relative z-20">
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
      <div className="relative mt-[3.4vw]">
        {/* 4_ 케어워치 — 좌측 끝 화면 밖, 위쪽에 위치, z-10 */}
        <div className="sol-from-left w-[48%] ml-[5%] relative z-10">
          <Image
            src="/images/solution/4_carewatch-wrist.png"
            alt="돌봄이 손목 디바이스를 착용한 어르신"
            width={1049}
            height={499}
            className="solution-img"
            sizes="66vw"
          />
        </div>
        {/* 5_ 가디언 대시보드 — 우측 끝, 4_와 겹치며 아래 배치 */}
        <div className="sol-from-right w-[70%] ml-auto mr-[5%] mt-[-18vw]">
          <Image
            src="/images/solution/5_guardian-dashboard.png"
            alt="PICKER 가디언 관제 시스템 2.0 대시보드"
            width={1232}
            height={507}
            className="solution-img-sm"
            sizes="82vw"
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════
          4. 모두에게 "공평한" 모빌리티
      ═══════════════════════════════════════ */}
      <div className="w-full max-w-[50%] mx-auto mt-[12.2vw] relative z-20">
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
      <div className="mt-[6.75vw]">
        {/* 6_ 학생들 — 좌측 끝 화면 밖 */}
        <div className="sol-from-left w-[50%] ml-[5%]">
          <Image
            src="/images/solution/6_biliny-students.png"
            alt="빌리니를 이용하는 학생들"
            width={1017}
            height={344}
            className="solution-img"
            sizes="64vw"
          />
        </div>

        {/* 7_ 출퇴근 — 우측 끝 화면 밖 */}
        <div className="sol-from-right w-[55%] ml-auto mr-[5%] mt-[1.9vw]">
          <Image
            src="/images/solution/7_biliny-commute.png"
            alt="빌리니와 함께하는 출퇴근"
            width={1213}
            height={445}
            className="solution-img"
            sizes="80vw"
          />
        </div>

        {/* 8_ 도심 어르신 — 좌측 끝 화면 밖 */}
        <div className="sol-from-left w-[55%] ml-[5%] mt-[2.6vw]">
          <Image
            src="/images/solution/8_biliny-city-elderly.png"
            alt="도심에서 빌리니를 이용하는 어르신"
            width={1185}
            height={537}
            className="solution-img"
            sizes="74vw"
          />
        </div>
      </div>

      {/* 하단 여백 */}
      <div className="h-[5vw]" />
    </section>
  );
}
