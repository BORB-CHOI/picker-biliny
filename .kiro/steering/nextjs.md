---
inclusion: fileMatch
fileMatchPattern: "**/*.tsx,**/*.ts,**/next.config.*"
---

# Next.js 16 규칙

## App Router 주의사항

- 서버 컴포넌트가 기본 — 'use client'는 필요한 곳에만
- metadata는 layout.tsx 또는 page.tsx에서 export
- 이 프로젝트는 Vercel SSR/ISR 활용 (output: 'export' 사용하지 않음)
- generateStaticParams 불필요 (단일 페이지)

## 서버/클라이언트 분리

- **Server Components**: layout.tsx, page.tsx (섹션 조합만 담당)
- **Client Components**: 개별 섹션 컴포넌트 (애니메이션 필요), Contact 폼
- page.tsx에서 섹션을 import하여 조합하는 패턴

```tsx
// src/app/page.tsx (서버 컴포넌트)
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
    </main>
  );
}
```

## SEO / 메타데이터

- 한국어 사이트: `lang="ko"` 필수
- Open Graph 이미지 필수 (제품 이미지 활용)
- description은 한국어로 작성
- canonical URL: <https://picker.ai.kr>
