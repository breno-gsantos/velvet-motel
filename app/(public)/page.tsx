import { CTA } from "@/components/home/CTA";
import { ExperiencePreview } from "@/components/home/experience-preview";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { MenuPreview } from "@/components/home/menu-preview";
import { SuitePreview } from "@/components/home/suite-preview";
import { Navbar } from "@/components/shared/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SuitePreview />
        <Features />
        <ExperiencePreview />
        <MenuPreview />
        <CTA />
      </main>
    </>
  );
}
