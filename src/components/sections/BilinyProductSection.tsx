"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { onMainContentReady } from "@/lib/animationState";
import { useAutoplayVideo } from "@/hooks/useAutoplayVideo";
import { useProductAnimations } from "@/hooks/useProductAnimations";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { InfinityIcon } from "@/components/ui/icons";
import { buildViewportEntryStart, isScrollMarkerEnabled } from "@/lib/scrollTriggerUtils";

gsap.registerPlugin(ScrollTrigger);

const HUMAN_VIDEO_START = buildViewportEntryStart();

export function BilinyProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const slideDownRef = useAutoplayVideo();
  const slideUpRef = useAutoplayVideo();
  const approachingRef = useAutoplayVideo();
  const turningRef = useAutoplayVideo();
  const humanVideoRef = useRef<HTMLVideoElement>(null);
  const humanWrapRef = useRef<HTMLDivElement>(null);

  useProductAnimations(sectionRef);

  /* ── 앉아서 / 서서 — viewport entry/leave 시 영상 반복 재생 ── */
  useGSAP(
    () => {
      const video = humanVideoRef.current;
      const wrap = humanWrapRef.current;
      if (!video || !wrap) return;
      const showMarkers = isScrollMarkerEnabled();

      const sit = wrap.querySelector<HTMLElement>(".biliny-sit-text");
      const stand = wrap.querySelector<HTMLElement>(".biliny-stand-text");
      if (!sit || !stand) return;

      gsap.set([sit, stand], { opacity: 0, y: 24 });

      let textSwitched = false;
      let playbackTrigger: ScrollTrigger | null = null;
      let firstRafId: number;
      let secondRafId: number;

      let videoEnded = false;

      const handleTime = () => {
        if (!textSwitched && video.currentTime >= video.duration * 0.45) {
          textSwitched = true;
          gsap.to(sit, { opacity: 0, y: -18, duration: 0.3, ease: "power2.in" });
          gsap.to(stand, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.15 });
        }
      };

      const startPlayback = () => {
        if (videoEnded) {
          videoEnded = false;
          textSwitched = false;
          gsap.set(stand, { opacity: 0, y: 24 });
          gsap.to(sit, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
          video.currentTime = 0;
        } else if (!textSwitched) {
          gsap.to(sit, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
        }
        void video.play().catch(() => {});
        video.addEventListener("timeupdate", handleTime);
      };

      const stopPlayback = () => {
        video.pause();
      };

      const handleEnded = () => {
        videoEnded = true;
        video.removeEventListener("timeupdate", handleTime);
      };

      video.addEventListener("ended", handleEnded);

      const unsubscribe = onMainContentReady(() => {
        firstRafId = requestAnimationFrame(() => {
          secondRafId = requestAnimationFrame(() => {
            playbackTrigger = ScrollTrigger.create({
              trigger: video,
              start: HUMAN_VIDEO_START,
              markers: showMarkers,
              onEnter: startPlayback,
              onEnterBack: startPlayback,
              onLeave: stopPlayback,
              onLeaveBack: stopPlayback,
            });

            const rect = video.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.96 && rect.bottom >= 0) {
              startPlayback();
            }
          });
        });
      });

      return () => {
        unsubscribe();
        playbackTrigger?.kill();
        cancelAnimationFrame(firstRafId);
        cancelAnimationFrame(secondRafId);
        video.pause();
        video.removeEventListener("timeupdate", handleTime);
        video.removeEventListener("ended", handleEnded);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="biliny" className="relative overflow-x-clip">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 0: # BILINY 타이틀 (공통)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="b-fade section-title-row">
        <div className="flex gap-2">
          <div className="section-bar" />
          <div className="section-bar" />
        </div>
        <h2 className="product-section-title">BILINY</h2>
      </div>

      {/* ═══════════════════════════════════════
          데스크톱 전용 본문 (sm 이상)
      ═══════════════════════════════════════ */}
      <div className="hidden sm:block">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 1: LINE-UP 스펙 소개
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="product-container relative">
          {/* 2열: 좌측 텍스트 + 우측 이미지 */}
          <div className="flex flex-row gap-[clamp(24px,3.3cqw,48px)] items-start">
            {/* 좌측 텍스트 — Figma 기준 아래로 내려옴 */}
            <div className="w-[38%] min-w-0 shrink-0 pt-[clamp(160px,20cqw,290px)]">
              <p className="b-fade product-label text-(--color-primary)">LINE-UP</p>
              <p className="b-reveal product-sub-heading mt-[clamp(8px,0.7cqw,10px)]">
                이동의 자유를 나누는
              </p>
              <h3 className="b-reveal product-heading mt-[clamp(4px,0.4cqw,6px)]">
                스마트 모빌리티 생태계
              </h3>
              <p className="b-reveal product-name mt-[clamp(16px,2.2cqw,32px)]">
                공유형 시니어 PM &lsquo;빌리니&rsquo;
              </p>
              <div className="b-fade product-desc mt-[clamp(8px,1.1cqw,16px)]">
                <p>
                  사계절 기후에 대응하는 4면 커버형 디자인과 스마트 레인 기반의 저속 자율주행이
                  결합된 고령자 특화 이동수단입니다.
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
                <div className="b-stagger product-feature-item">
                  <CheckIcon />
                  <p className="product-feature-text">
                    119 자동 신고 및 <span className="font-bold">실시간 모니터링 시스템</span> 탑재
                  </p>
                </div>
              </div>
            </div>

            {/* 우측 제품 이미지 — div 래퍼 기준 레이아웃, 이미지 우측 정렬 */}
            <div className="flex-1 min-w-0 b-from-right">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/biliny/1_lineup-hero.png"
                  alt="빌리니 제품 이미지"
                  fill
                  className="object-contain object-right-bottom translate-y-10 translate-x-10"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 제품 전환 탭 — product-container 기준 absolute */}
          <div className="absolute top-[clamp(140px,17cqw,250px)] right-[5rem] z-20 flex gap-2 bg-[#f0f1f5] rounded-full p-1">
            <span className="px-[clamp(12px,1.4cqw,20px)] py-[clamp(4px,0.5cqw,8px)] rounded-full bg-white text-[clamp(10px,0.97cqw,14px)] font-bold text-(--color-primary) shadow-sm">
              BILINY (케어형)
            </span>
            <a
              href="#triny"
              className="px-[clamp(12px,1.4cqw,20px)] py-[clamp(4px,0.5cqw,8px)] rounded-full text-[clamp(10px,0.97cqw,14px)] font-medium text-[#8a8a9a] hover:text-(--color-text) transition-colors"
            >
              TRINY (플랫폼)
            </a>
          </div>

          {/* 스펙 — 텍스트와 이미지 경계에 absolute 배치 */}
          <div className="b-fade flex flex-col absolute items-end left-[40%] top-[85%] -translate-y-1/2">
            <div className="product-spec-row flex items-baseline justify-center">
              <span className="product-spec-label">1회 충전 주행거리</span>
              <span className="product-spec-number mx-4">140</span>
              <span className="product-spec-unit">km{"\u00A0"}</span>
            </div>
            <div className="product-spec-row flex max-h-15 items-center justify-center">
              <span className="product-spec-label translate-y-1.5">무료 탑승 횟수</span>
              <InfinityIcon
                className="inline-block h-[4.5em] w-auto mx-4"
                fill="#202020"
                size={72}
              />
              <span className="product-spec-unit">
                회{"\u00A0"}
                {"\u00A0"}
                {"\u00A0"}
              </span>
            </div>
            <div className="product-spec-row items-baseline justify-center">
              <span className="product-spec-label">대당가격</span>
              <span className="product-spec-number mx-2.5">300</span>
              <span className="product-spec-unit">만원</span>
            </div>
          </div>
          {/* 모바일 스펙 블록 제거됨 — 1440px 기준 데스크톱 absolute 스펙만 사용 */}
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 2: Design — 위에서 아래로
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-[clamp(40px,5.5cqw,80px)]">
          <div className="product-container relative">
            {/* 비디오 — 좌측 60% */}
            <div className="b-from-left w-[65%]">
              <video
                ref={slideDownRef}
                src="/videos/biliny/slide-down.mp4"
                muted
                playsInline
                className="w-full h-auto"
              />
            </div>
            {/* 텍스트 — 우측 하단, 왼쪽 정렬 */}
            <div className="absolute right-[15%] bottom-[40%] text-left">
              <h3 className="b-reveal product-heading">위에서 아래로,</h3>
              <p className="b-fade product-sub mt-[clamp(8px,1.1cqw,16px)]">
                스스로 이동할땐 부담없는 크기로
              </p>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 2-2: Design — 아래에서 위로
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-[clamp(30px,4.2cqw,60px)]">
          <div className="product-container relative">
            {/* 텍스트 — 좌측 상단, 오른쪽 정렬 */}
            <div className="absolute z-10 left-[20%] top-15 text-right">
              <h3 className="b-reveal product-heading">아래에서 위로,</h3>
              <p className="b-fade product-sub mt-[clamp(8px,1.1cqw,16px)]">
                안전을 위해 누구에게나 눈에 띄도록
              </p>
            </div>
            {/* 비디오 — 우측 60%, 아래로 */}
            <div className="b-from-right w-[65%] ml-auto">
              <video
                ref={slideUpRef}
                src="/videos/biliny/slide-up.mp4"
                muted
                playsInline
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 2-3: Design — 앉아서 / 서서
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div ref={humanWrapRef} className="mt-[4cqw]">
          <div className="product-container relative">
            {/* 텍스트 — 좌측 (동시 노출 없음, JS로 전환) */}
            <div className="absolute z-10 left-[33%] top-[28%]">
              <div className="biliny-sit-text text-right relative whitespace-nowrap absolute top-70 right-40">
                <h3 className="product-heading">앉아서</h3>
                <p className="product-sub mt-[clamp(8px,1.1cqw,16px)]">천천히 뛰는 속도에서</p>
                <p className="biliny-video-speed mt-[clamp(4px,0.5cqw,8px)]">최대시속 13km</p>
              </div>
              <div className="biliny-stand-text text-right relative whitespace-nowrap absolute -top-40 right-40 mt-0">
                <h3 className="product-heading">서서</h3>
                <p className="product-sub mt-[clamp(8px,1.1cqw,16px)]">빠르게 달리는 속도까지</p>
                <p className="biliny-video-speed mt-[clamp(4px,0.5cqw,8px)]">최대시속 25km</p>
              </div>
            </div>
            {/* 영상 — viewport entry 시 1회 재생 */}
            <div className="w-[65%] mx-auto translate-x-10">
              <video
                ref={humanVideoRef}
                src="/videos/biliny/slide-up-human.mp4"
                muted
                playsInline
                preload="auto"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 2-4: 안전한 길을 따라
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-[clamp(60px,8.3cqw,120px)] relative">
          {/* 영상 — 화면 끝까지 */}
          <div className="b-scale w-[60%] mx-auto">
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
          <div className="absolute top-[15%] left-[20%] z-10">
            <h3 className="b-reveal product-heading">안전한 길을 따라</h3>
            <p className="b-fade product-sub mt-[clamp(8px,1.1cqw,16px)]">
              쉽고 배려있는 주행 문화를 만들다.
            </p>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 3: 360° 빌리니 둘러보기
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-[clamp(60px,8.3cqw,120px)]">
          <div className="relative product-container text-center">
            {/* 궤도 이미지 + 텍스트 — 비디오 위에 겹침 */}
            <div className="absolute inset-x-0 b-fade z-10">
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
                <h3 className="product-heading">빌리니 둘러보기</h3>
              </div>
            </div>
            <div className="b-scale w-full mx-auto">
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
        <div className="mt-[clamp(60px,8.3cqw,120px)] overflow-hidden">
          <div className="product-container text-center">
            <h3 className="b-reveal product-heading">엘레베이터에 들어갈 수 있는 사이즈</h3>
          </div>
          <div className="b-from-left mt-[clamp(32px,6.4cqw,124px)]">
            <Image
              src="/images/biliny/3_elevator.png"
              alt="엘레베이터에 들어가는 빌리니"
              width={2160}
              height={1410}
              className="w-[120%] h-auto mx-auto"
              sizes="120%"
            />
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 4-2: 도면/치수
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-[clamp(60px,8.3cqw,120px)]">
          <div className="product-container">
            <div className="b-scale">
              <Image
                src="/images/biliny/4_dimensions.png"
                alt="빌리니 도면 — 800x700x1280mm"
                width={1280}
                height={780}
                className="w-[80%] h-auto mx-auto"
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 5: 충전은 가로등 옆 어디서나
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-[clamp(60px,8.3cqw,120px)]">
          <div className="product-container text-center">
            <h3 className="b-reveal product-heading">충전은 가로등 옆 어디서나</h3>
            <div className="b-scale mt-[clamp(32px,4.4cqw,64px)] max-w-[clamp(500px,55cqw,820px)] mx-auto">
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
        <div className="mt-[clamp(40px,5.5cqw,80px)]">
          <div className="product-container text-center">
            <h3 className="b-reveal product-heading">무선으로 자유롭게</h3>
            <div className="b-scale mt-[clamp(32px,4.4cqw,64px)]">
              <Image
                src="/images/biliny/6_charger-wireless.png"
                alt="무선 충전 패드 디테일"
                width={1248}
                height={572}
                className="w-[80%] h-auto mx-auto rounded-[clamp(24px,3.95cqw,57px)]"
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 5-3: 충전 기능 — 스스로 돌보며 / 혼자일 땐 / 모두를 위해
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-[12cqw]">
          <div className="product-container">
            <div className="flex flex-col gap-10">
              {/* 스스로 돌보며 */}
              <div className="flex flex-row items-center gap-[clamp(24px,3.3cqw,48px)]">
                <div className="relative flex-[1.4] min-w-0 b-from-left">
                  <Image
                    src="/images/biliny/7_charger-selfcare.png"
                    alt="스스로 돌보는 충전 시스템"
                    width={917}
                    height={632}
                    className="w-[70%] h-auto mx-auto"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="flex-1 absolute min-w-0 b-from-right top-[50%] right-15">
                    <h4 className="product-heading">스스로 돌보며</h4>
                  </div>
                </div>
              </div>

              {/* 혼자일 땐 */}
              <div className="flex flex-row items-center gap-[clamp(24px,3.3cqw,48px)]">
                <div className="relative flex-[1.4] min-w-0 b-from-left">
                  <Image
                    src="/images/biliny/8_charger-alone.png"
                    alt="혼자일 때 자동 충전"
                    width={917}
                    height={542}
                    className="w-[70%] h-auto mx-auto"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="flex-1 absolute min-w-0 b-from-right top-[50%] right-30">
                    <h4 className="product-heading">혼자일 땐</h4>
                  </div>
                </div>
              </div>

              {/* 모두를 위해 */}
              <div className="flex flex-row items-center gap-[clamp(24px,3.3cqw,48px)]">
                <div className="relative flex-[1.4] min-w-0 b-from-left">
                  <Image
                    src="/images/biliny/9_charger-everyone.png"
                    alt="모두를 위한 충전 인프라"
                    width={917}
                    height={542}
                    className="w-[70%] h-auto mx-auto"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="flex-1 absolute min-w-0 b-from-right top-[50%] right-20">
                    <h4 className="product-heading">모두를 위해</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         Part 5-4: 버스정류장 최종 이미지
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-[16cqw] pb-[clamp(60px,8.3cqw,120px)]">
          <div className="product-container">
            <div className="b-scale max-w-[clamp(500px,60cqw,900px)] mx-auto">
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
      </div>

      {/* ═══════════════════════════════════════
          모바일 전용 본문 (< sm)
      ═══════════════════════════════════════ */}
      <div className="block sm:hidden px-[5%] pt-8 pb-16">
        <div className="text-center">
          <p className="b-reveal text-base font-medium text-[var(--color-text-secondary)]">
            이동의 자유를 나누는
          </p>
          <h3 className="b-reveal mt-1 text-2xl font-bold text-[var(--color-text)]">
            스마트 모빌리티 생태계
          </h3>
        </div>

        {/* LINE-UP 헤딩 */}
        <div className="mt-12">
          <p className="b-fade product-label text-sm font-bold tracking-widest text-(--color-primary)">
            LINE-UP
          </p>
          <p className="b-reveal mt-2 text-base font-medium text-[var(--color-text-secondary)]">
            공유형 시니어 PM &lsquo;빌리니&rsquo;
          </p>
          <p className="b-fade mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            사계절 기후에 대응하는 4면 커버형 디자인과 스마트 레인 기반의 저속 자율주행이 결합된
            고령자 특화 이동수단입니다.
          </p>
        </div>

        {/* 제품 이미지 + 스펙 */}
        <div className="b-from-right mt-8 grid grid-cols-[0.9fr_1.1fr] items-center gap-2">
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-baseline gap-1">
              <span className="text-[9px] text-[var(--color-text-secondary)]">1회 충전 주행거리</span>
              <span className="text-xl font-bold text-[var(--color-text)]">140</span>
              <span className="text-xs text-[var(--color-text-secondary)]">km</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[9px] text-[var(--color-text-secondary)]">무료 탑승 횟수</span>
              <InfinityIcon className="inline-block h-7 w-auto" fill="#202020" size={28} />
              <span className="text-xs text-[var(--color-text-secondary)]">회</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[9px] text-[var(--color-text-secondary)]">대당가격</span>
              <span className="text-xl font-bold text-[var(--color-text)]">300</span>
              <span className="text-xs text-[var(--color-text-secondary)]">만원</span>
            </div>
          </div>
          <Image
            src="/images/biliny/1_lineup-hero.png"
            alt="빌리니 제품 이미지"
            width={2000}
            height={2500}
            className="h-auto w-full"
            sizes="55vw"
            priority
          />
        </div>

        {/* 특장점 목록 — PC와 동일 */}
        <div className="mt-8 flex flex-col gap-3">
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

        {/* 위에서 아래로 */}
        <div className="mt-20 flex flex-col gap-4">
          <h3 className="b-reveal text-xl font-bold text-[var(--color-text)]">위에서 아래로,</h3>
          <p className="b-fade text-sm text-[var(--color-text-secondary)]">
            스스로 이동할땐 부담없는 크기로
          </p>
          <video
            src="/videos/biliny/slide-down.mp4"
            muted
            autoPlay
            loop
            playsInline
            className="w-full h-auto mt-2"
          />
        </div>

        {/* 아래에서 위로 */}
        <div className="mt-16 flex flex-col gap-4">
          <h3 className="b-reveal text-xl font-bold text-[var(--color-text)] text-right">
            아래에서 위로,
          </h3>
          <p className="b-fade text-sm text-[var(--color-text-secondary)] text-right">
            안전을 위해 누구에게나 눈에 띄도록
          </p>
          <video
            src="/videos/biliny/slide-up.mp4"
            muted
            autoPlay
            loop
            playsInline
            className="w-full h-auto mt-2"
          />
        </div>

        {/* 앉아서 / 서서 */}
        <div className="mt-16 flex flex-col gap-4">
          <video
            src="/videos/biliny/slide-up-human.mp4"
            muted
            autoPlay
            loop
            playsInline
            className="w-full h-auto"
          />
          <div className="flex justify-around mt-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-[var(--color-text)]">앉아서</h3>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                천천히 뛰는 속도에서
              </p>
              <p className="text-sm font-bold text-[var(--color-primary)] mt-1">최대시속 13km</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-[var(--color-text)]">서서</h3>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                빠르게 달리는 속도까지
              </p>
              <p className="text-sm font-bold text-[var(--color-primary)] mt-1">최대시속 25km</p>
            </div>
          </div>
        </div>

        {/* 안전한 길을 따라 */}
        <div className="mt-16 flex flex-col gap-4">
          <h3 className="b-reveal text-xl font-bold text-[var(--color-text)]">안전한 길을 따라</h3>
          <p className="b-fade text-sm text-[var(--color-text-secondary)]">
            쉽고 배려있는 주행 문화를 만들다.
          </p>
          <video
            src="/videos/biliny/approaching-biliny-2.mp4"
            muted
            autoPlay
            loop
            playsInline
            className="w-full h-auto mt-2"
          />
        </div>

        {/* 360° */}
        <div className="mt-16 flex flex-col items-center gap-3">
          <p className="text-2xl font-bold text-[var(--color-text)]">360°</p>
          <h3 className="text-xl font-bold text-[var(--color-text)]">빌리니 둘러보기</h3>
          <video
            src="/videos/biliny/turning.mp4"
            muted
            autoPlay
            loop
            playsInline
            className="w-full h-auto mt-2"
          />
        </div>

        {/* 엘레베이터 */}
        <div className="mt-16 flex flex-col gap-4">
          <h3 className="b-reveal text-xl font-bold text-[var(--color-text)] text-center">
            엘레베이터에 들어갈 수 있는 사이즈
          </h3>
          <Image
            src="/images/biliny/3_elevator.png"
            alt="엘레베이터에 들어가는 빌리니"
            width={2160}
            height={1410}
            className="w-full h-auto mt-2"
            sizes="100vw"
          />
        </div>

        {/* 도면 */}
        <div className="mt-12">
          <Image
            src="/images/biliny/4_dimensions.png"
            alt="빌리니 도면 — 800x700x1280mm"
            width={1280}
            height={780}
            className="w-full h-auto"
            sizes="100vw"
          />
        </div>

        {/* 충전 가로등 */}
        <div className="mt-16 flex flex-col gap-4">
          <h3 className="b-reveal text-xl font-bold text-[var(--color-text)] text-center">
            충전은 가로등 옆 어디서나
          </h3>
          <Image
            src="/images/biliny/5_charger-streetlamp.png"
            alt="가로등 옆 충전 시스템"
            width={1178}
            height={1012}
            className="w-full h-auto mt-2"
            sizes="100vw"
          />
        </div>

        {/* 무선으로 자유롭게 */}
        <div className="mt-12 flex flex-col gap-4">
          <h3 className="b-reveal text-xl font-bold text-[var(--color-text)] text-center">
            무선으로 자유롭게
          </h3>
          <Image
            src="/images/biliny/6_charger-wireless.png"
            alt="무선 충전 패드 디테일"
            width={1248}
            height={572}
            className="w-full h-auto rounded-2xl"
            sizes="100vw"
          />
        </div>

        {/* 충전 기능 3장 */}
        <div className="mt-16 flex flex-col gap-10">
          {[
            {
              src: "/images/biliny/7_charger-selfcare.png",
              label: "스스로 돌보며",
              alt: "스스로 돌보는 충전 시스템",
            },
            {
              src: "/images/biliny/8_charger-alone.png",
              label: "혼자일 땐",
              alt: "혼자일 때 자동 충전",
            },
            {
              src: "/images/biliny/9_charger-everyone.png",
              label: "모두를 위해",
              alt: "모두를 위한 충전 인프라",
            },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-3">
              <Image
                src={item.src}
                alt={item.alt}
                width={917}
                height={632}
                className="w-full h-auto"
                sizes="100vw"
              />
              <h4 className="text-lg font-bold text-[var(--color-text)] text-center">
                {item.label}
              </h4>
            </div>
          ))}
        </div>

        {/* 버스정류장 */}
        <div className="mt-16">
          <Image
            src="/images/biliny/10_busstop.png"
            alt="버스정류장 충전 인프라"
            width={1102}
            height={928}
            className="w-full h-auto"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
