import FadeIn from "@/components/common/animation/FadeIn";
import SlideUp from "@/components/common/animation/SlideUp";
import SearchButton from "./SearchButton";

export default function HeroText() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:max-w-xl">
      <FadeIn>
        <SlideUp>
          <h1 className="text-4xl font-medium lg:text-5xl xl:min-w-[600px] xl:text-6xl">
            Karakter&shy;statistikk for alle emner på NTNU
          </h1>
        </SlideUp>
      </FadeIn>
      <FadeIn delay={0.15}>
        <SlideUp delay={0.15}>
          <p className="text-lg">
            Karakterfordeling og utvikling i gjennomsnitts&shy;karakter og
            stryk&shy;prosent i alle emner på NTNU siden 2004.
          </p>
        </SlideUp>
      </FadeIn>
      <FadeIn delay={0.3}>
        <SlideUp delay={0.3}>
          <SearchButton />
        </SlideUp>
      </FadeIn>
    </div>
  );
}
