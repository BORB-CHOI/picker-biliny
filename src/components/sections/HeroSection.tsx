'use client';

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WordmarkLogoHorizon } from "@/components/ui/icons";
import { onHeaderReady, phase } from "@/lib/animationState";

gsap.registerPlugin(ScrollTrigger);

/** APPROACHING BILINY 이미지 시퀀스 (200프레임 WebP, 30fps) */
const FRAME_COUNT = 200;
const FRAME_PATH = "/videos/biliny/approaching-webp/frame-";
/** 자동재생 정지 프레임 (~4초 × 30fps = 133프레임) */
const AUTOPLAY_STOP_FRAME = 133;
/** 자동재생 fps */
const AUTOPLAY_FPS = 30;

function preloadFrames(): HTMLImageElement[] {
  const images: HTMLImageElement[] = [];

  // 핵심 프레임 먼저 로드 (첫 프레임, 자동재생 정지, 마지막 + 매 20프레임)
  const priorityIndices = new Set<number>();
  priorityIndices.add(0);
  priorityIndices.add(AUTOPLAY_STOP_FRAME - 1);
  priorityIndices.add(FRAME_COUNT - 1);
  for (let i = 0; i < FRAME_COUNT; i += 20) priorityIndices.add(i);

  // 전체 배열 초기화
  for (let i = 0; i < FRAME_COUNT; i++) {
    images.push(new Image());
  }

  // 우선 프레임 즉시 로드
  for (const idx of priorityIndices) {
    images[idx].src = `${FRAME_PATH}${String(idx + 1).padStart(3, "0")}.webp`;
  }

  // 나머지 프레임 rAF 배치 로드 (메인 스레드 블로킹 방지)
  let nextIdx = 0;
  function loadBatch() {
    let loaded = 0;
    while (nextIdx < FRAME_COUNT && loaded < 6) {
      if (!priorityIndices.has(nextIdx)) {
        images[nextIdx].src = `${FRAME_PATH}${String(nextIdx + 1).padStart(3, "0")}.webp`;
        loaded++;
      }
      nextIdx++;
    }
    if (nextIdx < FRAME_COUNT) requestAnimationFrame(loadBatch);
  }
  requestAnimationFrame(loadBatch);

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

      // canvas 크기를 화면에 맞춤 + 리사이즈 대응
      const dpr = devicePixelRatio || 1;
      let cw = 0;
      let ch = 0;

      function resizeCanvas() {
        // CSS 변수 --scale-factor 읽기 (useViewportScale 훅이 :root에 설정)
        const scaleFactor = parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'),
        ) || 1;

        if (scaleFactor < 1.0) {
          // scale-wrapper 내부: canvas 좌표계를 1440px 기준으로 보정
          // scale(factor) 적용 후 시각적으로 실제 뷰포트를 채우도록 역보정
          cw = 1440;
          ch = window.innerHeight / scaleFactor;
        } else {
          cw = window.innerWidth;
          ch = window.innerHeight;
        }

        canvas!.width = cw * dpr;
        canvas!.height = ch * dpr;
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
        // 리사이즈 후 현재 프레임 다시 그리기
        const prev = currentFrame;
        currentFrame = -1;
        drawFrame(prev >= 0 ? prev : 0);
      }
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      /** canvas에 해당 인덱스 프레임 그리기 (가로 기준 꽉 채움) */
      function drawFrame(index: number) {
        const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));
        if (clamped === currentFrame && currentFrame >= 0) return;
        currentFrame = clamped;
        const img = framesRef.current[clamped];
        if (!img || !img.complete) return;
        // 가로 기준 맞춤: 이미지 폭 = canvas 폭, 세로는 비율 유지 + 센터링
        const scale = cw / img.naturalWidth;
        const sh = img.naturalHeight * scale;
        const sy = (ch - sh) / 2;
        ctx!.clearRect(0, 0, cw, ch);
        ctx!.drawImage(img, 0, sy, cw, sh);
      }

      // ① 마운트 즉시 숨김
      gsap.set(inner, { y: 80, opacity: 0 });
      gsap.set(canvas, { opacity: 0 });

      // ② 헤더 완료 후 콘텐츠 + 자동재생 시작
      const animations: gsap.core.Animation[] = [];
      let heroScrollTrigger: ScrollTrigger | null = null;
      let autoplayTween: gsap.core.Tween | null = null;
      let heroRafId: number;
      const cleanup = onHeaderReady(() => {
        heroRafId = requestAnimationFrame(() => {
        // 콘텐츠 슬라이드업
        const contentIntro = gsap.to(inner, {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          onComplete: () => {
            // 스크롤 시 콘텐츠 fade-out (entry 완료 후 생성)
            const contentFade = gsap.to(inner, {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "15% top",
                scrub: 0.5,
              },
              y: -80,
              opacity: 0,
            });
            animations.push(contentFade);
          },
        });
        animations.push(contentIntro);

        // ③ canvas 자동재생 (0 → AUTOPLAY_STOP_FRAME, ~4초)
        drawFrame(0);
        const canvasFade = gsap.to(canvas, { opacity: 1, duration: 0.6, ease: "power2.out" });
        animations.push(canvasFade);

        let autoplayStopped = false;
        const tracker = { frame: 0 };

        autoplayTween = gsap.to(tracker, {
          frame: AUTOPLAY_STOP_FRAME,
          duration: AUTOPLAY_STOP_FRAME / AUTOPLAY_FPS,
          ease: "none",
          onUpdate: () => drawFrame(tracker.frame),
        });
        animations.push(autoplayTween);

        // ④ 스크롤 scrub — 전체 0→199 프레임을 스크롤로 제어
        //    자동재생 중 스크롤 시 → 자동재생 중단, 스크롤 위치를 현재 프레임에 동기화
        //    pin 상태라 스크롤 점프해도 화면은 안 움직임 → 이후 전 구간 자유 탐색
        let scrollJumping = false;

        let heroPhaseEmitted = false;
        const emitHeroPhase = () => {
          if (heroPhaseEmitted) return;
          heroPhaseEmitted = true;
          phase.hero.emit();
        };
        heroScrollTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=800",
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            if (scrollJumping) return;

            if (!autoplayStopped) {
              if (self.progress > 0.005) {
                autoplayStopped = true;
                autoplayTween?.kill();
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
          onLeave: () => {
            emitHeroPhase();
          },
        });
        }); // rAF 끝
      });

      return () => {
        cleanup();
        heroScrollTrigger?.kill();
        autoplayTween?.kill();
        animations.forEach((animation) => animation.kill());
        cancelAnimationFrame(heroRafId);
        window.removeEventListener("resize", resizeCanvas);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen flex flex-col justify-end bg-background pt-18"
    >
      {/* 배경 canvas — 이미지 시퀀스 스크롤 scrub */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full"
        style={{ opacity: 0 }}
      />

      <div
        ref={innerRef}
        className="hero-inner relative z-10 px-[clamp(40px,5.56cqw,80px)] pb-[clamp(48px,6.67cqw,96px)] w-full max-w-[95rem] mx-auto"
      >
        {/* PICKER PROJECT wordmark */}
        <div className="flex items-center gap-[0.56cqw] mb-[clamp(14px,1.94cqw,28px)] ml-1">
          <WordmarkLogoHorizon width={240} fill="#192746" className="w-[clamp(120px,16.67cqw,240px)] h-auto" />
        </div>

        {/* Main heading */}
        <h1 className="mb-[clamp(14px,1.94cqw,28px)]">
          <span className="block text-[clamp(24px,3.33cqw,48px)] font-bold tracking-[0.06em] text-(--color-hero-title) leading-tight whitespace-nowrap">
            중소도시의 이동권을
          </span>
          <span className="block text-[clamp(24px,3.33cqw,48px)] font-bold tracking-[0.06em] text-(--color-primary) leading-tight mt-1 whitespace-nowrap">
            다시 설계합니다.
          </span>
        </h1>

        {/* Horizontal decorative line */}
        <div className="h-px bg-[#D8D8D8] w-full max-w-[clamp(50px,9.03cqw,130px)] mb-[clamp(14px,1.94cqw,28px)]" />

        {/* Description */}
        <p className="text-[clamp(10px,1.25cqw,18px)] text-(--color-text-desc) leading-[1.85] max-w-[clamp(200px,31.94cqw,460px)] mb-[clamp(24px,3.33cqw,48px)] whitespace-nowrap">
          피커 프로젝트 &lsquo;빌리니(BILINY)&rsquo; 는 일상 속<br />
          <strong className="font-extrabold">
            이동의 비효율 사각지대를 해결
          </strong>
          하는
          <br />
          공유형 자율주행 모빌리티 솔루션입니다.
        </p>

        {/* CTA buttons */}
        <div className="flex gap-[clamp(7px,0.97cqw,14px)]">
          <a
            href="#story"
            className="inline-flex items-center whitespace-nowrap gap-[clamp(5px,0.69cqw,10px)] px-[clamp(12px,1.67cqw,24px)] py-[clamp(6px,0.83cqw,12px)] bg-[#4B4B4B] text-white text-[clamp(8px,0.97cqw,14px)] font-bold rounded-[clamp(6px,0.76cqw,11px)] shadow-[0_2px_6px_rgba(75,75,75,0.25)] hover:bg-[#3a3a3a] transition-colors"
          >
            <BarIndicator count={1} />
            빌리니 스토리 →
          </a>
          <a
            href="#biliny"
            className="inline-flex items-center whitespace-nowrap gap-[clamp(5px,0.69cqw,10px)] px-[clamp(12px,1.67cqw,24px)] py-[clamp(6px,0.83cqw,12px)] bg-[#2675FF] text-white text-[clamp(8px,0.97cqw,14px)] font-bold rounded-[clamp(6px,0.76cqw,11px)] shadow-[0_2px_6px_rgba(57,57,255,0.25)] hover:bg-[#1a5ee6] transition-colors"
          >
            <BarIndicator count={2} />
            빌리니 둘러보기 →
          </a>
        </div>
      </div>
    </section>
  );
}
