import { createFileRoute } from "@tanstack/react-router";
import EsquireHero from "@/components/EsquireHero";
import SanaaGallery from "@/components/SanaaGallery";
import AgencySection from "@/components/AgencySection";
import IntelligenceSection from "@/components/IntelligenceSection";
import SiteFooter from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <EsquireHero />
      <SanaaGallery />
      <AgencySection />
      <IntelligenceSection />
      <SiteFooter />
    </>
  );
}


