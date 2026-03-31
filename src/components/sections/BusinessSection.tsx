'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { phase } from '@/lib/animationState';

gsap.registerPlugin(ScrollTrigger);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   데이터
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const PRODUCT_CARDS = [
  {
    img: '/images/busniess/6_biliny-pm.png',
    imgW: 780, imgH: 680,
    title: "공유형 PM 'BILINY'",
    qty: '50 대', price: '2.5',
    lines: [
      { text: '스마트 레인 기반 ', blue: '저속 자율주행', suffix: ' 기능' },
      { text: '', blue: '사계절 기후 대응', suffix: '형 1인승 퍼스널 모빌리티' },
    ],
  },
  {
    img: '/images/busniess/7_smart-lane.png',
    imgW: 1027, imgH: 518,
    title: '스마트 레인',
    qty: '16km', price: '9.6',
    lines: [
      { text: '시각 인식 기반의 ', blue: '저비용 유도 주행', suffix: ' 레인 인프라' },
      { text: '태양광 야간 시인성 확보 및 보행자 안전 경계선 기능', blue: '', suffix: '' },
    ],
  },
  {
    img: '/images/busniess/8_carewatch.png',
    imgW: 301, imgH: 320,
    title: '케어워치',
    qty: '1300 개', price: '0.3',
    lines: [
      { text: '고령자 ', blue: '이동 현황 모니터링', suffix: ' - ' },
      { text: '', blue: '안심 케어', suffix: ' 디바이스' },
      { text: '119 자동 신고 기능, 컨디션 맞춤 목적지 제안 기능', blue: '', suffix: '' },
    ],
  },
] as const;

const REVENUE_CARDS = [
  {
    img: '/images/busniess/9_elderly-commute.png',
    imgW: 430, imgH: 402,
    topLabel: '출/퇴근 이동 3회, 등/하원 3회, 점심시간 단거리 이동 2회',
    note: '*50대 운영기준',
    daily: '일 1.45만 원',
    annual: '2.7',
  },
  {
    img: '/images/busniess/10_urban-boarding.png',
    imgW: 525, imgH: 472,
    topLabel: '중단거리 출퇴근 / 학교·학원 등하교',
    note: '',
    daily: '',
    annual: '',
  },
  {
    img: '/images/busniess/11_delivery-service.png',
    imgW: 870, imgH: 637,
    topLabel: '점심시간 단거리 이동 / 퀵 배달 · 배송서비스',
    note: '퀵 배달 2회, 저녁심야배송 3회',
    daily: '일 2.6만 원',
    annual: '5',
  },
  {
    img: '/images/busniess/12_night-patrol.png',
    imgW: 684, imgH: 643,
    topLabel: '대리 기사 복귀 이동수단 / 야간 순찰',
    note: '야간순찰 3시간, 대리기사이송 1회',
    daily: '일 0.6만 원',
    annual: '1.1',
  },
] as const;

const PHASES = [
  {
    year: '2027',
    desc: '600m 반경 부분적 실증',
    descBlue: '600m 반경',
    km: '16km', units: '50 대', people: '1300명',
    map: '/images/busniess/13_map-2027.png',
    mapW: 448, mapH: 438,
    finance: {
      items: [
        { label: '스마트레인', value: '9.6억', color: '#0060EF' },
        { label: '공유 PM', value: '2.5억', color: '#0060EF' },
        { label: '관리운영', value: '0.5억', color: '#0060EF' },
      ],
      tag: '1회성 투자',
      total: '12.6억 원',
      annual: '약 22.5',
      fiveYear: '약 112.5',
    },
  },
  {
    year: '2028',
    desc: '2km 반경 전범위 실증',
    descBlue: '2km 반경',
    km: '110km', units: '1000 대', people: '2.7만 명',
    map: '/images/busniess/14_map-2028.png',
    mapW: 448, mapH: 438,
    finance: {
      items: [
        { label: '감축', value: '150억', color: '#F77F4C' },
        { label: '감축', value: '160억', color: '#F77F4C' },
        { label: '투자', value: '67억', color: '#0060EF' },
        { label: '수익', value: '9억', color: '#22C55E' },
        { label: '부가서비스', value: '8억', color: '#22C55E' },
      ],
      tag: '감축 / 투자 / 수익',
      total: '122억 원',
      annual: '약 490',
      fiveYear: '약 2,450',
    },
  },
  {
    year: '2030',
    desc: '인구감소 중소도시 89개군 확장',
    descBlue: '89개군',
    km: '6,930km', units: '63,000 대', people: '171만 명',
    map: '/images/busniess/15_map-2030.png',
    mapW: 350, mapH: 456,
    finance: {
      items: [
        { label: '교통복지비', value: '1조', color: '#F77F4C' },
        { label: '사회복지비', value: '1조', color: '#F77F4C' },
        { label: '스마트레인', value: '4,220억', color: '#0060EF' },
      ],
      tag: '감축 / 투자 / 수익',
      total: '0.6 조 원',
      annual: '약 3.1',
      fiveYear: '약 15.5',
    },
  },
] as const;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   컴포넌트
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function BusinessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /* ── 초기 상태: 즉시 숨김 ── */
      gsap.set(section.querySelectorAll('.biz-fade'), {
        y: 40,
        opacity: 0,
      });
      gsap.set(section.querySelectorAll('.biz-reveal'), {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0,
      });

      let rafId: number;

      const unsubscribe = phase.header.on(() => {
        rafId = requestAnimationFrame(() => {
          /* ── 스크롤 등장: fade up ── */
          section.querySelectorAll<HTMLElement>('.biz-fade').forEach((el) => {
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 88%' },
            });
          });

          /* ── 스크롤 등장: clip-path reveal ── */
          section.querySelectorAll<HTMLElement>('.biz-reveal').forEach((el) => {
            gsap.to(el, {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%' },
            });
          });

          /* ── Pin 애니메이션: 글로벌 확장 섹션 ── */
          const pinContainer = pinRef.current;
          if (!pinContainer) return;

          const phases = pinContainer.querySelectorAll<HTMLElement>('.expansion-phase');
          if (phases.length < 3) return;

          /* 초기: 2번, 3번 페이즈 숨김 */
          gsap.set(phases[1], { opacity: 0, y: 60 });
          gsap.set(phases[2], { opacity: 0, y: 60 });

          /* 뱃지 초기: 2028, 2030 비활성 */
          const badges = pinContainer.querySelectorAll<HTMLElement>('.year-badge-item');
          if (badges.length >= 3) {
            gsap.set(badges[1], { opacity: 0.4 });
            gsap.set(badges[2], { opacity: 0.4 });
          }

          const pinTl = gsap.timeline({
            scrollTrigger: {
              trigger: pinContainer,
              start: 'top top',
              end: '+=3000',
              pin: true,
              scrub: 1,
            },
          });

          /* Phase 1 → Phase 2 */
          pinTl
            .to(phases[0], { opacity: 0, y: -60, duration: 0.4 })
            .to(badges[0], { opacity: 0.4, duration: 0.2 }, '<')
            .to(badges[1], { opacity: 1, duration: 0.2 }, '<')
            .to(phases[1], { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
            .to({}, { duration: 0.6 }); /* pause */

          /* Phase 2 → Phase 3 */
          pinTl
            .to(phases[1], { opacity: 0, y: -60, duration: 0.4 })
            .to(badges[1], { opacity: 0.4, duration: 0.2 }, '<')
            .to(badges[2], { opacity: 1, duration: 0.2 }, '<')
            .to(phases[2], { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
            .to({}, { duration: 0.6 }); /* pause */
        });
      });

      return () => {
        unsubscribe();
        cancelAnimationFrame(rafId);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="business" className="relative overflow-hidden">
      {/* ═══════════════════════════════════════
          A. "과연 현실적일까요?"
      ═══════════════════════════════════════ */}
      <div className="bg-white pt-[10vw] pb-[6vw]">
        <p className="biz-fade biz-title text-center font-black!">
          과연 현실적일까요?
        </p>
      </div>

      {/* ═══════════════════════════════════════
          B. 다크 섹션 — 사회적 비용
      ═══════════════════════════════════════ */}
      <div className="relative bg-gradient-to-b from-white via-[#2c2c2c] to-[#2c2c2c] pt-[8vw]">
        {/* 제목 */}
        <div className="text-center px-[5%]">
          <p className="biz-fade biz-title-white">
            이동권 박탈로 인해 발생하는 사회적 비용
          </p>
          <div className="biz-fade mt-[2.5vw]">
            <span className="biz-big-prefix">중소도시 당 연간 </span>
            <span className="biz-big-number">310억</span>
          </div>
          <p className="biz-fade biz-small mt-[0.8vw]">
            인구 10만명 미만기준
          </p>
        </div>

        {/* 아이콘 그룹: 복지버스/택시 + 우울증/요양시설 */}
        <div className="biz-fade flex items-center justify-center gap-[4vw] md:gap-[6vw] mt-[5vw] px-[5%]">
          {/* 왼쪽 그룹 */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-[2vw] md:gap-[3vw]">
              <div className="flex flex-col items-center">
                <Image
                  src="/images/busniess/1_welfare-bus-icon.png"
                  alt="복지버스" width={120} height={135}
                  className="w-[clamp(40px,5.5vw,80px)] h-auto"
                />
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/images/busniess/2_welfare-taxi-icon.png"
                  alt="복지택시" width={133} height={116}
                  className="w-[clamp(40px,5.5vw,80px)] h-auto"
                />
              </div>
            </div>
            <p className="biz-icon-label mt-[1.5vw]">복지버스 / 복지택시</p>
            <p className="biz-cost-number mt-[1vw]">연 150억</p>
          </div>

          {/* + 기호 */}
          <span className="biz-plus">+</span>

          {/* 오른쪽 그룹 */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-[2vw] md:gap-[3vw]">
              <div className="flex flex-col items-center">
                <Image
                  src="/images/busniess/3_depression-icon.png"
                  alt="우울증" width={186} height={123}
                  className="w-[clamp(50px,6.5vw,95px)] h-auto"
                />
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/images/busniess/4_nursing-facility-icon.png"
                  alt="요양시설 가속" width={139} height={217}
                  className="w-[clamp(40px,5vw,70px)] h-auto"
                />
              </div>
            </div>
            <p className="biz-icon-label mt-[1.5vw]">우울증 / 요양시설 가속</p>
            <p className="biz-cost-number mt-[1vw]">연 160억</p>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            C. 막대한 예산 투입
        ═══════════════════════════════════════ */}
        <div className="mt-[10vw] px-[5%] pb-[8vw]">
          <p className="biz-fade biz-heading-lg text-center">
            막대한 예산 투입, 그러나 여전한 이동의 고립
          </p>

          <div className="biz-fade text-center mt-[3vw]">
            <p className="biz-body-dark">
              기존 복지버스/무료 택시는 연간 150억원을 투입하지만,
            </p>
            <p className="biz-body-dark mt-[0.5vw]">
              <span>실제 이용률은 </span>
              <span className="biz-body-dark font-bold!">대도심 대중교통 대비 </span>
              <span className="biz-fraction">1/5</span>
              <span> 에 불과합니다.</span>
            </p>
          </div>

          {/* 3 스탯 카드 */}
          <div className="biz-fade grid grid-cols-3 gap-[2vw] md:gap-[3vw] mt-[5vw] max-w-[900px] mx-auto">
            {/* 카드 1: 환승범위 */}
            <div className="text-center">
              <div className="mx-auto w-[clamp(28px,3.5vw,50px)] h-[clamp(28px,3.5vw,50px)] mb-[1.5vw]">
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                  <circle cx="20" cy="16" r="6" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M20 22 L20 30" stroke="white" strokeWidth="2" />
                  <circle cx="20" cy="16" r="2" fill="white" />
                  <path d="M10 36 Q20 28 30 36" stroke="white" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <p className="biz-stat-title">66분 / 600m</p>
              <p className="biz-stat-desc mt-[0.5vw]">환승범위 사실상 불가능</p>
              <p className="biz-stat-desc mt-[0.8vw] hidden md:block">
                최소 1회이상의 환승방식이나 고령
                이동수단으로 활용이 어렵습니다.
              </p>
            </div>
            {/* 카드 2: 소극적 복지예산 */}
            <div className="text-center">
              <div className="mx-auto w-[clamp(28px,3.5vw,50px)] h-[clamp(28px,3.5vw,50px)] mb-[1.5vw]">
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                  <path d="M8 32 L16 20 L24 26 L32 10" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M28 10 L32 10 L32 14" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <p className="biz-stat-title">127.5억 원 낭비</p>
              <p className="biz-stat-desc mt-[0.5vw]">소극적인 복지예산</p>
              <p className="biz-stat-desc mt-[0.8vw] hidden md:block">
                전체 복지 예산의 1인 단위 이동에 대한
                비효율적 투입
              </p>
            </div>
            {/* 카드 3: 생존권 위협 */}
            <div className="text-center">
              <div className="mx-auto w-[clamp(28px,3.5vw,50px)] h-[clamp(28px,3.5vw,50px)] mb-[1.5vw]">
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                  <path d="M8 28 Q14 18 20 20 Q26 22 32 12" stroke="white" strokeWidth="2" fill="none" />
                  <circle cx="20" cy="12" r="4" stroke="white" strokeWidth="1.5" fill="none" />
                  <path d="M16 32 L20 24 L24 32" stroke="white" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <p className="biz-stat-title">생존권의 위협</p>
              <p className="biz-stat-desc mt-[0.5vw]">사회적 고립 가중</p>
              <p className="biz-stat-desc mt-[0.8vw] hidden md:block">
                사계절 이동이 되지 않아 사회적
                고립과 우울증 발생 위험 증가
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          D. 블루 화살표 전환
      ═══════════════════════════════════════ */}
      <div className="biz-fade flex justify-center py-[4vw] bg-white">
        <Image
          src="/images/busniess/5_transition-arrow.png"
          alt="" width={474} height={1292}
          className="w-[clamp(80px,8vw,130px)] h-auto"
          sizes="10vw"
        />
      </div>

      {/* ═══════════════════════════════════════
          E. 교통 복지 예산의 10%만으로
      ═══════════════════════════════════════ */}
      <div className="bg-white pt-[2vw] pb-[6vw] px-[5%]">
        <div className="text-center">
          <p className="biz-reveal biz-title">
            <span>교통 복지 예산의 </span>
            <span className="biz-highlight-blue text-[1.1em]">10%</span>
            <span>만으로</span>
          </p>
          <div className="biz-fade mt-[2.5vw] max-w-[800px] mx-auto">
            <p className="biz-desc">
              <span>1년 교통 복지 예산의 단 </span>
              <span className="biz-highlight-blue font-bold">10%</span>
              <span className="font-bold">만으로 고령자 생활에 맞춘 </span>
              <span className="biz-highlight-blue font-bold">새로운 이동수단 대안을 제공</span>
              <span>할 수 있습니다.</span>
            </p>
            <p className="biz-note mt-[0.8vw]">(150억)</p>
            <p className="biz-note mt-[0.5vw]">
              홍성읍 중심지 600m 반경 고령자 1300명을 대상, 초기 서비스 도입 시뮬레이션
            </p>
          </div>
        </div>

        {/* 3 제품 카드 */}
        <div className="biz-fade grid grid-cols-1 md:grid-cols-3 gap-[3vw] mt-[5vw] max-w-[1100px] mx-auto">
          {PRODUCT_CARDS.map((card) => (
            <div key={card.title} className="flex flex-col items-center">
              {/* 제품 이미지 */}
              <div className="relative w-[60%] md:w-[70%] aspect-square flex items-center justify-center mb-[2vw]">
                <Image
                  src={card.img}
                  alt={card.title}
                  width={card.imgW}
                  height={card.imgH}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 60vw, 25vw"
                />
              </div>
              {/* 글래스 카드 */}
              <div className="biz-glass-card w-full p-[clamp(16px,2vw,28px)]">
                <p className="biz-card-title">{card.title}</p>
                <div className="flex items-baseline gap-[1.5vw] mt-[0.8vw]">
                  <span className="biz-card-qty">{card.qty}</span>
                  <span className="biz-card-price">{card.price} <span className="biz-card-qty">억 원</span></span>
                </div>
                <div className="mt-[1.2vw] space-y-[0.3vw]">
                  {card.lines.map((line, i) => (
                    <p key={i} className="biz-card-desc">
                      {line.text}
                      {line.blue && (
                        <span className="text-[var(--color-blue)] font-medium">{line.blue}</span>
                      )}
                      {line.suffix}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          F. 게다가 자율주행이잖아?
      ═══════════════════════════════════════ */}
      <div className="bg-white pt-[12vw] pb-[8vw] px-[5%]">
        <div className="text-center">
          <p className="biz-reveal biz-revenue-heading">게다가</p>
          <p className="biz-reveal biz-revenue-heading mt-[0.5vw]">자율주행이잖아?</p>

          <p className="biz-fade biz-subtitle mt-[3vw]">
            <span className="font-bold">비활동시간 추가 비즈니스</span>
            <span>를 통한 부가가치 확장</span>
          </p>

          <div className="biz-fade mt-[2vw]">
            <p className="biz-desc">
              <span>케어 업무 이외 </span>
              <span className="biz-highlight-blue font-bold">남는 시간</span>
              <span>, 도심 속 </span>
              <span className="biz-highlight-blue font-bold">업무 확장</span>
              <span>이 가능한</span>
            </p>
            <p className="biz-city-care mt-[1vw]">시티 케어 솔루션</p>
          </div>
        </div>

        {/* 수익 카드 그리드 — 4열 비대칭 */}
        <div className="biz-fade flex flex-wrap md:flex-nowrap gap-[2vw] mt-[5vw] max-w-[1200px] mx-auto items-end">
          {REVENUE_CARDS.map((card, idx) => {
            /* 0: 18%, 1: 19%, 2: 35%, 3: 26% (Figma 비율) */
            const widths = ['w-[48%] md:w-[18%]', 'w-[48%] md:w-[19%]', 'w-full md:w-[35%]', 'w-full md:w-[26%]'];
            return (
              <div key={card.topLabel} className={widths[idx]}>
                {/* 상단 라벨 */}
                <p className="biz-revenue-label mb-[0.8vw]">{card.topLabel}</p>
                {card.note && (
                  <p className="biz-revenue-detail mb-[0.5vw]">{card.note}</p>
                )}

                {/* 이미지 */}
                <div className="relative overflow-hidden rounded-[clamp(12px,1.67vw,24px)]">
                  <Image
                    src={card.img}
                    alt={card.topLabel}
                    width={card.imgW}
                    height={card.imgH}
                    className="biz-revenue-img"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>

                {/* 금액 */}
                {card.daily && (
                  <p className="biz-revenue-daily mt-[1vw]">{card.daily}</p>
                )}
                {card.annual && (
                  <p className="mt-[0.5vw]">
                    <span className="biz-revenue-annual">연 {card.annual} </span>
                    <span className="biz-revenue-unit">억 원</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          G. 로컬 실증에서 글로벌 확장까지 — Pin 애니메이션
      ═══════════════════════════════════════ */}
      <div className="bg-white pt-[8vw] px-[5%]">
        <div className="text-center">
          <p className="biz-reveal biz-title">
            로컬 실증에서 글로벌 확장까지
          </p>
          <p className="biz-fade biz-expansion-sub mt-[2vw] max-w-[800px] mx-auto">
            <span className="biz-highlight-blue font-bold">10%</span>
            <span className="font-bold"> 예산 전환을 시작으로, </span>
            <span>5년간 </span>
            <span className="biz-highlight-blue font-bold">2600%</span>
            <span className="font-bold"> 확장성</span>
            <span>을 이루는 솔루션</span>
          </p>
        </div>
      </div>

      {/* Pin 컨테이너 */}
      <div
        ref={pinRef}
        className="relative bg-white min-h-screen flex flex-col justify-start pt-[4vw] px-[5%]"
      >
        {/* 연도 뱃지 행 */}
        <div className="flex items-center justify-center gap-[3vw] mb-[4vw]">
          {PHASES.map((p) => (
            <span key={p.year} className="year-badge-item biz-year-badge">
              {p.year}
            </span>
          ))}
        </div>

        {/* 페이즈 콘텐츠 (절대 포지션으로 겹침) */}
        <div className="relative flex-1 min-h-[60vh]">
          {PHASES.map((p, idx) => (
            <div
              key={p.year}
              className={`expansion-phase ${idx === 0 ? '' : 'absolute inset-0'}`}
            >
              {/* 페이즈 설명 */}
              <p className="biz-phase-desc text-center mb-[2vw]">
                {p.desc.split(p.descBlue).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-[var(--color-blue)]">{p.descBlue}</span>
                    )}
                  </span>
                ))}
              </p>

              {/* 스탯 행 */}
              <div className="flex items-center justify-center gap-[4vw] md:gap-[6vw] mb-[3vw]">
                <div className="text-center">
                  <p className="biz-phase-stat">{p.km}</p>
                </div>
                <div className="text-center">
                  <p className="biz-phase-stat">{p.units}</p>
                </div>
                <div className="text-center">
                  <p className="biz-phase-stat">{p.people}</p>
                </div>
              </div>

              {/* 지도 + 재정 카드 */}
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-[4vw] max-w-[1000px] mx-auto">
                {/* 지도 이미지 */}
                <div className="w-[50%] md:w-[35%] flex-shrink-0">
                  <Image
                    src={p.map}
                    alt={`${p.year} 서비스 영역`}
                    width={p.mapW}
                    height={p.mapH}
                    className="w-full h-auto"
                    sizes="(max-width: 768px) 50vw, 30vw"
                  />
                </div>

                {/* 재정 카드 */}
                <div className="biz-glass-card p-[clamp(16px,2vw,28px)] w-full md:w-[55%]">
                  {/* 바 차트 */}
                  <div className="flex items-end gap-[clamp(4px,0.5vw,8px)] h-[clamp(80px,8vw,120px)] mb-[1.5vw]">
                    {p.finance.items.map((item, i) => {
                      const heights = p.finance.items.map((_, j) =>
                        30 + ((p.finance.items.length - j) / p.finance.items.length) * 70,
                      );
                      return (
                        <div key={i} className="flex flex-col items-center flex-1">
                          <div
                            className="w-full rounded-t-[4px]"
                            style={{
                              height: `${heights[i]}%`,
                              backgroundColor: item.color,
                              opacity: 0.85,
                            }}
                          />
                          <p className="biz-fin-label mt-[0.3vw] text-center whitespace-nowrap">
                            {item.label}
                          </p>
                          <p className="biz-fin-value text-center">{item.value}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* 태그 */}
                  <p className="biz-fin-note">{p.finance.tag}</p>

                  {/* 토탈 */}
                  <p className="biz-fin-total mt-[1vw]">{p.finance.total}</p>

                  {/* 연간 / 5년 누적 */}
                  <div className="flex gap-[3vw] mt-[1vw]">
                    <div>
                      <p className="biz-fin-label">교통복지비 연</p>
                      <p className="biz-fin-value font-bold">{p.finance.annual} 억 원</p>
                    </div>
                    <div>
                      <p className="biz-fin-label">5년누적</p>
                      <p className="biz-fin-value font-bold">{p.finance.fiveYear} 억 원</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pin 이후 여백 */}
      <div className="h-[8vw] bg-white" />
    </section>
  );
}
