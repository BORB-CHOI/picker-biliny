'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useAutoplayVideo } from '@/hooks/useAutoplayVideo';
import { useProductAnimations } from '@/hooks/useProductAnimations';
import { CheckIcon } from '@/components/ui/CheckIcon';

export function TrinyProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const turningRef = useAutoplayVideo();

  useProductAnimations(sectionRef);

  return (
    <section ref={sectionRef} id="triny" className="relative overflow-x-clip">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 0: # TRINY 타이틀
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="b-fade section-title-row">
        <div className="flex gap-2">
          <div className="section-bar" />
          <div className="section-bar" />
          <div className="section-bar" />
        </div>
        <h2 className="product-section-title">TRINY</h2>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 1: LINE-UP 스펙 소개
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="product-container relative">
        <div className="flex flex-col lg:flex-row gap-[clamp(24px,3.3vw,48px)] items-start">
          {/* 좌측 텍스트 — Figma 기준 아래로 내려옴 */}
          <div className="lg:w-[38%] min-w-0 shrink-0 lg:pt-[clamp(160px,20vw,290px)]">
            <p className="b-fade product-label text-(--color-primary)">LINE-UP</p>
            <p className="b-reveal product-sub-heading mt-[clamp(8px,0.7vw,10px)]">
              이동의 자유를 나누는
            </p>
            <h3 className="b-reveal product-heading mt-[clamp(4px,0.4vw,6px)]">
              스마트 모빌리티 생태계
            </h3>
            <p className="b-reveal product-name mt-[clamp(16px,2.2vw,32px)]">
              다목적 플랫폼 &lsquo;트리니&rsquo;
            </p>
            <div className="b-fade product-desc mt-[clamp(8px,1.1vw,16px)]">
              <p>
                초소형 다용성 모빌리티 플랫폼으로, 캐빈 결합과 로봇암 장착 등을 통해 도시 관리의
                모든 수요를 대응합니다.
              </p>
            </div>

            {/* 특장점 목록 */}
            <div className="flex flex-col gap-[clamp(10px,1.3vw,18px)] mt-[clamp(20px,2.8vw,40px)]">
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
          </div>

          {/* 우측 제품 이미지 — div 래퍼 기준 레이아웃, 이미지 우측 정렬 */}
          <div className="flex-1 min-w-0 b-from-right lg:-mr-[5rem]">
            <div className="relative aspect-[4/5] lg:scale-90 lg:origin-right">
              <Image
                src="/images/triny/1_lineup-hero.png"
                alt="트리니 제품 이미지"
                fill
                className="object-contain object-right-bottom"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* 스펙 — desktop absolute */}
        <div className="b-fade hidden lg:flex flex-col absolute left-[37%] top-[63%] -translate-y-1/2">
          <div className="product-spec-row">
            <span className="product-spec-label">1회 충전 주행거리</span>
            <div className="flex items-baseline gap-[clamp(4px,0.4vw,6px)]">
              <span className="product-spec-number">250</span>
              <span className="product-spec-unit">km</span>
            </div>
          </div>
          <div className="product-spec-row">
            <span className="product-spec-label">무료 탑승 횟수</span>
            <div className="flex items-baseline gap-[clamp(4px,0.4vw,6px)]">
              <span className="product-spec-number">∞</span>
              <span className="product-spec-unit">회</span>
            </div>
          </div>
          <div className="product-spec-row">
            <span className="product-spec-label">대당가격</span>
            <div className="flex items-baseline gap-[clamp(4px,0.4vw,6px)]">
              <span className="product-spec-number">500</span>
              <span className="product-spec-unit">만원</span>
            </div>
          </div>
        </div>
        {/* 모바일 스펙 */}
        <div className="b-fade flex lg:hidden flex-col gap-[clamp(8px,1.1vw,16px)] mt-[clamp(20px,2.8vw,40px)]">
          <div className="product-spec-row">
            <span className="product-spec-label">1회 충전 주행거리</span>
            <div className="flex items-baseline gap-[clamp(4px,0.4vw,6px)]">
              <span className="product-spec-number">250</span>
              <span className="product-spec-unit">km</span>
            </div>
          </div>
          <div className="product-spec-row">
            <span className="product-spec-label">무료 탑승 횟수</span>
            <div className="flex items-baseline gap-[clamp(4px,0.4vw,6px)]">
              <span className="product-spec-number">∞</span>
              <span className="product-spec-unit">회</span>
            </div>
          </div>
          <div className="product-spec-row">
            <span className="product-spec-label">대당가격</span>
            <div className="flex items-baseline gap-[clamp(4px,0.4vw,6px)]">
              <span className="product-spec-number">500</span>
              <span className="product-spec-unit">만원</span>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 2: 모든 면으로 보호
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(60px,8.3vw,120px)]">
        <div className="product-container text-center">
          <h3 className="b-reveal product-heading">모든 면으로 보호</h3>
          <p className="b-fade product-sub mt-[clamp(8px,1.1vw,16px)]">
            어떤 계절과 상황에도 대응이 강한
          </p>
          <div className="flex flex-col gap-[clamp(16px,2.2vw,32px)] mt-[clamp(32px,4.4vw,64px)] max-w-[clamp(400px,65vw,940px)] mx-auto">
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
      <div className="mt-[clamp(60px,8.3vw,120px)]">
        <div className="product-container text-center">
          <h3 className="b-reveal product-heading">완전한 대칭</h3>
          <p className="b-fade product-sub mt-[clamp(8px,1.1vw,16px)]">극단적으로 효율적인</p>
          <div className="b-scale mt-[clamp(32px,4.4vw,64px)]">
            <Image
              src="/images/triny/4_symmetry.png"
              alt="트리니 완전 대칭 디자인 — 전면, 측면, 후면"
              width={1600}
              height={600}
              className="w-full h-auto"
              sizes="100vw"
            />
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 4: 쉬운 용도 변경
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(60px,8.3vw,120px)]">
        <div className="product-container text-center">
          <h3 className="b-reveal product-heading">쉬운 용도 변경</h3>
          <p className="b-fade product-sub mt-[clamp(8px,1.1vw,16px)]">
            다양한 목적으로 사용범위가 넓은
          </p>
          <div className="b-scale mt-[clamp(32px,4.4vw,64px)] max-w-[clamp(400px,55vw,800px)] mx-auto">
            <Image
              src="/images/triny/5_modular.png"
              alt="트리니 용도 변경 — 다목적 플랫폼"
              width={1000}
              height={1200}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 5: 1인승에서 4인승까지
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(60px,8.3vw,120px)]">
        <div className="product-container text-center">
          <h3 className="b-reveal product-heading">1인승에서 4인승까지</h3>
          <p className="b-fade product-sub mt-[clamp(8px,1.1vw,16px)]">
            어린아이부터 고령자까지 모두를 품는
          </p>
          <div className="b-scale mt-[clamp(32px,4.4vw,64px)] max-w-[clamp(400px,55vw,800px)] mx-auto">
            <Image
              src="/images/triny/6_capacity.png"
              alt="트리니 1인승~4인승 탑승 공간"
              width={1000}
              height={1200}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 6: 넉넉한 내부공간
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(60px,8.3vw,120px)]">
        <div className="product-container text-center">
          <h3 className="b-reveal product-heading">넉넉한 내부공간</h3>
          <p className="b-fade product-sub mt-[clamp(8px,1.1vw,16px)]">여행, 운송도 거뜬한</p>
          <div className="b-scale mt-[clamp(32px,4.4vw,64px)] max-w-[clamp(400px,55vw,800px)] mx-auto">
            <Image
              src="/images/triny/7_interior.png"
              alt="트리니 넉넉한 적재 공간"
              width={900}
              height={1100}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 7: 일까지 잘하는 트리니 플랫폼
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(60px,8.3vw,120px)]">
        <div className="product-container text-center">
          <h3 className="b-reveal product-heading">일까지 잘하는 트리니 플랫폼</h3>
          <p className="b-fade product-sub mt-[clamp(8px,1.1vw,16px)]">
            무엇을 붙여도 그에 맞게 일을 수행하는
          </p>
          <div className="b-scale mt-[clamp(32px,4.4vw,64px)] max-w-[clamp(400px,55vw,800px)] mx-auto">
            <Image
              src="/images/triny/8_platform.png"
              alt="트리니 플랫폼 — 캐빈 없이 프레임만"
              width={1000}
              height={1000}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 8: 인프라를 자동 관리하는 솔루션
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(60px,8.3vw,120px)]">
        <div className="product-container text-center">
          <h3 className="b-reveal product-heading">인프라를 자동 관리하는 솔루션</h3>
          <p className="b-fade product-sub mt-[clamp(8px,1.1vw,16px)]">
            도로선 보수, 청소, 도로 검사까지
          </p>
        </div>
        <div className="product-container">
          <div className="flex flex-col gap-[clamp(40px,5.5vw,80px)] mt-[clamp(32px,4.4vw,64px)] max-w-[clamp(400px,65vw,940px)] mx-auto">
            <div className="b-scale">
              <Image
                src="/images/triny/9_road-marking.png"
                alt="트리니 도로선 보수 작업"
                width={1000}
                height={1000}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
            </div>
            <div className="b-scale">
              <Image
                src="/images/triny/10_robot-arm.png"
                alt="트리니 로봇암 도로 작업"
                width={1000}
                height={1000}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
            </div>
            <div className="b-scale">
              <Image
                src="/images/triny/11_infra-manage.png"
                alt="트리니 인프라 관리 로봇"
                width={1000}
                height={1000}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 9: 360° 트리니 둘러보기
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(60px,8.3vw,120px)]">
        <div className="relative product-container text-center">
          <div className="b-fade z-10 mb-[clamp(16px,2.2vw,32px)]">
            <p className="product-heading">360°</p>
            <h3 className="product-heading">트리니 둘러보기</h3>
          </div>
          <div className="b-scale max-w-[clamp(400px,60vw,900px)] mx-auto">
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
      <div className="mt-[clamp(60px,8.3vw,120px)]">
        <div className="product-container text-center">
          <h3 className="b-reveal product-heading">단지 내 모든 길을 돌아다닐 수 있는 사이즈</h3>
        </div>
        <div className="b-scale mt-[clamp(32px,4.4vw,64px)]">
          <Image
            src="/images/triny/12_scene-complex.png"
            alt="단지 내 트리니 주행 장면"
            width={800}
            height={1000}
            className="w-full h-auto"
            sizes="100vw"
          />
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 11: 도면/치수
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(60px,8.3vw,120px)] pb-[clamp(60px,8.3vw,120px)]">
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
    </section>
  );
}
