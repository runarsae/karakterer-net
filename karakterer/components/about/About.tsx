import Accordion from 'components/common/Accordion';
import Typography from 'components/common/Typography';
import styled from 'styled-components';

const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
});

const SubContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
});

const Line = styled.div((props) => ({
    width: '100%',
    borderTop: '1px solid ' + props.theme.palette.horizontalLine
}));

const Link = styled.a((props) => ({
    textDecoration: 'none',
    color: props.theme.palette.primary.main,

    ':hover': {
        textDecoration: 'underline'
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

export default function About() {
    return (
        <Container>
            <SubContainer>
                <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                    Karakterstatistikken viser fordelingen av karakterene A til F for hvert
                    semester. Denne fordelingen brukes til å beregne gjennomsnitts&shy;karakterer og
                    stryk&shy;prosenter. Merk at antall studenter som avbrøt en eksamen ikke er
                    medberegnet.
                </Typography>
                <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                    Tallene er hentet fra{' '}
                    <Link href="https://dbh.hkdir.no/" target="_blank">
                        database for statistikk om høyere utdanning
                    </Link>{' '}
                    (DBH) , underlagt av direktoratet for høyere utdanning og kompetanse (HK-dir).
                </Typography>
            </SubContainer>
            <SubContainer>
                <Typography variant="h2">FAQ</Typography>
                <Accordion
                    items={[
                        {
                            title: <>Hvorfor kan jeg ikke filtrere på konte&shy;eksamen?</>,
                            content: (
                                <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                                    Data rapporteres inn to ganger årlig; etter høstsemesteret og
                                    etter vårsemesteret. Det er forskjellig fra emne til emne
                                    hvordan karakterer for konteeksamen rapporteres inn og om de
                                    blir aggregert med karakterer for ordinær eksamen eller ikke.
                                </Typography>
                            )
                        },
                        {
                            title: <>Når oppdateres statistikken?</>,
                            content: (
                                <>
                                    <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                                        NTNU har følgende frister for innrapportering til HK-dir:
                                    </Typography>
                                    <List>
                                        <li>
                                            <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                                                15. februar for høstsemester
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                                                15. oktober for vårsemester
                                            </Typography>
                                        </li>
                                    </List>
                                    <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                                        Statistikken oppdateres innen kort tid etter disse fristene,
                                        gitt at dataen er rapportert inn og tilgjengelig.
                                    </Typography>
                                </>
                            )
                        },
                        {
                            title: <>Hva betyr totalt gjennom&shy;snitt?</>,
                            content: (
                                <>
                                    <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                                        Totalt gjennomsnitt tar utgangspunkt i følgende verdier for
                                        karakterer:
                                    </Typography>
                                    <ListContainer>
                                        <List>
                                            <li>
                                                <Typography
                                                    variant="body1"
                                                    style={{ lineHeight: 1.5 }}
                                                >
                                                    A = 5
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography
                                                    variant="body1"
                                                    style={{ lineHeight: 1.5 }}
                                                >
                                                    B = 4
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography
                                                    variant="body1"
                                                    style={{ lineHeight: 1.5 }}
                                                >
                                                    C = 3
                                                </Typography>
                                            </li>
                                        </List>
                                        <List>
                                            <li>
                                                <Typography
                                                    variant="body1"
                                                    style={{ lineHeight: 1.5 }}
                                                >
                                                    D = 2
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography
                                                    variant="body1"
                                                    style={{ lineHeight: 1.5 }}
                                                >
                                                    E = 1
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography
                                                    variant="body1"
                                                    style={{ lineHeight: 1.5 }}
                                                >
                                                    F = 0
                                                </Typography>
                                            </li>
                                        </List>
                                    </ListContainer>
                                    <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                                        Utregningen summerer karakterene for alle semestrene og
                                        deler på totalt antall studenter. Bokstav&shy;karakteren
                                        regnes ut ved å runde av til nærmeste hele tall.
                                    </Typography>
                                </>
                            )
                        },
                        {
                            title: <>Hva betyr total stryk&shy;prosent?</>,
                            content: (
                                <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                                    Totalt strykprosent regnes ut ved å summere antall studenter som
                                    fikk stryk for alle semestrene, dele på totalt antall studenter
                                    og gange med 100.
                                </Typography>
                            )
                        }
                    ]}
                />
            </SubContainer>
            <Line />
            <Typography variant="body2">
                Copyright © {new Date().getFullYear()}, KARAKTERER.net
            </Typography>
        </Container>
    );
}
