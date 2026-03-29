'use client';

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WordmarkLogoHorizon } from "@/components/ui/icons";
import { phase } from "@/lib/animationState";

gsap.registerPlugin(ScrollTrigger);

/** APPROACHING BILINY 통합 이미지 시퀀스 (200프레임, 30fps) */
const FRAME_COUNT = 200;
const FRAME_PATH = "/videos/biliny/approaching-frames/frame-";
/** 자동재생 정지 프레임 (~4초 × 30fps = 120프레임) */
const AUTOPLAY_STOP_FRAME = 130;
/** 자동재생 fps */
const AUTOPLAY_FPS = 30;

function preloadFrames(): HTMLImageElement[] {
  const images: HTMLImageElement[] = [];
  for (let i = 1; i <= FRAME_COUNT; i++) {
    const img = new Image();
    img.src = `${FRAME_PATH}${String(i).padStart(3, "0")}.jpg`;
    images.push(img);
  }
  return images;
}

/** Vertical bar indicator matching the nav pattern */
function BarIndicator({ count, className }: { count: number; className?: string }) {
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);

  // 이미지 시퀀스 프리로드 (마운트 시 1회)
  useEffect(() => {
    framesRef.current = preloadFrames();
  }, []);

  useGSAP(
    () => {
      const inner = innerRef.current;
      const canvas = canvasRef.current;
      if (!inner || !canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 현재 프레임 인덱스 (자동재생 + 스크롤 공유)
      let currentFrame = 0;

      // canvas 크기를 화면에 맞춤 (1회)
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      /** canvas에 해당 인덱스 프레임 그리기 (cover 방식) */
      function drawFrame(index: number) {
        const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));
        if (clamped === currentFrame && currentFrame >= 0) return;
        currentFrame = clamped;
        const img = framesRef.current[clamped];
        if (!img || !img.complete) return;
        // object-cover 계산: 이미지를 canvas에 꽉 채우되 비율 유지
        const cw = rect.width;
        const ch = rect.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const scale = Math.max(cw / iw, ch / ih);
        const sw = iw * scale;
        const sh = ih * scale;
        const sx = (cw - sw) / 2;
        const sy = (ch - sh) / 2;
        ctx!.drawImage(img, sx, sy, sw, sh);
      }

      // ① 마운트 즉시 숨김
      gsap.set(inner, { y: 80, opacity: 0 });
      gsap.set(canvas, { opacity: 0 });

      // ② 헤더 완료 후 콘텐츠 + 자동재생 시작
      const cleanup = phase.header.on(() => {
        // 콘텐츠 슬라이드업
        gsap.to(inner, {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          onComplete: () => {
            // 스크롤 시 콘텐츠 fade-out (entry 완료 후 생성)
            gsap.to(inner, {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "15% top",
                scrub: 0.5,
              },
              y: -80,
              opacity: 0,
            });
          },
        });

        // ③ canvas 자동재생 (0 → AUTOPLAY_STOP_FRAME, ~4초)
        drawFrame(0);
        gsap.to(canvas, { opacity: 1, duration: 0.6, ease: "power2.out" });

        let autoplayStopped = false;
        const tracker = { frame: 0 };

        const autoplayTween = gsap.to(tracker, {
          frame: AUTOPLAY_STOP_FRAME,
          duration: AUTOPLAY_STOP_FRAME / AUTOPLAY_FPS,
          ease: "none",
          onUpdate: () => drawFrame(tracker.frame),
        });

        // ④ 스크롤 scrub — 전체 0→199 프레임을 스크롤로 제어
        //    자동재생 중 스크롤 시 → 자동재생 중단, 스크롤 위치를 현재 프레임에 동기화
        //    pin 상태라 스크롤 점프해도 화면은 안 움직임 → 이후 전 구간 자유 탐색
        let scrollJumping = false;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            if (scrollJumping) return;

            if (!autoplayStopped) {
              if (self.progress > 0.005) {
                autoplayStopped = true;
                autoplayTween.kill();
                // CSS scroll-behavior: smooth를 무시하고 즉시 점프
                scrollJumping = true;
                const targetPos =
                  self.start + (currentFrame / (FRAME_COUNT - 1)) * (self.end - self.start);
                window.scrollTo({ top: targetPos, behavior: "instant" });
                drawFrame(currentFrame);
                requestAnimationFrame(() => {
                  scrollJumping = false;
                });
              }
              return;
            }
            drawFrame(self.progress * (FRAME_COUNT - 1));
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
      className="relative w-full h-screen flex flex-col justify-end bg-background pt-16 md:pt-18"
    >
      {/* 배경 canvas — 이미지 시퀀스 스크롤 scrub */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full object-cover"
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
