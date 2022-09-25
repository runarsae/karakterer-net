import { AccordionGroup, Accordion } from 'components/common/Accordion';
import Section from 'components/common/Section';
import { Body1, Heading1, Heading2 } from 'components/common/Typography';
import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import styled from 'styled-components';

const SubContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
});

const Link = styled.a((props) => ({
    textDecoration: 'none',
    color: props.theme.palette.primary.main,

    '@media (hover: hover)': {
        ':hover': {
            textDecoration: 'underline'
        }
    }
}));

const ListContainer = styled.div({
    width: '100%',
    display: 'flex',
    gap: '16px'
});

const List = styled.ul({
    margin: '8px 0'
});

export default function AboutPage() {
    const [activeAccordion, setActiveAccordion] = useState<number>();

    const handleAccordionClick = (index: number) => {
        setActiveAccordion((prevValue) => (prevValue === index ? undefined : index));
    };

    return (
        <>
            <Section size="small">
                <Fade triggerOnce>
                    <Heading1>Om karakterer.net</Heading1>
                </Fade>
                <SubContainer>
                    <Fade triggerOnce cascade damping={0.05} delay={100}>
                        <Body1 style={{ lineHeight: 1.5 }}>
                            Karakterstatistikken viser fordelingen av karakterene A til F for hvert
                            semester. Denne fordelingen brukes til å beregne
                            gjennomsnitts&shy;karakterer og stryk&shy;prosenter. Merk at antall
                            studenter som avbrøt en eksamen ikke er medberegnet.
                        </Body1>
                        <Body1 style={{ lineHeight: 1.5 }}>
                            Siden inneholder data under{' '}
                            <Link href="https://data.norge.no/nlod/no/2.0" target="_blank">
                                Norsk lisens for offentlige data
                            </Link>{' '}
                            (NLOD), tilgjengeliggjort av direktoratet for høyere utdanning og
                            kompetanse (HK-dir) i{' '}
                            <Link href="https://dbh.hkdir.no/" target="_blank">
                                database for statistikk om høyere utdanning
                            </Link>{' '}
                            (DBH).
                        </Body1>
                    </Fade>
                </SubContainer>
            </Section>

            <Section size="small">
                <SubContainer>
                    <Fade triggerOnce delay={300}>
                        <Heading2>FAQ</Heading2>
                    </Fade>
                    <AccordionGroup>
                        <Fade triggerOnce cascade damping={0.05} delay={300}>
                            <Accordion
                                title={<>Hvorfor kan jeg ikke filtrere på konte&shy;eksamen?</>}
                                active={activeAccordion === 0}
                                onClick={() => handleAccordionClick(0)}
                            >
                                <Body1 style={{ lineHeight: 1.5 }}>
                                    Data rapporteres inn to ganger årlig; etter høstsemesteret og
                                    etter vårsemesteret. Det er forskjellig fra emne til emne
                                    hvordan karakterer for konteeksamen rapporteres inn og om de
                                    blir aggregert med karakterer for ordinær eksamen eller ikke.
                                    Dette er grunnen til at noen våremner har statistikk for
                                    høstsemesteret også.
                                </Body1>
                            </Accordion>
                            <Accordion
                                title={<>Når oppdateres statistikken?</>}
                                active={activeAccordion === 1}
                                onClick={() => handleAccordionClick(1)}
                            >
                                <Body1 style={{ lineHeight: 1.5 }}>
                                    NTNU har følgende frister for innrapportering til HK-dir:
                                </Body1>
                                <List>
                                    <li>
                                        <Body1 style={{ lineHeight: 1.5 }}>
                                            15. februar for høstsemester
                                        </Body1>
                                    </li>
                                    <li>
                                        <Body1 style={{ lineHeight: 1.5 }}>
                                            15. oktober for vårsemester
                                        </Body1>
                                    </li>
                                </List>
                                <Body1 style={{ lineHeight: 1.5 }}>
                                    Statistikken oppdateres innen kort tid etter disse fristene,
                                    gitt at dataen er rapportert inn og tilgjengelig.
                                </Body1>
                            </Accordion>
                            <Accordion
                                title={<>Hva betyr totalt gjennom&shy;snitt?</>}
                                active={activeAccordion === 2}
                                onClick={() => handleAccordionClick(2)}
                            >
                                <Body1 style={{ lineHeight: 1.5 }}>
                                    Totalt gjennomsnitt tar utgangspunkt i følgende verdier for
                                    karakterer:
                                </Body1>
                                <ListContainer>
                                    <List>
                                        <li>
                                            <Body1 style={{ lineHeight: 1.5 }}>A = 5</Body1>
                                        </li>
                                        <li>
                                            <Body1 style={{ lineHeight: 1.5 }}>B = 4</Body1>
                                        </li>
                                        <li>
                                            <Body1 style={{ lineHeight: 1.5 }}>C = 3</Body1>
                                        </li>
                                    </List>
                                    <List>
                                        <li>
                                            <Body1 style={{ lineHeight: 1.5 }}>D = 2</Body1>
                                        </li>
                                        <li>
                                            <Body1 style={{ lineHeight: 1.5 }}>E = 1</Body1>
                                        </li>
                                        <li>
                                            <Body1 style={{ lineHeight: 1.5 }}>F = 0</Body1>
                                        </li>
                                    </List>
                                </ListContainer>
                                <Body1 style={{ lineHeight: 1.5 }}>
                                    Utregningen summerer karakterene for alle semestrene og deler på
                                    totalt antall studenter. Bokstav&shy;karakteren regnes ut ved å
                                    runde av til nærmeste hele tall.
                                </Body1>
                            </Accordion>
                            <Accordion
                                title={<>Hva betyr total stryk&shy;prosent?</>}
                                active={activeAccordion === 3}
                                onClick={() => handleAccordionClick(3)}
                            >
                                <Body1 style={{ lineHeight: 1.5 }}>
                                    Total strykprosent regnes ut ved å summere antall studenter som
                                    fikk stryk for alle semestrene, dele på totalt antall studenter
                                    og gange med 100.
                                </Body1>
                            </Accordion>
                        </Fade>
                    </AccordionGroup>
                </SubContainer>
            </Section>
        </>
    );
}
