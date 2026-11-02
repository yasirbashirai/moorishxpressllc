import type { Metadata } from "next";
import CautionBands from "@/components/concepts/editorial/CautionBands";
import { Coverage, FinalCta, Process, QuoteBlock } from "@/components/concepts/editorial/Closing";
import FlyerCollage from "@/components/concepts/editorial/FlyerCollage";
import Hero from "@/components/concepts/editorial/Hero";
import Manifesto from "@/components/concepts/editorial/Manifesto";
import ServiceIndex from "@/components/concepts/editorial/ServiceIndex";
import SpecSheet from "@/components/concepts/editorial/SpecSheet";
import SplitAudience from "@/components/concepts/editorial/SplitAudience";

// Concept C preview: "Bold Editorial Poster" homepage direction
export const metadata: Metadata = {
  title: "Concept C: Bold Editorial",
  robots: { index: false },
};

export default function EditorialConcept() {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <CautionBands />
      <Manifesto />
      <SplitAudience />
      <ServiceIndex />
      <SpecSheet />
      <Process />
      <FlyerCollage />
      <Coverage />
      <QuoteBlock />
      <FinalCta />
    </div>
  );
}
