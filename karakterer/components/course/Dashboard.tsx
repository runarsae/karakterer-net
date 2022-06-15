import Card from 'components/common/Card';
import styled from 'styled-components';
import Typography from 'components/common/Typography';
import BarChart from 'components/course/BarChart';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import LineChart, { YLabels } from 'components/course/LineChart';
import Slider from 'components/course/Slider';
import {
    computeTotalAverage,
    computeTotalFailPercentage,
    gradeLetter,
    semesterLetter
} from 'utils/grades';
import { Semester, SettingsContext } from 'state/settings';
import { useContext } from 'utils/context';

const Grid = styled.div<{ hasGrades: boolean }>((props) => ({
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'minmax(0px, 1fr)',
    gridTemplateRows: 'auto auto auto auto',
    gridTemplateAreas: `
            'grades'
            'slider'
            'measurements_subgrid'
            'line_charts_subgrid'
        `,

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        gridTemplateColumns: 'minmax(0, 1fr) auto',
        gridTemplateRows: 'auto auto auto',
        gridTemplateAreas: `
                'grades measurements_subgrid'
                'slider slider'
                'line_charts_subgrid line_charts_subgrid'
            `
    },

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        gridTemplateColumns: 'minmax(420px, 1fr) minmax(0px, 1.5fr)',
        gridTemplateRows: '1fr auto auto',
        gridTemplateAreas: props.hasGrades
            ? `
                'grades line_charts_subgrid'
                'slider line_charts_subgrid'
                'measurements_subgrid line_charts_subgrid'
            `
            : `
                'grades line_charts_subgrid'
                'grades measurements_subgrid'
                'slider measurements_subgrid'
            `
    }
}));

const LineChartsSubGrid = styled.div<{ hasGrades: boolean }>((props) => ({
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'minmax(0px, 1fr)',
    gridTemplateRows: props.hasGrades ? '1fr 1fr' : '1fr',
    gridTemplateAreas: props.hasGrades ? `'averages' 'fail_percentages'` : `'fail_percentages'`,
    gridArea: 'line_charts_subgrid'
}));

const MeasurementsSubGrid = styled.div<{ hasGrades: boolean }>((props) => ({
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'minmax(0px, 1fr)',
    gridTemplateRows: props.hasGrades ? '1fr 1fr' : '1fr',
    gridTemplateAreas: props.hasGrades
        ? `
            'total_average'
            'total_fail_percentage'
        `
        : `
            'total_fail_percentage'
        `,
    gridArea: 'measurements_subgrid',

    [`@media (min-width: ${props.theme.breakpoints.xs}px)`]: {
        gridTemplateColumns: props.hasGrades
            ? 'minmax(0px, 1fr) minmax(0px, 1fr)'
            : 'minmax(0px, 1fr)',
        gridTemplateRows: '1fr',
        gridTemplateAreas: props.hasGrades
            ? `'total_average total_fail_percentage'`
            : `'total_fail_percentage'`
    },

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        gridTemplateColumns: '240px',
        gridTemplateRows: props.hasGrades ? '1fr 1fr' : '1fr',
        gridTemplateAreas: props.hasGrades
            ? `
                'total_average'
                'total_fail_percentage'
            `
            : `'total_fail_percentage'`
    },

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        gridTemplateColumns: props.hasGrades
            ? 'minmax(0px, 1fr) minmax(0px, 1fr)'
            : 'minmax(0px, 1fr)',
        gridTemplateRows: '1fr',
        gridTemplateAreas: props.hasGrades
            ? `'total_average total_fail_percentage'`
            : `'total_fail_percentage'`
    }
}));

const CardContent = styled.div<{ gap?: boolean }>((props) => ({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: 'auto 1fr',
    ...(props.gap && { gap: '16px' }),
    height: '100%'
}));

const CenterBox = styled.div({
    display: 'flex',
    height: '100%',
    alignItems: 'center'
});

const MeasurementContainer = styled.div({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
    padding: '16px 0'
});

const AverageContainer = styled.div({
    display: 'flex',
    gap: '16px',
    justifySelf: 'center',
    alignItems: 'center'
});

const Line = styled.div((props) => ({
    width: '0px',
    height: '22px',
    borderRight: '1px solid ' + props.theme.palette.horizontalLine
}));

type Action =
    | { type: 'change_semester_display'; payload: { semester: Semester } }
    | { type: 'next_semester' }
    | { type: 'previous_semester' }
    | { type: 'set_semester'; payload: { index: number } };

type State =
    | {
          selectedSemesterIndex: number;
          semesters: string[];
          grades: Grades[];
          averageGrades: (number | null)[];
          totalAverage: number | null;
          failPercentages: (number | null)[];
          totalFailPercentage: number;
      }
    | undefined;

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

interface Props {
    grades: Grades[];
}

const Dashboard = ({ grades }: Props) => {
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

    const reducer = (prevState: State, action: Action): State => {
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

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            dispatch({ type: 'previous_semester' });
        } else if (e.key === 'ArrowRight') {
            dispatch({ type: 'next_semester' });
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    if (state) {
        return (
            <Grid hasGrades={hasGrades}>
                <Card style={{ gridArea: 'grades' }}>
                    <CardContent gap>
                        <Typography variant="h2">Karakterfordeling</Typography>
                        <BarChart grades={state.grades[state.selectedSemesterIndex]} />
                    </CardContent>
                </Card>

                <Card
                    style={{
                        gridArea: 'slider'
                    }}
                >
                    {state.semesters.length > 1 ? (
                        <Slider
                            max={state.semesters.length - 1}
                            value={state.selectedSemesterIndex}
                            onChange={(value) =>
                                dispatch({
                                    type: 'set_semester',
                                    payload: { index: value }
                                })
                            }
                            label={state.semesters[state.selectedSemesterIndex]}
                            minLabel={state.semesters.at(0)!}
                            maxLabel={state.semesters.at(-1)!}
                        />
                    ) : state.semesters.length === 1 ? (
                        <Typography variant="body1" style={{ textAlign: 'center' }}>
                            Emnet har bare registrert karakterer for {state.semesters[0]}.
                        </Typography>
                    ) : (
                        <Typography variant="body1" style={{ textAlign: 'center' }}>
                            Ingen karakterer registrert for dette emnet.
                        </Typography>
                    )}
                </Card>

                <MeasurementsSubGrid hasGrades={hasGrades}>
                    {hasGrades && (
                        <Card style={{ gridArea: 'total_average' }}>
                            <CenterBox>
                                <MeasurementContainer>
                                    <AverageContainer>
                                        <Typography
                                            variant="measurement"
                                            style={{ display: 'inline' }}
                                        >
                                            {state.totalAverage && gradeLetter(state.totalAverage)}
                                        </Typography>
                                        <Line />
                                        <Typography
                                            variant="measurement"
                                            style={{ display: 'inline' }}
                                        >
                                            {state.totalAverage}
                                        </Typography>
                                    </AverageContainer>
                                    <Typography
                                        variant="body1"
                                        style={{ textAlign: 'center', whiteSpace: 'nowrap' }}
                                    >
                                        Totalt gjennomsnitt
                                    </Typography>
                                </MeasurementContainer>
                            </CenterBox>
                        </Card>
                    )}

                    <Card style={{ gridArea: 'total_fail_percentage' }}>
                        <CenterBox>
                            <MeasurementContainer>
                                <Typography
                                    variant="measurement"
                                    style={{ textAlign: 'center', whiteSpace: 'nowrap' }}
                                >
                                    {state.totalFailPercentage}%
                                </Typography>
                                <Typography
                                    variant="body1"
                                    style={{ textAlign: 'center', whiteSpace: 'nowrap' }}
                                >
                                    Total strykprosent
                                </Typography>
                            </MeasurementContainer>
                        </CenterBox>
                    </Card>
                </MeasurementsSubGrid>

                <LineChartsSubGrid hasGrades={hasGrades}>
                    {hasGrades && (
                        <Card style={{ gridArea: 'averages' }}>
                            <CardContent>
                                <Typography variant="h2">Gjennomsnitt</Typography>
                                <LineChart
                                    values={state.averageGrades}
                                    dataLabelIndex={state.selectedSemesterIndex}
                                    xLabels={state.semesters}
                                    yLabels={YLabels.Grades}
                                    color="#3E95CD"
                                    onChange={(value) =>
                                        dispatch({
                                            type: 'set_semester',
                                            payload: { index: value }
                                        })
                                    }
                                />
                            </CardContent>
                        </Card>
                    )}
                    <Card style={{ gridArea: 'fail_percentages' }}>
                        <CardContent>
                            <Typography variant="h2">Strykprosent</Typography>
                            <LineChart
                                values={state.failPercentages}
                                dataLabelIndex={state.selectedSemesterIndex}
                                xLabels={state.semesters}
                                yLabels={YLabels.Percentages}
                                color="#b13f3f"
                                valueSuffix="%"
                                onChange={(value) =>
                                    dispatch({
                                        type: 'set_semester',
                                        payload: { index: value }
                                    })
                                }
                            />
                        </CardContent>
                    </Card>
                </LineChartsSubGrid>
            </Grid>
        );
    }

    return null;
};

export default Dashboard;
