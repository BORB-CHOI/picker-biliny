'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { LeafTopLeft, LeafBottomRight, LogoName } from "@/components/ui/icons";
import { phase, lockScrollUntilHero, resetPhaseSequence } from "@/lib/animationState";
import { preloadVideoSources } from '@/lib/videoPreload';

const FRAME = 68;
const LEAF = 58;

const PRELOAD_VIDEO_SOURCES = [
  '/videos/biliny/slide-down.mp4',
  '/videos/biliny/slide-up.mp4',
  '/videos/biliny/slide-up-human.mp4',
  '/videos/biliny/approaching-biliny-2.mp4',
  '/videos/biliny/turning.mp4',
  '/videos/triny/turning.mp4',
] as const;

/** 개발 중 인트로 스킵 — 프로덕션에서는 항상 false, 개발 중 ?intro=1 으로 강제 재생 */
const SKIP_INTRO =
  process.env.NODE_ENV === 'development' &&
  typeof window !== 'undefined' &&
  !new URLSearchParams(window.location.search).has('intro');

export function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useGSAP(() => {
    resetPhaseSequence();
    preloadVideoSources(PRELOAD_VIDEO_SOURCES);

    // 스크롤 잠금 — 위치 계산 전에 실행해야 스크롤바 제거 후 정확한 viewport 크기 사용
    lockScrollUntilHero();

    if (
      SKIP_INTRO ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      phase.intro.emit();
      setHidden(true);
      return;
    }

    const ltEl = containerRef.current!.querySelector(
      ".intro-leaf-lt",
    ) as HTMLElement;
    const rbEl = containerRef.current!.querySelector(
      ".intro-leaf-rb",
    ) as HTMLElement;
    const ltRect = ltEl.getBoundingClientRect();
    const rbRect = rbEl.getBoundingClientRect();

    // Leaf: outer corner → screen corner (1px 오버슈트로 서브픽셀 갭 방지)
    const ltMoveX = -ltRect.left - 1;
    const ltMoveY = -ltRect.top - 1;
    const rbMoveX = window.innerWidth - rbRect.right;
    const rbMoveY = window.innerHeight - rbRect.bottom;

    // Text spread — tighter on mobile, moderate on desktop
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 640;
    const spread = isMobile ? 0.2 : 0.3;
    const findMoveX = -vw * spread;
    const findMoveY = -vh * spread;
    const spotMoveX = vw * spread;
    const spotMoveY = vh * spread;

    const leafElements = [".intro-leaf-lt", ".intro-leaf-rb"];
    const textElements = [".intro-find", ".intro-blind", ".intro-spot"];
    const allElements = [...leafElements, ...textElements];

    // Start invisible
    gsap.set(allElements, { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        phase.intro.emit();
        setHidden(true);
      },
    });

    tl
      // 1. Leaves fade in at center (texts still hidden)
      .to(leafElements, {
        opacity: 1,
        duration: 0.6,
        ease: "power1.in",
      })
      .to({}, { duration: 0.3 })

      // 2. Spread outward — leaves move + texts fade in simultaneously
      .to(".intro-leaf-lt", {
        x: ltMoveX,
        y: ltMoveY,
        duration: 2,
        ease: "power1.in",
      })
      .to(".intro-leaf-rb", { x: rbMoveX, y: rbMoveY, duration: 2, ease: "power1.in" }, "<")
      // Texts appear as leaves start moving, spreading along the diagonal
      .fromTo(
        ".intro-find",
        { opacity: 0, x: 0, y: 0 },
        { opacity: 1, x: findMoveX, y: findMoveY, duration: 2, ease: "power1.in" },
        "<",
      )
      .fromTo(
        ".intro-blind",
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" },
        "<",
      )
      .fromTo(
        ".intro-spot",
        { opacity: 0, x: 0, y: 0 },
        { opacity: 1, x: spotMoveX, y: spotMoveY, duration: 2, ease: "power1.in" },
        "<",
      )

      // Hold at spread
      .to({}, { duration: 0.25 })

      // 3. Collapse back — leaves return, texts fade out as collapse begins
      .to(".intro-leaf-lt", { x: 0, y: 0, duration: 0.6, ease: "power2.in" })
      .to(".intro-leaf-rb", { x: 0, y: 0, duration: 0.6, ease: "power2.in" }, "<")
      .to(".intro-find", { x: 0, y: 0, opacity: 0, duration: 0.6, ease: "power2.in" }, "<")
      .to(".intro-blind", { opacity: 0, duration: 0.6, ease: "power2.in" }, "<")
      .to(".intro-spot", { x: 0, y: 0, opacity: 0, duration: 0.6, ease: "power2.in" }, "<")
      .to({}, { duration: 0.5 })

      // 4. Logo name dissolves in (leaves still visible at center)
      .fromTo(
        ".intro-logo-name",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      )
      .to({}, { duration: 1.0 })

      // 5. Final dissolve — leaves + logo fade out together
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      });
  }, { scope: containerRef });

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 bg-white flex items-center justify-center overflow-hidden"
    >
      {/* FIND — starts at center, spreads to upper-left */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="intro-find text-[#0060EF] text-4xl font-black tracking-tight"
          style={{ opacity: 0 }}
        >
          FIND
        </span>
      </div>

      {/* BLIND — stays at center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="intro-blind text-[#444] text-4xl font-black tracking-tight"
          style={{ opacity: 0 }}
        >
          BLIND
        </span>
      </div>

      {/* SPOT — starts at center, spreads to lower-right */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="intro-spot text-[#444] text-4xl font-black tracking-tight"
          style={{ opacity: 0 }}
        >
          SPOT
        </span>
      </div>

      {/* Leaves + logo */}
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: FRAME, height: FRAME }}>
          <div className="intro-leaf-lt absolute top-0 left-0" style={{ opacity: 0 }}>
            <LeafTopLeft size={LEAF} />
          </div>
          <div className="intro-leaf-rb absolute bottom-0 right-0" style={{ opacity: 0 }}>
            <LeafBottomRight size={LEAF} />
          </div>
        </div>

        <div className="intro-logo-name opacity-0 mt-4">
          <LogoName width={160} />
        </div>
      </div>
    </div>
  );
}
