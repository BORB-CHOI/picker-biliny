'use client';

/**
 * IsolationSection — 결론: 고립/우울 (Figma node: 4062:2, 하단부)
 *
 * ┌─────────────────────────────────────────────────┐
 * │  "결국, 두다리가 얼어붙으신 어르신"  (볼드 9px)  │
 * │                                                  │
 * │  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
 * │  │전동스쿠터│ │   버스   │ │   택시   │         │
 * │  │ "불안해" │ │ "힘들어" │ │"부담스러워"│        │
 * │  └──────────┘ └──────────┘ └──────────┘         │
 * │                                                  │
 * │  [고개 숙인 할머니 이미지]                       │
 * │  "집에 있을래."                                  │
 * │                                                  │
 * │  "고립  우울 가속화"                             │
 * │  [1.5배]  (큰 숫자)                             │
 * └─────────────────────────────────────────────────┘
 *
 * 에셋:
 * - /images/conclusion/conclusion-1.png, -2.png, -3.png
 *
 * TODO:
 * [ ] 3가지 대안 요약 카드 (불안해, 힘들어, 부담스러워)
 * [ ] 할머니 이미지 + "집에 있을래" 텍스트
 * [ ] "고립 우울 가속화 1.5배" 데이터 포인트
 * [ ] GSAP ScrollTrigger — 카드 stagger 등장 + 숫자 카운트업
 * [ ] 다음 섹션(해결책)으로의 자연스러운 전환
 */

import { useRef } from 'react';

export function IsolationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      {/* TODO: 구현 */}
    </section>
  );
}
