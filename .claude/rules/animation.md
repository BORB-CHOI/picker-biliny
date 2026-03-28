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

## 성능 가이드라인

- transform과 opacity만 애니메이션 (layout thrashing 방지)
- 이미지 애니메이션 시 contain: layout 또는 will-change: transform 최소한 사용
- 모바일: 동시 애니메이션 수 제한 (최대 3개)
- IntersectionObserver 대신 ScrollTrigger 사용 (통합 관리)
- cleanup은 useGSAP이 자동 처리 — 수동 kill() 불필요
