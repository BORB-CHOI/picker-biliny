---
name: scroll-animation
description: Implement Apple-style scroll-triggered animations using GSAP ScrollTrigger. Use when building scroll animations, parallax effects, pin sections, or staggered reveals. Triggers on "스크롤 애니메이션", "pin 효과", "parallax", "등장 애니메이션", "scrub".
---

Apple 사이트 수준의 스크롤 애니메이션을 GSAP ScrollTrigger로 구현하는 스킬입니다.

## 핵심 패턴

### 1. 기본 등장 애니메이션 (Reveal on Scroll)
```tsx
useGSAP(() => {
  gsap.from('.reveal-item', {
    scrollTrigger: {
      trigger: '.reveal-item',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}, { scope: containerRef });
```

### 2. 스크롤 연동 (Scrub)
스크롤 위치에 따라 애니메이션이 진행되는 패턴. Apple 제품 페이지의 핵심.
```tsx
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=200%',
      scrub: 1,
      pin: true,
    },
  });

  tl.from('.product-image', { scale: 0.8, opacity: 0 })
    .from('.product-title', { y: 40, opacity: 0 }, '-=0.3')
    .from('.product-desc', { y: 30, opacity: 0 }, '-=0.2');
}, { scope: sectionRef });
```

### 3. Pin + 콘텐츠 전환
섹션을 고정하고 내부 콘텐츠만 변경하는 패턴.
```tsx
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top top',
      end: '+=300%',
      scrub: true,
      pin: true,
    },
  });

  // 첫 번째 콘텐츠 → 페이드아웃
  tl.to('.content-1', { opacity: 0, y: -50 })
    // 두 번째 콘텐츠 → 페이드인
    .from('.content-2', { opacity: 0, y: 50 })
    .to('.content-2', { opacity: 0, y: -50 })
    // 세 번째 콘텐츠
    .from('.content-3', { opacity: 0, y: 50 });
}, { scope: containerRef });
```

### 4. Staggered List Reveal
```tsx
useGSAP(() => {
  gsap.from('.list-item', {
    scrollTrigger: {
      trigger: '.list-container',
      start: 'top 75%',
    },
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6,
    ease: 'power2.out',
  });
}, { scope: containerRef });
```

### 5. 수평 스크롤 (Horizontal Scroll)
```tsx
useGSAP(() => {
  const items = gsap.utils.toArray<HTMLElement>('.h-scroll-item');
  gsap.to(items, {
    xPercent: -100 * (items.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: containerRef.current,
      pin: true,
      scrub: 1,
      end: () => `+=${containerRef.current!.scrollWidth}`,
    },
  });
}, { scope: containerRef });
```

## BILINY 프로젝트 적용 가이드

| 섹션 | 애니메이션 타입 | 설명 |
|------|---------------|------|
| Hero | Pin + Scrub | 제품 이미지가 스크롤에 따라 회전/확대, 로고 등장 |
| Problem | Reveal + Stagger | 텍스트 순차 등장, 일러스트 fade-in |
| Alternatives | Stagger Cards | 3개 카드(스쿠터/버스/택시) 순차 등장 |
| Solution | Pin + Content Switch | 섹션 고정, 3가지 가치 순서대로 전환 |
| SocialCost | Parallax + Counter | 다크 배경 진입, 숫자 카운트업 |
| Budget | Reveal + Glassmorphism | 카드 등장 + backdrop-blur 효과 |
| Dimensions | Scrub + Scale | 제품 도면이 스크롤에 따라 확대 |

## 성능 규칙

- `transform`과 `opacity`만 애니메이션 (절대 width/height/top/left 애니메이션하지 않기)
- `will-change` 수동 설정 금지 — GSAP이 관리
- 모바일에서 pin 섹션의 `end` 값 줄이기 (스크롤 거리 과다 방지)
- `prefers-reduced-motion` 시 애니메이션 비활성화:
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) return; // useGSAP 콜백 초반에 체크
```

## Gotchas

- `useGSAP` 훅 외부에서 ScrollTrigger 생성하면 cleanup 안 됨
- `pin: true` 사용 시 부모에 `overflow: hidden` 있으면 깨짐
- Next.js App Router에서 페이지 전환 시 ScrollTrigger.killAll() 필요할 수 있음
- `scrub: true`(즉시)보다 `scrub: 1`(1초 딜레이)이 더 부드러움
- pin 스페이서가 레이아웃을 밀어내므로 형제 요소 간격 주의
- 모바일 Safari에서 `position: fixed` + transform 조합 시 깜빡임 가능 — `pinType: 'transform'` 시도
