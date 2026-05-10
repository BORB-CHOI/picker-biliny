"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Logo } from "@/components/ui/Logo";
import { WordmarkLogo } from "@/components/ui/icons";
import { onIntroReady, phase } from "@/lib/animationState";
import { smoothScrollTo } from "@/lib/smoothScroll";

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

/** scroll-spy 대상 섹션 ID — Header 네비게이션과 일치 */
const SECTION_IDS = ["story", "biliny", "triny", "contact"] as const;

function NavBars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="w-1 h-2.5 bg-current" />
      ))}
    </div>
  );
}

/** 클릭 위치에서 원이 퍼지는 Material 스타일 ripple — 600ms */
function NavItem({
  item,
  isActive,
  onNavigate,
}: {
  item: { label: string; href: string; bars: number };
  isActive: boolean;
  onNavigate: (href: string) => void;
}) {
  const [ripple, setRipple] = useState<{
    x: number;
    y: number;
    size: number;
    key: number;
  } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // 클릭 지점에서 박스의 가장 먼 모서리까지 거리 × 2 = 박스 전체를 덮는 최소 지름
    const dx = Math.max(x, rect.width - x);
    const dy = Math.max(y, rect.height - y);
    const size = 2 * Math.hypot(dx, dy);
    setRipple({ x, y, size, key: Date.now() });
    onNavigate(item.href);
  };

  useEffect(() => {
    if (!ripple) return;
    const t = window.setTimeout(() => setRipple(null), 650);
    return () => window.clearTimeout(t);
  }, [ripple]);

  return (
    <a
      href={item.href}
      onClick={handleClick}
      className={`relative overflow-hidden flex-1 group flex flex-col items-center gap-1.5 py-5 transition-colors duration-200 ${
        isActive ? "text-(--color-primary)" : "text-(--color-nav-text) hover:text-(--color-primary)"
      }`}
    >
      {ripple && (
        <span
          key={ripple.key}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-(--color-primary)"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animation: "nav-ripple 600ms ease-out forwards",
          }}
        />
      )}
      <NavBars count={item.bars} />
      <span className="relative text-sm font-medium tracking-[0.06em]">{item.label}</span>
    </a>
  );
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // scroll-spy — header 바로 아래 trigger line을 통과한 가장 마지막 섹션을 active로
  // (마지막 섹션이 페이지 끝에 있어 좁은 IntersectionObserver band에 도달하지 못하는 문제 회피)
  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    let rafId: number | null = null;

    const updateActive = () => {
      rafId = null;
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const triggerLine = headerHeight + 60;

      // 위에서부터 순회하며 trigger line 위로 올라온 가장 마지막 섹션을 선택
      let current: string | null = null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= triggerLine) {
          current = el.id;
        }
      }

      // 페이지 끝까지 스크롤하면 마지막 섹션 강제 활성화 (contact 등)
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        current = elements[elements.length - 1].id;
      }

      setActiveId(current);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(updateActive);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateActive();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // 클릭 시 GSAP ScrollToPlugin으로 이동 (util이 CSS smooth scroll 충돌까지 처리)
  const handleNavigate = (href: string) => {
    smoothScrollTo(href, headerRef.current?.offsetHeight ?? 0);
  };

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
      <nav className="max-w-350 mx-auto flex items-center px-5">
        {NAV_LEFT.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            isActive={activeId === item.href.slice(1)}
            onNavigate={handleNavigate}
          />
        ))}

        {/* Center logo — crossfade to wordmark on hover */}
        <a
          href="#"
          aria-label="홈으로"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("#");
          }}
          className="flex-1 group relative flex items-center justify-center py-5 overflow-visible"
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
          <NavItem
            key={item.label}
            item={item}
            isActive={activeId === item.href.slice(1)}
            onNavigate={handleNavigate}
          />
        ))}
      </nav>
    </header>
  );
}
