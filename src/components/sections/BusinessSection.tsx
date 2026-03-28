'use client';

/**
 * BusinessSection — 과연 현실적일까? (Figma node: 4062:4)
 *
 * 주의: Figma에서 이 노드(4062:4)의 디자인 컨텐츠가 비어있음.
 * CLAUDE.md의 섹션 계획을 기반으로 스캐폴딩.
 *
 * 예상 구성 (CLAUDE.md 기반):
 * ┌─────────────────────────────────────────────────┐
 * │  ═══ CareWatch (돌봄이) ═══                      │
 * │  "돌봄이" 전 과정 모니터링 시스템 소개           │
 * │                                                  │
 * │  ═══ SocialCost (사회적 비용) ═══                │
 * │  다크 배경, 310억 데이터                         │
 * │  사회적 비용 절감 효과                           │
 * │                                                  │
 * │  ═══ Budget (예산 10%) ═══                       │
 * │  솔루션 카드 3종 (Glassmorphism)                 │
 * │                                                  │
 * │  ═══ Revenue (수익 모델) ═══                     │
 * │  시티 케어 솔루션 수익 모델 소개                 │
 * └─────────────────────────────────────────────────┘
 *
 * 에셋:
 * - /images/carewatch/ (돌봄이 시스템 일러스트)
 * - /images/common/icons/ (그룹 아이콘)
 *
 * TODO:
 * [ ] Figma 디자인 확정 후 상세 구조 업데이트 필요
 * [ ] CareWatch 모니터링 UI (돌봄이 대시보드 일러스트)
 * [ ] SocialCost 다크 섹션 (배경 #2C2C2C, 310억 강조 수치)
 * [ ] Budget 솔루션 카드 3종 (Glassmorphism 효과)
 * [ ] Revenue 수익 모델 다이어그램/차트
 * [ ] GSAP ScrollTrigger — 숫자 카운트업, 카드 stagger
 * [ ] 반응형 레이아웃
 */

import { useRef } from 'react';

export function BusinessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      {/* TODO: 구현 — Figma 디자인 확정 대기 */}
    </section>
  );
}
