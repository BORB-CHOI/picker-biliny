# 스크롤 애니메이션 (Scroll Animation)

Apple 사이트 수준의 스크롤 애니메이션을 GSAP ScrollTrigger로 구현하는 스킬.

## 트리거

"스크롤 애니메이션", "pin 효과", "parallax", "등장 애니메이션", "scrub" 관련 요청 시 사용

## 핵심 패턴

### 1. 기본 등장 (Reveal on Scroll)
```tsx
useGSAP(() => {
  gsap.set('.reveal-item', { y: 60, opacity: 0 });
  gsap.to('.reveal-item', {
    scrollTrigger: { trigger: '.reveal-item', start: 'top 85%' },
    y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
  });
}, { scope: containerRef });
```

### 2. 스크롤 연동 (Scrub)
```tsx
gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top', end: '+=200%',
    scrub: 1, pin: true,
  },
});
```

### 3. Pin + 콘텐츠 전환
CSS `sticky` + ScrollTrigger `scrub`으로 구현. GSAP `pin: true` 사용 금지.

### 4. Staggered List
```tsx
gsap.from('.list-item', {
  scrollTrigger: { trigger: '.list-container', start: 'top 75%' },
  y: 40, opacity: 0, stagger: 0.15, duration: 0.6,
});
```

## BILINY 섹션별 적용

| 섹션 | 애니메이션 | 설명 |
|------|----------|------|
| Hero | Pin + Scrub | 제품 이미지 회전/확대 |
| Problem | Reveal + Stagger | 텍스트 순차 등장 |
| Solution | Pin + Content Switch | 3가지 가치 순서대로 전환 |
| SocialCost | Parallax + Counter | 다크 배경 진입, 숫자 카운트업 |

## 성능 규칙

- `transform`과 `opacity`만 애니메이션
- 모바일에서 pin 섹션의 `end` 값 줄이기
- `prefers-reduced-motion` 시 애니메이션 비활성화

## 주의사항

- `useGSAP` 훅 외부에서 ScrollTrigger 생성하면 cleanup 안 됨
- `pin: true` 사용 시 부모에 `overflow: hidden` 있으면 깨짐
- `scrub: true`보다 `scrub: 1`이 더 부드러움
