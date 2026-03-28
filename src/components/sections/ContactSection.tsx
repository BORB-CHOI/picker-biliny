'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ContactType = 'email' | 'phone';

const KOREAN_PHONE_REGEX = /^(01[016789])-?(\d{3,4})-?(\d{4})$/;

function formatKoreanPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  return digits.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [contactType, setContactType] = useState<ContactType>('email');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.contact-content', {
      scrollTrigger: { trigger: '.contact-content', start: 'top 80%' },
      y: 40, opacity: 0, duration: 0.8,
    });
  }, { scope: sectionRef });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const contact = formData.get('contact') as string;
    const message = formData.get('message') as string;
    const agree = formData.get('agree');

    if (!name || !contact || !message) {
      setError('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (!agree) {
      setError('개인정보 수집에 동의해주세요.');
      return;
    }

    if (contactType === 'phone' && !KOREAN_PHONE_REGEX.test(contact.replace(/\D/g, '').replace(/^(\d{3})(\d+)/, '$1$2'))) {
      setError('올바른 한국 전화번호를 입력해주세요.');
      return;
    }

    setSubmitted(true);
  }

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-40 px-5 md:px-10 bg-[var(--color-bg-subtle)]">
      <div className="contact-content mx-auto max-w-xl">
        <div className="text-center mb-12">
          <p className="text-sm font-bold tracking-widest text-[var(--color-primary)] uppercase mb-4">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--color-text)]">
            문의하기
          </h2>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            BILINY에 대해 궁금한 점이 있으시면 연락해주세요.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-600">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-xl font-bold text-[var(--color-text)]">문의가 접수되었습니다</p>
            <p className="mt-2 text-[var(--color-text-secondary)]">빠른 시일 내에 답변 드리겠습니다.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 md:p-10 shadow-sm space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                이름 <span className="text-[var(--color-primary)]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                placeholder="홍길동"
              />
            </div>

            <div>
              <p className="block text-sm font-semibold text-[var(--color-text)] mb-2">연락처 유형</p>
              <div className="flex gap-3">
                {(['email', 'phone'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setContactType(type)}
                    className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors ${
                      contactType === type
                        ? 'bg-[var(--color-text)] text-white'
                        : 'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]'
                    }`}
                  >
                    {type === 'email' ? '이메일' : '전화번호'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                {contactType === 'email' ? '이메일' : '전화번호'} <span className="text-[var(--color-primary)]">*</span>
              </label>
              <input
                id="contact"
                name="contact"
                type={contactType === 'email' ? 'email' : 'tel'}
                required
                className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                placeholder={contactType === 'email' ? 'example@email.com' : '010-1234-5678'}
                onChange={(e) => {
                  if (contactType === 'phone') {
                    e.target.value = formatKoreanPhone(e.target.value);
                  }
                }}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                문의 내용 <span className="text-[var(--color-primary)]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 resize-none"
                placeholder="문의 내용을 입력해주세요."
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input name="agree" type="checkbox" className="mt-1 h-4 w-4 rounded accent-[var(--color-primary)]" />
              <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                [필수] 문의 처리를 위해 이름, 연락처, 문의 내용을 수집합니다.
                수집된 정보는 문의 응대 후 3개월 내 파기됩니다.
              </span>
            </label>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-xl bg-[var(--color-primary)] py-3.5 text-base font-bold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              문의 보내기
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
