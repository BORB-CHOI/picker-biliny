'use client';

/**
 * TrinyProductSection — 트리니 제품 소개
 *
 * 주의: Figma 디자인에서 트리니 전용 프레임이 별도로 확인되지 않았음.
 * 내비게이션에 TRINY 항목이 있으므로 별도 섹션 필요.
 * 빌리니 제품 섹션과 유사한 구조가 예상됨.
 *
 * 예상 구성:
 * ┌─────────────────────────────────────────────────┐
 * │  트리니(TRINY) 제품 소개                        │
 * │                                                  │
 * │  [TURNING TRINY 영상]                           │
 * │   → 영상 타이밍에 따라 요소들이 등장             │
 * │   → 세밀한 타이밍 조정 필요                     │
 * │                                                  │
 * │  제품 스펙/특징 소개                             │
 * └─────────────────────────────────────────────────┘
 *
 * 에셋:
 * - /videos/triny/turning.mp4 (트리니 회전 영상)
 *
 * TODO:
 * [ ] Figma에서 트리니 전용 디자인 프레임 확인 필요
 * [ ] 영상 기반 제품 소개 (TURNING TRINY.mp4)
 * [ ] 영상 타이밍 동기화 — ScrollTrigger + currentTime
 * [ ] 영상 위에 떠야 하는 문구들의 타이밍 매핑
 * [ ] 빌리니 섹션과 시각적 일관성 유지
 * [ ] 반응형 레이아웃
 */

import { useRef } from 'react';

export function TrinyProductSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="triny"
      className="relative py-24 md:py-32"
    >
      {/* TODO: 구현 — 트리니 디자인 확정 후 */}
    </section>
  );
}
