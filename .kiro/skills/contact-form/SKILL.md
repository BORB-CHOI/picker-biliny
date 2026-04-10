# 문의 폼 (Contact Form)

BILINY 제품 페이지의 문의(Contact) 섹션을 구현하는 스킬.
이메일 문의와 한국 전화번호 문의를 모두 지원한다.

## 트리거

"연락처", "문의 폼", "contact", "이메일 폼", "전화번호" 관련 요청 시 사용

## 폼 필드

```
이름 (필수)
연락처 유형 선택: 이메일 / 전화
이메일 주소 (이메일 선택 시)
전화번호 (전화 선택 시, 한국 형식)
문의 내용 (textarea, 필수)
개인정보 수집 동의 (체크박스, 필수)
```

## 한국 전화번호 검증

```typescript
const KOREAN_PHONE_REGEX = /^(01[016789])-?(\d{3,4})-?(\d{4})$/;
const KOREAN_LANDLINE_REGEX = /^(0[2-6][1-5]?)-?(\d{3,4})-?(\d{4})$/;

function formatKoreanPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('02')) {
    return digits.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3');
  }
  return digits.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
}
```

## 이메일 전송 방식

Vercel 배포이므로 다음 중 택일 (사용자에게 물어볼 것):
1. **Resend** (권장) — Vercel 통합 우수
2. **mailto: 링크** — 가장 간단
3. **Formspree/Getform** — 외부 서비스

## UI 가이드

- 폼은 페이지 하단, Footer 바로 위에 배치
- 입력 필드: 라운드 코너, 포커스 시 테두리 색상 변경
- 제출 버튼: CTA 오렌지(#F77F4C)
- 성공/실패 메시지: 인라인 표시
- 로딩 상태: 버튼 내 스피너

## 주의사항

- 한국 전화번호는 하이픈 있든 없든 모두 허용
- 02 서울 지역번호는 2자리이므로 별도 처리
- 모바일에서 `type="tel"`로 숫자 키패드 노출
- 개인정보 동의 체크 안 하면 제출 버튼 비활성화
