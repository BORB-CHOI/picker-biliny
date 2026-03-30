'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

/**
 * SolutionSection — Figma node 4123:1789
 *
 * 4가지 핵심 가치를 대형 이미지 + 텍스트로 보여주는 섹션.
 * 빌리니 → 안내길 → 돌봄이 → 공평한 모빌리티
 */
export function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const s = sectionRef.current;
      if (!s) return;

      s.querySelectorAll<HTMLElement>('.sol-r').forEach((el) => {
        gsap.fromTo(el,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' } },
        );
      });

      s.querySelectorAll<HTMLElement>('.sol-f').forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' } },
        );
      });

      s.querySelectorAll<HTMLElement>('.sol-i').forEach((el) => {
        gsap.fromTo(el,
          { y: 80, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%' } },
        );
        gsap.to(el, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="solution" className="relative bg-white overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-[5%]">

        {/* ═══ 장식 곡선 ═══ */}
        <div className="relative w-full h-[20vw] md:h-[12vw] mt-[4vw] flex items-center justify-center overflow-hidden opacity-30">
          <Image
            src="/images/solution/1_biliny-silhouette.png"
            alt=""
            width={1440} height={400}
            className="w-full h-auto object-contain"
            aria-hidden="true"
          />
        </div>

        {/* ═══ 헤더 ═══ */}
        <h2 className="sol-r text-[clamp(24px,2.9vw,42px)] font-bold text-[var(--color-text)] tracking-wider text-center mt-[4vw]">
          이에 대한 해결책을 제시합니다
        </h2>

        {/* ═══════════════════════════════════════
            Value 1 — 빌려타는 "빌리니"
        ═══════════════════════════════════════ */}
        <div className="mt-[8vw]">
          <h3 className="sol-r text-[clamp(24px,2.9vw,42px)] font-black text-[var(--color-blue)] tracking-wider">
            빌려타는 &ldquo;빌리니&rdquo;
          </h3>
          <div className="sol-f mt-[3vw] max-w-[700px] text-[clamp(14px,1.8vw,27px)] leading-relaxed tracking-wider text-[var(--color-text-secondary)]">
            <p>
              <span className="font-medium">필요할 때 </span>
              <span className="font-bold text-[var(--color-blue)]">언제든지 부르시면 빌려드립니다.</span>
            </p>
            <p className="font-medium mt-1">
              집 앞까지 와주고,<br />
              가고자하는 모든 길을 갑니다.
            </p>
            <p className="mt-1">
              <span className="font-medium">모든 여정을 마치면 </span>
              <span className="font-bold text-[var(--color-blue)]">스스로 돌아갑니다.</span>
            </p>
          </div>

          {/* 대형 이미지 — 집앞 어르신 + 빌리니 PM */}
          <div className="sol-i mt-[4vw] w-full rounded-[clamp(24px,5.8vw,83px)] overflow-hidden">
            <Image
              src="/images/solution/2_biliny-doorstep.png"
              alt="집 앞에서 빌리니와 함께하는 어르신"
              width={1464} height={707}
              className="w-full h-auto"
              sizes="100vw"
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════
            Value 2 — 서로에게 안전한 "안내길"
        ═══════════════════════════════════════ */}
        <div className="mt-[14vw]">
          <h3 className="sol-r text-[clamp(24px,2.9vw,42px)] font-black text-[var(--color-blue)] tracking-wider text-right">
            서로에게 안전한 &ldquo;안내길&rdquo;
          </h3>
          <div className="sol-f mt-[3vw] max-w-[700px] ml-auto text-right text-[clamp(14px,1.8vw,27px)] leading-relaxed tracking-wider text-[var(--color-text-secondary)]">
            <p className="font-medium">가는 길이 약속된 &apos;안내길&apos;을 깔아드려요.</p>
            <p className="mt-1">
              <span className="font-bold text-[var(--color-blue)]">탑승자/보행자/운전자 모두를 안전하게</span>
              <span className="font-medium"> 안내하기 위해<br />따라가야할 길을 보여드립니다.</span>
            </p>
          </div>

          {/* 대형 이미지 — 야간 스마트레인 */}
          <div className="sol-i mt-[4vw] w-full rounded-[clamp(24px,5.8vw,83px)] overflow-hidden">
            <Image
              src="/images/solution/3_smartlane-night.png"
              alt="야간 스마트레인을 따라 주행하는 빌리니"
              width={1464} height={756}
              className="w-full h-auto"
              sizes="100vw"
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════
            Value 3 — 모든 과정을 지켜봐주는 "돌봄이"
        ═══════════════════════════════════════ */}
        <div className="mt-[14vw]">
          <h3 className="sol-r text-[clamp(24px,2.9vw,42px)] font-extrabold text-[var(--color-blue)] tracking-wider">
            모든 과정을 지켜봐주는 &ldquo;돌봄이&rdquo;
          </h3>
          <div className="sol-f mt-[3vw] max-w-[800px] text-[clamp(14px,1.8vw,27px)] leading-relaxed tracking-wider text-[var(--color-text-secondary)]">
            <p className="font-medium">
              안전과 편의를 위해<br />
              탑승자가 이동을 <span className="font-bold text-[var(--color-blue)]">시작할 때부터 이동이 끝날 때</span>까지,<br />
              모든 과정을 지켜봐드립니다.
            </p>
          </div>

          {/* 대형 이미지 — PICKER 가디언 관제 시스템 */}
          <div className="sol-i mt-[4vw] w-full rounded-[clamp(16px,3.6vw,52px)] overflow-hidden">
            <Image
              src="/images/solution/5_guardian-dashboard.png"
              alt="PICKER 가디언 관제 시스템 2.0 대시보드"
              width={1232} height={507}
              className="w-full h-auto"
              sizes="100vw"
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════
            Value 4 — 모두에게 "공평한" 모빌리티
        ═══════════════════════════════════════ */}
        <div className="mt-[14vw]">
          <h3 className="sol-r text-[clamp(24px,2.9vw,42px)] font-extrabold text-[var(--color-blue)] tracking-wider">
            모두에게 &ldquo;공평한&rdquo; 모빌리티
          </h3>
          <div className="sol-f mt-[3vw] max-w-[800px] text-[clamp(14px,1.8vw,27px)] leading-relaxed tracking-wider text-[var(--color-text-secondary)]">
            <p>
              모두가 타실 수 있어요.<br />
              <span className="font-bold text-[var(--color-blue)]">학생부터 고령자</span>까지 모두 이용할 수 있습니다.
            </p>
          </div>

          {/* 이미지 2장: 학생 + 도시 */}
          <div className="mt-[4vw] grid grid-cols-1 md:grid-cols-2 gap-[2vw]">
            <div className="sol-i rounded-[clamp(24px,5.3vw,76px)] overflow-hidden">
              <Image
                src="/images/solution/6_biliny-students.png"
                alt="학원 앞에서 학생들과 함께하는 빌리니"
                width={1213} height={445}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="sol-i rounded-[clamp(24px,5.5vw,80px)] overflow-hidden">
              <Image
                src="/images/solution/8_biliny-city-elderly.png"
                alt="도심 교차로에서 빌리니를 타는 어르신"
                width={1016} height={344}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        <div className="h-[10vw]" />
      </div>
    </section>
  );
}
