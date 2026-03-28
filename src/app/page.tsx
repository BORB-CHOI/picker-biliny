import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { StorySection } from '@/components/sections/StorySection';
import { AlternativesSection } from '@/components/sections/AlternativesSection';
import { IsolationSection } from '@/components/sections/IsolationSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { SocialCostSection } from '@/components/sections/SocialCostSection';
import { BudgetSection } from '@/components/sections/BudgetSection';
import { RevenueSection } from '@/components/sections/RevenueSection';
import { ProductSection } from '@/components/sections/ProductSection';
import { DimensionsSection } from '@/components/sections/DimensionsSection';
import { ChargingSection } from '@/components/sections/ChargingSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
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
        <ProductSection />
        <DimensionsSection />
        <ChargingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
