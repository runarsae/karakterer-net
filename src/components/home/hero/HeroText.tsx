import SearchButton from "./SearchButton";

export default function HeroText() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:max-w-[36rem]">
      <h1 className="text-4xl font-medium lg:text-5xl xl:min-w-[600px] xl:text-6xl">
        Karakter&shy;statistikk for alle emner på NTNU
      </h1>
      <p className="text-lg">
        Karakterfordeling og utvikling i gjennomsnitts&shy;karakter og
        stryk&shy;prosent i alle emner på NTNU siden 2004.
      </p>
      <div>
        <SearchButton />
      </div>
    </div>
  );
}
