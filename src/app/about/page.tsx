import FAQ from "@/components/about/FAQ";
import Content from "@/components/common/Content";
import Section from "@/components/common/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om",
};

export default function About() {
  return (
    <div className="flex flex-col gap-16 md:py-16">
      <Section size="md">
        <Content>
          <h1>Om karakterer.net</h1>
          <p>
            Karakterstatistikken presenterer fordelingen av karakterene A til F
            for hvert semester. Denne fordelingen benyttes til å beregne
            gjennomsnittskarakterer og strykprosenter. Vær oppmerksom på at
            antall studenter som avbrøt en eksamen eller et emne ikke er
            inkludert.
          </p>
        </Content>
      </Section>
      <Section size="md">
        <FAQ />
      </Section>
      <Section size="md">
        <div className="card">
          <p>
            Nettsiden inneholder data under{" "}
            <a
              href="https://data.norge.no/nlod/no/2.0"
              target="_blank"
              className="text-sky-600 no-underline hover:underline"
            >
              Norsk lisens for offentlige data (NLOD)
            </a>
            , tilgjengeliggjort av Direktoratet for høyere utdanning og
            kompetanse (HK-dir) i{" "}
            <a
              href="https://dbh.hkdir.no/"
              target="_blank"
              className="text-sky-600 no-underline hover:underline"
            >
              Database for statistikk om høyere utdanning (DBH)
            </a>
            .
          </p>
        </div>
      </Section>
    </div>
  );
}
