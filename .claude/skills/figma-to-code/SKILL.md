---
name: figma-to-code
description: Convert Figma designs to production code for the BILINY project. Use when the user shares a Figma URL, references a specific design section, or asks to implement a design. Triggers on "피그마", "디자인 구현", "figma", "목업", "시안".
---

Figma 디자인을 BILINY 프로젝트의 프로덕션 코드로 변환하는 스킬입니다.

## Figma 파일 정보

- **File Key**: `4ofzLPWgHAFGKebRvk9cau`
- **최신 노드**: `2606:7` ("홈페이지 목업 324") — 전체 페이지 (Header~Footer 포함, ~14,799px)
- **이전 노드**: `2658:29` ("홈페이지 목업 326") — 제품 중심 축약 버전 (~10,471px)
- **Viewport**: 380px (모바일 기준)
- 특별히 지정하지 않으면 최신 노드(2606:7) 기준으로 작업

## 변환 워크플로우

### Step 1: 디자인 가져오기
```
Figma MCP의 get_design_context를 사용하여 해당 노드의 구조, 코드, 스크린샷을 가져옴
```

### Step 2: 프로젝트에 맞게 변환
Figma에서 가져온 코드는 참고용일 뿐, 반드시 프로젝트 스택에 맞게 변환:

| Figma 출력 | 프로젝트 변환 |
|-----------|------------|
| 절대 좌표 (x, y) | Flexbox/Grid 기반 레이아웃 |
| px 단위 | Tailwind 유틸리티 클래스 |
| 인라인 컬러 (#F77F4C) | CSS 변수 (var(--color-primary)) |
| Inter / Noto Sans KR | Pretendard + 프로젝트 디스플레이 폰트 |
| 고정 크기 | 반응형 (모바일 → 데스크톱) |
| 정적 배치 | GSAP ScrollTrigger 애니메이션 추가 |

### Step 3: 반응형 확장
Figma 디자인은 380px 모바일이므로, 태블릿/데스크톱 레이아웃은 직접 설계:
- 콘텐츠 구조와 위계를 유지하면서 넓은 화면 활용
- 2~3컬럼 그리드, 좌우 여백 확대, 이미지 크기 조절

### Step 4: 애니메이션 추가
Figma 디자인에 빨간색 주석으로 표시된 애니메이션 의도를 GSAP으로 구현:
- "천천히 등장하는 애니메이션" → `gsap.from({ y: 60, opacity: 0, duration: 1 })`
- "화면 정면으로 이동" → `gsap.to({ z: 0, scale: 1 })` with scrub
- "화면 밖으로 사라짐" → `gsap.to({ x: '-100%', opacity: 0 })`
- "위에서 아래로, 아래에서 위로" → parallax with different directions

## 섹션별 노드 매핑

디자인의 주요 섹션과 y좌표 (대략적):

### 최신 디자인 (노드 2606:7, 전체 페이지)

| 섹션 | y 범위 | 핵심 요소 |
|------|--------|----------|
| Header | 105~893 | 네비게이션 (STORY/BILINY/TRINY/CONTACT), 로고 |
| Hero | 879~1050 | "중소도시의 이동권을 다시 설계합니다", CTA 2개 |
| Story | 1585~2700 | 1970→2026 타임라인, 고령자 스토리 |
| Alternatives | 2677~5700 | 전동스쿠터/버스/택시 비교, 데이터(800m, 36%, 57%) |
| Isolation | 5700~6000 | "두다리가 얼어붙으신 어르신", 고립/우울 |
| Solution | 6001~7550 | 빌려타기, 안내길, 공평한 모빌리티, 돌봄이 |
| SocialCost | 7550~8000 | 다크 배경, 310억 (우울증 160억+복지 150억) |
| Budget | 8000~8600 | 예산 10%, 솔루션 카드 3종 (Glassmorphism) |
| Revenue | 8600~9200 | 시티케어솔루션, 수익 카드 (2.7억/5억/1.1억) |
| Product | 10372~10900 | Design 라인업, 스펙 (140km, 300만원) |
| Mobility | 10554~11500 | 앉아서 13km/h, 서서 25km/h, 안전한 길 |
| Explore | 12131~12200 | 빌리니 둘러보기 360° |
| Dimensions | 12521~13100 | 엘리베이터 비교, 정투상도 |
| Charging | 13168~14200 | 가로등 무선충전, 충전기 v2 |
| Footer | 14551~14800 | 이용약관, 개인정보처리방침, (c) 2026 |

### 이전 디자인 (노드 2658:29, 제품 중심)

| 섹션 | y 범위 | 핵심 요소 |
|------|--------|----------|
| Hero | 0~1456 | 제품 3D 렌더, CTA 버튼, 로고 |
| Problem | 2120~2500 | 제목, 일러스트, 설명 텍스트 |
| Alternatives | 2719~3260 | 3종 비교 카드 (스쿠터/버스/택시) |
| Isolation | 3437~3700 | 감정 라벨, 결론 텍스트 |
| Solution | 3787~4900 | 3가지 가치 제안, 이미지 |
| CareWatch | 4459~4730 | 돌봄이 기능 설명 |
| SocialCost | 5307~5581 | 다크 배경, 310억 데이터 |
| Budget | 5769~5935 | 파이차트, Glassmorphism 카드 3종 |
| Revenue | 6139~6380 | 수익 모델 카드 |
| Freedom | 6850~7350 | 이미지 갤러리, 스크롤 애니메이션 |
| Speed | 7445~7850 | 속도/모빌리티 시연 |
| Explore | 8621~9000 | 제품 갤러리 |
| Dimensions | 9358~9870 | 도면, 엘리베이터 비교 |

## Glassmorphism 카드 패턴

Budget 섹션의 제품 카드에 사용:
```tsx
<div className="relative rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent" />
  <div className="relative z-10">
    {/* 카드 콘텐츠 */}
  </div>
</div>
```

## 이미지 처리

- Figma에서 추출한 이미지는 `public/images/` 에 저장
- 파일명 규칙: `{section}-{description}.webp` (예: `hero-product-front.webp`)
- 형식: WebP 우선, PNG 폴백
- next/image 사용 필수, sizes 속성 지정

## Gotchas

- Figma의 절대 좌표를 그대로 CSS로 옮기지 말 것
- Figma에서 Inter/Noto Sans KR로 되어 있어도 Pretendard로 대체
- 빨간색 텍스트는 디자이너 주석 — 프로덕션 코드에 포함하지 말 것
- Figma 이미지 URL은 임시 — 반드시 다운로드하여 public/에 저장
- border-radius 값은 Figma 그대로 사용하되, 반응형에서 비례 조절
