import { AppHeader } from "@/shared/components/AppHeader";
import { HeroSection, HowItWorks } from "@/features/analysis-upload";

export default function HomePage() {
  return (
    <>
      <AppHeader />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
      </main>
    </>
  );
}
