'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WordmarkLogoHorizon } from "@/components/ui/icons";
import { phase } from "@/lib/animationState";

gsap.registerPlugin(ScrollTrigger);

/** Vertical bar indicator matching the nav pattern */
function BarIndicator({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex gap-0.5 ${className ?? ""}`}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="w-0.5 h-1.75 bg-white rounded-full" />
      ))}
    </span>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const inner = innerRef.current;
      const video1 = video1Ref.current;
      const video2 = video2Ref.current;
      if (!inner || !video1 || !video2) return;

      // ① 마운트 즉시 숨김
      gsap.set(inner, { y: 80, opacity: 0 });
      gsap.set(video1, { opacity: 0 });
      gsap.set(video2, { opacity: 0 });

      // ② 헤더 완료 후 콘텐츠 슬라이드업
      const cleanup = phase.header.on(() => {
        gsap.to(inner, {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          onComplete: () => {
            // ③ 콘텐츠 등장 완료 → approaching-1 페이드인 + 재생
            gsap.to(video1, { opacity: 1, duration: 0.8, ease: "power2.out" });
            video1.play();

            // ④ approaching-2: 끝나기 0.2초 전에 영원히 정지
            const onTimeUpdate = () => {
              if (video2.duration - video2.currentTime <= 0.2) {
                video2.pause();
                video2.removeEventListener("timeupdate", onTimeUpdate);
              }
            };
            video2.addEventListener("timeupdate", onTimeUpdate);

            // ⑤ approaching-1 종료 후 스크롤 트리거로 approaching-2 재생
            video1.addEventListener(
              "ended",
              () => {
                ScrollTrigger.create({
                  trigger: sectionRef.current,
                  start: "top top",
                  onUpdate: (self) => {
                    if (
                      self.progress > 0.05 &&
                      video2.paused &&
                      video2.currentTime === 0
                    ) {
                      // video2를 먼저 보이게 → video1 제거 (반투명 겹침 방지)
                      gsap.set(video2, { opacity: 1 });
                      video2.play();
                      gsap.set(video1, { opacity: 0 });
                    }
                  },
                });
              },
              { once: true },
            );

            // ⑤ 스크롤 시 콘텐츠 fade-out
            gsap.to(inner, {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
              y: -120,
              opacity: 0,
            });
          },
        });
      });

      return cleanup;
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen flex flex-col justify-end bg-background pt-16 md:pt-18 overflow-hidden"
    >
      {/* 배경 영상 — 가로 꽉 차게, 컨트롤 없음 */}
      <video
        ref={video1Ref}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/biliny/approaching-1.mp4"
        muted
        playsInline
        preload="auto"
        style={{ opacity: 0 }}
      />
      <video
        ref={video2Ref}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/biliny/approaching-2.mp4"
        muted
        playsInline
        preload="auto"
        style={{ opacity: 0 }}
      />

      <div
        ref={innerRef}
        className="hero-inner relative z-10 px-6 md:px-12 lg:px-20 pb-16 md:pb-24 lg:pb-32 w-full max-w-350 mx-auto"
      >
        {/* PICKER PROJECT wordmark */}
        <div className="flex items-center gap-2 mb-5 md:mb-6">
          <WordmarkLogoHorizon width={200} fill="#192746" />
        </div>

        {/* Main heading */}
        <h1 className="mb-5 md:mb-6">
          <span className="block text-[28px] md:text-[36px] lg:text-[42px] font-medium tracking-[0.06em] text-(--color-hero-title) leading-tight">
            중소도시의 이동권을
          </span>
          <span className="block text-[30px] md:text-[40px] lg:text-[46px] font-medium tracking-[0.06em] text-(--color-primary) leading-tight mt-1">
            다시 설계합니다.
          </span>
        </h1>

        {/* Horizontal decorative line */}
        <div className="h-px bg-[#D8D8D8] w-full max-w-85 md:max-w-102.5 mb-5 md:mb-6" />

        {/* Description */}
        <p className="text-[11px] md:text-[13px] lg:text-sm text-(--color-text-desc) leading-[1.9] max-w-75 md:max-w-85 mb-8 md:mb-10">
          피커 프로젝트 &lsquo;빌리니(BILINY)&rsquo; 는 일상 속<br />
          <strong className="font-bold text-(--color-hero-title)">
            이동의 비효율 사각지대를 해결
          </strong>
          하는
          <br />
          공유형 자율주행 모빌리티 솔루션입니다.
        </p>

        {/* CTA buttons */}
        <div className="flex gap-3">
          <a
            href="#story"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4B4B4B] text-white text-[10px] md:text-xs font-bold rounded-[10px] shadow-[0_2px_6px_rgba(75,75,75,0.25)] hover:bg-[#3a3a3a] transition-colors"
          >
            <BarIndicator count={1} />
            빌리니 스토리 →
          </a>
          <a
            href="#biliny"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2675FF] text-white text-[10px] md:text-xs font-bold rounded-[10px] shadow-[0_2px_6px_rgba(57,57,255,0.25)] hover:bg-[#1a5ee6] transition-colors"
          >
            <BarIndicator count={2} />
            빌리니 둘러보기 →
          </a>
        </div>
      </div>
    </section>
  );
}
