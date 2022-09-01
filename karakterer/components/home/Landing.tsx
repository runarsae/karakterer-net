import ActionButton from 'components/common/ActionButton';
import Image from 'next/image';
import { SearchContext } from 'state/search';
import styled from 'styled-components';
import { useContext } from 'utils/context';
import landingImage from '../../public/landing.png';
import Fade from 'react-reveal/Fade';

const Grid = styled.div((props) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '64px',
    alignItems: 'center',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        gridTemplateColumns: '1fr 1fr'
    }
}));

const LandingTitle = styled.h1((props) => ({
    color: props.theme.palette.heading,
    fontSize: 'max(min(6.5vw, 60px), 32px)',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        fontSize: 'max(min(4.5vw, 60px), 32px)'
    }
}));

const LandingText = styled.p((props) => ({
    fontSize: '18px',
    color: props.theme.palette.text,
    lineHeight: '1.5',
    margin: '32px 0',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        fontSize: '20px'
    }
}));

const LandingImage = styled.div((props) => ({
    maxWidth: '340px',
    justifySelf: 'center',
    margin: '0 32px',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        maxWidth: '420px',
        justifySelf: 'end',
        margin: 0
    }
}));

function LandingSection() {
    const { setSearchOpen } = useContext(SearchContext);

    return (
        <Grid>
            <div>
                <Fade bottom>
                    <LandingTitle>Karakter&shy;statistikk for alle emner på NTNU</LandingTitle>{' '}
                </Fade>

                <Fade bottom delay={300}>
                    <LandingText>
                        Karakterfordeling og utvikling i gjennomsnittskarakter og strykprosent i
                        alle emner på NTNU siden 2004.
                    </LandingText>
                </Fade>

                <Fade bottom delay={600} ssrReveal>
                    <ActionButton
                        onClick={() => {
                            setSearchOpen(true);
                        }}
                    >
                        Søk etter emne
                    </ActionButton>
                </Fade>
            </div>
            <LandingImage>
                <Image src={landingImage} alt="Statistikk" priority quality={100} />{' '}
            </LandingImage>
        </Grid>
    );
}

export default LandingSection;
