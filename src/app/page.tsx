import { IntroAnimation } from "@/components/animations/IntroAnimation";
import { ScrollTriggerRefreshController } from "@/components/animations/ScrollTriggerRefreshController";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { StorySection } from "@/components/sections/StorySection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { BusinessSection } from "@/components/sections/BusinessSection";
import { BilinyProductSection } from "@/components/sections/BilinyProductSection";
import { TrinyProductSection } from "@/components/sections/TrinyProductSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ScaleWrapper } from "@/components/layout/ScaleWrapper";

export default function Home() {
  return (
    <>
      <IntroAnimation />
      <ScrollTriggerRefreshController />
      <Header />
      <ScaleWrapper>
        <main>
          {/* 1. 메인 온보딩 — 배경 영상 + 히어로 텍스트 */}
          <HeroSection />

          {/* 2. 스토리 — 1970↔2026 과거/현재 비교 타임라인 */}
          <StorySection />

          {/* 5. 해결책 제시 — 빌리니, 안내길, 돌봄이, 공평한 모빌리티 */}
          <SolutionSection />

          {/* 6. 사업성 — 돌봄이, 사회적 비용, 예산, 수익 모델 */}
          <BusinessSection />

          {/* 7. 빌리니 제품 — 스펙, 디자인 영상, 360°, 도면, 충전 */}
          <BilinyProductSection />

          {/* 8. 트리니 제품 — 영상 기반 소개 */}
          <TrinyProductSection />

          {/* 9. 문의 + 푸터 — 폼, 연락처, 저작권 */}
          <ContactSection />
        </main>
      </ScaleWrapper>
    </>
  );
}
