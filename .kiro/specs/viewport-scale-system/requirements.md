# 요구사항 문서: Viewport Scale System

## 소개

1440px 기준 데스크톱 디자인을 뷰포트 너비에 비례하여 CSS `transform: scale()`로 통째로 축소하는 시스템이다. 이미지를 줄이듯 화면 가로가 줄어들면 모든 요소(텍스트, 이미지, absolute 요소 등)의 비율과 위치가 100% 일치하면서 작아지도록 한다. GSAP ScrollTrigger 스크롤 애니메이션, HeroSection canvas 이미지 시퀀스와의 호환성을 유지하며, Header/IntroAnimation은 scale 대상에서 제외한다.

## 용어 정의

- **Scale_Factor**: 현재 뷰포트 너비를 기준 너비(1440px)로 나눈 비율. `[minScale, 1.0]` 범위로 클램핑된다.
- **Base_Width**: scale 계산의 기준이 되는 뷰포트 너비. 기본값 1440px.
- **Min_Scale**: 허용되는 최소 축소 비율. 기본값 0.25 (360px 뷰포트에 해당).
- **Scale_Wrapper**: `transform: scale()`이 적용되는 최상위 래퍼 컨테이너 요소.
- **Outer_Container**: Scale_Wrapper의 부모 요소로, 보정된 스크롤 높이를 담당한다.
- **Corrected_Height**: `wrapper.scrollHeight × Scale_Factor`로 계산된 시각적 콘텐츠 높이.
- **Scale_Hook**: `useViewportScale` 커스텀 React 훅. Scale_Factor 계산, transform 적용, 스크롤 높이 보정을 담당한다.
- **ScrollTrigger**: GSAP의 스크롤 기반 애니메이션 플러그인.
- **Fixed_Element**: `position: fixed`로 배치되어 Scale_Wrapper 외부에 위치하는 요소 (Header, IntroAnimation).
- **Canvas_Sequence**: HeroSection의 canvas 기반 이미지 시퀀스 애니메이션.

## 요구사항

### 요구사항 1: Scale Factor 계산

**사용자 스토리:** 개발자로서, 뷰포트 너비에 따라 정확한 축소 비율이 자동 계산되기를 원한다. 이를 통해 모든 화면 크기에서 일관된 비례 축소가 적용된다.

#### 수용 기준

1. WHEN 뷰포트 너비가 Base_Width(1440px) 이상일 때, THE Scale_Hook SHALL Scale_Factor를 1.0으로 반환한다
2. WHEN 뷰포트 너비가 Base_Width(1440px) 미만일 때, THE Scale_Hook SHALL Scale_Factor를 `viewportWidth / Base_Width`로 계산한다
3. WHEN 계산된 Scale_Factor가 Min_Scale(0.25) 미만일 때, THE Scale_Hook SHALL Scale_Factor를 Min_Scale로 클램핑한다
4. THE Scale_Hook SHALL Scale_Factor를 항상 `[Min_Scale, 1.0]` 범위 내의 값으로 반환한다
5. WHEN 뷰포트 너비가 감소할 때, THE Scale_Hook SHALL 이전보다 같거나 작은 Scale_Factor를 반환한다 (단조 감소)
6. WHEN 뷰포트 너비가 Base_Width 경계를 통과할 때, THE Scale_Hook SHALL 시각적 점프 없이 연속적인 Scale_Factor 변화를 제공한다

### 요구사항 2: Scale Transform 적용

**사용자 스토리:** 사용자로서, 1440px 이하 화면에서 디자인이 이미지를 줄이듯 비율과 위치가 100% 유지된 채 축소되기를 원한다.

#### 수용 기준

1. WHEN Scale_Factor가 1.0 미만일 때, THE Scale_Wrapper SHALL `transform: scale(Scale_Factor)`를 적용하고 너비를 Base_Width(1440px)로 고정한다
2. WHEN Scale_Factor가 1.0일 때, THE Scale_Wrapper SHALL transform을 제거하고 너비를 100%로 설정한다
3. WHEN Scale_Factor가 1.0 미만일 때, THE Scale_Wrapper SHALL `transform-origin: top center`를 적용한다
4. THE Scale_Wrapper SHALL 내부의 모든 자식 요소(텍스트, 이미지, absolute 요소)를 동일한 비율로 축소한다
5. WHEN Scale_Factor가 변경될 때, THE Scale_Wrapper SHALL CSS 커스텀 속성 `--scale-factor`와 `--scale-inverse`를 `:root`에 설정한다

### 요구사항 3: 스크롤 높이 보정

**사용자 스토리:** 사용자로서, 축소된 화면에서도 스크롤이 콘텐츠 끝까지 정확히 도달하고 하단에 빈 공간이 없기를 원한다.

#### 수용 기준

1. WHEN Scale_Factor가 1.0 미만일 때, THE Outer_Container SHALL 높이를 `wrapper.scrollHeight × Scale_Factor`로 설정한다
2. WHEN Scale_Factor가 1.0일 때, THE Outer_Container SHALL 높이 보정을 제거한다
3. WHEN 스크롤 높이가 보정된 후, THE Outer_Container SHALL 시각적 콘텐츠 높이와 스크롤 가능 영역이 일치하도록 한다
4. WHEN 스크롤 높이 보정이 적용된 후, THE Scale_Hook SHALL `ScrollTrigger.refresh()`를 호출하여 트리거 위치를 재계산한다

### 요구사항 4: 리사이즈 대응

**사용자 스토리:** 사용자로서, 브라우저 창 크기를 변경할 때 축소 비율과 레이아웃이 실시간으로 올바르게 갱신되기를 원한다.

#### 수용 기준

1. WHEN 브라우저 창 크기가 변경될 때, THE Scale_Hook SHALL Scale_Factor를 재계산하고 Scale_Wrapper에 적용한다
2. WHEN 브라우저 창 크기가 변경될 때, THE Scale_Hook SHALL 스크롤 높이 보정을 재적용한다
3. WHEN 리사이즈 이벤트가 발생할 때, THE Scale_Hook SHALL `requestAnimationFrame`을 사용하여 배치 처리한다
4. WHEN 리사이즈가 완료된 후, THE Scale_Hook SHALL `ScrollTrigger.refresh()`를 호출한다

### 요구사항 5: Fixed 요소 독립성

**사용자 스토리:** 사용자로서, Header와 IntroAnimation이 scale 축소의 영향을 받지 않고 정상적으로 표시되기를 원한다.

#### 수용 기준

1. THE Header SHALL Scale_Wrapper 외부에 위치하여 scale 변환의 영향을 받지 않는다
2. THE IntroAnimation SHALL Scale_Wrapper 외부에 위치하여 scale 변환의 영향을 받지 않는다
3. WHEN Scale_Factor가 변경될 때, THE Header SHALL 위치와 크기가 변하지 않는다
4. WHEN Scale_Factor가 변경될 때, THE IntroAnimation SHALL 위치와 크기가 변하지 않는다

### 요구사항 6: GSAP ScrollTrigger 호환성

**사용자 스토리:** 사용자로서, 축소된 화면에서도 모든 스크롤 애니메이션(fade, reveal, parallax, pin)이 정상적으로 동작하기를 원한다.

#### 수용 기준

1. WHEN Scale_Factor가 적용된 후, THE ScrollTrigger SHALL 보정된 스크롤 높이 기준으로 start/end 위치를 계산한다
2. WHEN Scale_Wrapper 내부에서 pin이 활성화될 때, THE ScrollTrigger SHALL pin 동작이 정상적으로 수행된다
3. WHEN scale 변환이 적용된 상태에서, THE Scale_Hook SHALL `ScrollTrigger.refresh()`를 호출하여 모든 트리거의 위치를 재계산한다
4. WHEN 스크롤 애니메이션(b-reveal, b-fade, b-from-left, b-from-right, b-scale, b-stagger)이 실행될 때, THE ScrollTrigger SHALL 축소된 화면에서도 올바른 시점에 발동한다

### 요구사항 7: Canvas 이미지 시퀀스 호환성

**사용자 스토리:** 사용자로서, 축소된 화면에서도 HeroSection의 canvas 이미지 시퀀스가 뷰포트를 정확히 채우고 정상 재생되기를 원한다.

#### 수용 기준

1. WHEN Scale_Factor가 1.0 미만일 때, THE Canvas_Sequence SHALL canvas 크기를 scale 보정하여 실제 뷰포트를 정확히 채운다
2. WHEN Scale_Factor가 1.0일 때, THE Canvas_Sequence SHALL `window.innerWidth`와 `window.innerHeight` 기준으로 canvas 크기를 설정한다
3. WHEN 브라우저 창 크기가 변경될 때, THE Canvas_Sequence SHALL canvas 크기를 재계산하고 현재 프레임을 다시 그린다
4. WHEN scale 보정이 적용된 상태에서, THE Canvas_Sequence SHALL 자동재생과 스크롤 scrub 애니메이션이 정상 동작한다

### 요구사항 8: 성능 최적화

**사용자 스토리:** 개발자로서, scale 변환이 GPU 합성 레이어에서 처리되어 메인 스레드 성능에 영향을 주지 않기를 원한다.

#### 수용 기준

1. WHEN Scale_Factor가 1.0 미만일 때, THE Scale_Wrapper SHALL `will-change: transform`을 설정하여 GPU 합성 레이어를 활성화한다
2. WHEN Scale_Factor가 1.0일 때, THE Scale_Wrapper SHALL `will-change: auto`로 설정하여 불필요한 레이어 프로모션을 방지한다
3. WHEN 리사이즈 이벤트가 연속 발생할 때, THE Scale_Hook SHALL `requestAnimationFrame` 기반 스로틀링으로 마지막 프레임만 처리한다
4. WHEN scale 변환이 적용될 때, THE Scale_Wrapper SHALL 메인 스레드 레이아웃 재계산을 유발하지 않는 `transform` 속성만 사용한다

### 요구사항 9: SSR 호환성

**사용자 스토리:** 개발자로서, Next.js SSR 환경에서 scale 시스템이 오류 없이 동작하고 hydration 불일치가 발생하지 않기를 원한다.

#### 수용 기준

1. THE Scale_Hook SHALL SSR 시 `window` 객체에 접근하지 않고 기본 Scale_Factor 1.0을 반환한다
2. WHEN 클라이언트 hydration이 완료된 후, THE Scale_Hook SHALL 정확한 Scale_Factor를 계산하여 적용한다
3. THE Scale_Wrapper SHALL 서버 렌더링 시 transform 없는 기본 상태로 렌더링한다

### 요구사항 10: 에러 처리

**사용자 스토리:** 사용자로서, scale 시스템에 문제가 발생해도 콘텐츠가 정상적으로 표시되기를 원한다.

#### 수용 기준

1. IF ScrollTrigger pin과 scale 변환이 충돌할 때, THEN THE Scale_Hook SHALL `ScrollTrigger.refresh()`를 재호출하여 복구를 시도한다
2. IF 리사이즈 시 시각적 깜빡임이 발생할 때, THEN THE Scale_Hook SHALL `requestAnimationFrame` 배치 처리로 깜빡임을 최소화한다
3. IF 뷰포트 너비가 360px 미만일 때, THEN THE Scale_Wrapper SHALL Min_Scale로 클램핑하여 콘텐츠가 더 이상 축소되지 않도록 한다
