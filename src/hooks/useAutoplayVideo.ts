'use client';

import { useRef, useEffect } from 'react';
import { createViewportEntryObserverOptions } from '@/lib/scrollTriggerUtils';

type AutoplayVideoOptions = {
  once?: boolean;
};

/**
 * viewport entry 기준 자동재생 비디오 훅.
 * 요소가 하단 96% 진입선에 닿으면 play, 벗어나면 pause한다.
 */
export function useAutoplayVideo(options: AutoplayVideoOptions = {}) {
  const { once = false } = options;
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let started = false;
    let ended = false;

    const handleEnded = () => {
      ended = true;
    };
    video.addEventListener('ended', handleEnded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once && started) {
            return;
          }
          started = true;
          if (ended) {
            video.currentTime = 0;
            ended = false;
          }
          void video.play().catch(() => {});
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          video.pause();
        }
      },
      createViewportEntryObserverOptions(),
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener('ended', handleEnded);
    };
  }, [once]);

  return ref;
}
