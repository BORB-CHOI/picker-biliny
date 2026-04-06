'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LogoName } from '@/components/ui/icons';
import { onMainContentReady } from '@/lib/animationState';
import { isScrollMarkerEnabled, resolveVisualTrigger } from '@/lib/scrollTriggerUtils';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_ANIM_START = 'top 88%';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Contact Section + Footer
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** 세로 바 인디케이터 (Header nav 패턴 재사용) */
function BarIndicator({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="w-[3px] h-6 md:h-8 bg-[#3a3a3a] rounded-full" />
      ))}
    </span>
  );
}

/** 연락처 아이콘 행 */
function ContactInfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-white/70 text-xs">{label}</p>
        <p className="text-white font-bold text-sm md:text-base">{value}</p>
      </div>
    </div>
  );
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    purpose: '지자체 도입 문의',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const showMarkers = isScrollMarkerEnabled();
      const animations: gsap.core.Animation[] = [];
      gsap.set(section.querySelectorAll('.ct-anim'), { y: 40, opacity: 0 });

      let firstRafId: number;
      let secondRafId: number;

      const unsubscribe = onMainContentReady(() => {
        firstRafId = requestAnimationFrame(() => {
          secondRafId = requestAnimationFrame(() => {
          section.querySelectorAll<HTMLElement>('.ct-anim').forEach((el) => {
            const triggerEl = resolveVisualTrigger(el);
            const animation = gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: { trigger: triggerEl, start: CONTACT_ANIM_START, markers: showMarkers },
            });
            animations.push(animation);
          });
          });
        });
      });

      return () => {
        unsubscribe();
        animations.forEach((animation) => animation.kill());
        cancelAnimationFrame(firstRafId);
        cancelAnimationFrame(secondRafId);
      };
    },
    { scope: sectionRef },
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    // TODO: 실제 제출 로직 (API 연동)
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  }

  return (
    <section ref={sectionRef} id="contact" className="relative">
      {/* ── 섹션 타이틀 ── */}
      <div className="ct-anim flex items-center justify-center gap-3 pt-20 md:pt-28 pb-6 md:pb-8">
        <BarIndicator count={4} />
        <h2 className="text-3xl md:text-[43px] font-bold text-[#3a3a3a] tracking-wide">
          CONTACT
        </h2>
      </div>

      {/* 구분선 */}
      <div className="ct-anim w-full h-px bg-[#e0e0e0]" />

      {/* ── 본문: 좌 파란카드 + 우 폼 ── */}
      <div className="ct-anim bg-[#f5f6fa] py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* 좌측: 파란 배경 카드 */}
            <div className="relative lg:w-[45%] rounded-3xl overflow-hidden bg-linear-to-br from-[#2675FF] to-[#0050D0] p-8 md:p-12 flex flex-col justify-between min-h-100">
              {/* 좌상단 원형 장식 */}
              <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-white/10" />

              <div className="relative z-10">
                <h3 className="text-white text-2xl md:text-3xl font-black leading-tight">
                  당신의 도시에
                  <br />
                  이동의 자유를 더하세요.
                </h3>
                <p className="text-white/80 text-sm md:text-[15px] mt-6 leading-relaxed">
                  빌리니 도입은 단순한 기기 구매가 아닙니다. 이동 데이터 기반의 환경 설계부터 운영까지 최적화된 솔루션을 제안합니다.
                </p>
              </div>

              <div className="relative z-10 flex flex-col gap-5 mt-8">
                <ContactInfoRow
                  icon={
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                      <path d="M5.5 3.5C5.5 3.5 6.5 2 8 2C9 2 9.5 2.5 10 3.5L10.5 5C10.5 5 10.5 6 9.5 6.5L8.5 7C8.5 7 9 9 11 11C13 13 13 13 13 13L13.5 12C14 11 15 11 15 11L16.5 11.5C17.5 12 18 12.5 18 13.5C18 15 16.5 16.5 16.5 16.5C14.5 18.5 8 15 5.5 12.5C3 10 -0.5 3.5 1.5 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  }
                  label="문의 전화"
                  value="010-XXXX-XXXX"
                />
                <ContactInfoRow
                  icon={
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                      <rect x="2" y="4" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5"/>
                      <path d="M2 6L10 11L18 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  }
                  label="이메일"
                  value="contact@pickerproject.com"
                />
                <ContactInfoRow
                  icon={
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                      <path d="M10 11C11.6569 11 13 9.65685 13 8C13 6.34315 11.6569 5 10 5C8.34315 5 7 6.34315 7 8C7 9.65685 8.34315 11 10 11Z" stroke="white" strokeWidth="1.5"/>
                      <path d="M10 18C10 18 17 13 17 8C17 4.13401 13.866 1 10 1C6.13401 1 3 4.13401 3 8C3 13 10 18 10 18Z" stroke="white" strokeWidth="1.5"/>
                    </svg>
                  }
                  label="오피스"
                  value="충청남도 홍성군 내포신도시 지식산업센터"
                />
              </div>
            </div>

            {/* 우측: 문의 폼 */}
            <div className="lg:w-[55%]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-(--color-primary) flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                      <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-foreground">상담 신청이 완료되었습니다</p>
                  <p className="text-sm text-(--color-text-secondary)">
                    영업일 기준 48시간 내에 전문가가 답변 드립니다.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* 이름 + 연락처 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        이름/담당자명
                      </label>
                      <input
                        type="text"
                        placeholder="성함을 입력하세요"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#e0e0e0] bg-white text-sm text-foreground placeholder:text-[#b0b0b0] outline-none focus:border-(--color-primary) transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        연락처
                      </label>
                      <input
                        type="tel"
                        placeholder="010-0000-0000"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#e0e0e0] bg-white text-sm text-foreground placeholder:text-[#b0b0b0] outline-none focus:border-(--color-primary) transition-colors"
                      />
                    </div>
                  </div>

                  {/* 상담 목적 */}
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      상담 목적
                    </label>
                    <select
                      value={formState.purpose}
                      onChange={(e) => setFormState({ ...formState, purpose: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#e0e0e0] bg-white text-sm text-foreground outline-none focus:border-(--color-primary) transition-colors appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                      }}
                    >
                      <option>지자체 도입 문의</option>
                      <option>기업 제휴 문의</option>
                      <option>투자 관련 문의</option>
                      <option>기술 협력 문의</option>
                      <option>기타 문의</option>
                    </select>
                  </div>

                  {/* 문의 내용 */}
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      문의 내용
                    </label>
                    <textarea
                      placeholder="궁금하신 점이나 환경 정보를 적어주세요"
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#e0e0e0] bg-white text-sm text-foreground placeholder:text-[#b0b0b0] outline-none focus:border-(--color-primary) transition-colors resize-y"
                    />
                  </div>

                  {/* 제출 버튼 */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-[#2c2c2c] text-white font-bold text-sm tracking-wide hover:bg-[#1a1a1a] transition-colors disabled:opacity-50"
                  >
                    {submitting ? '신청 중...' : '상담 신청하기  ›'}
                  </button>

                  <p className="text-center text-xs text-[#999]">
                    문의 주시면 영업일 기준 48시간 내에 전문가가 답변 드립니다.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="ct-anim bg-white py-8 md:py-10">
        <div className="max-w-[1200px] mx-auto px-5 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* 로고 */}
          <LogoName width={150} />

          {/* 링크 */}
          <div className="flex items-center gap-8">
            <a href="#" className="text-[13px] text-[#656f96] hover:text-foreground transition-colors">
              이용약관
            </a>
            <a href="#" className="text-[13px] text-[#656f96] hover:text-foreground transition-colors">
              개인정보처리방침
            </a>
          </div>

          {/* 저작권 */}
          <p className="text-[13px] text-[#656f96]">
            © 2026 Picker Project. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}
