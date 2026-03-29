import { TemporaryDesign } from "@/components/sections/TemporaryDesign";
import { IntroAnimation } from "@/components/animations/IntroAnimation";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { StorySection } from "@/components/sections/StorySection";
import { AlternativesSection } from "@/components/sections/AlternativesSection";
import { IsolationSection } from "@/components/sections/IsolationSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { BusinessSection } from "@/components/sections/BusinessSection";
import { BilinyProductSection } from "@/components/sections/BilinyProductSection";
import { TrinyProductSection } from "@/components/sections/TrinyProductSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <IntroAnimation />
      <Header />
      <main>
        {/* 1. 메인 온보딩 — 배경 영상 + 히어로 텍스트 */}
        <HeroSection />

        {/* 임시 디자인 시안 */}
        <TemporaryDesign />

        {/* 2. 스토리 — 1970↔2026 과거/현재 비교 타임라인 */}
        <StorySection />

        {/* 3. 불편한 대안들 — 전동스쿠터, 버스, 택시 */}
        <AlternativesSection />

        {/* 4. 고립/우울 결론 — "두다리가 얼어붙으신 어르신" */}
        <IsolationSection />

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
    </>
  );
}
