import { Dispatch, useEffect, useMemo, useReducer } from 'react';
import { useContext } from 'utils/context';
import { computeTotalAverage, computeTotalFailPercentage, semesterLetter } from 'utils/grades';
import { Semester, SettingsContext } from './settings';

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
    | { type: 'initialize'; payload: { semester: Semester } }
    | { type: 'next_semester' }
    | { type: 'previous_semester' }
    | { type: 'set_semester'; payload: { index: number } };

export type State = {
    hasGrades: boolean;
    selectedSemesterIndex: number;
    semesters: string[];
    grades: Grades[];
    averageGrades: (number | null)[];
    totalAverage: number | null;
    failPercentages: (number | null)[];
    totalFailPercentage: number;
};

export const useDashboardState = (grades: Grades[]): [State | undefined, Dispatch<Action>] => {
    const { semesterDisplay } = useContext(SettingsContext);

    const reducer = useMemo(
        () =>
            (prevState: State | undefined, action: Action): State | undefined => {
                switch (action.type) {
                    case 'initialize':
                        const hasGrades = grades.some((item) => item.isGraded);

                        const filteredGrades =
                            action.payload.semester !== Semester.All
                                ? grades.filter((item) => item.semester == action.payload.semester)
                                : grades;

                        const semesters = filteredGrades.map(
                            (item) => semesterLetter(item.semester) + item.year.toString()
                        );

                        return {
                            hasGrades: hasGrades,
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
                        if (
                            prevState &&
                            prevState.selectedSemesterIndex < prevState.semesters.length - 1
                        ) {
                            const index = prevState.selectedSemesterIndex + 1;

                            return {
                                ...prevState,
                                selectedSemesterIndex: index
                            };
                        }

                        return prevState;
                    case 'set_semester':
                        const index = action.payload.index;

                        return {
                            ...prevState!,
                            selectedSemesterIndex: index
                        };
                }
            },
        [grades]
    );

    const [state, dispatch] = useReducer(reducer, undefined);

    // Initialize dashboard state when semester display and grades are changed
    useEffect(() => {
        dispatch({ type: 'initialize', payload: { semester: semesterDisplay } });
    }, [semesterDisplay, grades]);

    return [state, dispatch];
};
