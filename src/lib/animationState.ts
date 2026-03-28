const INTRO_COMPLETE = "intro-complete";

export function emitIntroComplete() {
  window.dispatchEvent(new CustomEvent(INTRO_COMPLETE));
}

export function onIntroComplete(callback: () => void) {
  window.addEventListener(INTRO_COMPLETE, callback, { once: true });
  return () => window.removeEventListener(INTRO_COMPLETE, callback);
}
