import ActionButton from 'components/common/ActionButton';
import Section from 'components/common/Section';
import Image from 'next/future/image';
import { Fade } from 'react-awesome-reveal';
import { SearchContext } from 'state/search';
import styled, { useTheme } from 'styled-components';
import { useContext } from 'utils/context';
import useWindowSize from 'utils/windowSize';
import landingImage from '../../public/landing.png';

const LandingSection = styled(Section)((props) => ({
    padding: '64px 32px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        padding: '96px 32px'
    },

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '96px 64px 128px 64px'
    },

    [`@media (min-width: ${props.theme.breakpoints.xl}px)`]: {
        padding: '96px 96px 128px 96px'
    }
}));

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
    margin: '27px 0 40px 0',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        fontSize: '20px'
    }
}));

const LandingImageContainer = styled.div((props) => ({
    position: 'relative',
    width: '100%',
    height: 'auto',
    maxWidth: '340px',
    justifySelf: 'center',
    margin: '0 32px',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        maxWidth: '420px',
        justifySelf: 'end',
        margin: 0
    }
}));

const LandingImage = styled(Image)(() => ({
    width: '100%',
    height: 'auto'
}));

function Landing() {
    const theme = useTheme();
    const { width } = useWindowSize();

    const { setSearchOpen } = useContext(SearchContext);

    if (width) {
        const isMd = width >= theme.breakpoints.md;

        return (
            <LandingSection>
                <Grid>
                    <div>
                        <Fade
                            direction={isMd ? 'up' : undefined}
                            triggerOnce
                            cascade={isMd}
                            duration={500}
                            damping={0.3}
                        >
                            <LandingTitle>
                                Karakter&shy;statistikk for alle emner på NTNU
                            </LandingTitle>
                            <LandingText>
                                Karakterfordeling og utvikling i gjennomsnitts&shy;karakter og
                                stryk&shy;prosent i alle emner på NTNU siden 2004.
                            </LandingText>
                            <ActionButton
                                onClick={() => {
                                    setSearchOpen(true);
                                }}
                            >
                                Søk etter emne
                            </ActionButton>
                        </Fade>
                    </div>
                    <LandingImageContainer>
                        <Fade triggerOnce duration={300}>
                            <LandingImage src={landingImage} alt="Statistikk" priority />
                        </Fade>
                    </LandingImageContainer>
                </Grid>
            </LandingSection>
        );
    }

    return null;
}

export default Landing;
