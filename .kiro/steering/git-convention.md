# Git 커밋 컨벤션 (한글 Git Flow)

## 커밋 메시지 형식

```
<타입>(<범위>): <한글 설명>

<본문 (선택)>
```

## 타입

| 타입 | 용도 | 예시 |
|------|------|------|
| `feat` | 새 기능 추가 | `feat(Hero): 스크롤 트리거 등장 애니메이션 구현` |
| `fix` | 버그 수정 | `fix(Contact): 전화번호 유효성 검사 오류 해결` |
| `perf` | 기존 기능 개선 | `perf(Solution): 카드 hover 인터랙션 부드럽게 조정` |
| `style` | UI/CSS 변경 | `style(Header): 네비게이션 반응형 브레이크포인트 수정` |
| `refactor` | 코드 구조 개선 | `refactor(animations): ScrollReveal 래퍼 컴포넌트 추출` |
| `config` | 빌드/배포/환경 설정 | `config(vercel): 도메인 ai.kr 연결 설정` |
| `docs` | 문서 수정 | `docs(README): 프로젝트 소개 업데이트` |
| `chore` | 기타 작업 | `chore(Initial): Next.js 16 프로젝트 세팅` |

## 규칙

- 커밋 메시지는 반드시 한글로 작성
- 한 커밋에 하나의 논리적 변경만 포함
- 제목은 50자 이내
- 현재 시제 사용 ("구현했다" X → "구현" O)
- 마침표 없음
