import { Course } from '@prisma/client';
import Typography from 'components/common/Typography';
import { useRouter } from 'next/router';
import styled, { useTheme } from 'styled-components';

const Container = styled.div((props) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '0 0 24px 0'
    }
}));

const ResultCard = styled.button((props) => ({
    all: 'unset',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    backgroundColor: props.theme.palette.popup.main,
    borderRadius: '4px',
    transition: `background-color 100ms ease-in-out`,

    ':focus': {
        backgroundColor: props.theme.palette.popup.hover
    },

    '@media (hover: hover)': {
        ':hover': {
            backgroundColor: props.theme.palette.popup.hover
        }
    }

    // [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
    //     backgroundColor: props.theme.palette.popupCard.main,

    //     ':focus': {
    //         backgroundColor: props.theme.palette.popupCard.hover
    //     },

    //     '@media (hover: hover)': {
    //         ':hover': {
    //             backgroundColor: props.theme.palette.popupCard.hover
    //         }
    //     }
    // }
}));

interface Props {
    courses: Course[];
}

function Results({ courses }: Props) {
    const theme = useTheme();
    const router = useRouter();

    return (
        <Container>
            {courses.map((course, index) => (
                <ResultCard key={index} onClick={() => router.push(`/course/${course.course}`)}>
                    <Typography variant="body2">{course.course}</Typography>
                    <Typography variant="body1" style={{ color: theme.palette.heading }}>
                        {course.name}
                    </Typography>
                </ResultCard>
            ))}
        </Container>
    );
}

export default Results;
