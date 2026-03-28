'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

type NavItem = { label: string; href: string; accent?: boolean; ticks: number };

const NAV_ITEMS: NavItem[] = [
  { label: 'STORY', href: '#story', ticks: 2 },
  { label: 'BILINY', href: '#biliny', ticks: 2 },
  { label: 'TRINY', href: '#triny', ticks: 3 },
  { label: 'CONTACT', href: '#contact', accent: true, ticks: 4 },
];

function NavTicks({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-[2px]">
      {Array.from({ length: count }).map((_, i) => (
        <Image
          key={i}
          src="/images/nav_icon.svg"
          alt=""
          width={1}
          height={3}
          className="opacity-60"
        />
      ))}
    </span>
  );
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from(headerRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay: 3.8,
    });

    ScrollTrigger.create({
      start: 'top -60',
      onUpdate: (self) => {
        if (!headerRef.current) return;
        if (self.direction === 1) {
          gsap.to(headerRef.current, { y: -60, duration: 0.3 });
        } else {
          gsap.to(headerRef.current, { y: 0, duration: 0.3 });
        }
      },
    });
  }, { scope: headerRef });

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white"
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 md:px-10 h-14">
        {/* Left nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.slice(0, 2).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-xs font-medium tracking-[0.24em] text-[var(--color-nav-text)] transition-colors hover:opacity-70"
            >
              <NavTicks count={item.ticks} />
              {item.label}
            </a>
          ))}
        </nav>

        {/* Center logo - Picker icon */}
        <a href="#" className="flex items-center" aria-label="Picker Project">
          <Image
            src="/images/logo-left-top.svg"
            alt=""
            width={14}
            height={14}
          />
          <Image
            src="/images/logo-right-bottom.svg"
            alt="Picker Project"
            width={14}
            height={14}
            className="-ml-[1px]"
          />
        </a>

        {/* Right nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.slice(2).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-xs font-medium tracking-[0.24em] transition-colors hover:opacity-70"
              style={{ color: item.accent ? 'var(--color-accent-dark)' : 'var(--color-nav-text)' }}
            >
              <NavTicks count={item.ticks} />
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="메뉴 열기"
        >
          <span className={`block w-5 h-0.5 bg-[var(--color-text)] transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--color-text)] transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--color-text)] transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-[var(--color-border)] px-5 py-6 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium tracking-[0.24em]"
              style={{ color: item.accent ? 'var(--color-accent-dark)' : 'var(--color-nav-text)' }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
