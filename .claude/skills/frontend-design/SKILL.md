---
name: frontend-design
description: Create distinctive, production-grade frontend for the BILINY product page. Use when building web components, sections, pages, or styling any UI element. Triggers on "디자인 구현", "섹션 만들어", "UI 작업", "스타일링", "컴포넌트 만들어", "개발해줘", "만들어줘", "구현해줘", "~해줘" when related to visual/UI work. Always use Explore subagent to check existing code before building, and scroll-animation skill for any motion work.
---

BILINY 제품 소개 페이지를 위한 프론트엔드 디자인 스킬입니다. Apple 사이트 수준의 정교함과 몰입감을 목표로 합니다.

## 워크플로우

사용자가 "~만들어줘", "~구현해줘", "~개발해줘" 요청 시 반드시 다음 순서를 따릅니다:

### Step 1: 맥락 파악 (서브에이전트 활용)
- **Explore 에이전트**: 기존 코드에서 관련 컴포넌트/스타일이 있는지 탐색
- **Figma MCP**: 해당 섹션의 디자인 데이터 가져오기 (`figma-to-code` 스킬 참조)

### Step 2: 설계
- 어떤 컴포넌트를 만들어야 하는지 정리
- 서버/클라이언트 컴포넌트 분리 결정
- 애니메이션 방식 결정 → `scroll-animation` 스킬 참조

### Step 3: 구현
- Tailwind CSS + CSS 변수로 스타일링
- GSAP ScrollTrigger로 스크롤 애니메이션
- 반응형 (모바일 380px → 데스크톱 1440px)

### Step 4: 검증
- `npm run build` 로 빌드 확인
- `npx tsc --noEmit` 로 타입 체크

## Design Thinking

코딩 전에 반드시 맥락을 파악하고 미적 방향을 결정합니다:

- **Purpose**: 중소도시 고령자 이동권 문제를 제기하고, BILINY 솔루션의 가치를 전달하는 제품 소개 페이지
- **Tone**: 신뢰감 있는 테크 + 따뜻한 사회적 가치. 차갑지 않으면서도 전문적인 인상
- **Audience**: 지자체 관계자, 투자자, 파트너사 — 데이터와 감성을 모두 중시하는 의사결정자
- **Differentiation**: 스크롤 자체가 스토리텔링. 문제 → 대안의 한계 → 솔루션 → 비용 효과 → 제품 상세까지 하나의 흐름으로 설득

## Aesthetic Guidelines

### Typography
- 한글: Pretendard (웹폰트, woff2 subset)
- 영문/숫자: 디자인에 맞는 개성 있는 디스플레이 폰트
- 제목은 과감하게 크게, 본문은 가독성 최우선
- letter-spacing은 한글 특성에 맞게 약간 넓게 (0.02em ~ 0.05em)

### Color
- CSS 변수로 일관 관리 (CLAUDE.md의 Design System 참조)
- 다크 섹션(#2C2C2C)과 라이트 섹션의 대비를 극적으로
- CTA 오렌지(#F77F4C)는 절제해서 사용 — 핵심 액션에만
- 블루 액센트(#0060EF)는 데이터 강조에 사용

### Layout
- 모바일 퍼스트이되, 데스크톱에서 비대칭/그리드 브레이킹 레이아웃 활용
- 섹션 간 넉넉한 여백 (모바일 80px+, 데스크톱 120px+)
- Glassmorphism 카드: backdrop-blur, 반투명 테두리, 미묘한 그라데이션

### Motion
- 스크롤 연동 애니메이션이 핵심 — GSAP ScrollTrigger 사용
- 등장 애니메이션: fade + translate (과하지 않게)
- pin 효과로 섹션 고정 후 콘텐츠 전환 (Hero, Solution 섹션)
- stagger로 리스트 아이템 순차 등장
- hover: scale(1.02) + shadow 변화 (카드류)

## 절대 하지 않을 것

- Inter, Roboto, Arial, system-ui 등 기본 폰트 사용
- 보라색 그라데이션 on 흰색 배경 (AI slop)
- 모든 섹션 동일한 레이아웃 반복
- 애니메이션 없는 밋밋한 정적 배치
- Space Grotesk 같은 과다 사용 폰트

## Implementation Pattern

```tsx
// 섹션 컴포넌트 기본 패턴
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SectionName() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 스크롤 애니메이션 로직
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative ...">
      {/* 섹션 콘텐츠 */}
    </section>
  );
}
```
