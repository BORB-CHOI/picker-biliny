import Link from "next/link";
import type { ReactNode } from "react";
import { LogoName } from "@/components/ui/icons";

interface LegalLayoutProps {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}

export function LegalLayout({ title, effectiveDate, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-[var(--color-text)]">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
          <Link
            href="/"
            aria-label="피커프로젝트 홈으로"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <LogoName width={120} />
          </Link>
          <Link
            href="/"
            className="text-xs sm:text-[13px] text-[#656f96] hover:text-[var(--color-text)] transition-colors"
          >
            ← 홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-[820px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-16 sm:pb-24">
        <header className="mb-10 sm:mb-14 border-b border-[var(--color-border)] pb-8">
          <h1 className="text-[26px] sm:text-[36px] font-bold tracking-tight text-[var(--color-text)] leading-tight">
            {title}
          </h1>
          <p className="mt-3 text-[13px] sm:text-sm text-[#656f96]">시행일: {effectiveDate}</p>
        </header>

        <article className="legal-article">{children}</article>
      </main>

      <footer className="border-t border-[var(--color-border)] py-8">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <p className="text-xs text-[#656f96] order-2 sm:order-1">
            © 2026 Picker Project. All rights reserved.
          </p>
          <div className="flex items-center gap-6 order-1 sm:order-2">
            <Link
              href="/terms"
              className="text-xs sm:text-[13px] text-[#656f96] hover:text-[var(--color-text)] transition-colors"
            >
              이용약관
            </Link>
            <Link
              href="/privacy"
              className="text-xs sm:text-[13px] text-[#656f96] hover:text-[var(--color-text)] transition-colors"
            >
              개인정보처리방침
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface LegalArticleProps {
  number: string;
  heading: string;
  children: ReactNode;
}

export function LegalArticle({ number, heading, children }: LegalArticleProps) {
  return (
    <section className="mb-10 sm:mb-12">
      <h2 className="text-[17px] sm:text-[20px] font-bold text-[var(--color-text)] mb-4">
        {number} {heading}
      </h2>
      <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[var(--color-text-light)] space-y-3">
        {children}
      </div>
    </section>
  );
}
