'use client';

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WordmarkLogoHorizon } from "@/components/ui/icons";
import { phase } from "@/lib/animationState";

gsap.registerPlugin(ScrollTrigger);

/** approaching-2 이미지 시퀀스 (67프레임) */
const FRAME_COUNT = 67;
const FRAME_PATH = "/videos/biliny/approaching-2-frames/frame-";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);

  // 이미지 시퀀스 프리로드 (마운트 시 1회)
  useEffect(() => {
    framesRef.current = preloadFrames();
  }, []);

  useGSAP(
    () => {
      const inner = innerRef.current;
      const video1 = video1Ref.current;
      const canvas = canvasRef.current;
      if (!inner || !video1 || !canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      /** canvas에 해당 인덱스 프레임 그리기 */
      function drawFrame(index: number) {
        const img = framesRef.current[index];
        if (!img || !img.complete) return;
        canvas!.width = img.naturalWidth;
        canvas!.height = img.naturalHeight;
        ctx!.drawImage(img, 0, 0);
      }

      // ① 마운트 즉시 숨김
      gsap.set(inner, { y: 80, opacity: 0 });
      gsap.set(video1, { opacity: 0 });
      gsap.set(canvas, { opacity: 0 });

      // ② 헤더 완료 후 콘텐츠 슬라이드업 + 영상 동시 시작
      const cleanup = phase.header.on(() => {
        // ③ 콘텐츠와 동시에 approaching-1 재생
        gsap.to(video1, { opacity: 1, duration: 0.8, ease: "power2.out" });
        video1.play();

        gsap.to(inner, {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          onComplete: () => {
            // ④ 스크롤 시 콘텐츠 fade-out (짧은 구간에 빠르게)
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

        // ⑤ canvas 이미지 시퀀스 스크롤 scrub — 즉시 설정
        //    video1 끝나기 전에 스크롤해도 canvas로 전환됨
        drawFrame(0);
        let switched = false;
        const switchToCanvas = () => {
          if (switched) return;
          switched = true;
          video1.pause();
          gsap.set(canvas, { opacity: 1 });
          gsap.set(video1, { opacity: 0 });
        };

        // video1 자연 종료 시에도 전환
        video1.addEventListener("ended", switchToCanvas, { once: true });

        const tracker = { frame: 0 };
        gsap.to(tracker, {
          frame: FRAME_COUNT - 1,
          snap: "frame",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1000",
            pin: true,
            pinSpacing: true,
            scrub: 0.3,
            onUpdate: (self) => {
              if (self.progress > 0.01) switchToCanvas();
            },
          },
          onUpdate: () => drawFrame(Math.round(tracker.frame)),
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
      {/* 배경 영상 — 가로 꽉 차게, 컨트롤 없음 */}
      <video
        ref={video1Ref}
        className="absolute inset-0 z-0 w-full h-full object-cover"
        src="/videos/biliny/approaching-1.mp4"
        muted
        playsInline
        preload="auto"
        style={{ opacity: 0 }}
      />
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
