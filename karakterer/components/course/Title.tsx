import Card from 'components/common/Card';
import Typography from 'components/common/Typography';
import styled, { useTheme } from 'styled-components';
import useWindowSize from 'utils/windowSize';

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

const CourseCode = styled(Card)`
    ${(props) => ({
        width: 'fit-content',

        [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
            padding: '8px 16px'
        }
    })}
`;

interface Props {
    course: string;
    name: string | null;
}

function Title({ course, name }: Props) {
    const theme = useTheme();

    const { width } = useWindowSize();

    if (width) {
        return (
            <>
                {width >= theme.breakpoints.md ? (
                    <Container>
                        <CourseCode>
                            <Typography variant="h1">{course}</Typography>
                        </CourseCode>
                        <Typography variant="h1">{name}</Typography>
                    </Container>
                ) : (
                    <Card>
                        <Container>
                            <Typography variant="body2">{course}</Typography>
                            <Typography variant="h1">{name}</Typography>
                        </Container>
                    </Card>
                )}
            </>
        );
    }

    return null;
}

export default Title;
