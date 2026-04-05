/**
 * 에셋 경로 상수
 *
 * 각 섹션에서 사용하는 이미지/비디오 경로를 중앙 관리.
 * next/image의 src에 직접 사용 가능.
 */

// ─── 비디오 ───
export const VIDEOS = {
  biliny: {
    approaching1: '/videos/biliny/approaching-1.mp4',
    approaching2: '/videos/biliny/approaching-2.mp4',
    slideDown: '/videos/biliny/slide-down.mp4',
    slideUp: '/videos/biliny/slide-up.mp4',
    slideUpHuman: '/videos/biliny/slide-up-human-webp/frame-001.webp',
    turning: '/videos/biliny/turning.mp4',
  },
  triny: {
    turning: '/videos/triny/turning.mp4',
  },
} as const;

// ─── 이미지: 스토리 섹션 ───
export const STORY_IMAGES = {
  photo1970_1: '/images/story/story-1970-1.png',
  photo1970_2: '/images/story/story-1970-2.png',
  elderlySeated1: '/images/story/story-elderly-seated-1.png',
  elderlySeated2: '/images/story/story-elderly-seated-2.png',
  elderlyWalker1: '/images/story/story-elderly-walker-1.png',
  elderlyWalker2: '/images/story/story-elderly-walker-2.png',
  oldPhoto: '/images/story/story-old-photo.png',
} as const;

// ─── 이미지: 대안 섹션 ───
export const ALT_IMAGES = {
  scooter: {
    img1: '/images/alternatives/scooter/alt-scooter-1.png',
    img2: '/images/alternatives/scooter/alt-scooter-2.png',
  },
  bus: {
    img1: '/images/alternatives/bus/alt-bus-1.png',
    img2: '/images/alternatives/bus/alt-bus-2.png',
    waiting1: '/images/alternatives/bus/alt-bus-waiting-1.png',
    waiting2: '/images/alternatives/bus/alt-bus-waiting-2.png',
    stop: '/images/alternatives/bus/bus-stop.png',
    scene1: '/images/alternatives/bus/bus-stop-scene-1.svg',
    scene2: '/images/alternatives/bus/bus-stop-scene-2.png',
    scene3: '/images/alternatives/bus/bus-stop-scene-3.png',
    scene4: '/images/alternatives/bus/bus-stop-scene-4.png',
    scene5: '/images/alternatives/bus/bus-stop-scene-5.png',
    giveup0: '/images/alternatives/bus/bus-giveup-0.svg',
    giveup2: '/images/alternatives/bus/bus-giveup-2.png',
    giveup3: '/images/alternatives/bus/bus-giveup-3.png',
  },
  taxi: {
    img1: '/images/alternatives/taxi/taxi-1.png',
    img2: '/images/alternatives/taxi/taxi-2.png',
    burden1: '/images/alternatives/taxi/taxi-burden-1.png',
    burden2: '/images/alternatives/taxi/taxi-burden-2.png',
    burden3: '/images/alternatives/taxi/taxi-burden-3.png',
    expensive1: '/images/alternatives/taxi/taxi-expensive-1.png',
    expensive2: '/images/alternatives/taxi/taxi-expensive-2.png',
  },
} as const;

// ─── 이미지: 결론 섹션 ───
export const CONCLUSION_IMAGES = {
  img1: '/images/conclusion/conclusion-1.png',
  img2: '/images/conclusion/conclusion-2.png',
  img3: '/images/conclusion/conclusion-3.png',
} as const;

// ─── 이미지: 솔루션 섹션 ───
export const SOLUTION_IMAGES = {
  biliny1: '/images/solution/solution-biliny-1.svg',
  biliny2: '/images/solution/solution-biliny-2.png',
  biliny3: '/images/solution/solution-biliny-3.png',
  biliny4: '/images/solution/solution-biliny-4.png',
  biliny5: '/images/solution/solution-biliny-5.png',
  carewatch1: '/images/solution/solution-carewatch-1.png',
  carewatch2: '/images/solution/solution-carewatch-2.png',
  fair1: '/images/solution/solution-fair-1.png',
  fair2: '/images/solution/solution-fair-2.png',
  fair3: '/images/solution/solution-fair-3.png',
  lane1: '/images/solution/solution-lane-1.png',
  lane2: '/images/solution/solution-lane-2.png',
  image1: '/images/solution/solution-image-1.png',
  image2: '/images/solution/solution-image-2.png',
  img1: '/images/solution/solution-img-1.png',
  img2: '/images/solution/solution-img-2.png',
  img3: '/images/solution/solution-img-3.png',
} as const;

// ─── 이미지: 돌봄이(CareWatch) ───
export const CAREWATCH_IMAGES = {
  illustration1: '/images/carewatch/carewatch-illustration-1.png',
  illustration2: '/images/carewatch/carewatch-illustration-2.png',
  illustration3: '/images/carewatch/carewatch-illustration-3.png',
  system: '/images/carewatch/carewatch-system.png',
} as const;

// ─── 이미지: 제품 ───
export const PRODUCT_IMAGES = {
  render: '/images/product/biliny-render.png',
  side: '/images/product/biliny-side.png',
  quarter: '/images/product/biliny-quarter.png',
  topView: '/images/product/biliny-top-view.png',
  view360: '/images/product/biliny-360.png',
  lineup: '/images/product/product-lineup.png',
  photo1: '/images/product/product-photo-1.png',
  photo2: '/images/product/product-photo-2.png',
  photo3: '/images/product/product-photo-3.png',
  productRender: '/images/product/product-render.png',
  productSide: '/images/product/product-side.png',
  road1: '/images/product/vehicle-road-1.png',
  road2: '/images/product/vehicle-road-2.png',
  road3: '/images/product/vehicle-road-3.png',
} as const;

// ─── 이미지: 도면 ───
export const DIMENSION_IMAGES = {
  front: '/images/dimensions/orth-front.png',
  back: '/images/dimensions/orth-back.png',
  side: '/images/dimensions/orth-side.png',
  top: '/images/dimensions/orth-top.png',
  elevator: '/images/dimensions/elevator.png',
} as const;

// ─── 이미지: 충전 시스템 ───
export const CHARGER_IMAGES = {
  main: '/images/charger/charger-main.png',
  side: '/images/charger/charger-side.png',
  seat: '/images/charger/charger-seat.png',
  img1: '/images/charger/charger-1.png',
  img2: '/images/charger/charger-2.png',
  illustration1: '/images/charger/charger-illustration-1.png',
  illustration2: '/images/charger/charger-illustration-2.png',
  illustration3: '/images/charger/charger-illustration-3.png',
  v2_11: '/images/charger/charger-v2-11.png',
  v2_14: '/images/charger/charger-v2-14.png',
  wirecharge1: '/images/charger/wirecharge-1.png',
  wirecharge2: '/images/charger/wirecharge-2.png',
  wirecharge3: '/images/charger/wirecharge-3.png',
} as const;
