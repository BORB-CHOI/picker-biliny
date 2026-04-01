'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useAutoplayVideo } from '@/hooks/useAutoplayVideo';
import { useProductAnimations } from '@/hooks/useProductAnimations';
import { CheckIcon } from '@/components/ui/CheckIcon';

export function BilinyProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const slideDownRef = useAutoplayVideo();
  const slideUpRef = useAutoplayVideo();
  const slideUpHumanRef = useAutoplayVideo();
  const approachingRef = useAutoplayVideo();
  const turningRef = useAutoplayVideo();

  useProductAnimations(sectionRef);

  return (
    <section ref={sectionRef} id="biliny" className="relative overflow-x-clip">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 0: # BILINY 타이틀
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="b-fade section-title-row">
        <div className="flex gap-2">
          <div className="section-bar" />
          <div className="section-bar" />
        </div>
        <h2 className="product-section-title">BILINY</h2>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 1: LINE-UP 스펙 소개
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="product-container relative">
        {/* 2열: 좌측 텍스트 + 우측 이미지 */}
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
              공유형 시니어 PM &lsquo;빌리니&rsquo;
            </p>
            <div className="b-fade product-desc mt-[clamp(8px,1.1vw,16px)]">
              <p>
                사계절 기후에 대응하는 4면 커버형 디자인과 스마트 레인 기반의 저속 자율주행이 결합된
                고령자 특화 이동수단입니다.
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
              <div className="b-stagger product-feature-item">
                <CheckIcon />
                <p className="product-feature-text">
                  119 자동 신고 및 <span className="font-bold">실시간 모니터링 시스템</span> 탑재
                </p>
              </div>
            </div>
          </div>

          {/* 우측 제품 이미지 — div 래퍼 기준 레이아웃, 이미지 우측 정렬 */}
          <div className="flex-1 min-w-0 b-from-right lg:-mr-[5rem]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/biliny/1_lineup-hero.png"
                alt="빌리니 제품 이미지"
                fill
                className="object-contain object-right-bottom"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* 스펙 — 텍스트와 이미지 경계에 absolute 배치 */}
        <div className="b-fade hidden lg:flex flex-col absolute left-[40%] top-[75%] -translate-y-1/2">
          <div className="product-spec-row">
            <span className="product-spec-label">1회 충전 주행거리</span>
            <div className="flex items-baseline gap-[clamp(4px,0.4vw,6px)]">
              <span className="product-spec-number">140</span>
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
              <span className="product-spec-number">300</span>
              <span className="product-spec-unit">만원</span>
            </div>
          </div>
        </div>
        {/* 모바일: 스펙 정상 플로우 */}
        <div className="b-fade flex lg:hidden flex-col gap-[clamp(8px,1.1vw,16px)] mt-[clamp(20px,2.8vw,40px)]">
          <div className="product-spec-row">
            <span className="product-spec-label">1회 충전 주행거리</span>
            <div className="flex items-baseline gap-[clamp(4px,0.4vw,6px)]">
              <span className="product-spec-number">140</span>
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
              <span className="product-spec-number">300</span>
              <span className="product-spec-unit">만원</span>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 2: Design — 위에서 아래로
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(40px,5.5vw,80px)]">
        <div className="product-container relative">
          {/* 비디오 — 좌측 60% */}
          <div className="b-from-left lg:w-[65%]">
            <video
              ref={slideDownRef}
              src="/videos/biliny/slide-down.mp4"
              muted
              loop
              playsInline
              className="w-full h-auto"
            />
          </div>
          {/* 텍스트 — 우측 하단, 왼쪽 정렬 */}
          <div className="lg:absolute lg:right-[5%] lg:bottom-[30%] mt-[clamp(16px,2.2vw,32px)] lg:mt-0 text-left">
            <h3 className="b-reveal product-heading">위에서 아래로,</h3>
            <p className="b-fade product-sub mt-[clamp(8px,1.1vw,16px)]">
              스스로 이동할땐 부담없는 크기로
            </p>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 2-2: Design — 아래에서 위로
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(30px,4.2vw,60px)]">
        <div className="product-container relative">
          {/* 텍스트 — 좌측 상단, 오른쪽 정렬 */}
          <div className="lg:absolute z-10 lg:left-[5%] lg:top-[10%] mb-[clamp(16px,2.2vw,32px)] lg:mb-0 text-right">
            <h3 className="b-reveal product-heading">아래에서 위로,</h3>
            <p className="b-fade product-sub mt-[clamp(8px,1.1vw,16px)]">
              안전을 위해 누구에게나 눈에 띄도록
            </p>
          </div>
          {/* 비디오 — 우측 60%, 아래로 */}
          <div className="b-from-right lg:w-[65%] lg:ml-auto">
            <video
              ref={slideUpRef}
              src="/videos/biliny/slide-up.mp4"
              muted
              loop
              playsInline
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 2-3: Design — 앉아서 / 서서
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(60px,8.3vw,120px)]">
        <div className="product-container relative">
          {/* 비디오 — 우측 65% */}
          <div className="b-from-right lg:w-[65%] lg:m-auto">
            <video
              ref={slideUpHumanRef}
              src="/videos/biliny/slide-up-human.mp4"
              muted
              loop
              playsInline
              className="w-full h-auto"
            />
          </div>
          <div className="absolute lg:left-[10%] top-[8%] flex flex-col gap-[clamp(100px,14vw,200px)] mb-[clamp(16px,2.2vw,32px)] lg:mb-0">
            {/* "앉아서" — 좌측 상단에 absolute */}
            <div className="z-10 lg:mt-0 text-right">
              <div className="b-from-left">
                <h3 className="biliny-video-heading-sm">앉아서</h3>
                <p className="biliny-video-sub-sm mt-[clamp(8px,1.1vw,16px)]">
                  천천히 뛰는 속도에서
                </p>
                <p className="biliny-video-speed-sm mt-[clamp(4px,0.5vw,8px)]">최대시속 13km</p>
              </div>
            </div>
            {/* "서서" — 좌측 하단에 absolute */}
            <div className="z-10 lg:mt-0 text-right">
              <div className="b-from-left">
                <h3 className="biliny-video-heading-sm">서서</h3>
                <p className="biliny-video-sub-sm mt-[clamp(8px,1.1vw,16px)]">
                  빠르게 달리는 속도까지
                </p>
                <p className="biliny-video-speed-sm mt-[clamp(4px,0.5vw,8px)]">최대시속 25km</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 2-4: 안전한 길을 따라
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(60px,8.3vw,120px)] relative">
        {/* 영상 — 화면 끝까지 */}
        <div className="b-scale w-full">
          <video
            ref={approachingRef}
            src="/videos/biliny/approaching-biliny-2.mp4"
            muted
            loop
            playsInline
            className="w-full h-auto"
          />
        </div>
        {/* 텍스트 — 비디오 좌측 상단에 absolute */}
        <div className="absolute top-[20%] left-[8%] z-10">
          <h3 className="b-reveal product-heading">안전한 길을 따라</h3>
          <p className="b-fade product-sub mt-[clamp(8px,1.1vw,16px)]">
            쉽고 배려있는 주행 문화를 만들다.
          </p>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 3: 360° 빌리니 둘러보기
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(60px,8.3vw,120px)]">
        <div className="relative product-container text-center">
          {/* 궤도 이미지 + 텍스트 — 비디오 위에 겹침 */}
          <div className="relative b-fade z-10 mx-auto w-fit mb-[clamp(-40px,-4.5vw,-60px)]">
            <Image
              src="/images/biliny/2_360-orbit.png"
              alt=""
              width={618}
              height={100}
              className="w-[clamp(15px,43vw,618px)] h-auto mx-auto translate-y-1/2"
              sizes="(max-width: 768px) 80vw, 43vw"
              aria-hidden="true"
            />
            {/* 텍스트를 궤도 위에 absolute 배치 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="product-heading">360°</p>
              <h3 className="product-heading">빌리니 둘러보기</h3>
            </div>
          </div>
          <div className="b-scale max-w-[clamp(400px,60vw,900px)] mx-auto">
            <video
              ref={turningRef}
              src="/videos/biliny/turning.mp4"
              muted
              loop
              playsInline
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 4: 엘레베이터에 들어갈 수 있는 사이즈
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(60px,8.3vw,120px)]">
        <div className="product-container text-center">
          <h3 className="b-reveal product-heading">
            엘레베이터에 들어갈 수 있는 사이즈
          </h3>
          <div className="b-from-left mt-[clamp(32px,6.4vw,124px)]">
            <Image
              src="/images/biliny/3_elevator.png"
              alt="엘레베이터에 들어가는 빌리니"
              width={2160}
              height={1410}
              className="w-[200%] max-w-none h-auto -translate-x-1/4"
              sizes="130vw"
            />
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 4-2: 도면/치수
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(60px,8.3vw,120px)]">
        <div className="product-container">
          <div className="b-scale">
            <Image
              src="/images/biliny/4_dimensions.png"
              alt="빌리니 도면 — 800x700x1280mm"
              width={1280}
              height={780}
              className="w-full h-auto"
              sizes="100vw"
            />
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 5: 충전은 가로등 옆 어디서나
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(60px,8.3vw,120px)]">
        <div className="product-container text-center">
          <h3 className="b-reveal product-heading">
            충전은 가로등 옆 어디서나
          </h3>
          <div className="b-scale mt-[clamp(32px,4.4vw,64px)] max-w-[clamp(500px,55vw,820px)] mx-auto">
            <Image
              src="/images/biliny/5_charger-streetlamp.png"
              alt="가로등 옆 충전 시스템"
              width={1178}
              height={1012}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 5-2: 무선으로 자유롭게
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(40px,5.5vw,80px)]">
        <div className="product-container text-center">
          <h3 className="b-reveal product-heading">
            무선으로 자유롭게
          </h3>
          <div className="b-scale mt-[clamp(32px,4.4vw,64px)]">
            <Image
              src="/images/biliny/6_charger-wireless.png"
              alt="무선 충전 패드 디테일"
              width={1248}
              height={572}
              className="w-full h-auto rounded-[clamp(24px,3.95vw,57px)]"
              sizes="100vw"
            />
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 5-3: 충전 기능 — 스스로 돌보며 / 혼자일 땐 / 모두를 위해
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(40px,5.5vw,80px)]">
        <div className="product-container">
          <div className="flex flex-col gap-[clamp(60px,8.3vw,120px)]">
            {/* 스스로 돌보며 */}
            <div className="flex flex-col lg:flex-row items-center gap-[clamp(24px,3.3vw,48px)]">
              <div className="flex-[1.4] min-w-0 b-from-left">
                <Image
                  src="/images/biliny/7_charger-selfcare.png"
                  alt="스스로 돌보는 충전 시스템"
                  width={917}
                  height={632}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="flex-1 min-w-0 b-from-right">
                <h4 className="product-heading">스스로 돌보며</h4>
              </div>
            </div>

            {/* 혼자일 땐 */}
            <div className="flex flex-col lg:flex-row items-center gap-[clamp(24px,3.3vw,48px)]">
              <div className="flex-[1.4] min-w-0 b-from-left">
                <Image
                  src="/images/biliny/8_charger-alone.png"
                  alt="혼자일 때 자동 충전"
                  width={917}
                  height={542}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="flex-1 min-w-0 b-from-right">
                <h4 className="product-heading">혼자일 땐</h4>
              </div>
            </div>

            {/* 모두를 위해 */}
            <div className="flex flex-col lg:flex-row items-center gap-[clamp(24px,3.3vw,48px)]">
              <div className="flex-[1.4] min-w-0 b-from-left">
                <Image
                  src="/images/biliny/9_charger-everyone.png"
                  alt="모두를 위한 충전 인프라"
                  width={917}
                  height={542}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="flex-1 min-w-0 b-from-right">
                <h4 className="product-heading">모두를 위해</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 5-4: 버스정류장 최종 이미지
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-[clamp(40px,5.5vw,80px)] pb-[clamp(60px,8.3vw,120px)]">
        <div className="product-container">
          <div className="b-scale max-w-[clamp(500px,60vw,900px)] mx-auto">
            <Image
              src="/images/biliny/10_busstop.png"
              alt="버스정류장 충전 인프라"
              width={1102}
              height={928}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
