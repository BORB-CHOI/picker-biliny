---
inclusion: fileMatch
fileMatchPattern: "**/*.tsx,**/*.css"
---

# 스타일링 규칙

## 반복 스타일은 CSS 클래스로 추출

컴포넌트에서 동일한 Tailwind 클래스 조합이 2회 이상 반복되면, `globals.css`에 시맨틱 클래스로 추출한다.

### 원칙

- **하드코딩 금지**: 반복되는 스타일 값을 인라인 Tailwind로 매번 나열하지 않는다
- **시맨틱 네이밍**: 클래스 이름은 용도 기반 (예: `.story-text`) — 값 기반 이름 금지
- **섹션 접두사**: 특정 섹션 전용 클래스는 섹션명 접두사 (예: `.story-*`, `.solution-*`)
- **`@apply` 사용**: Tailwind v4에서 `globals.css`에 `@apply`로 정의
- **오버라이드는 `!important`**: `!text-[20px]` 같은 `!` 접두사로 오버라이드

### 추출 기준

| 패턴 | 추출 여부 |
|------|----------|
| 같은 조합이 3곳 이상 | 반드시 추출 |
| 2곳만 반복 | 추출 권장 |
| 1곳만 사용 | 인라인 유지 |

## CSS 변수 우선

색상, 폰트 등은 `globals.css`의 `:root` CSS 변수를 참조한다.
`text-[#656565]` 대신 `text-[var(--color-text-secondary)]`를 사용한다.
