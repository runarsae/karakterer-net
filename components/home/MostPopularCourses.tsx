import Animation from 'components/common/animations/Animation';
import { AnimationType } from 'components/common/animations/animations';
import Section from 'components/common/Section';
import { Body1, Body2, Heading1 } from 'components/common/Typography';
import { CoursesWithNames } from 'lib/getMostPopularCoursesByViews';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Grid = styled.div((props) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '8px',

    [`@media (min-width: ${props.theme.breakpoints.sm}px)`]: {
        gridTemplateColumns: 'repeat(2, calc(50% - 8px))',
        gap: '16px'
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
    overflow: 'hidden',

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

const CourseName = styled(Body1)((props) => ({
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
        <Animation type={AnimationType.FadeIn} count={1} duration={300}>
            <Section>
                <Heading1>Mest populære emner</Heading1>
                <Grid>
                    {courses.map((course) => (
                        <Card
                            key={course.course}
                            onClick={() => router.push(`/course/${course.course}`)}
                        >
                            <Body2>{course.course}</Body2>
                            <CourseName>{course.courses.name}</CourseName>
                        </Card>
                    ))}
                </Grid>
            </Section>
        </Animation>
    );
}

export default MostPopularCourses;
