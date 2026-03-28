'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: 'STORY', href: '#story' },
  { label: 'BILINY', href: '#solution' },
  { label: 'PRODUCT', href: '#product' },
  { label: 'CONTACT', href: '#contact' },
];

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from(headerRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.2,
    });

    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        if (!headerRef.current) return;
        if (self.direction === 1) {
          gsap.to(headerRef.current, { y: -80, duration: 0.3 });
        } else {
          gsap.to(headerRef.current, { y: 0, duration: 0.3 });
        }
      },
    });
  }, { scope: headerRef });

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 md:px-10 h-16">
        <a href="#" className="text-xl font-black tracking-tight text-[var(--color-text)]">
          PICKER
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold tracking-widest text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

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
              className="text-base font-semibold tracking-widest text-[var(--color-text-secondary)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
