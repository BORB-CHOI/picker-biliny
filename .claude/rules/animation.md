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

### phase 사용 시 필수 확인 사항

**새 섹션에서 phase를 사용할 때, 반드시 기존 코드에서 어떤 phase가 실제로 emit되고 있는지 grep으로 확인한다.**

1. `phase.xxx.on()`을 쓰려면 → 먼저 `phase.xxx.emit()`이 코드에 존재하는지 확인
2. emit이 없는 phase를 on()으로 기다리면 **콜백이 영원히 호출되지 않는다**
3. `gsap.set()`으로 초기 숨김 처리한 뒤 phase 콜백 안에서 `gsap.to()`를 쓰는 패턴이므로, 콜백이 안 돌면 **요소가 영원히 안 보인다**

현재 실제 사용 중인 phase:
- `phase.intro` — IntroAnimation이 emit → Header가 on
- `phase.header` — Header가 emit → **모든 섹션**이 on (Hero, Story, Solution, Business, Biliny, Triny 등)

**일반 섹션은 `phase.header.on()`을 사용한다. `phase.hero`는 emit하는 곳이 없으므로 사용 금지.**

### gsap.set() + gsap.to() 패턴 (필수)

`gsap.from()`은 사용하지 않는다. 반드시 아래 패턴을 따른다:

```tsx
// 1. 초기 상태 — phase 콜백 바깥에서 즉시 숨김
gsap.set(section.querySelectorAll('.anim-class'), {
  clipPath: 'inset(100% 0% 0% 0%)',
  opacity: 0,
});

// 2. phase 콜백 안에서 gsap.to()로 보여줌
const unsubscribe = phase.header.on(() => {
  rafId = requestAnimationFrame(() => {
    section.querySelectorAll<HTMLElement>('.anim-class').forEach((el) => {
      gsap.to(el, {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });
  });
});
```

## 스크롤 비디오 (이미지 시퀀스 + Canvas)

Apple 스타일 스크롤 연동 영상. 영상을 JPEG 시퀀스로 분해 → canvas에 그려서 스크롤로 프레임 제어.

### 준비: ffmpeg로 프레임 추출

```bash
ffmpeg -i input.mp4 -vf "scale=1920:-1" -q:v 2 output-frames/frame-%03d.jpg
```

### 구현 패턴

```tsx
const FRAME_COUNT = 200;
const FRAME_PATH = "/videos/section-name/frame-";

// 프리로드
function preloadFrames(): HTMLImageElement[] {
  const images: HTMLImageElement[] = [];
  for (let i = 1; i <= FRAME_COUNT; i++) {
    const img = new Image();
    img.src = `${FRAME_PATH}${String(i).padStart(3, "0")}.jpg`;
    images.push(img);
  }
  return images;
}

// canvas에 그리기
function drawFrame(index: number) {
  const img = frames[Math.round(index)];
  if (!img?.complete) return;
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);
}

// ScrollTrigger scrub 연동
const tracker = { frame: 0 };
gsap.to(tracker, {
  frame: FRAME_COUNT - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=2000",   // 스크롤 거리 (px)
    pin: true,
    scrub: 0.3,      // 부드러운 추적
  },
  onUpdate: () => drawFrame(tracker.frame),
});
```

### 자동재생 → 스크롤 전환 패턴

처음 N프레임까지 자동재생 후, 스크롤 시 자동재생 중단 + 현재 프레임에서 스크롤이 이어받는 패턴:

```tsx
const autoplayTween = gsap.to(tracker, {
  frame: AUTOPLAY_STOP_FRAME,
  duration: AUTOPLAY_STOP_FRAME / FPS,
  ease: "none",
  onUpdate: () => drawFrame(tracker.frame),
});

let scrollJumping = false;

ScrollTrigger.create({
  trigger, start: "top top", end: "+=2000", pin: true,
  onUpdate: (self) => {
    if (scrollJumping) return;
    if (!stopped && self.progress > 0.005) {
      stopped = true;
      autoplayTween.kill();
      // 스크롤 위치를 현재 프레임에 맞춤 (behavior: instant 필수!)
      scrollJumping = true;
      const targetPos = self.start + (currentFrame / (FRAME_COUNT - 1)) * (self.end - self.start);
      window.scrollTo({ top: targetPos, behavior: "instant" });
      drawFrame(currentFrame);
      requestAnimationFrame(() => { scrollJumping = false; });
      return;
    }
    if (stopped) drawFrame(self.progress * (FRAME_COUNT - 1));
  },
});
```

### 주의사항 (검증 완료)

- **scrub ScrollTrigger는 entry 애니메이션 완료 후 생성** — 동시 생성 시 scrub이 초기 opacity:0을 강제함
- **useGSAP scope는 비동기 콜백에서 적용 안 됨** — phase.on(), setTimeout 등의 콜백에서는 DOM ref를 직접 참조
- **`self.scroll()` 대신 `window.scrollTo({ behavior: "instant" })` 사용** — CSS `scroll-behavior: smooth`가 있으면 `self.scroll()`이 smooth 애니메이션을 발생시켜 중간 프레임이 모두 그려짐
- **`scrollJumping` 가드 필수** — `window.scrollTo`가 scroll 이벤트를 발생시켜 `onUpdate`가 재귀 호출됨
- **canvas.width/height는 최초 1회만 설정** — 매번 설정하면 canvas가 클리어되어 깜빡임
- **canvas에 CSS `object-cover`는 동작 안 함** — drawImage에서 cover 비율 계산을 직접 해야 함
- `preloadFrames()`는 `useEffect`에서 마운트 시 1회만 호출

## 성능 가이드라인

- transform과 opacity만 애니메이션 (layout thrashing 방지)
- 이미지 애니메이션 시 contain: layout 또는 will-change: transform 최소한 사용
- 모바일: 동시 애니메이션 수 제한 (최대 3개)
- IntersectionObserver 대신 ScrollTrigger 사용 (통합 관리)
- cleanup은 useGSAP이 자동 처리 — 수동 kill() 불필요
