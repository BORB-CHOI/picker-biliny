/**
 * 뷰포트 너비에 따른 scale factor를 계산하는 순수 함수.
 *
 * - viewportWidth >= baseWidth → 1.0
 * - viewportWidth < baseWidth → max(viewportWidth / baseWidth, minScale)
 *
 * @param viewportWidth 현재 뷰포트 너비 (양수)
 * @param baseWidth     기준 너비 (양수, 기본 1440)
 * @param minScale      최소 축소 비율 (양수, 0 < minScale <= 1.0)
 * @returns scale factor ∈ [minScale, 1.0]
 */
export function computeScaleFactor(
  viewportWidth: number,
  baseWidth: number,
  minScale: number,
): number {
  if (viewportWidth >= baseWidth) {
    return 1.0;
  }

  return Math.max(viewportWidth / baseWidth, minScale);
}
