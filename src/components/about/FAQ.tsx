"use client";

import { useState } from "react";
import { Accordion, AccordionGroup } from "../common/Accordion";

export default function FAQ() {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<number>();

  const handleAccordionClick = (index: number) => {
    setActiveAccordionIndex((prevValue) =>
      prevValue === index ? undefined : index,
    );
  };

  return (
    <AccordionGroup>
      <Accordion
        title={<>Hvorfor stemmer ikke karaktererene med Studentweb?</>}
        active={activeAccordionIndex === 0}
        onClick={() => handleAccordionClick(0)}
      >
        <p>
          Karakterfordelingen gjelder for både ordinær og utsatt eksamen (kont)
          der hvor dette er rapportert inn. I tillegg kan endrede karakterer i
          forbindelse med klaging ha en påvirkning.
        </p>
      </Accordion>
      <Accordion
        title={<>Hvorfor kan jeg ikke filtrere på utsatt eksamen (kont)?</>}
        active={activeAccordionIndex === 1}
        onClick={() => handleAccordionClick(1)}
      >
        <p>
          Data rapporteres kun inn per høstsemester og vårsemester. Det er
          forskjellig fra emne til emne om og hvordan karakterer for utsatt
          eksamen rapporteres inn. I noen tilfeller blir de aggregert med
          karakterer for ordinær eksamen.
        </p>
      </Accordion>
      <Accordion
        title={<>Hvorfor har et emne som går på våren statistikk for høsten?</>}
        active={activeAccordionIndex === 2}
        onClick={() => handleAccordionClick(2)}
      >
        <p>
          Karakterer for utsatt eksamen (kont) rapporteres ofte inn på
          høstsemesteret. Velg tannhjulet øverst til høyre på en emneside for å
          filtrere på semester.
        </p>
      </Accordion>
      <Accordion
        title={<>Når oppdateres statistikken?</>}
        active={activeAccordionIndex === 3}
        onClick={() => handleAccordionClick(3)}
      >
        <div className="flex flex-col gap-4">
          <p>
            Datagrunnlag fra leverandør gjøres tilgjengelig på følgende datoer:
          </p>
          <ul className="ml-2 list-inside list-disc">
            <li>15. februar for høstsemester</li>
            <li>30. oktober for vårsemester</li>
          </ul>
          <p>Statistikken oppdateres kort tid etter tilgjengeliggjøring.</p>
        </div>
      </Accordion>
    </AccordionGroup>
  );
}
