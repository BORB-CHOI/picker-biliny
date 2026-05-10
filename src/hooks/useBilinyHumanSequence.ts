"use client";

import { type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMainContentReady } from "@/lib/animationState";
import { buildViewportEntryStart, isScrollMarkerEnabled } from "@/lib/scrollTriggerUtils";

gsap.registerPlugin(ScrollTrigger);

const HUMAN_VIDEO_START = buildViewportEntryStart();

/**
 * 빌리니 앉아서→서서 비디오 시퀀스 훅.
 * 뷰포트 진입 시 비디오 1회 재생, 45% 시점에서 sit→stand 텍스트 크로스페이드.
 * 데스크톱/모바일에서 각각 독립 ref로 호출.
 */
export function useBilinyHumanSequence(
  videoRef: RefObject<HTMLVideoElement | null>,
  wrapRef: RefObject<HTMLDivElement | null>,
  scopeRef: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const video = videoRef.current;
      const wrap = wrapRef.current;
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
    { scope: scopeRef },
  );
}
