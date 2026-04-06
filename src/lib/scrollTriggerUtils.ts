const EXPLICIT_ANCHOR_SELECTOR = '[data-anim-anchor]';
const MEDIA_ANCHOR_SELECTOR = 'img,video,canvas';
const TEXT_ANCHOR_SELECTOR = 'h1,h2,h3,h4,h5,h6,p,span';

const DEFAULT_ENTER_VISIBLE_RATIO = 0.05;

function getElementArea(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  return Math.max(rect.width, 0) * Math.max(rect.height, 0);
}

function pickLargestByArea(elements: HTMLElement[]): HTMLElement | null {
  let selected: HTMLElement | null = null;
  let maxArea = 0;

  elements.forEach((element) => {
    const area = getElementArea(element);
    if (area > maxArea) {
      maxArea = area;
      selected = element;
    }
  });

  return selected;
}

function collectCandidates(root: HTMLElement, selector: string): HTMLElement[] {
  const fromRoot = root.matches(selector) ? [root] : [];
  const fromDescendants = Array.from(root.querySelectorAll<HTMLElement>(selector));
  return [...fromRoot, ...fromDescendants];
}

export function resolveVisualTrigger(element: HTMLElement): HTMLElement {
  if (element.matches(EXPLICIT_ANCHOR_SELECTOR)) {
    return element;
  }

  const explicitAnchor = element.querySelector<HTMLElement>(EXPLICIT_ANCHOR_SELECTOR);
  if (explicitAnchor) {
    return explicitAnchor;
  }

  const mediaCandidates = collectCandidates(element, MEDIA_ANCHOR_SELECTOR);
  const mediaAnchor = pickLargestByArea(mediaCandidates);
  if (mediaAnchor) {
    return mediaAnchor;
  }

  const textCandidates = collectCandidates(element, TEXT_ANCHOR_SELECTOR).filter((candidate) => {
    const text = candidate.textContent?.trim() ?? '';
    if (text.length < 2) {
      return false;
    }
    return getElementArea(candidate) > 0;
  });

  const textAnchor = pickLargestByArea(textCandidates);
  return textAnchor ?? element;
}

export function buildEnterStart(visibleRatio: number = DEFAULT_ENTER_VISIBLE_RATIO): string {
  const clamped = Math.min(Math.max(visibleRatio, 0.01), 0.45);
  const viewportPercent = 100 - clamped * 100;
  return `top ${viewportPercent}%`;
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
    return child.querySelector(MEDIA_ANCHOR_SELECTOR) !== null;
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
