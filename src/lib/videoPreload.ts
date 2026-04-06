const warmedVideoSources = new Set<string>();
const warmupVideos: HTMLVideoElement[] = [];

function hasVideoPreloadLink(src: string): boolean {
  return Array.from(document.head.querySelectorAll('link[rel="preload"][as="video"]')).some(
    (link) => link.getAttribute('href') === src,
  );
}

function ensureVideoPreloadLink(src: string): void {
  if (hasVideoPreloadLink(src)) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'video';
  link.href = src;
  document.head.appendChild(link);
}

function warmVideoMetadata(src: string): void {
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.muted = true;
  video.playsInline = true;
  video.src = src;
  video.load();
  warmupVideos.push(video);
}

export function preloadVideoSources(sources: readonly string[]): void {
  if (typeof document === 'undefined') {
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
