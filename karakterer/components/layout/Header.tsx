import Section from 'components/common/Section';
import Link from 'next/link';
import styled from 'styled-components';
import Navigation from './Navigation';

const Content = styled(Section)({
    maxWidth: '1440px',
    width: '100%',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    paddingBottom: 0
});

const LogoText = styled.span((props) => ({
    cursor: 'pointer',
    userSelect: 'none',
    fontFamily: 'Poppins',
    fontSize: '20px',
    color: props.theme.palette.logo,
    transition: `color ${props.theme.transitionDuration}ms ease-in-out`,

    '@media (hover: hover)': {
        ':hover': {
            color: props.theme.palette.heading
        }
    }
}));

function Header() {
    return (
        <Content>
            <Link href="/">
                <LogoText>karakterer.net</LogoText>
            </Link>
        </Content>
    );
}

export default Header;
