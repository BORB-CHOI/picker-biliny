# 구현 계획: Viewport Scale System

## 개요

1440px 기준 데스크톱 디자인을 뷰포트 너비에 비례하여 `transform: scale()`로 통째로 축소하는 시스템을 구현한다. `computeScaleFactor` 순수 함수, `useViewportScale` 커스텀 훅, `ScaleWrapper` 컴포넌트를 단계적으로 구현하고, 기존 GSAP ScrollTrigger 애니메이션 및 HeroSection canvas와의 호환성을 확보한다.

## Tasks

- [x] 1. computeScaleFactor 순수 함수 구현
  - [x] 1.1 `src/lib/scaleUtils.ts` 파일 생성 및 `computeScaleFactor(viewportWidth, baseWidth, minScale)` 함수 구현
    - `viewportWidth >= baseWidth`이면 1.0 반환
    - `viewportWidth < baseWidth`이면 `Math.max(viewportWidth / baseWidth, minScale)` 반환
    - 모든 인자가 양수임을 전제, 반환값은 항상 `[minScale, 1.0]` 범위
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 1.2 computeScaleFactor 속성 기반 테스트 작성 (fast-check)
    - **Property 1: Scale Factor 범위 불변식** — `∀ vw ∈ [1, 10000]: minScale <= computeScaleFactor(vw, 1440, 0.25) <= 1.0`
    - **Property 2: Scale Factor 단조 비감소** — `∀ vw1 < vw2: computeScaleFactor(vw1, ...) <= computeScaleFactor(vw2, ...)`
    - **Property 5: 경계 연속성** — 1440px 경계 근처에서 시각적 점프 없음
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6**

- [x] 2. useViewportScale 커스텀 훅 구현
  - [x] 2.1 `src/hooks/useViewportScale.ts` 파일 생성 및 훅 구현
    - `ViewportScaleConfig` 인터페이스 정의 (`baseWidth`, `minScale`, `wrapperRef`)
    - `ViewportScaleResult` 인터페이스 정의 (`scaleFactor`, `isScaled`)
    - `window.innerWidth` 기반으로 `computeScaleFactor` 호출하여 scale factor 계산
    - SSR 환경에서 `window` 접근 없이 기본값 `scaleFactor = 1` 반환
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 9.1, 9.2_

  - [x] 2.2 스크롤 높이 보정 로직 구현
    - `factor < 1.0`일 때 outer container 높이를 `Math.round(wrapper.scrollHeight × factor)`로 설정
    - `factor === 1.0`일 때 높이 보정 제거
    - wrapper에 `position: sticky; top: 0` 적용하여 스크롤 시 뷰포트 상단 고정
    - 보정 후 `ScrollTrigger.refresh()` 호출 (double-rAF)
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 2.3 리사이즈 대응 로직 구현
    - `resize` 이벤트 리스너 등록
    - `requestAnimationFrame` 기반 스로틀링으로 연속 리사이즈 시 마지막 프레임만 처리
    - 리사이즈 완료 후 scale factor 재계산, 스크롤 높이 재보정, `ScrollTrigger.refresh()` 호출
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 8.3_

  - [x] 2.4 CSS 커스텀 속성 전파 구현
    - `:root`에 `--scale-factor`, `--scale-inverse` CSS 변수 설정
    - scale factor 변경 시 자동 갱신
    - _Requirements: 2.5_

  - [x] 2.5 GPU 가속 및 성능 최적화
    - `factor < 1.0`일 때 `will-change: transform` 설정
    - `factor === 1.0`일 때 `will-change: auto`로 복원
    - `transform` 속성만 사용하여 메인 스레드 레이아웃 재계산 방지
    - _Requirements: 8.1, 8.2, 8.4_

- [x] 3. ScaleWrapper 컴포넌트 구현
  - [x] 3.1 `src/components/layout/ScaleWrapper.tsx` 파일 생성
    - `'use client'` 지시어 포함
    - outer container div (높이 보정용) + inner wrapper div (transform 적용) 구조
    - `useViewportScale` 훅 사용
    - `isScaled`일 때 wrapper에 `width: 1440px`, `transform: scale(factor)`, `transform-origin: top center` 적용
    - `isScaled`가 아닐 때 `width: 100%`, `transform: none` 적용
    - SSR 시 transform 없는 기본 상태로 렌더링
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 9.3_

- [x] 4. Checkpoint — 핵심 컴포넌트 구현 확인
  - 빌드 오류 없이 `computeScaleFactor`, `useViewportScale`, `ScaleWrapper`가 정상 동작하는지 확인한다. 테스트가 통과하는지 확인하고, 질문이 있으면 사용자에게 문의한다.

- [x] 5. page.tsx에 ScaleWrapper 적용 및 Fixed 요소 분리
  - [x] 5.1 `src/app/page.tsx` 수정 — ScaleWrapper 적용
    - `IntroAnimation`, `ScrollTriggerRefreshController`, `Header`는 ScaleWrapper 외부에 유지
    - `<main>` 및 모든 섹션 컴포넌트를 `<ScaleWrapper>` 내부로 이동
    - `HeroSection`, `StorySection`, `SolutionSection`, `BusinessSection`, `BilinyProductSection`, `TrinyProductSection`, `ContactSection` 포함
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 6. HeroSection canvas scale 보정
  - [x] 6.1 `src/components/sections/HeroSection.tsx` 수정 — canvas 크기 보정
    - `resizeCanvas()` 함수에서 CSS 변수 `--scale-factor`를 읽어 scale 보정 적용
    - `scaleFactor < 1.0`일 때: canvas CSS 너비 = 1440, 높이 = `window.innerHeight / scaleFactor`
    - `scaleFactor === 1.0`일 때: 기존 `window.innerWidth`, `window.innerHeight` 사용
    - scale 보정 후에도 이미지 시퀀스가 뷰포트를 정확히 채우도록 `drawFrame` 로직 조정
    - 자동재생 및 스크롤 scrub 애니메이션 정상 동작 확인
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ]* 6.2 canvas 보정 단위 테스트 작성
    - **Property 4: Canvas 뷰포트 채움 보정** — scale 보정된 canvas의 시각적 크기가 실제 뷰포트와 일치
    - **Validates: Requirements 7.1**

- [x] 7. GSAP ScrollTrigger 호환성 검증 및 수정
  - [x] 7.1 ScrollTrigger pin 동작 검증
    - HeroSection의 `pin: true` + `pinSpacing: true`가 scale-wrapper 내부에서 정상 동작하는지 확인
    - pin 위치 계산이 보정된 스크롤 높이 기준으로 정확한지 검증
    - 문제 발생 시 `pinType: "fixed"` 전환 또는 대안 적용
    - _Requirements: 6.1, 6.2_

  - [x] 7.2 스크롤 애니메이션 발동 시점 검증
    - `useProductAnimations` 훅의 b-reveal, b-fade, b-from-left, b-from-right, b-scale, b-stagger 애니메이션이 축소된 화면에서도 올바른 시점에 발동하는지 확인
    - `ScrollTrigger.refresh()` 호출 타이밍이 scale 적용 후인지 확인
    - 필요 시 `scrollTriggerUtils.ts`의 viewport entry 계산 조정
    - _Requirements: 6.3, 6.4_

- [x] 8. Checkpoint — 통합 동작 확인
  - ScaleWrapper 적용 후 전체 페이지가 정상 동작하는지 확인한다. 다양한 뷰포트(360, 768, 1024, 1280, 1440, 1920)에서 스크롤, 애니메이션, canvas가 올바르게 동작하는지 확인하고, 질문이 있으면 사용자에게 문의한다.

- [x] 9. 에러 처리 및 엣지 케이스 대응
  - [x] 9.1 최소 뷰포트 클램핑 처리
    - 360px 미만 뷰포트에서 `minScale` 클램핑이 정상 동작하는지 확인
    - 콘텐츠가 더 이상 축소되지 않고 수평 오버플로우가 `overflow-x: clip`으로 처리되는지 확인
    - _Requirements: 10.3_

  - [x] 9.2 ScrollTrigger pin 충돌 복구 로직
    - scale 변환과 pin 충돌 시 `ScrollTrigger.refresh()` 재호출 복구 로직 추가
    - sticky 요소가 `transform` containing block 변경으로 비정상 동작할 경우 대안 적용
    - _Requirements: 10.1_

  - [x] 9.3 리사이즈 시 깜빡임 방지
    - `requestAnimationFrame` 배치 처리로 리사이즈 중 시각적 깜빡임 최소화
    - resize 중 `will-change: transform` 유지, 완료 후 필요 시 제거
    - _Requirements: 10.2_

- [x] 10. 최종 Checkpoint — 전체 테스트 통과 확인
  - 모든 테스트가 통과하는지 확인한다. 빌드 오류가 없는지 확인하고, 질문이 있으면 사용자에게 문의한다.

## Notes

- `*` 표시된 태스크는 선택 사항이며 빠른 MVP를 위해 건너뛸 수 있다
- 각 태스크는 특정 요구사항을 참조하여 추적 가능하다
- Checkpoint에서 점진적 검증을 수행한다
- 속성 기반 테스트는 fast-check 라이브러리를 사용한다
- 기존 `animationState.ts`, `useProductAnimations.ts`, `scrollTriggerUtils.ts`는 scale 시스템과 독립적으로 동작하며, `ScrollTrigger.refresh()` 호출로 호환성을 확보한다
