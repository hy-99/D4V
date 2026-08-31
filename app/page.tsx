import { AwarenessSection } from "@/components/awareness-section";
import { CallToAction } from "@/components/call-to-action";
import { ConfidenceSection } from "@/components/confidence-section";
import { FeatureSection } from "@/components/feature-section";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" data-page-entry className="overflow-x-clip">
        <Hero />
        <FeatureSection />
        <AwarenessSection />
        <ConfidenceSection />
        <CallToAction />
      </main>
      <SiteFooter />
    </>
  );
}
