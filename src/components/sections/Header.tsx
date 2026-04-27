"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Logo } from "@/components/ui/Logo";
import { WordmarkLogo } from "@/components/ui/icons";
import { onIntroReady, phase } from "@/lib/animationState";

/**
 * 개발 중 인트로 스킵 여부 — 클라이언트에서만 정확히 판정 가능.
 * 모듈 스코프 상수로 두면 SSR 시 typeof window 가드로 항상 false가 되어
 * Header가 onIntroReady 경로를 타게 된다. useGSAP 내부에서 호출하여
 * 클라이언트 평가 시점의 location.search를 정확히 읽도록 한다.
 */
function shouldSkipIntro(): boolean {
  if (typeof window === "undefined") return false;
  return (
    process.env.NODE_ENV === "development" &&
    !new URLSearchParams(window.location.search).has("intro")
  );
}

const NAV_LEFT = [
  { label: "STORY", href: "#story", bars: 1 },
  { label: "BILINY", href: "#biliny", bars: 2 },
] as const;

const NAV_RIGHT = [
  { label: "TRINY", href: "#triny", bars: 3 },
  { label: "CONTACT", href: "#contact", bars: 4 },
] as const;

function NavBars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 justify-center">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="w-0.5 h-2.5 bg-current rounded-full" />
      ))}
    </div>
  );
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      let headerTween: gsap.core.Tween | null = null;

      const runHeaderIntro = () => {
        headerTween = gsap.fromTo(
          headerRef.current,
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", onComplete: phase.header.emit },
        );
      };

      // SKIP_INTRO 시에는 phase.intro 의존을 우회 — dynamic IntroAnimation의 마운트
      // 타이밍 / StrictMode double-mount / once:true 리스너 소실에 영향받지 않도록
      // 다음 tick에 즉시 슬라이드 다운을 실행한다.
      if (shouldSkipIntro()) {
        const timeoutId = window.setTimeout(runHeaderIntro, 0);
        return () => {
          window.clearTimeout(timeoutId);
          headerTween?.kill();
        };
      }

      const cleanup = onIntroReady(runHeaderIntro);

      return () => {
        cleanup();
        headerTween?.kill();
      };
    },
    { scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
      style={{ opacity: 0 }}
    >
      <nav className="max-w-350 mx-auto flex items-center px-5 py-5">
        {NAV_LEFT.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex-1 group flex flex-col items-center gap-1.5 text-(--color-nav-text) hover:text-(--color-primary) transition-colors duration-200"
          >
            <NavBars count={item.bars} />
            <span className="text-sm font-medium tracking-[0.06em]">{item.label}</span>
          </a>
        ))}

        {/* Center logo — crossfade to wordmark on hover */}
        <a
          href="#"
          aria-label="홈으로"
          className="flex-1 group relative flex items-center justify-center overflow-visible"
        >
          <div className="transition-opacity duration-300 group-hover:opacity-0">
            <Logo size={1} />
          </div>
          <WordmarkLogo
            width={80}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </a>

        {NAV_RIGHT.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex-1 group flex flex-col items-center gap-1.5 text-(--color-nav-text) hover:text-(--color-primary) transition-colors duration-200"
          >
            <NavBars count={item.bars} />
            <span className="text-sm font-medium tracking-[0.06em]">{item.label}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
