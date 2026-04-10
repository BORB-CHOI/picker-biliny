---
inclusion: fileMatch
fileMatchPattern: "**/*.tsx,**/*.css"
---

# 반응형 디자인 규칙

## 브레이크포인트 전략

디자인은 데스크톱(1440px) 기준으로 설계. 모바일까지 대응 필수.

- Mobile: < 640px
- Tablet: 640px ~ 1024px
- Desktop: 1024px ~ 1440px
- Wide: 1440px+

## Tailwind 사용 패턴

```tsx
// 모바일 퍼스트 — 기본값이 모바일
<div className="px-5 md:px-12 lg:px-20 xl:max-w-[1200px] xl:mx-auto">
```

## 이미지 대응

- next/image의 `sizes` 속성 필수 지정
- 모바일/데스크톱 다른 이미지가 필요하면 조건부 렌더링
- 히어로 이미지: priority 속성 사용

## 섹션 레이아웃

- 모바일: 단일 컬럼, 세로 스택
- 태블릿: 2컬럼 그리드 시작
- 데스크톱: 디자인에 따라 2~3컬럼, 비대칭 레이아웃 활용
- 다크 섹션: full-bleed 배경 유지
