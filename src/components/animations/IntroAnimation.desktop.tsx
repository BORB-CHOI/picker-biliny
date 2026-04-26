"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { LeafTopLeft, LeafBottomRight, LogoName } from "@/components/ui/icons";
import { phase, lockScrollUntilHero, resetPhaseSequence } from "@/lib/animationState";
import { preloadVideoSources, preloadVideoSourcesWhenIdle } from "@/lib/videoPreload";

const FRAME = 56;
const LEAF = 48;
const LEAF_EDGE_PADDING = 10;

const PRELOAD_VIDEO_SOURCES = [
  "/videos/biliny/slide-down.mp4",
  "/videos/biliny/slide-up.mp4",
  "/videos/biliny/slide-up-human.mp4",
  "/videos/biliny/approaching-biliny-2.mp4",
  "/videos/biliny/turning.mp4",
  "/videos/triny/turning.mp4",
] as const;

/** 개발 중 인트로 스킵 — 프로덕션에서는 항상 false, 개발 중 ?intro=1 으로 강제 재생 */
const SKIP_INTRO =
  process.env.NODE_ENV === "development" &&
  typeof window !== "undefined" &&
  !new URLSearchParams(window.location.search).has("intro");

export function IntroAnimationDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  // 데스크톱 분기 시점에서 한 번만 결정 — useGSAP 안에서 setState 회피해 리렌더 1회 제거
  const logoWidth = 280;

  useGSAP(
    () => {
      resetPhaseSequence();

      // 스크롤 잠금 — 위치 계산 전에 실행해야 스크롤바 제거 후 정확한 viewport 크기 사용
      lockScrollUntilHero();

      if (SKIP_INTRO || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // 인트로 스킵 시에는 즉시 프리로드 시작 (애니메이션 경합 없음)
        preloadVideoSources(PRELOAD_VIDEO_SOURCES);
        phase.intro.emit();
        setHidden(true);
        return;
      }

      const ltEl = containerRef.current!.querySelector(".intro-leaf-lt") as HTMLElement;
      const rbEl = containerRef.current!.querySelector(".intro-leaf-rb") as HTMLElement;
      const ltRect = ltEl.getBoundingClientRect();
      const rbRect = rbEl.getBoundingClientRect();

      // viewport 폭/높이는 스크롤바 제외값 사용 — body overflow:hidden이지만
      // 측정 시점에 따라 스크롤바가 남을 수 있어 clientWidth가 더 안전
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;

      // Leaf: outer corner → screen corner - LEAF_EDGE_PADDING (모서리에 딱 닿지 않게)
      const ltMoveX = -ltRect.left + LEAF_EDGE_PADDING;
      const ltMoveY = -ltRect.top + LEAF_EDGE_PADDING;
      const rbMoveX = vw - rbRect.right - LEAF_EDGE_PADDING;
      const rbMoveY = vh - rbRect.bottom - LEAF_EDGE_PADDING;

      // Text: viewport 중앙 기준 점대칭으로 이동 (FIND ↔ SPOT 좌우 대칭 보장)
      // leaf 종료점의 viewport 중앙 기준 거리 평균을 사용해 좌우/상하 대칭 강제
      // 데스크톱 전용 — 분기는 IntroAnimation.tsx에서 이미 처리됨
      const TEXT_LEAF_GAP = 240;
      // 추가 수직 오프셋 — FIND는 더 위로, SPOT은 더 아래로 (대각선 묶임 해제)
      const TEXT_VERTICAL_OFFSET = 0;
      // leaf 종료점 = (leaf 시작 left + ltMoveX, leaf 시작 top + ltMoveY) ...
      // 하지만 leaf 시작점이 frame 안에서 비대칭이라 직접 좌표를 viewport 중앙 기준으로 변환
      const ltEndX = ltRect.left + ltMoveX; // viewport 좌표
      const ltEndY = ltRect.top + ltMoveY;
      const rbEndX = rbRect.right + rbMoveX;
      const rbEndY = rbRect.bottom + rbMoveY;
      const cx = vw / 2;
      const cy = vh / 2;
      // 중앙으로부터의 거리 — 좌우/상하 평균을 써서 대칭 강제
      const distX = (cx - ltEndX + (rbEndX - cx)) / 2;
      const distY = (cy - ltEndY + (rbEndY - cy)) / 2;
      // gap만큼 중앙 쪽으로 후퇴 (대각선 단위벡터) + 수직 추가 오프셋
      const diag = Math.hypot(distX, distY) || 1;
      const findMoveX = -distX + (distX / diag) * TEXT_LEAF_GAP;
      const findMoveY = -distY + (distY / diag) * TEXT_LEAF_GAP - TEXT_VERTICAL_OFFSET;
      const spotMoveX = distX - (distX / diag) * TEXT_LEAF_GAP;
      const spotMoveY = distY - (distY / diag) * TEXT_LEAF_GAP + TEXT_VERTICAL_OFFSET;

      const leafElements = [".intro-leaf-lt", ".intro-leaf-rb"];
      const textElements = [".intro-find", ".intro-blind", ".intro-spot"];
      const allElements = [...leafElements, ...textElements];

      // Start invisible + GPU layer 미리 승격 (첫 트윈 시 layer 생성 비용 회피)
      // willChange는 GSAP가 자동 관리하지만 force3D + 명시적 transform 0으로
      // composite layer를 첫 paint 전에 만들어둔다.
      gsap.set(allElements, {
        opacity: 0,
        x: 0,
        y: 0,
        force3D: true,
        willChange: "transform, opacity",
      });
      // 로고도 미리 GPU layer 승격
      gsap.set(".intro-logo-name", { force3D: true, willChange: "opacity" });

      // 첫 paint와 timeline 시작 사이 짧은 delay — React 마운트 직후의
      // layer 생성/스타일 적용 비용을 흡수한 뒤 트윈 시작 (50ms ≈ 3프레임)
      const tl = gsap.timeline({
        delay: 0.05,
        onComplete: () => {
          phase.intro.emit();
          setHidden(true);
        },
      });

      tl
        // 1. Leaves fade in at center (texts still hidden)
        .to(leafElements, {
          opacity: 1,
          duration: 0.6,
          ease: "power1.in",
        })
        .to({}, { duration: 0.3 })

        // 2. Spread outward — 빠르게 시작 후 천천히 멎음 (ease-out)
        .to(".intro-leaf-lt", {
          x: ltMoveX,
          y: ltMoveY,
          duration: 2,
          ease: "power3.out",
        })
        .to(".intro-leaf-rb", { x: rbMoveX, y: rbMoveY, duration: 2, ease: "power3.out" }, "<")
        // Texts appear as leaves start moving, spreading along the diagonal
        .fromTo(
          ".intro-find",
          { opacity: 0, x: 0, y: 0 },
          { opacity: 1, x: findMoveX, y: findMoveY, duration: 2, ease: "power3.out" },
          "<",
        )
        .fromTo(
          ".intro-blind",
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: "power2.out" },
          "<",
        )
        .fromTo(
          ".intro-spot",
          { opacity: 0, x: 0, y: 0 },
          { opacity: 1, x: spotMoveX, y: spotMoveY, duration: 2, ease: "power3.out" },
          "<",
        )

        // Hold at spread
        .to({}, { duration: 0.25 })

        // 3. Collapse back — 아주 빠르게 중앙으로 수축
        .to(".intro-leaf-lt", { x: 0, y: 0, duration: 0.3, ease: "power3.in" })
        .to(".intro-leaf-rb", { x: 0, y: 0, duration: 0.3, ease: "power3.in" }, "<")
        .to(".intro-find", { x: 0, y: 0, opacity: 0, duration: 0.3, ease: "power3.in" }, "<")
        .to(".intro-blind", { opacity: 0, duration: 0.3, ease: "power3.in" }, "<")
        .to(".intro-spot", { x: 0, y: 0, opacity: 0, duration: 0.3, ease: "power3.in" }, "<")
        .to({}, { duration: 0.5 })

        // 4. Logo name dissolves in (leaves still visible at center)
        .fromTo(
          ".intro-logo-name",
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        // 로고 표시 hold 구간에서 idle 콜백으로 비디오 프리로드 시작
        // — 이 시점은 시각적으로 정적이라 네트워크/메인 스레드 경합이 보이지 않음
        .call(() => {
          preloadVideoSourcesWhenIdle(PRELOAD_VIDEO_SOURCES);
        })
        .to({}, { duration: 1.0 })

        // 5. Final dissolve — leaves + logo fade out together
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        });
    },
    { scope: containerRef },
  );

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 bg-white flex items-center justify-center overflow-hidden"
    >
      {/* FIND — starts at center, spreads to upper-left */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="intro-find text-[#0060EF] text-xl md:text-3xl font-black tracking-tight"
          style={{ opacity: 0 }}
        >
          FIND
        </span>
      </div>

      {/* BLIND — stays at center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="intro-blind text-[#444] text-xl md:text-3xl font-black tracking-tight"
          style={{ opacity: 0 }}
        >
          BLIND
        </span>
      </div>

      {/* SPOT — starts at center, spreads to lower-right */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="intro-spot text-[#444] text-xl md:text-3xl font-black tracking-tight"
          style={{ opacity: 0 }}
        >
          SPOT
        </span>
      </div>

      {/* Leaves + logo */}
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: FRAME, height: FRAME }}>
          <div className="intro-leaf-lt absolute top-0 left-0" style={{ opacity: 0 }}>
            <LeafTopLeft size={LEAF} />
          </div>
          <div className="intro-leaf-rb absolute bottom-0 right-0" style={{ opacity: 0 }}>
            <LeafBottomRight size={LEAF} />
          </div>
        </div>

        <div className="intro-logo-name opacity-0 mt-4">
          <LogoName width={logoWidth} />
        </div>
      </div>
    </div>
  );
}
