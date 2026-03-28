'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Inter } from "next/font/google";
import { Logo } from "@/components/ui/Logo";
import { WordmarkLogo } from "@/components/ui/icons";
import { onIntroComplete } from "@/lib/animationState";

const inter = Inter({ subsets: ["latin"], weight: ["500"] });

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
        <div
          key={i}
          className="w-0.5 h-2.5 bg-current rounded-full"
        />
      ))}
    </div>
  );
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cleanup = onIntroComplete(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
      );
    });
    return cleanup;
  }, { scope: headerRef });

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
      style={{ opacity: 0 }}
    >
      <nav
        className={`mx-auto flex items-center justify-center gap-8 md:gap-14 lg:gap-30 px-5 py-4 md:py-5 ${inter.className}`}
      >
        {NAV_LEFT.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group flex flex-col items-center gap-1.5 text-(--color-nav-text) hover:text-(--color-primary) transition-colors duration-200"
          >
            <NavBars count={item.bars} />
            <span className="text-xs md:text-sm font-medium tracking-[0.06em]">
              {item.label}
            </span>
          </a>
        ))}

        {/* Center logo — crossfade to wordmark on hover */}
        <a
          href="#"
          aria-label="홈으로"
          className="group relative flex items-center justify-center overflow-visible"
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
            className="group flex flex-col items-center gap-1.5 text-(--color-nav-text) hover:text-(--color-primary) transition-colors duration-200"
          >
            <NavBars count={item.bars} />
            <span className="text-xs md:text-sm font-medium tracking-[0.06em]">
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </header>
  );
}
