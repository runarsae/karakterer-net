import { AccordionGroup, Accordion } from 'components/common/Accordion';
import Section from 'components/common/Section';
import { Body1, Body2, Heading1, Heading2 } from 'components/common/Typography';
import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import styled from 'styled-components';

const Wrapper = styled.div((props) => ({
    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        paddingTop: '32px',
        paddingBottom: '32px'
    }
}));

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
    const [activeAccordionIndex, setActiveAccordionIndex] = useState<number>();

    const handleAccordionClick = (index: number) => {
        setActiveAccordionIndex((prevValue) => (prevValue === index ? undefined : index));
    };

    return (
        <Wrapper>
            <Fade triggerOnce duration={300}>
                <Section size="small">
                    <Heading1>Om karakterer.net</Heading1>
                    <Body1 style={{ lineHeight: 1.5 }}>
                        Karakterstatistikken viser fordelingen av karakterene A til F for hvert
                        semester. Denne fordelingen brukes til å beregne
                        gjennomsnitts&shy;karakterer og stryk&shy;prosenter. Merk at antall
                        studenter som avbrøt en eksamen ikke er medberegnet.
                    </Body1>
                    <Body1 style={{ lineHeight: 1.5 }}>
                        Siden inneholder data under{' '}
                        <Link href="https://data.norge.no/nlod/no/2.0" target="_blank">
                            norsk lisens for offentlige data
                        </Link>{' '}
                        (NLOD), tilgjengeliggjort av direktoratet for høyere utdanning og kompetanse
                        (HK-dir) i{' '}
                        <Link href="https://dbh.hkdir.no/" target="_blank">
                            database for statistikk om høyere utdanning
                        </Link>{' '}
                        (DBH).
                    </Body1>
                </Section>
                <Section size="small">
                    <Heading2>FAQ</Heading2>
                    <AccordionGroup>
                        <Accordion
                            title={<>Hvorfor kan jeg ikke filtrere på konte&shy;eksamen?</>}
                            active={activeAccordionIndex === 0}
                            onClick={() => handleAccordionClick(0)}
                        >
                            <Body1 style={{ lineHeight: 1.5 }}>
                                Data rapporteres inn to ganger årlig; etter høstsemesteret og etter
                                vårsemesteret. Det er forskjellig fra emne til emne hvordan
                                karakterer for konteeksamen rapporteres inn og om de blir aggregert
                                med karakterer for ordinær eksamen eller ikke. Dette er grunnen til
                                at noen våremner også har statistikk for høstsemesteret.
                            </Body1>
                        </Accordion>
                        <Accordion
                            title={<>Når oppdateres statistikken?</>}
                            active={activeAccordionIndex === 1}
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
                                Statistikken oppdateres innen kort tid etter disse fristene, gitt at
                                dataen er rapportert inn og tilgjengelig.
                            </Body1>
                        </Accordion>
                        <Accordion
                            title={<>Hva betyr totalt gjennom&shy;snitt?</>}
                            active={activeAccordionIndex === 2}
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
                            active={activeAccordionIndex === 3}
                            onClick={() => handleAccordionClick(3)}
                        >
                            <Body1 style={{ lineHeight: 1.5 }}>
                                Total strykprosent regnes ut ved å summere antall studenter som fikk
                                stryk for alle semestrene, dele på totalt antall studenter og gange
                                med 100.
                            </Body1>
                        </Accordion>
                    </AccordionGroup>
                </Section>
                <Section size="small">
                    <Body2>Copyright © {new Date().getFullYear()}, karakterer.net</Body2>
                </Section>
            </Fade>
        </Wrapper>
    );
}
