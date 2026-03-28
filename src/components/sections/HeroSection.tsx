'use client';

/**
 * HeroSection — 메인 온보딩 (Figma node: 4062:9)
 *
 * ┌─────────────────────────────────────────────────┐
 * │  배경: 빌리니 영상 (approaching-1.mp4 등)       │
 * │  ← 슈웅하고 들어오는 애니메이션                  │
 * │                                                  │
 * │  PICKER PROJECT 로고                             │
 * │  "중소도시의 이동권을"  (11px, #192746)          │
 * │  "다시 설계합니다."     (12px, #0060EF, 파란색)  │
 * │                                                  │
 * │  설명 텍스트:                                    │
 * │  피커 프로젝트 '빌리니(BILINY)'는 일상 속        │
 * │  이동의 비효율 사각지대를 해결하는                │
 * │  공유형 자율주행 모빌리티 솔루션입니다.           │
 * │                                                  │
 * │  [빌리니 스토리 →]  [빌리니 둘러보기 →]          │
 * │   (다크 버튼)       (파란 버튼 #2675FF)          │
 * │                                                  │
 * │  → 스크롤하면 화면 밖으로 사라짐                 │
 * └─────────────────────────────────────────────────┘
 *
 * 애니메이션 노트 (Figma 빨간 텍스트):
 * - "슈웅하고 들어옴" — 빌리니 제품이 오른쪽에서 슬라이드인
 * - "화면 밖으로 사라짐" — 스크롤 시 위로 사라지는 효과
 *
 * 에셋:
 * - /videos/biliny/approaching-1.mp4 (배경 영상)
 * - /videos/biliny/approaching-2.mp4 (배경 영상 대체)
 * - /images/common/logos/ (PICKER PROJECT 로고)
 *
 * TODO:
 * [ ] 배경 비디오 <video> 태그 + autoPlay muted loop
 * [ ] 히어로 타이포그래피 (중소도시의 이동권을 / 다시 설계합니다.)
 * [ ] 설명 텍스트 (이동의 비효율 사각지대를 해결)
 * [ ] CTA 버튼 2개 (빌리니 스토리, 빌리니 둘러보기)
 * [ ] GSAP ScrollTrigger — 스크롤 시 전체 섹션 fade-out + translateY
 * [ ] 빌리니 제품 이미지/영상 슈웅 슬라이드인 애니메이션
 * [ ] 반응형 (모바일: 텍스트 중심, 데스크톱: 좌우 분할)
 */

import { useRef } from 'react';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center"
    >
      {/* TODO: 구현 */}
    </section>
  );
}
