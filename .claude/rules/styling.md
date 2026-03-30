# Styling Rules

## 반복 스타일은 CSS 클래스로 추출

컴포넌트에서 동일한 Tailwind 클래스 조합이 2회 이상 반복되면, `globals.css`에 시맨틱 클래스로 추출한다.

### 원칙

- **하드코딩 금지**: 폰트 크기, 색상, 간격 등 반복되는 스타일 값을 인라인 Tailwind로 매번 나열하지 않는다
- **시맨틱 네이밍**: 클래스 이름은 용도 기반으로 짓는다 (예: `.story-text`, `.story-data-number`) — `.text-gray-30px` 같은 값 기반 이름 금지
- **섹션 접두사**: 특정 섹션에서만 쓰이는 클래스는 섹션명을 접두사로 붙인다 (예: `.story-*`, `.solution-*`)
- **`@apply` 사용**: Tailwind v4에서 `globals.css`에 `@apply`로 정의한다
- **오버라이드는 `!important`**: 기본 클래스에서 일부만 바꿔야 할 때 `!text-[20px]` 같은 `!` 접두사로 오버라이드

### 추출 대상

| 패턴 | 추출 여부 |
|------|----------|
| 같은 `text-[크기] font-weight color tracking` 조합이 3곳 이상 | 반드시 추출 |
| 이미지 크기/반응형 패턴이 동일한 것이 3곳 이상 | 반드시 추출 |
| 2곳만 반복 | 추출 권장 (향후 늘어날 가능성 판단) |
| 1곳만 사용 | 인라인 유지 |

### 예시

```css
/* globals.css */
.story-img {
  @apply w-[80%] md:w-[50%] h-auto;
}

.story-text {
  @apply text-[18px] md:text-[24px] font-medium text-[var(--color-text-secondary)] tracking-[3.3px];
}
```

```tsx
{/* 컴포넌트 — 기본 사용 */}
<Image className="story-img" />
<p className="story-text">본문 텍스트</p>

{/* 일부 오버라이드가 필요할 때 */}
<p className="story-text !font-bold !text-[var(--color-text)]">강조 텍스트</p>
```

### 새 섹션 개발 시 체크리스트

1. 섹션 내 반복되는 스타일 패턴 식별
2. `globals.css`에 `.섹션명-*` 클래스 정의
3. 컴포넌트에서 해당 클래스 적용
4. 변형이 필요한 곳은 `!` 오버라이드로 처리

## CSS 변수 우선

색상, 폰트 등은 `globals.css`의 `:root` CSS 변수를 참조한다.
`text-[#656565]` 대신 `text-[var(--color-text-secondary)]`를 사용한다.
