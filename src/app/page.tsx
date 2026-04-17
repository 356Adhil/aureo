import { HomeHero } from "@/components/sections/home/HomeHero";
import { Positioning } from "@/components/sections/home/Positioning";
import { ServicesCinematic } from "@/components/sections/home/ServicesCinematic";
import { ServiceTiers } from "@/components/sections/home/ServiceTiers";
import { FeaturedConcepts } from "@/components/sections/home/FeaturedConcepts";
import { ProcessSnapshot } from "@/components/sections/home/ProcessSnapshot";
import { LabPreview } from "@/components/sections/home/LabPreview";
import { InsightsPreview } from "@/components/sections/home/InsightsPreview";
import { FounderNote } from "@/components/sections/home/FounderNote";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { CtaBand } from "@/components/sections/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <section data-chapter="Hero" id="hero-chapter">
        <HomeHero />
      </section>
      <section data-chapter="Studio" id="studio-chapter">
        <Positioning />
      </section>
      <ServicesCinematic />
      <section data-chapter="Engagement" id="engagement-chapter">
        <ServiceTiers />
      </section>
      <section data-chapter="Work" id="work-chapter">
        <FeaturedConcepts />
      </section>
      <section data-chapter="Process" id="process-chapter">
        <ProcessSnapshot />
      </section>
      <section data-chapter="Lab" id="lab-chapter">
        <LabPreview />
      </section>
      <section data-chapter="Insights" id="insights-chapter">
        <InsightsPreview />
      </section>
      <section data-chapter="Founder" id="founder-chapter">
        <FounderNote />
      </section>
      <section data-chapter="Ethos" id="ethos-chapter">
        <Manifesto />
      </section>
      <section data-chapter="Contact" id="contact-chapter">
        <CtaBand />
      </section>
    </>
  );
}
