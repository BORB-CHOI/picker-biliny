'use client';

import { useRef, useEffect } from 'react';

/**
 * IntersectionObserver 기반 자동재생 비디오 훅.
 * 뷰포트에 30% 이상 진입하면 play, 벗어나면 pause.
 */
export function useAutoplayVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return ref;
}
