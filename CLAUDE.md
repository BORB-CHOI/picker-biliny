# BILINY - Company Product Introduction Page

BILINY(빌리니)는 중소도시 고령자를 위한 공유형 퍼스널 모빌리티 서비스의 제품 소개 정적 웹사이트입니다.
Apple 수준의 스크롤 애니메이션과 정교한 인터랙션을 구현해야 합니다.

## Tech Stack

- **Framework**: Next.js 16 (App Router, `src/` directory)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP + @gsap/react (스크롤 트리거 애니메이션), Framer Motion (UI 전환/마이크로인터랙션)
- **Deployment**: Vercel (도메인: ai.kr, 가비아 DNS)
- **Font**: Inter (전체 고정)

## Commands

- `npm run dev` — 개발 서버 (localhost:3000)
- `npm run build` — 프로덕션 빌드
- `npm run lint` — ESLint 실행
- `npx tsc --noEmit` — 타입 체크

## Architecture

```
src/
  app/
    layout.tsx        # 루트 레이아웃 (폰트, 메타데이터)
    page.tsx          # 메인 랜딩 페이지 (섹션 조합)
    globals.css       # 글로벌 스타일, CSS 변수
  components/
    sections/         # 페이지 섹션 컴포넌트 (Hero, Problem, Solution 등)
    ui/               # 재사용 UI 컴포넌트 (Button, Card 등)
    animations/       # 스크롤 애니메이션 래퍼 컴포넌트
  hooks/              # 커스텀 React 훅 (useScrollProgress 등)
  lib/                # 유틸리티 함수
  types/              # TypeScript 타입 정의
public/
  images/             # 제품 이미지, 일러스트레이션
  fonts/              # 웹 폰트 파일
```

## Code Conventions

- 컴포넌트 파일명: PascalCase (예: HeroSection.tsx)
- 훅 파일명: camelCase (예: useScrollProgress.ts)
- CSS 변수 사용: `--color-*`, `--font-*`, `--space-*`
- 모든 컴포넌트는 named export 사용
- 'use client' 지시어는 애니메이션/인터랙션이 필요한 컴포넌트에만
- 이미지는 next/image 사용, public/images/에 저장
- 한국어 텍스트는 컴포넌트 내에 직접 작성 (i18n 불필요)

## Design System

Figma 디자인 참조: `4ofzLPWgHAFGKebRvk9cau`
- 전체 페이지: node `2606:7` (홈페이지 목업 324, ~14,799px)
- 제품 중심: node `2658:29` (홈페이지 목업 326, ~10,471px)

### Colors (CSS 변수로 정의)
- `--color-primary`: #0060EF (블루 CTA/강조)
- `--color-accent`: #2675FF (블루 강조 밝은)
- `--color-dark`: #2C2C2C (다크 섹션 배경)
- `--color-text`: #202020 (본문)
- `--color-text-secondary`: #656565 (설명 텍스트)
- `--color-text-tertiary`: #313131 (부제목)
- `--color-bg`: #FFFFFF (배경)

### Animation Principles
- GSAP ScrollTrigger를 모든 스크롤 연동 애니메이션에 사용
- Framer Motion은 hover, tap, 컴포넌트 전환에만 사용
- 60fps 유지 필수 — transform, opacity만 애니메이션
- will-change 남용 금지 (GSAP이 자동 관리)
- 모바일에서는 복잡한 애니메이션 간소화 (prefers-reduced-motion 존중)

## Page Sections (순서)

1. Header — 네비게이션 (STORY, BILINY, TRINY, CONTACT) + 로고
2. Hero — "중소도시의 이동권을 다시 설계합니다" + CTA 버튼 2개
3. Story — 고령자 이동권 박탈 스토리 (1970→2026 타임라인)
4. Alternatives — "불편한 대안들" (전동스쿠터, 버스, 택시) + 데이터
5. Isolation — "두다리가 얼어붙으신 어르신" → 고립/우울 결론
6. Solution — BILINY 3가지 핵심 가치 (빌려타기, 안내길, 공평한 모빌리티)
7. CareWatch — "돌봄이" 전 과정 모니터링
8. SocialCost — 사회적 비용 (다크 배경, 310억 데이터)
9. Budget — 예산 10% + 솔루션 카드 3종 (Glassmorphism)
10. Revenue — 시티 케어 솔루션 수익 모델
11. Product — Design 라인업, 스펙 (140km, 300만원)
12. Mobility — 앉아서 13km/h, 서서 25km/h, 안전한 길
13. Explore — "빌리니 둘러보기 360°"
14. Dimensions — 엘리베이터에 들어가는 사이즈 + 도면
15. Charging — 가로등 옆 무선 충전 시스템
16. Contact — 이메일 + 한국 전화번호 문의
17. Footer — 이용약관, 개인정보처리방침, (c) 2026 Picker Project

## Workflow: 사용자 요청 → 스킬/서브에이전트 매핑

사용자가 "~해줘", "~만들어줘", "~구현해줘", "~개발해줘" 요청 시:

1. **Explore 서브에이전트** — 기존 코드에서 관련 컴포넌트 탐색 (중복 방지)
2. **figma-to-code 스킬** — Figma 디자인 데이터 참조 (해당 섹션의 노드)
3. **frontend-design 스킬** — 미적 방향, 컬러, 타이포그래피 가이드
4. **scroll-animation 스킬** — GSAP ScrollTrigger 패턴 적용
5. **contact-form 스킬** — Contact 섹션 관련 요청 시

요청 키워드별 우선 스킬:
- "스크롤", "애니메이션", "pin", "등장" → `scroll-animation`
- "피그마", "디자인", "시안", "목업" → `figma-to-code`
- "연락", "문의", "폼", "이메일", "전화" → `contact-form`
- "섹션", "컴포넌트", "페이지", "UI" → `frontend-design`

## Mobile / Desktop 분기 (확정)

- **분기점 640px** — `< 640` 모바일, `>= 640` 데스크톱. 태블릿 분기 없음.
- **모바일 디자인 기준 393px (iPhone 17), 데스크톱 1440px**
- `ScaleWrapper`가 자동 분기. 컴포넌트는 모바일이면 393 기준, 데스크톱이면 1440 기준 절대 px로 작성
- **모바일 시안: `public/images/mobile/iPhone 17 - {1..17}.png`**
- 분기 방식 두 가지:
  - **방식 A**: 한 컴포넌트 + Tailwind `sm:` 분기 (레이아웃만 다른 경우, 기본)
  - **방식 B**: `.mobile.tsx` / `.desktop.tsx` + dynamic ssr:false 라우터 (디자인이 본질적으로 다른 경우)
- 분리(방식 B) 시 모바일 파일은 **데스크톱 파일 복사 후 isMobile 분기 값만 고정**. 새로 짜지 말 것
- 자세한 규칙: @.claude/rules/responsive.md

## Git Convention

@.claude/rules/git-convention.md

## Forbidden

- Roboto, Arial, Pretendard 등 Inter 외 폰트 사용 금지 (Inter가 프로젝트 지정 폰트)
- 보라색 그라데이션 on 흰 배경 (전형적 AI 디자인) 금지
- jQuery 또는 레거시 애니메이션 라이브러리 사용 금지
- inline style 남용 금지 (Tailwind 또는 CSS 변수 사용)
- any 타입 사용 금지
- console.log 프로덕션 코드에 남기지 않기
- 불필요한 dependency 추가 금지

## Gotchas

- GSAP ScrollTrigger는 'use client' 컴포넌트에서만 사용 가능
- Next.js App Router에서 GSAP 초기화는 useLayoutEffect가 아닌 useGSAP 훅 사용
- @gsap/react의 useGSAP은 cleanup을 자동으로 처리함
- Tailwind v4는 tailwind.config.js 대신 CSS 기반 설정 사용 (@theme 디렉티브)
- next/image는 fill 속성 사용 시 부모에 relative + 크기 지정 필요
- Vercel 배포 시 output: 'standalone' 불필요 (Vercel이 자동 처리)
- 한국어 웹폰트는 subset이 중요 — woff2 형식 사용
- prefers-reduced-motion 미디어 쿼리 반드시 존중

## Rules

@.claude/rules/
