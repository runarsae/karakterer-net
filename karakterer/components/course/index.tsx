import styled from 'styled-components';
import Section from 'components/common/Section';
import Header from './Header';
import Dashboard from './Dashboard';
import Sidebar from 'components/common/Sidebar';
import { CourseWithGrades } from 'lib/getCourseData';
import { useContext } from 'utils/context';
import { Semester, SettingsContext } from 'state/settings';
import { useEffect, useMemo, useReducer } from 'react';
import { computeTotalAverage, computeTotalFailPercentage, semesterLetter } from 'utils/grades';

const Wrapper = styled.div((props) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: 'auto',
    marginBottom: 'auto',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        gap: '24px'
    }
}));

export interface Grades {
    year: number;
    semester: number;
    isGraded: boolean;
    students: number;
    a: number | null;
    b: number | null;
    c: number | null;
    d: number | null;
    e: number | null;
    f: number | null;
    g: number | null;
    h: number | null;
    averageGrade: number | null;
    failPercentage: number | null;
}

export type Action =
    | { type: 'change_semester_display'; payload: { semester: Semester } }
    | { type: 'next_semester' }
    | { type: 'previous_semester' }
    | { type: 'set_semester'; payload: { index: number } };

export type State = {
    selectedSemesterIndex: number;
    semesters: string[];
    grades: Grades[];
    averageGrades: (number | null)[];
    totalAverage: number | null;
    failPercentages: (number | null)[];
    totalFailPercentage: number;
};

const CoursePage = ({ course, name, grades }: CourseWithGrades) => {
    const { semesterDisplay, setSemesterDisplay, setEnabledSemesterDisplays } =
        useContext(SettingsContext);

    useEffect(() => {
        if (grades) {
            // Check which semesters the course has grades for
            const hasSpring = grades.some((item) => item.semester === 1);
            const hasAutumn = grades.some((item) => item.semester === 3);

            setEnabledSemesterDisplays([
                ...(hasSpring ? [Semester.Spring] : []),
                ...(hasAutumn ? [Semester.Autumn] : []),
                ...(hasSpring && hasAutumn ? [Semester.All] : [])
            ]);

            // Set default semester display
            // TODO: Set default to main semester
            setSemesterDisplay(
                hasSpring && hasAutumn
                    ? Semester.All
                    : hasSpring
                    ? Semester.Spring
                    : Semester.Autumn
            );
        }
    }, [grades, setEnabledSemesterDisplays, setSemesterDisplay]);

    const hasGrades = useMemo(() => grades.some((item) => item.isGraded), [grades]);

    const reducer = (prevState: State | undefined, action: Action): State | undefined => {
        switch (action.type) {
            case 'change_semester_display':
                const filteredGrades =
                    action.payload.semester !== Semester.All
                        ? grades.filter((item) => item.semester == action.payload.semester)
                        : grades;

                const semesters = filteredGrades.map(
                    (item) => semesterLetter(item.semester) + item.year.toString()
                );

                return {
                    selectedSemesterIndex: semesters.length - 1,
                    semesters: semesters,
                    grades: filteredGrades,
                    averageGrades: filteredGrades.map((item) => item.averageGrade),
                    totalAverage: computeTotalAverage(filteredGrades),
                    failPercentages: filteredGrades.map((item) => item.failPercentage),
                    totalFailPercentage: computeTotalFailPercentage(filteredGrades)
                };
            case 'previous_semester':
                if (prevState && prevState.selectedSemesterIndex > 0) {
                    const index = prevState.selectedSemesterIndex - 1;
                    return {
                        ...prevState,
                        selectedSemesterIndex: index
                    };
                }

                return prevState;
            case 'next_semester':
                if (prevState && prevState.selectedSemesterIndex < prevState.semesters.length - 1) {
                    const index = prevState.selectedSemesterIndex + 1;

                    return {
                        ...prevState,
                        selectedSemesterIndex: index
                    };
                }

                return prevState;
            case 'set_semester':
                if (prevState) {
                    const index = action.payload.index;

                    return {
                        ...prevState,
                        selectedSemesterIndex: index
                    };
                }

                break;
        }
    };

    const [state, dispatch] = useReducer(reducer, undefined, undefined);

    useEffect(() => {
        dispatch({ type: 'change_semester_display', payload: { semester: semesterDisplay } });
    }, [semesterDisplay]);

    return (
        state && (
            <>
                <Section>
                    <Wrapper>
                        <Header course={course} name={name} />
                        <Dashboard state={state} dispatch={dispatch} hasGrades={hasGrades} />
                    </Wrapper>
                </Section>

                <Sidebar />
            </>
        )
    );
};

export default CoursePage;
