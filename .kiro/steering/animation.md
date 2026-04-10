---
inclusion: fileMatch
fileMatchPattern: "**/*.tsx,**/*.ts"
---

# 애니메이션 규칙

## GSAP ScrollTrigger 패턴

```tsx
'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AnimatedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.target', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
      },
      y: 100,
      opacity: 0,
    });
  }, { scope: containerRef });

  return <div ref={containerRef}>...</div>;
}
```

## 핵심 원칙

- 스크롤 기반 등장: `gsap.set()` + `gsap.to()` + `scrollTrigger`
- 스크롤 연동(scrub): `scrub: true` 또는 `scrub: 1` (부드러운 추적)
- **pin 효과: GSAP `pin: true` 사용 금지** — CSS `sticky` + `scrub`으로 대체
- 배치 등장: `stagger` + `scrollTrigger.batch()`
- Framer Motion은 hover/tap/layout 전환에만 사용

## 스크롤 고정(Pin) 효과 — CSS sticky 패턴

GSAP `pin: true`는 `position: fixed` 전환 시 레이아웃 시프트(튕김)를 유발한다.
반드시 CSS `sticky` + ScrollTrigger `scrub`으로 구현한다.

## 컴포넌트 간 애니메이션 시퀀싱

- 절대 `delay` 하드코딩 금지
- `src/lib/animationState.ts`의 CustomEvent pub/sub 패턴 사용
- 새 시퀀스 추가 시: `animationState.ts`에 emit/on 쌍 추가

### phase 사용 시 필수 확인

- `phase.xxx.on()`을 쓰려면 → 먼저 `phase.xxx.emit()`이 코드에 존재하는지 확인
- 일반 섹션은 `phase.header.on()`을 사용한다

### gsap.set() + gsap.to() 패턴 (필수)

`gsap.from()`은 사용하지 않는다. 반드시 `gsap.set()` → `gsap.to()` 패턴을 따른다.

## 성능 가이드라인

- transform과 opacity만 애니메이션 (layout thrashing 방지)
- 모바일: 동시 애니메이션 수 제한 (최대 3개)
- IntersectionObserver 대신 ScrollTrigger 사용 (통합 관리)
- cleanup은 useGSAP이 자동 처리
