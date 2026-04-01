# Consistency Rules — 기존 코드와의 일관성 유지

새 섹션/컴포넌트를 개발할 때 반드시 기존 코드베이스와 동일한 톤을 유지해야 한다.
Figma 디자인 데이터에 있는 값(font-family, text-shadow, box-shadow 등)을 그대로 복사하지 않고,
**이 프로젝트에서 실제로 사용 중인 패턴**을 기준으로 변환해야 한다.

## 개발 전 필수 확인 절차

새 섹션을 만들기 전에 **반드시** 기존 섹션 2개 이상을 읽고:
1. 어떤 CSS 클래스 패턴을 사용하는지 (`.섹션명-*` 네이밍)
2. 어떤 폰트/색상/간격 체계를 쓰는지
3. 어떤 애니메이션 클래스와 효과를 쓰는지
4. `globals.css`에 정의된 기존 클래스와 충돌하지 않는지

파악한 다음, 그 패턴을 **그대로** 따라야 한다.

## 금지 사항

### 1. Figma 값 직접 복사 금지
- Figma에서 `font-family: Inter`로 나와도 이 프로젝트는 **Pretendard** → font-family 지정 자체를 하지 않는다 (body에서 상속)
- Figma에서 `text-shadow: 0 0 6px rgba(...)` 가 있어도, 기존 섹션에서 text-shadow를 쓰지 않으면 **넣지 않는다**
- Figma 좌표를 absolute positioning으로 그대로 옮기지 않는다

### 2. 기존에 없는 시각 효과 임의 추가 금지
- `text-shadow` — 기존 섹션(Story, Solution, Business)에서 사용하지 않음 → 새 섹션에서도 사용 금지
- `box-shadow` — 글래스모피즘 카드(`.biz-glass-card`) 외에는 사용하지 않음
- 장식용 `blur`, 타원 그림자, 글로우 효과 — 기존에 없으면 추가하지 않음
- `filter: drop-shadow()` — 기존에 없으면 추가하지 않음

### 3. 폰트 관련
- `font-family` 직접 지정 금지 — body의 Inter를 상속받으면 됨
- Figma의 Noto Sans KR 등은 **무시** (프로젝트 폰트는 Inter)
- Tailwind의 `font-sans`, `font-display` 등도 불필요 (이미 body에서 설정됨)

## 체크리스트: 새 섹션 개발 시

- [ ] 기존 섹션 2개 이상 읽었는가?
- [ ] `globals.css`의 기존 클래스 패턴을 확인했는가?
- [ ] Figma 출력값을 프로젝트 패턴으로 변환했는가? (font-family, shadow 등)
- [ ] 기존에 없는 시각 효과(shadow, glow, blur 장식)를 추가하지 않았는가?
- [ ] 애니메이션 패턴이 기존 섹션과 동일한 방식인가? (`.b-text`, `.b-fade`, `.b-media` 등)
- [ ] clamp() 반응형 패턴이 기존과 동일한 스케일링 범위인가?
