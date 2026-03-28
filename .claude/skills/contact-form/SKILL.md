---
name: contact-form
description: Build the contact section with email and Korean phone number inquiry form. Use when implementing contact forms, inquiry submission, email/phone validation, or the footer contact area. Triggers on "연락처", "문의 폼", "contact", "이메일 폼", "전화번호".
---

BILINY 제품 페이지의 문의(Contact) 섹션을 구현하는 스킬입니다.

## 요구사항

- 이메일 문의와 한국 전화번호 문의를 모두 지원
- 정적 사이트이므로 서버리스 함수(Next.js API Route 또는 Vercel Serverless Function) 사용
- 스팸 방지 기본 처리

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
// 한국 전화번호 형식 검증
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

Vercel에 배포되므로 다음 중 택일:
1. **Resend** (권장) — Vercel과 통합 우수, API Route에서 호출
2. **mailto: 링크** — 가장 간단, 사용자의 메일 클라이언트 열림
3. **Formspree/Getform** — 외부 서비스, 별도 백엔드 불필요

사용자에게 어떤 방식을 원하는지 물어볼 것.

## API Route 패턴 (Resend 사용 시)

```typescript
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  // 검증
  if (!body.name || !body.message) {
    return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 });
  }

  // 이메일 전송 로직
  // ...

  return NextResponse.json({ success: true });
}
```

## UI 구현 가이드

- 폼은 페이지 하단, Footer 바로 위에 배치
- 배경: 라이트 그레이 또는 미묘한 그라데이션으로 구분
- 입력 필드: 라운드 코너, 포커스 시 테두리 색상 변경 (--color-primary)
- 제출 버튼: CTA 오렌지(#F77F4C), hover 시 약간 밝아짐
- 성공/실패 메시지: 인라인 표시, 토스트 알림 없이
- 로딩 상태: 버튼 내 스피너

## 개인정보 수집 동의 문구 (필수)

```
[필수] 문의 처리를 위해 이름, 연락처, 문의 내용을 수집합니다.
수집된 정보는 문의 응대 후 3개월 내 파기됩니다.
```

## Gotchas

- 한국 전화번호는 하이픈(-) 있든 없든 모두 허용
- 02 서울 지역번호는 2자리이므로 별도 처리
- 이메일 검증은 HTML5 `type="email"` + 기본 정규식으로 충분
- 모바일에서 `type="tel"`로 숫자 키패드 노출
- 개인정보 동의 체크 안 하면 제출 버튼 비활성화
