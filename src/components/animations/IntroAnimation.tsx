'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Inter } from "next/font/google";
import { LeafTopLeft, LeafBottomRight, LogoName } from "@/components/ui/icons";
import { phase } from "@/lib/animationState";

const inter = Inter({ subsets: ["latin"], weight: ["900"] });

const FRAME = 68;
const LEAF = 58;

/** 개발 중 인트로 스킵 — true로 설정하면 인트로 없이 바로 Header→Hero 시퀀스 시작 */
const SKIP_INTRO = false;

export function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useGSAP(() => {
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

    // Leaf: outer corner → screen corner
    const ltMoveX = -ltRect.left;
    const ltMoveY = -ltRect.top;
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
        ease: "power2.in",
      })
      .to({}, { duration: 0.3 })

      // 2. Spread outward — leaves move + texts fade in simultaneously
      .to(".intro-leaf-lt", {
        x: ltMoveX,
        y: ltMoveY,
        duration: 1.2,
        ease: "slow",
      })
      .to(
        ".intro-leaf-rb",
        { x: rbMoveX, y: rbMoveY, duration: 1.2, ease: "slow" },
        "<",
      )
      // Texts appear as leaves start moving, spreading along the diagonal
      .fromTo(
        ".intro-find",
        { opacity: 0, x: 0, y: 0 },
        { opacity: 1, x: findMoveX, y: findMoveY, duration: 1.2, ease: "slow" },
        "<",
      )
      .fromTo(
        ".intro-blind",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "<",
      )
      .fromTo(
        ".intro-spot",
        { opacity: 0, x: 0, y: 0 },
        { opacity: 1, x: spotMoveX, y: spotMoveY, duration: 1.2, ease: "slow" },
        "<",
      )

      // Hold at spread
      .to({}, { duration: 0.25 })

      // 3. Collapse back — leaves return, texts fade out as collapse begins
      .to(".intro-leaf-lt", { x: 0, y: 0, duration: 0.6, ease: "power2.in" })
      .to(
        ".intro-leaf-rb",
        { x: 0, y: 0, duration: 0.6, ease: "power2.in" },
        "<",
      )
      .to(
        ".intro-find",
        { x: 0, y: 0, opacity: 0, duration: 0.6, ease: "power2.in" },
        "<",
      )
      .to(".intro-blind", { opacity: 0, duration: 0.6, ease: "power2.in" }, "<")
      .to(
        ".intro-spot",
        { x: 0, y: 0, opacity: 0, duration: 0.6, ease: "power2.in" },
        "<",
      )
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
          className={`intro-find text-[#0060EF] text-4xl font-black tracking-tight ${inter.className}`}
          style={{ opacity: 0 }}
        >
          FIND
        </span>
      </div>

      {/* BLIND — stays at center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className={`intro-blind text-[#444] text-4xl font-black tracking-tight ${inter.className}`}
          style={{ opacity: 0 }}
        >
          BLIND
        </span>
      </div>

      {/* SPOT — starts at center, spreads to lower-right */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className={`intro-spot text-[#444] text-4xl font-black tracking-tight ${inter.className}`}
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
