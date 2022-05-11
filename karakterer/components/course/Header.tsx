import Navigation from 'components/layout/navigation/Navigation';
import styled from 'styled-components';
import Settings from './Settings';
import Title from './Title';

const Container = styled.div((props) => ({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateAreas: `'navigation' 'title'`,
    gap: '16px',
    alignItems: 'center',
    justifyContent: 'right',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        gridTemplateColumns: '1fr auto',
        gridTemplateAreas: `'title navigation'`,
        gap: '24px'
    }
}));

interface Props {
    course: string;
    name: string | null;
}

function Header(props: Props) {
    return (
        <Container>
            <Title {...props} />
            <Navigation />
            <Settings />
        </Container>
    );
}

export default Header;
