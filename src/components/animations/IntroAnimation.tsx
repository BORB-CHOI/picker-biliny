'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

// Figma: 34x34 frame, each leaf 29x29.
// Leaves at top-left and bottom-right of frame → ~5px gap in between.
// Display at 2x: frame=68, leaf=58.
const FRAME = 68;
const LEAF = 58;

export function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHidden(true);
      return;
    }

    // Each leaf moves from its position in the frame to the matching screen corner.
    // Left-top leaf: its top-left corner must reach screen (0,0).
    // It starts at center, offset by half-frame to the left/top already via CSS,
    // so it needs to travel: (viewport/2 - half_frame) more.
    const moveX = window.innerWidth / 2 - LEAF / 2;
    const moveY = window.innerHeight / 2 - LEAF / 2;

    const tl = gsap.timeline({
      onComplete: () => setHidden(true),
    });

    // Initial: leaves form the icon at center
    tl.to({}, { duration: 0.6 })                                   // L35: 초기 대기
    // Leaves shoot outward
    .to('.intro-leaf-lt', {                                         // L37
      x: -moveX, y: -moveY,
      duration: 1.2,                                                // L39: 나가는 속도
      ease: 'power3.out',                                           // L40: 나가는 이징
    })
    .to('.intro-leaf-rb', {                                         // L42
      x: moveX, y: moveY,
      duration: 1.2,                                                // L44
      ease: 'power3.out',                                           // L45
    }, '<')
    // Hold at corners
    .to({}, { duration: 0.25 })                                     // L48: 모서리 대기
    // Leaves rush back
    .to('.intro-leaf-lt', {                                         // L50
      x: 0, y: 0,
      duration: 1.0,                                                // L52: 돌아오는 속도
      ease: 'power3.out',                                           // L53: 돌아오는 이징
    })
    .to('.intro-leaf-rb', {                                         // L55
      x: 0, y: 0,
      duration: 1.0,                                                // L57
      ease: 'power3.out',                                           // L58
    }, '<')
    // Logo name dissolves in
    .fromTo('.intro-logo-name', { opacity: 0 }, {                   // L61
      opacity: 1,
      duration: 0.6,                                                // L63: 로고 디졸브 속도
      ease: 'power2.out',
    }, '-=0.3')
    // Hold
    .to({}, { duration: 0.7 })                                      // L67: 로고 대기
    // Dissolve to main
    .to(containerRef.current, {                                     // L69
      opacity: 0,
      duration: 0.6,                                                // L71: 최종 디졸브 속도
      ease: 'power2.inOut',
    });
  }, { scope: containerRef });

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center">
        {/* 68x68 frame with two 58x58 leaves */}
        <div className="relative" style={{ width: FRAME, height: FRAME }}>
          {/* Left-top leaf — pinned to top-left of frame */}
          <div className="intro-leaf-lt absolute top-0 left-0">
            <Image
              src="/images/logo-left-top.svg"
              alt=""
              width={LEAF}
              height={LEAF}
              priority
            />
          </div>
          {/* Right-bottom leaf — pinned to bottom-right of frame */}
          <div className="intro-leaf-rb absolute bottom-0 right-0">
            <Image
              src="/images/logo-right-bottom.svg"
              alt=""
              width={LEAF}
              height={LEAF}
              priority
            />
          </div>
        </div>

        {/* PICKER PROJECT text logo */}
        <div className="intro-logo-name opacity-0 mt-4">
          <Image
            src="/images/logo-name.svg"
            alt="PICKER PROJECT"
            width={160}
            height={16}
            priority
          />
        </div>
      </div>
    </div>
  );
}
