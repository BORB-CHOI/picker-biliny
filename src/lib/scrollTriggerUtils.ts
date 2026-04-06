const EXPLICIT_ANCHOR_SELECTOR = '[data-anim-anchor]';
const MEDIA_CONTENT_SELECTOR = 'img,video,canvas';

export const DEFAULT_VIEWPORT_ENTRY_PERCENT = 96;

function clampViewportEntryPercent(viewportPercent: number): number {
  return Math.min(Math.max(viewportPercent, 55), 99);
}

function getElementArea(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  return Math.max(rect.width, 0) * Math.max(rect.height, 0);
}

export function resolveAnimationTrigger(element: HTMLElement): HTMLElement {
  if (element.matches(EXPLICIT_ANCHOR_SELECTOR)) {
    return element;
  }

  const explicitAnchor = element.querySelector<HTMLElement>(EXPLICIT_ANCHOR_SELECTOR);
  return explicitAnchor ?? element;
}

export function buildViewportEntryStart(
  viewportPercent: number = DEFAULT_VIEWPORT_ENTRY_PERCENT,
): string {
  const clamped = clampViewportEntryPercent(viewportPercent);
  return `top ${clamped}%`;
}

export function createViewportEntryObserverOptions(
  viewportPercent: number = DEFAULT_VIEWPORT_ENTRY_PERCENT,
): IntersectionObserverInit {
  const clamped = clampViewportEntryPercent(viewportPercent);
  return {
    root: null,
    rootMargin: `0px 0px -${100 - clamped}% 0px`,
    threshold: 0,
  };
}

export function selectNonNestedTargets(root: HTMLElement, selector: string): HTMLElement[] {
  const targets = Array.from(root.querySelectorAll<HTMLElement>(selector));
  return targets.filter((target) => !target.parentElement?.closest(selector));
}

function collectSplitItems(target: HTMLElement): HTMLElement[] {
  const explicitItems = Array.from(target.querySelectorAll<HTMLElement>('[data-anim-item]'));
  if (explicitItems.length > 0) {
    return explicitItems.filter((item) => getElementArea(item) > 0);
  }

  return Array.from(target.children).filter((child): child is HTMLElement => {
    if (!(child instanceof HTMLElement)) {
      return false;
    }
    const area = getElementArea(child);
    if (area <= 0) {
      return false;
    }
    const text = child.textContent?.trim() ?? '';
    if (text.length > 0) {
      return true;
    }
    return child.querySelector(MEDIA_CONTENT_SELECTOR) !== null;
  });
}

export function resolveAnimationTargets(root: HTMLElement, selector: string): HTMLElement[] {
  const baseTargets = selectNonNestedTargets(root, selector);
  const expandedTargets: HTMLElement[] = [];

  baseTargets.forEach((target) => {
    if (target.dataset.animSplit === 'children') {
      const items = collectSplitItems(target);
      if (items.length > 0) {
        expandedTargets.push(...items);
        return;
      }
    }

    expandedTargets.push(target);
  });

  return expandedTargets.filter((target, index, array) => array.indexOf(target) === index);
}

export function isScrollMarkerEnabled(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('markers') === '1') {
    return true;
  }

  try {
    return window.localStorage.getItem('debug:markers') === '1';
  } catch {
    return false;
  }
}
