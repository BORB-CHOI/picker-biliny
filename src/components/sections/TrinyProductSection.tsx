"use client";

import { useRef } from "react";
import Image from "next/image";
import { useAutoplayVideo } from "@/hooks/useAutoplayVideo";
import { useProductAnimations } from "@/hooks/useProductAnimations";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { InfinityIcon } from "../ui/icons";
import { getHeaderOffset, smoothScrollTo } from "@/lib/smoothScroll";

export function TrinyProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const turningRef = useAutoplayVideo();

  useProductAnimations(sectionRef);

  return (
    <section ref={sectionRef} id="triny" className="relative mt-[16cqw]">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 0: # TRINY 타이틀 (데스크톱)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="hidden sm:block">
        <div className="b-fade section-title-row">
          <div className="flex gap-2">
            <div className="section-bar" />
            <div className="section-bar" />
            <div className="section-bar" />
          </div>
          <h2 className="product-section-title">TRINY</h2>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          데스크톱 전용 본문 (sm 이상)
      ═══════════════════════════════════════ */}
      <div className="hidden sm:block">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 1: LINE-UP 스펙 소개
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="product-container relative">
          <div className="flex flex-row gap-[clamp(24px,3.3cqw,48px)] items-start">
            {/* 좌측 텍스트 — Figma 기준 아래로 내려옴 */}
            <div className="w-[38%] min-w-0 shrink-0 pt-[clamp(160px,20cqw,290px)]">
              <p className="b-fade product-label text-(--color-primary)">LINE-UP II</p>
              <p className="b-reveal product-sub-heading mt-[clamp(8px,0.7cqw,10px)]">
                이동의 자유를 나누는
              </p>
              <h3 className="b-reveal product-heading mt-[clamp(4px,0.4cqw,6px)]">
                스마트 모빌리티 생태계
              </h3>
              <p className="b-reveal product-name mt-[clamp(16px,2.2cqw,32px)]">
                다목적 플랫폼 &lsquo;트리니&rsquo;
              </p>
              <div className="b-fade product-desc mt-[clamp(8px,1.1cqw,16px)]">
                <p>
                  초소형 다용성 모빌리티 플랫폼으로, 승객용 캐빈 결합과 로봇암 장착 등을 통해 도시
                  운반 및 관리 등 도시 내 이동수요를 대응합니다.
                </p>
              </div>

              {/* 특장점 목록 */}
              <div className="flex flex-col gap-[clamp(10px,1.3cqw,18px)] mt-[clamp(20px,2.8cqw,40px)]">
                <div className="b-stagger product-feature-item">
                  <CheckIcon />
                  <p className="product-feature-text">
                    정해진 길을 자동으로 따라가는{" "}
                    <span className="font-bold">스마트 레인 주행</span>
                  </p>
                </div>
                <div className="b-stagger product-feature-item">
                  <CheckIcon />
                  <p className="product-feature-text">
                    집 앞에서 목적지까지 <span className="font-bold">기다림 없는</span> 이동 경험
                  </p>
                </div>
                <div className="b-stagger product-feature-item">
                  <CheckIcon />
                  <p className="product-feature-text">
                    사용자 건강/기분 <span className="font-bold">데이터를 기반으로 한 여정</span>{" "}
                    제안
                  </p>
                </div>
              </div>
            </div>

            {/* 우측 제품 이미지 — div 래퍼 기준 레이아웃, 이미지 우측 정렬 */}
            <div className="flex-1 min-w-0 b-from-right">
              <div className="relative aspect-[4/5] scale-80">
                <Image
                  src="/images/triny/1_lineup-hero.png"
                  alt="트리니 제품 이미지"
                  fill
                  className="object-contain object-right-bottom translate-x-50 translate-y-40"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 제품 전환 탭 — product-container 기준 absolute */}
          <div className="absolute top-80 right-[5rem] z-20 flex gap-2 bg-[#f0f1f5] rounded-full p-1">
            <a
              href="#biliny"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("#biliny", getHeaderOffset());
              }}
              className="px-[clamp(12px,1.4cqw,20px)] py-[clamp(4px,0.5cqw,8px)] rounded-full text-[clamp(10px,0.97cqw,14px)] font-medium text-[#8a8a9a] hover:text-(--color-text) transition-colors"
            >
              BILINY (케어형)
            </a>
            <span className="px-[clamp(12px,1.4cqw,20px)] py-[clamp(4px,0.5cqw,8px)] rounded-full bg-white text-[clamp(10px,0.97cqw,14px)] font-bold text-(--color-primary) shadow-sm">
              TRINY (플랫폼)
            </span>
          </div>
          {/* 스펙 — 3열 그리드: 라벨(우정렬) | 숫자/아이콘(중앙) | 단위(좌정렬, 세로축 고정) */}
          <div className="b-fade absolute left-[39%] top-[83%] -translate-y-1/2 grid grid-cols-[auto_auto_auto] gap-x-[clamp(8px,1cqw,16px)] gap-y-[clamp(2px,0.3cqw,4px)] items-baseline">
            <span className="product-spec-label justify-self-end">1회 충전 주행거리</span>
            <span className="product-spec-number justify-self-end">250</span>
            <span className="product-spec-unit justify-self-start">km</span>

            <span className="product-spec-label justify-self-end self-center translate-y-0.5">
              무료 탑승 횟수
            </span>
            <InfinityIcon
              className="inline-block h-[4.5em] w-auto justify-self-center self-center"
              fill="#202020"
              size={72}
            />
            <span className="product-spec-unit justify-self-start self-center">회</span>

            <span className="product-spec-label justify-self-end">대당가격</span>
            <span className="product-spec-number justify-self-end">500</span>
            <span className="product-spec-unit justify-self-start">만원</span>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 2: 모든 면으로 보호
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-[12cqw]">
          <div className="product-container text-center">
            <h3 className="b-reveal product-heading">모든 면으로 보호</h3>
            <p className="b-fade product-sub mt-[clamp(8px,1.1cqw,16px)]">
              어떤 계절과 상황에도 대응이 강한
            </p>
            <div className="flex flex-col mt-[clamp(32px,4.4cqw,64px)] max-w-[clamp(400px,65cqw,940px)] mx-auto">
              <div className="b-scale">
                <Image
                  src="/images/triny/2_protect-front.png"
                  alt="트리니 전면 보호 디자인"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>
              <div className="b-scale">
                <Image
                  src="/images/triny/3_protect-rear.png"
                  alt="트리니 후면 보호 디자인"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 3: 완전한 대칭
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-[2cqw]">
          <div className="product-container text-center">
            <div className="b-scale relative ">
              <Image
                src="/images/triny/4_symmetry.png"
                alt="트리니 완전 대칭 디자인 — 전면, 측면, 후면"
                width={1600}
                height={600}
                className="w-full h-auto"
                sizes="100vw"
              />
              <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <h3 className="b-reveal product-heading">완전한 대칭</h3>
                <p className="b-fade product-sub mt-[clamp(8px,1.1cqw,16px)]">
                  극단적으로 효율적인
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 4: 쉬운 용도 변경
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-[2cqw]">
          <div className="product-container text-center">
            <div className="b-scale relative max-w-[clamp(400px,55cqw,800px)] mx-auto">
              <Image
                src="/images/triny/5_modular.png"
                alt="트리니 용도 변경 — 다목적 플랫폼"
                width={1000}
                height={1200}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <h3 className="b-reveal product-heading">쉬운 용도 변경</h3>
                <p className="b-fade product-sub mt-[clamp(8px,1.1cqw,16px)]">
                  다양한 목적으로 사용범위가 넓은
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 5: 1인승에서 4인승까지
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="-mt-[4cqw]">
          <div className="product-container text-center">
            <div className="b-scale relative max-w-[clamp(400px,55cqw,800px)] mx-auto">
              <Image
                src="/images/triny/6_capacity.png"
                alt="트리니 1인승~4인승 탑승 공간"
                width={1000}
                height={1200}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <h3 className="b-reveal product-heading">1인승에서 4인승까지</h3>
                <p className="b-fade product-sub mt-[clamp(8px,1.1cqw,16px)]">
                  어린아이부터 고령자까지 모두를 품는
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 6: 넉넉한 내부공간
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-[clamp(60px,8.3cqw,120px)]">
          <div className="product-container text-center">
            <div className="b-scale relative mt-[clamp(32px,4.4cqw,64px)] max-w-[clamp(400px,55cqw,800px)] mx-auto">
              <Image
                src="/images/triny/7_interior.png"
                alt="트리니 넉넉한 적재 공간"
                width={900}
                height={1100}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <h3 className="b-reveal product-heading">넉넉한 내부공간</h3>
                <p className="b-fade product-sub mt-[clamp(8px,1.1cqw,16px)]">
                  여행, 운송도 거뜬한
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 7: 일까지 잘하는 트리니 플랫폼
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="-mt-[4cqw]">
          <div className="product-container text-center">
            <div className="b-scale relative max-w-[clamp(400px,55cqw,800px)] mx-auto">
              <Image
                src="/images/triny/8_platform.png"
                alt="트리니 플랫폼 — 캐빈 없이 프레임만"
                width={1000}
                height={1000}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <h3 className="b-reveal product-heading whitespace-nowrap">
                  일까지 잘하는 트리니 플랫폼
                </h3>
                <p className="b-fade product-sub mt-[clamp(8px,1.1cqw,16px)]">
                  무엇을 붙여도 그에 맞게 일을 수행하는
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 8: 인프라를 자동 관리하는 솔루션
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-[clamp(60px,8.3cqw,120px)]">
          <div className="product-container text-center"></div>
          <div className="product-container">
            <div className="flex flex-col mt-[clamp(32px,4.4cqw,64px)] max-w-[clamp(400px,65cqw,940px)] mx-auto">
              <div className="b-scale relative">
                <Image
                  src="/images/triny/9_road-marking.png"
                  alt="트리니 도로선 보수 작업"
                  width={1000}
                  height={1000}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <h3 className="b-reveal product-heading">인프라를 자동 관리하는 솔루션</h3>
                  <p className="b-fade product-sub mt-[clamp(8px,1.1cqw,16px)] text-center">
                    도로선 보수, 청소, 도로 검사까지
                  </p>
                </div>
              </div>
              <div className="b-scale mt-10">
                <Image
                  src="/images/triny/10_robot-arm.png"
                  alt="트리니 로봇암 도로 작업"
                  width={1000}
                  height={1000}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>
              <div className="b-scale ">
                <Image
                  src="/images/triny/11_infra-manage.png"
                  alt="트리니 인프라 관리 로봇"
                  width={1000}
                  height={1000}
                  className="w-full h-auto -translate-y-100"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 9: 360° 트리니 둘러보기
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="-mt-70">
          <div className="relative product-container text-center">
            <div className="relative b-fade z-10 mx-auto w-fit mb-[clamp(-40px,-4.5cqw,-60px)]">
              <Image
                src="/images/biliny/2_360-orbit.png"
                alt=""
                width={618}
                height={100}
                className="w-[clamp(15px,43cqw,618px)] h-auto mx-auto translate-y-1/2"
                sizes="(max-width: 768px) 80vw, 43vw"
                aria-hidden="true"
              />
              {/* 텍스트를 궤도 위에 absolute 배치 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="product-heading">360°</p>
                <h3 className="product-heading">트리니 둘러보기</h3>
              </div>
            </div>
            <div className="b-scale w-[120%] -ml-[10%]">
              <video
                ref={turningRef}
                src="/videos/triny/turning.mp4"
                muted
                loop
                playsInline
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 10: 단지 내 모든 길을 돌아다닐 수 있는 사이즈
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="w-[60%] mx-auto mt-[20cqw] overflow-hidden">
          <div className="product-container text-center">
            <h3 className="b-reveal product-heading">단지 내 모든 길을 돌아다닐 수 있는 사이즈</h3>
          </div>
          <div className="b-scale mt-[clamp(32px,4.4cqw,64px)]">
            <Image
              src="/images/triny/12_scene-complex.png"
              alt="단지 내 트리니 주행 장면"
              width={800}
              height={1000}
              className="w-[120cqw] h-auto mx-auto"
              sizes="120vw"
            />
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 11: 도면/치수
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-[clamp(60px,8.3cqw,120px)] pb-[clamp(60px,8.3cqw,120px)]">
          <div className="product-container">
            <div className="b-scale">
              <Image
                src="/images/triny/13_dimensions.png"
                alt="트리니 도면 — 1200×1850×1550mm"
                width={1400}
                height={900}
                className="w-full h-auto"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          모바일 전용 본문 (< sm)
      ═══════════════════════════════════════ */}
      <div className="block sm:hidden px-[10%] pb-16 tracking-[0.11em]">
        {/* ━━━ # TRINY 타이틀 (모바일) ━━━ */}
        <div className="b-fade section-title-row gap-2!">
          <div className="flex gap-1">
            <div className="section-bar-m h-3.25!" />
            <div className="section-bar-m h-3.25!" />
            <div className="section-bar-m h-3.25!" />
          </div>
          <h2 className="product-section-title text-[18px]!">TRINY</h2>
        </div>

        {/* LINE-UP */}
        <div className="mt-4">
          <p className="b-fade text-sm font-bold tracking-widest text-[var(--color-primary)]">
            LINE-UP II
          </p>
          <p className="b-reveal mt-1 font-bold text-[var(--color-text)]">
            다목적 플랫폼 &lsquo;트리니&rsquo;
          </p>
          <p className="b-fade mt-1 text-[11px] text-[var(--color-feature-text)]">
            초소형 다용성 모빌리티 플랫폼으로,
            <br />
            <span className="font-bold">승객용 캐빈 결합과 로봇암 장착 등</span>을 통해
            <br /> <span className="font-bold">도시 운반 및 관리 등 도시 내 이동수요를 대응</span>
            합니다.
          </p>
        </div>

        {/* 제품 이미지 + 스펙 (이미지 위 좌측 중앙 absolute 배치) */}
        <div className="b-from-right mt-6 relative">
          <div className="translate-x-30">
            <Image
              src="/images/triny/1_lineup-hero-2.png"
              alt="트리니 제품 이미지"
              width={2000}
              height={2500}
              className="h-auto w-[68%]"
              sizes="100vw "
              priority
            />
          </div>
          <div className="absolute left-0 top-[42%] -translate-y-1/2 grid grid-cols-[auto_auto_auto] gap-x-1 gap-y-2 items-baseline">
            <span className="text-[9px] text- text-(--color-text-secondary) justify-self-end">
              1회 충전 주행거리
            </span>
            <span className="text-xl font-bold text-foreground justify-self-end">250</span>
            <span className="text-xs font-bold text-(--color-text-secondary) justify-self-start">
              km
            </span>

            <span className="text-[9px] text-(--color-text-secondary) justify-self-end self-center translate-y-0.5">
              무료 탑승 횟수
            </span>
            <InfinityIcon
              className="inline-block h-9 w-auto justify-self-center self-center"
              fill="#202020"
              size={29}
            />
            <span className="text-xs font-bold text-(--color-text-secondary) justify-self-start self-center">
              회
            </span>

            <span className="text-[8px] text-(--color-text-secondary) justify-self-end">
              대당가격
            </span>
            <span className="text-xl font-bold text-foreground justify-self-end">500</span>
            <span className="text-xs font-bold text-(--color-text-secondary) justify-self-start">
              만원
            </span>
          </div>
        </div>

        {/* 특장점 목록 — PC와 동일 */}
        <div className="mt-4 flex flex-col gap-3 w-fit mx-auto">
          <div className="b-stagger product-feature-item">
            <CheckIcon />
            <p className="product-feature-text">
              정해진 길을 자동으로 따라가는 <span className="font-bold">스마트 레인 주행</span>
            </p>
          </div>
          <div className="b-stagger product-feature-item">
            <CheckIcon />
            <p className="product-feature-text">
              집 앞에서 목적지까지 <span className="font-bold">기다림 없는</span> 이동 경험
            </p>
          </div>
          <div className="b-stagger product-feature-item">
            <CheckIcon />
            <p className="product-feature-text">
              사용자 건강/기분 <span className="font-bold">데이터를 기반으로 한 여정</span> 제안
            </p>
          </div>
        </div>

        {/* 모든 면으로 보호 */}
        <div className="mt-20 flex flex-col">
          <h3 className="b-reveal text-[15px] font-bold text-foreground text-center">
            모든 면으로 보호
          </h3>
          <p className="b-fade text-[11px] text-(--color-text-secondary) text-center">
            어떤 계절과 상황에도 대응이 강한
          </p>
          <Image
            src="/images/triny/2_protect-front.png"
            alt="트리니 전면 보호"
            width={1200}
            height={800}
            className="b-fade w-full h-auto mt-8"
            sizes="100vw"
          />
          <Image
            src="/images/triny/3_protect-rear.png"
            alt="트리니 후면 보호"
            width={1200}
            height={800}
            className="b-fade w-full h-auto"
            sizes="100vw"
          />
        </div>

        {/* 완전한 대칭 (이미지 위 상단 중앙 overlay) */}
        <div className="-mt-5 relative">
          <div className="relative left-1/2 -translate-x-1/2 w-[120vw]">
            <Image
              src="/images/triny/4_symmetry.png"
              alt="트리니 완전 대칭 디자인"
              width={1600}
              height={600}
              className="b-fade w-full h-auto"
              sizes="120vw"
            />
          </div>
          <div className="absolute inset-x-0 top-20 text-center">
            <h3 className="b-reveal text-[15px] font-bold text-foreground">완전한 대칭</h3>
            <p className="b-fade text-[11px] text-(--color-text-secondary) mt-1">
              극단적으로 효율적인
            </p>
          </div>
        </div>

        {/* 쉬운 용도 변경 (이미지 위 상단 중앙 overlay) */}
        <div className="relative">
          <div className="relative left-1/2 -translate-x-1/2 w-full">
            <Image
              src="/images/triny/5_modular.png"
              alt="트리니 용도 변경"
              width={1000}
              height={1200}
              className="b-fade w-full h-auto"
              sizes="110vw"
            />
          </div>
          <div className="absolute inset-x-0 top-12 text-center">
            <h3 className="b-reveal text-[15px] font-bold text-foreground">쉬운 용도 변경</h3>
            <p className="b-fade text-[11px] text-(--color-text-secondary) mt-1">
              다양한 목적으로 사용범위가 넓은
            </p>
          </div>
        </div>

        {/* 1인승에서 4인승까지 (이미지 위 상단 중앙 overlay) */}
        <div className="-mt-15 relative">
          <Image
            src="/images/triny/6_capacity.png"
            alt="1~4인승 탑승"
            width={1000}
            height={1200}
            className="b-fade w-full h-auto"
            sizes="100vw"
          />
          <div className="absolute inset-x-0 top-15 text-center">
            <h3 className="b-reveal text-[15px] font-bold text-foreground">1인승에서 4인승까지</h3>
            <p className="b-fade text-[11px] text-(--color-text-secondary) mt-1">
              어린아이부터 고령자까지 모두를 품는
            </p>
          </div>
        </div>

        {/* 넉넉한 내부공간 (이미지 위 상단 중앙 overlay) */}
        <div className="-mt-2 relative">
          <Image
            src="/images/triny/7_interior.png"
            alt="트리니 내부공간"
            width={900}
            height={1100}
            className="b-fade w-full h-auto"
            sizes="100vw"
          />
          <div className="absolute inset-x-0 top-9 text-center">
            <h3 className="b-reveal text-[15px] font-bold text-foreground">넉넉한 내부공간</h3>
            <p className="b-fade text-[11px] text-(--color-text-secondary) mt-1">
              여행, 운송도 거뜬한
            </p>
          </div>
        </div>

        {/* 일까지 잘하는 트리니 플랫폼 (이미지 위 상단 중앙 overlay) */}
        <div className="-mt-6 relative">
          <Image
            src="/images/triny/8_platform.png"
            alt="트리니 플랫폼"
            width={1000}
            height={1000}
            className="b-fade w-full h-auto"
            sizes="100vw"
          />
          <div className="absolute inset-x-0 top-20 text-center">
            <h3 className="b-reveal text-[15px] font-bold text-foreground">
              일까지 잘하는 트리니 플랫폼
            </h3>
            <p className="b-fade text-[11px] text-(--color-text-secondary) mt-1">
              무엇을 붙여도 그에 맞게 일을 수행하는
            </p>
          </div>
        </div>

        {/* 인프라 자동 관리 (첫 이미지 위 상단 중앙 overlay) */}
        <div className="-mt-4 flex flex-col gap-0">
          <div className="relative">
            <Image
              src="/images/triny/9_road-marking.png"
              alt="도로선 보수"
              width={1000}
              height={1000}
              className="b-fade w-full h-auto"
              sizes="100vw"
            />
            <div className="absolute inset-x-0 top-4 text-center">
              <h3 className="b-reveal text-[15px] font-bold text-foreground">
                인프라를 자동 관리하는 솔루션
              </h3>
              <p className="b-fade text-[11px] text-(--color-text-secondary) mt-1">
                도로선 보수, 청소, 도로 검사까지
              </p>
            </div>
          </div>
          <div className="relative left-1/2 -translate-x-[40%] w-[110%]">
            <Image
              src="/images/triny/10_robot-arm.png"
              alt="로봇암 도로 작업"
              width={1000}
              height={1000}
              className="b-fade w-full h-auto "
              sizes="100vw"
            />
          </div>
          <div className="-mt-40 relative left-1/2 -translate-x-1/2 w-[110%]">
            <Image
              src="/images/triny/11_infra-manage.png"
              alt="인프라 관리 로봇"
              width={1000}
              height={1000}
              className="b-fade w-full h-auto"
              sizes="110vw"
            />
          </div>
        </div>

        {/* 360° 트리니 둘러보기 (비디오 위 상단 중앙 overlay + orbit ring) */}
        <div className="mt-16 relative">
          <div className="relative left-1/2 -translate-x-1/2 w-[150%]">
            <video
              src="/videos/triny/turning.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="b-fade w-full h-auto"
            />
          </div>
          <div className="absolute inset-x-0 top-[5%] b-fade z-10">
            <Image
              src="/images/biliny/2_360-orbit.png"
              alt=""
              width={618}
              height={100}
              className="w-[60%] h-auto mx-auto translate-y-1/2"
              sizes="60vw"
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[15px] font-bold text-foreground">360°</p>
              <h3 className="text-[15px] font-bold text-foreground">트리니 둘러보기</h3>
            </div>
          </div>
        </div>

        {/* 단지 내 모든 길 */}
        <div className="mt-16 flex flex-col gap-1">
          <h3 className="b-reveal text-[15px] font-bold text-foreground text-center">
            단지 내 모든 길을 돌아다닐 수 있는 사이즈
          </h3>
          <div className="relative left-1/2 -translate-x-1/2 w-screen mt-2">
            <Image
              src="/images/triny/12_scene-complex.png"
              alt="단지 내 트리니"
              width={800}
              height={1000}
              className="b-fade w-full h-auto"
              sizes="100vw"
            />
          </div>
        </div>

        {/* 도면 */}
        <div className="-mt-4 relative left-1/2 -translate-x-1/2 w-screen">
          <Image
            src="/images/triny/13_dimensions-2.png"
            alt="트리니 도면"
            width={1400}
            height={900}
            className="b-fade w-full h-auto"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
