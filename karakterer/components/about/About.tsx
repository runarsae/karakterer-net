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

const QA = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
});

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
                    Karakterstatistikken for et emne viser fordelingen av karakterene A til F for
                    hvert semester i et søyle&shy;diagram. Denne fordelingen brukes til å beregne
                    gjennomsnitts&shy;karakterer og stryk&shy;prosenter som fremstilles i
                    linje&shy;diagrammer. Merk at antall studenter som avbrøt en eksamen ikke er
                    medberegnet.
                </Typography>
                <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                    Karakterstatistikken er hentet fra{' '}
                    <Link href="https://dbh.hkdir.no/" target="_blank">
                        database for statistikk om høyere utdanning
                    </Link>{' '}
                    (DBH) , underlagt av direktoratet for høyere utdanning og kompetanse (HK-dir).
                </Typography>
            </SubContainer>
            <Line />
            <SubContainer>
                <Typography variant="h2">FAQ</Typography>
                <QA>
                    <Typography variant="h3">
                        Hvorfor kan jeg ikke filtrere på konte&shy;eksamen?
                    </Typography>
                    <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                        Data rapporteres inn to ganger årlig; etter høstsemesteret og etter
                        vårsemesteret. Det er forskjellig fra emne til emne hvordan karakterer for
                        konteeksamen rapporteres inn og om de blir aggregert med karakterer for
                        ordinær eksamen eller ikke.
                    </Typography>
                </QA>
                <QA>
                    <Typography variant="h3">Når oppdateres statistikken?</Typography>
                    <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                        NTNU har frist for innrapportering til HK-dir den 15. februar for
                        høstsemesteret og 15. oktober for vårsemesteret. Statistikken på denne
                        nettsiden vil oppdateres innen kort tid etter disse fristene, gitt at dataen
                        er rapportert inn.
                    </Typography>
                </QA>
                <QA>
                    <Typography variant="h3">Hva betyr totalt gjennomsnitt?</Typography>
                    <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                        Totalt gjennomsnitt tar utgangspunkt i følgende verdier for karakterer:{' '}
                    </Typography>
                    <ListContainer>
                        <List>
                            <li>
                                <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                                    A = 5
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                                    B = 4
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                                    C = 3
                                </Typography>
                            </li>
                        </List>
                        <List>
                            <li>
                                <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                                    D = 2
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                                    E = 1
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                                    F = 0
                                </Typography>
                            </li>
                        </List>
                    </ListContainer>
                    <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                        Utregningen summerer opp karakterene for alle semestrene som er valgt og
                        deler på totalt antall studenter. Bokstav&shy;karakteren regnes ut ved å
                        runde av til nærmeste hele tall.
                    </Typography>
                </QA>
                <QA>
                    <Typography variant="h3">Hva betyr total strykprosent?</Typography>
                    <Typography variant="body1" style={{ lineHeight: 1.5 }}>
                        Totalt strykprosent regnes ut ved å summere opp antall studenter som fikk
                        stryk for alle semestrene som er valgt, dele på totalt antall studenter og
                        gange med 100.
                    </Typography>
                </QA>
            </SubContainer>
            <Line />
            <Typography variant="body2" style={{ textAlign: 'center' }}>
                Copyright © {new Date().getFullYear()}, KARAKTERER.net
            </Typography>
        </Container>
    );
}
