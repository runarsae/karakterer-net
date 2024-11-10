import Image from "next/image";
import heroImage from "@/assets/hero.png";

export default function HeroImage() {
  return (
    <div className="relative max-w-[420px] justify-self-center md:justify-self-end">
      <Image
        src={heroImage}
        alt="Statistikk"
        className="h-auto w-full"
        quality={100}
        priority
      />
    </div>
  );
}
