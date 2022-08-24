import ActionButton from 'components/common/ActionButton';
import styled from 'styled-components';

const Grid = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px'
});

const LandingTitle = styled.h1((props) => ({
    fontSize: '60px',
    color: props.theme.palette.heading
}));

const LandingText = styled.p((props) => ({
    fontSize: '20px',
    color: props.theme.palette.text,
    lineHeight: '1.5',
    margin: '32px 0'
}));

function Content() {
    return (
        <Grid>
            <div>
                <LandingTitle>Karakter&shy;statistikk for alle emner på NTNU</LandingTitle>
                <LandingText>
                    Karakterfordeling og utvikling i gjennomsnittskarakter og strykprosent i alle
                    emner på NTNU siden 2004.
                </LandingText>
                <ActionButton>Søk etter emne</ActionButton>
            </div>
        </Grid>
    );
}

export default Content;
