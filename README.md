# BILINY (빌리니) - 공유형 자율주행 시니어 모빌리티

> 중소도시의 이동권을 다시 설계합니다.

피커 프로젝트 **BILINY(빌리니)**는 인구감소 중소도시 고령자의 이동권 문제를 해결하는 공유형 자율주행 퍼스널 모빌리티 솔루션입니다.

## 프로젝트 소개

이 저장소는 BILINY 제품 소개 웹사이트의 소스코드입니다. Apple 제품 페이지 수준의 스크롤 애니메이션과 몰입감 있는 스토리텔링으로, BILINY의 가치를 전달합니다.

### 페이지 구성

| 섹션 | 내용 |
|------|------|
| **Hero** | 브랜드 소개 + 핵심 메시지: "중소도시의 이동권을 다시 설계합니다" |
| **Story** | 고령자 이동권 박탈 문제 제기 (1970 → 2026 타임라인) |
| **Alternatives** | 기존 대안의 한계 (전동스쿠터, 버스, 택시) |
| **Solution** | BILINY의 3가지 핵심 가치 (빌려타기, 안내길, 공평한 모빌리티) |
| **CareWatch** | 돌봄이 — 탑승 전/후 전 과정 모니터링 |
| **Social Cost** | 사회적 비용 데이터 (중소도시 당 연간 310억) |
| **Budget** | 교통 복지 예산 10%로 도입 가능 — 솔루션 3종 소개 |
| **Revenue** | 비활동시간 부가 수익 모델 (시티 케어 솔루션) |
| **Product** | 제품 라인업, 스펙, 360도 뷰 |
| **Dimensions** | 엘리베이터에 들어가는 사이즈 |
| **Charging** | 가로등 옆 무선 충전 시스템 |
| **Contact** | 이메일 / 전화 문의 |

### BILINY 솔루션 구성

| 솔루션 | 규모 | 비용 |
|--------|------|------|
| **공유형 PM 'BILINY'** | 50대 | 2.5억 원 |
| **스마트 레인** | 16km | 9.6억 원 |
| **케어워치** | 1,300개 | 0.3억 원 |

### 제품 스펙

- 1회 충전 주행거리: **140km**
- 대당 가격: **300만원**
- 앉아서 최대시속: **13km/h** / 서서 최대시속: **25km/h**
- 사계절 기후 대응형 4면 커버 디자인
- 스마트 레인 기반 저속 자율주행

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | GSAP + ScrollTrigger, Framer Motion |
| Deployment | Vercel |
| Domain | ai.kr |

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 타입 체크
npx tsc --noEmit

# 린트
npm run lint
```

개발 서버 실행 후 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 프로젝트 구조

```
src/
  app/
    layout.tsx          # 루트 레이아웃 (폰트, 메타데이터, SEO)
    page.tsx            # 메인 랜딩 페이지
    globals.css         # 글로벌 스타일, CSS 변수
    api/contact/        # 문의 폼 API
  components/
    sections/           # 페이지 섹션 (Hero, Problem, Solution 등)
    ui/                 # 재사용 UI 컴포넌트
    animations/         # 스크롤 애니메이션 래퍼
  hooks/                # 커스텀 React 훅
  lib/                  # 유틸리티 함수
  types/                # TypeScript 타입
public/
  images/               # 제품 이미지, 일러스트레이션
  fonts/                # 웹 폰트 (Pretendard)
```

## 배포

Vercel에 자동 배포됩니다. `main` 브랜치에 push 시 프로덕션 배포가 트리거됩니다.

- 프로덕션: https://ai.kr
- 프리뷰: PR 생성 시 자동 생성

## 라이선스

MIT License - (c) 2026 Picker Project. All rights reserved.
