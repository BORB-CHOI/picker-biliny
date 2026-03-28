import { Header } from '@/components/sections/Header';
import { IntroAnimation } from '@/components/animations/IntroAnimation';
import { HeroSection } from '@/components/sections/HeroSection';
import { StorySection } from '@/components/sections/StorySection';
import { AlternativesSection } from '@/components/sections/AlternativesSection';
import { IsolationSection } from '@/components/sections/IsolationSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { SocialCostSection } from '@/components/sections/SocialCostSection';
import { BudgetSection } from '@/components/sections/BudgetSection';
import { RevenueSection } from '@/components/sections/RevenueSection';
import { BilinyProductSection } from '@/components/sections/BilinyProductSection';
import { ChargingSection } from '@/components/sections/ChargingSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <IntroAnimation />
      <Header />
      <main>
        <HeroSection />
        <StorySection />
        <AlternativesSection />
        <IsolationSection />
        <SolutionSection />
        <SocialCostSection />
        <BudgetSection />
        <RevenueSection />
        <BilinyProductSection />
        <ChargingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
