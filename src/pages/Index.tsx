import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";
import { MarketDataSection } from "@/components/sections/MarketDataSection";
import { UsageMetricsSection } from "@/components/sections/UsageMetricsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CodeSection } from "@/components/sections/CodeSection";
import { CTASection } from "@/components/sections/CTASection";
import { useEffect } from "react";
import { useMetrics } from "@/hooks/useMetrics";

const Index = () => {
  const { trackPageView } = useMetrics();

  useEffect(() => {
    trackPageView("Homepage");
  }, [trackPageView]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ValuePropsSection />
      <MarketDataSection />
      <UsageMetricsSection />
      <StatsSection />
      <HowItWorksSection />
      <ComparisonSection />
      <SecuritySection />
      <TestimonialsSection />
      <CodeSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;