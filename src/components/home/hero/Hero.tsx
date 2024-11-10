import Section from "@/components/common/Section";
import HeroText from "./HeroText";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <Section>
      <div className="grid grid-cols-1 items-center gap-16 py-8 md:grid-cols-2 md:py-12 lg:px-20 lg:py-20">
        <HeroText />
        <HeroImage />
      </div>
    </Section>
  );
}
