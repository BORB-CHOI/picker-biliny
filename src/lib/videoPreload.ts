const warmedVideoSources = new Set<string>();
const warmupVideos: HTMLVideoElement[] = [];

function hasVideoPreloadLink(src: string): boolean {
  return Array.from(document.head.querySelectorAll('link[rel="preload"][as="video"]')).some(
    (link) => link.getAttribute("href") === src,
  );
}

function ensureVideoPreloadLink(src: string): void {
  if (hasVideoPreloadLink(src)) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "video";
  link.href = src;
  document.head.appendChild(link);
}

function warmVideoMetadata(src: string): void {
  const video = document.createElement("video");
  video.preload = "metadata";
  video.muted = true;
  video.playsInline = true;
  video.src = src;
  video.load();
  warmupVideos.push(video);
}

export function preloadVideoSources(sources: readonly string[]): void {
  if (typeof document === "undefined") {
    return;
  }

  sources.forEach((src) => {
    if (warmedVideoSources.has(src)) {
      return;
    }

    warmedVideoSources.add(src);
    ensureVideoPreloadLink(src);
    warmVideoMetadata(src);
  });
}

type IdleCallback = (cb: () => void) => void;

const scheduleIdle: IdleCallback =
  typeof window !== "undefined" && "requestIdleCallback" in window
    ? (cb) =>
        (
          window as Window & {
            requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void;
          }
        ).requestIdleCallback(cb, { timeout: 2000 })
    : (cb) => window.setTimeout(cb, 0);

/**
 * 인트로 등 무거운 애니메이션과 경쟁하지 않도록 메인 스레드가 한가할 때 프리로드 시작.
 * 호출 시점에 즉시 실행하지 않고 idle 콜백으로 지연한다.
 */
export function preloadVideoSourcesWhenIdle(sources: readonly string[]): void {
  if (typeof document === "undefined") {
    return;
  }

  scheduleIdle(() => preloadVideoSources(sources));
}
