'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function isLayoutAffectingMedia(target: EventTarget | null): target is HTMLImageElement | HTMLVideoElement {
  return target instanceof HTMLImageElement || target instanceof HTMLVideoElement;
}

// 모바일 주소창 collapse/expand가 일으키는 height-only resize 스톰 차단
if (typeof window !== 'undefined') {
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export function ScrollTriggerRefreshController() {
  useEffect(() => {
    let rafId = 0;

    const scheduleRefresh = () => {
      if (rafId !== 0) {
        return;
      }

      rafId = requestAnimationFrame(() => {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          ScrollTrigger.refresh();
        });
      });
    };

    const handleMediaReady = (event: Event) => {
      if (!isLayoutAffectingMedia(event.target)) {
        return;
      }

      scheduleRefresh();
    };

    document.addEventListener('load', handleMediaReady, true);
    document.addEventListener('loadedmetadata', handleMediaReady, true);

    return () => {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
      }
      document.removeEventListener('load', handleMediaReady, true);
      document.removeEventListener('loadedmetadata', handleMediaReady, true);
    };
  }, []);

  return null;
}
