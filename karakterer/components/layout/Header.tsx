import Typography from 'components/common/Typography';
import styled, { useTheme } from 'styled-components';

const Wrapper = styled.div({
    width: '100%'
});

const Content = styled.div((props) => ({
    padding: '16px',
    maxWidth: '1440px',
    width: '100%',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    gap: '16px',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '64px 32px 0 32px',
        gap: '16px'
    }
}));

const Logo = styled.div({
    display: 'flex',
    gap: '3px',
    alignItems: 'end'
});

const Dot = styled.div((props) => ({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: props.theme.palette.primary.main,
    marginBottom: '5px'
}));

function Header() {
    const theme = useTheme();
    return (
        <Wrapper>
            <Content>
                <Logo>
                    <Typography variant="h1" style={{ fontSize: '22px' }}>
                        karakterer
                    </Typography>
                    <Dot />
                    <Typography variant="h1" style={{ fontSize: '22px' }}>
                        net
                    </Typography>
                </Logo>
            </Content>
        </Wrapper>
    );
}

export default Header;
