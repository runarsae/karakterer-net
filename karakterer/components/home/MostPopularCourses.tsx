import Section from 'components/common/Section';
import Typography from 'components/common/Typography';
import { CoursesWithNames } from 'lib/getMostPopularCoursesByViews';
import { useRouter } from 'next/router';
import { Fade } from 'react-awesome-reveal';
import styled from 'styled-components';

const Grid = styled.div((props) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        gridTemplateColumns: 'repeat(2, calc(50% - 8px))'
    },

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        gridTemplateColumns: 'repeat(4, calc(25% - 12px))'
    }
}));

const Card = styled.button((props) => ({
    all: 'unset',
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    padding: '16px',
    backgroundColor: props.theme.palette.card.main,
    borderRadius: '4px',
    transition: `background-color 100ms ease-in-out`,

    ':focus': {
        backgroundColor: props.theme.palette.card.hover
    },

    '@media (hover: hover)': {
        ':hover': {
            backgroundColor: props.theme.palette.card.hover
        }
    },

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '24px'
    }
}));

const CourseName = styled(Typography)((props) => ({
    color: props.theme.palette.heading,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
}));

interface Props {
    courses: CoursesWithNames;
}

function MostPopularCourses({ courses }: Props) {
    const router = useRouter();

    return (
        <Section>
            <Typography variant="h1">Mest populære emner</Typography>
            <Grid>
                <Fade triggerOnce cascade damping={0.05} duration={1000}>
                    {courses.map((course) => (
                        <Card
                            key={course.course}
                            onClick={() => router.push(`/course/${course.course}`)}
                        >
                            <Typography variant="body2">{course.course}</Typography>
                            <CourseName variant="body1">{course.courses.name}</CourseName>
                        </Card>
                    ))}
                </Fade>
            </Grid>
        </Section>
    );
}

export default MostPopularCourses;
