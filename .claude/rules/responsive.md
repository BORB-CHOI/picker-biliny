# Responsive Design Rules

## 분기 전략 (확정)

**단일 분기점 640px 기준 — 모바일/데스크톱 두 모드만 존재.**

| 뷰포트 폭 | 모드 | 디자인 기준 폭 | scale 동작 |
|---------|------|------------|------------|
| `< 640px` | 모바일 | **393px** (iPhone 17) | 360px → 0.92x, 393px → 1.0, 큰 폰 → 확대 |
| `>= 640px` | 데스크톱 | **1440px** | 1440px → 1.0, 작은 데스크톱 → 축소 (minScale 0.25) |

태블릿 분기는 없음. 640~1024px도 1440px 디자인이 축소되어 보임.

## ScaleWrapper로 처리됨

`src/components/layout/ScaleWrapper.tsx` 가 자동으로 두 모드를 분기한다. 컴포넌트는
**모바일이면 393px 기준 절대 px**, **데스크톱이면 1440px 기준 절대 px**로 작성하면 된다.

`src/hooks/useViewportScale.ts` 옵션:
- `baseWidth: 1440` / `mobileBaseWidth: 393`
- `minScale: 0.25` / `mobileMinScale: 0.85`
- `mobileBreakpoint: 640`

## 컴포넌트 분기 전략 (하이브리드)

복잡도에 따라 두 가지 방식 중 선택한다.

### 방식 A: 한 컴포넌트 + Tailwind `sm:` 분기 (기본)

같은 콘텐츠를 모바일에선 세로 스택, 데스크톱에선 가로 정렬 등 **레이아웃만 다르고 구조가 같을 때**.

```tsx
<div className="flex flex-col sm:flex-row">
  <h1 className="text-[28px] sm:text-[clamp(24px,3.33vw,48px)]">...</h1>
</div>
```

- 모바일 값: 393px 기준 절대 px (예: `text-[28px]`, `px-5`)
- 데스크톱 값: 1440px 기준 `clamp()` 또는 절대 px (`sm:` 접두사)
- 반복 스타일은 `globals.css`에 클래스로 추출 (참고: [styling.md](./styling.md))

### 방식 B: 컴포넌트 분리 (`.mobile.tsx` / `.desktop.tsx` + 라우터)

**디자인이 본질적으로 달라 분기 클래스가 폭발적으로 늘어나는 경우**에만 사용한다.

예시: `IntroAnimation` — leaf 위치/텍스트 좌표/로고 폭이 다 다름.

#### 라우터 패턴 — dynamic + ssr:false (필수)

```tsx
// IntroAnimation.tsx — 라우터
"use client";
import dynamic from "next/dynamic";

const MOBILE_BREAKPOINT = 640;

const IntroAnimationVariant = dynamic(
  async () => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (isMobile) {
      const mod = await import("./IntroAnimation.mobile");
      return mod.IntroAnimationMobile;
    }
    const mod = await import("./IntroAnimation.desktop");
    return mod.IntroAnimationDesktop;
  },
  { ssr: false },
);

export function IntroAnimation() {
  return <IntroAnimationVariant />;
}
```

**왜 ssr:false인가**: SSR에서 한쪽을 미리 마운트했다가 hydration 시 반대편으로
교체되면, GSAP 타임라인/lockScrollUntilHero/preload가 두 번 실행되어 **새로고침할
때마다 애니메이션이 점점 끊긴다**. dynamic + ssr:false는 클라이언트에서 한 번만
마운트되도록 보장한다.

#### 분리할 때 절대 금지

- **모바일 파일을 새로 짜지 말 것.** 데스크톱 파일을 복사한 뒤 `isMobile` 분기
  값만 모바일 값으로 고정. 코드 구조는 100% 동일해야 한다.
- 분리 과정에서 leaf 패딩, 텍스트 배치 방식, 로고 폭 등 **세부 값을 임의로 조정 금지**.
- 분리 전 `git log`/원본 커밋의 코드와 100% 일치하는지 `diff`로 확인.

## 이미지 대응

- next/image의 `sizes` 필수 지정
- 모바일/데스크톱 다른 이미지: `<picture>` 대신 조건부 렌더링
- 히어로 이미지: `priority`

## 섹션 레이아웃 가이드

모바일 디자인 기본 구조 (시안 참조: `public/images/mobile/iPhone 17 - *.png`):

- **모바일**: 단일 컬럼, 위↑ 텍스트 → 아래↓ 이미지/영상 스택
- **데스크톱**: 좌/우 2단, 비대칭 레이아웃, 풀-블리드 다크 섹션

콘텐츠 자체는 거의 동일. 텍스트가 추가되거나 축약되는 경우만 별도 마크업.

## 모바일 작업 체크리스트

새 섹션의 모바일 뷰를 작업할 때:

- [ ] `public/images/mobile/iPhone 17 - *.png`에서 해당 시안 확인
- [ ] **방식 A vs B** 결정 — 레이아웃만 다르면 A, 본질 다르면 B
- [ ] 393px 기준으로 절대 px 작성 (모바일 시), 1440px 기준 (데스크톱 시)
- [ ] 분기 클래스가 클래스당 5개 이상 붙으면 `globals.css`로 추출 검토
- [ ] 시퀀스 애니메이션은 `phase.*` 시스템 사용 (참고: [animation.md](./animation.md))
- [ ] 한 섹션 끝낼 때마다 데스크톱/모바일 둘 다 브라우저에서 확인
