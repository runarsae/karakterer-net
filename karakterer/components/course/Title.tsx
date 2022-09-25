import Card from 'components/common/Card';
import { Heading2, Heading4 } from 'components/common/Typography';
import styled, { useTheme } from 'styled-components';

const TitleCard = styled(Card)((props) => ({
    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        display: 'none'
    }
}));

const Container = styled.div((props) => ({
    gridArea: 'title',
    display: 'grid',
    gridTemplateColumns: '1fr',
    width: '100%',
    alignItems: 'center',
    gap: '8px',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        gridTemplateColumns: 'auto 1fr',
        gap: '12px'
    }
}));

interface Props {
    course: string;
    name: string | null;
}

function Title({ course, name }: Props) {
    const theme = useTheme();

    return (
        <TitleCard>
            <Container>
                <Heading4 style={{ color: theme.palette.text }}>{course}</Heading4>
                <Heading2>{name}</Heading2>
            </Container>
        </TitleCard>
    );
}

export default Title;
