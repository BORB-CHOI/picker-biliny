# Animation Rules

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

- 스크롤 기반 등장: `gsap.from()` + `scrollTrigger`
- 스크롤 연동(scrub): `scrub: true` 또는 `scrub: 1` (부드러운 추적)
- pin 효과: `pin: true` (섹션 고정 후 콘텐츠 변경)
- 배치 등장: `stagger` + `scrollTrigger.batch()`
- Framer Motion은 hover/tap/layout 전환에만 사용

## 컴포넌트 간 애니메이션 시퀀싱

- **절대 `delay` 하드코딩 금지** — 다른 애니메이션의 duration을 추측해서 delay로 맞추지 않는다
- `src/lib/animationState.ts`의 CustomEvent pub/sub 패턴을 사용하여 순서를 보장한다
- 패턴: 선행 애니메이션이 `onComplete`에서 `emit*()` 호출 → 후행 컴포넌트가 `on*()` 콜백으로 시작

```
시퀀스 예시:
IntroAnimation → emitIntroComplete() → Header onIntroComplete()
Header → emitHeaderComplete() → HeroSection onHeaderComplete()
```

- 새 시퀀스 추가 시: `animationState.ts`에 emit/on 쌍 추가, 선행 애니메이션의 `onComplete`에서 emit 호출

## 성능 가이드라인

- transform과 opacity만 애니메이션 (layout thrashing 방지)
- 이미지 애니메이션 시 contain: layout 또는 will-change: transform 최소한 사용
- 모바일: 동시 애니메이션 수 제한 (최대 3개)
- IntersectionObserver 대신 ScrollTrigger 사용 (통합 관리)
- cleanup은 useGSAP이 자동 처리 — 수동 kill() 불필요
