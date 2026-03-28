# Git Commit Convention (한글 Git Flow)

## 커밋 메시지 형식

```
<타입>(<범위>): <한글 설명>

<본문 (선택)>

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
```

## 타입 (Type)

| 타입 | 용도 | 예시 |
|------|------|------|
| `기능` | 새 기능 추가 | `기능(Hero): 스크롤 트리거 등장 애니메이션 구현` |
| `수정` | 버그 수정 | `수정(Contact): 전화번호 유효성 검사 오류 해결` |
| `개선` | 기존 기능 개선 | `개선(Solution): 카드 hover 인터랙션 부드럽게 조정` |
| `스타일` | UI/CSS 변경 (로직 변경 없음) | `스타일(Header): 네비게이션 반응형 브레이크포인트 수정` |
| `리팩터` | 코드 구조 개선 (동작 변경 없음) | `리팩터(animations): ScrollReveal 래퍼 컴포넌트 추출` |
| `설정` | 빌드/배포/환경 설정 | `설정(vercel): 도메인 ai.kr 연결 설정` |
| `문서` | 문서 수정 | `문서(README): 프로젝트 소개 업데이트` |
| `테스트` | 테스트 추가/수정 | `테스트(Contact): 폼 제출 유효성 검사 테스트 추가` |
| `초기` | 프로젝트 초기 설정 | `초기: Next.js 16 프로젝트 및 하네스 엔지니어링 세팅` |

## 범위 (Scope)

섹션명 또는 기능 영역을 괄호 안에 표기:
- 섹션: `Hero`, `Problem`, `Alternatives`, `Solution`, `SocialCost`, `Budget`, `Revenue`, `Dimensions`, `Contact`, `Footer`
- 기능: `animations`, `ui`, `hooks`, `layout`, `fonts`, `seo`, `deploy`
- 전역: 범위 생략 가능

## 브랜치 전략 (Git Flow)

| 브랜치 | 용도 | 네이밍 |
|--------|------|--------|
| `main` | 프로덕션 배포 (Vercel 자동 배포) | - |
| `develop` | 개발 통합 | - |
| `feature/*` | 기능 개발 | `feature/hero-section`, `feature/contact-form` |
| `fix/*` | 버그 수정 | `fix/mobile-scroll-jank` |
| `release/*` | 배포 준비 | `release/v1.0.0` |

## 규칙

- 커밋 메시지는 반드시 한글로 작성
- 한 커밋에 하나의 논리적 변경만 포함
- 제목은 50자 이내
- 본문이 필요하면 빈 줄 후 작성
- 현재 시제 사용 ("구현했다" X → "구현" O)
- 마침표 없음
