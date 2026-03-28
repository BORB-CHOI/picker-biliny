'use client';

/**
 * StorySection — 고령자 이동권 박탈 스토리 (Figma node: 4062:2, 상단부)
 *
 * 매우 긴 스크롤 섹션. 크게 3파트로 나뉨:
 *
 * ═══ Part 1: 과거-현재 비교 타임라인 ═══
 * ┌─────────────────────────────────────────────────┐
 * │  "인구감소"                                      │
 * │  "중소도시,"                                     │
 * │  "박탈된 고령자의 이동권"  (볼드)                │
 * │                                                  │
 * │  "빼앗긴 두 다리"  (Black 볼드, 11px)           │
 * │                                                  │
 * │  ── 1970 ──                                     │
 * │  [할아버지 운전 사진]   ← 디졸브로 오른쪽에서    │
 * │  "젊은시절, 차량으로 어디든 돌아다니시던 할아버지"│
 * │                                                  │
 * │  ── 2026 ──                                     │
 * │  [벤치에 앉은 할아버지] ← 디졸브로 오른쪽에서    │
 * │  "이젠 할아버지의 두다리는 밴치에 묶였습니다."   │
 * │                                                  │
 * │  ── 1970 ──                                     │
 * │  [할머니 걷는 사진]                              │
 * │  "어디든지 힘차게 다닐 수 있던 두다리는"         │
 * │                                                  │
 * │  ── 2026 ──                                     │
 * │  [보행보조기 할머니]                             │
 * │  "이젠 보조바퀴가 없으면 쉽게 다니기 어렵습니다."│
 * └─────────────────────────────────────────────────┘
 *
 * 애니메이션 노트:
 * - "애니메이션" (빨간 텍스트) — 1970↔2026 전환 시 디졸브 효과
 * - "디졸브로 들어옴 오른쪽에서" — 이미지가 fade-in + 오른쪽 슬라이드
 * - 스크롤에 따라 순서대로 등장
 *
 * 에셋:
 * - /images/story/story-1970-1.png (할아버지 운전)
 * - /images/story/story-1970-2.png (할머니 걷는 모습)
 * - /images/story/story-elderly-seated-1.png, -2.png (벤치 할아버지)
 * - /images/story/story-elderly-walker-1.png, -2.png (보행보조기 할머니)
 * - /images/story/story-old-photo.png
 *
 * TODO:
 * [ ] 타임라인 레이아웃 (1970 ← → 2026, 중앙 라인)
 * [ ] 각 타임라인 항목의 이미지 + 텍스트
 * [ ] GSAP ScrollTrigger — 디졸브 + 오른쪽 슬라이드인 등장
 * [ ] "빼앗긴 두 다리" 헤딩 등장 애니메이션
 * [ ] 반응형 (모바일: 세로 스택, 데스크톱: 좌우 교차)
 */

import { useRef } from 'react';

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative py-24 md:py-32"
    >
      {/* TODO: 구현 */}
    </section>
  );
}
