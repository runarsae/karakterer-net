import Card from 'components/common/Card';
import styled, { useTheme } from 'styled-components';
import Typography from 'components/common/Typography';
import BarChart from 'components/course/BarChart';
import { Dispatch, useCallback, useEffect } from 'react';
import LineChart, { YLabels } from 'components/course/LineChart';
import Slider from 'components/course/Slider';
import { gradeLetter } from 'utils/grades';
import { Action, State } from 'state/dashboard';

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

interface Props {
    state: State;
    dispatch: Dispatch<Action>;
}

function Dashboard({ state, dispatch }: Props) {
    const theme = useTheme();

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                dispatch({ type: 'previous_semester' });
            } else if (e.key === 'ArrowRight') {
                dispatch({ type: 'next_semester' });
            }
        },
        [dispatch]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <Grid hasGrades={state.hasGrades}>
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
                        minLabel={state.semesters.at(0)}
                        maxLabel={state.semesters.at(-1)}
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

            <MeasurementsSubGrid hasGrades={state.hasGrades}>
                {state.hasGrades && (
                    <Card style={{ gridArea: 'total_average' }}>
                        <CenterBox>
                            <MeasurementContainer>
                                <AverageContainer>
                                    <Typography variant="measurement" style={{ display: 'inline' }}>
                                        {state.totalAverage && gradeLetter(state.totalAverage)}
                                    </Typography>
                                    <Line />
                                    <Typography variant="measurement" style={{ display: 'inline' }}>
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

            <LineChartsSubGrid hasGrades={state.hasGrades}>
                {state.hasGrades && (
                    <Card style={{ gridArea: 'averages' }}>
                        <CardContent>
                            <Typography variant="h2">Gjennomsnitt</Typography>
                            <LineChart
                                values={state.averageGrades}
                                dataLabelIndex={state.selectedSemesterIndex}
                                xLabels={state.semesters}
                                yLabels={YLabels.Grades}
                                color={theme.palette.primary.main}
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

export default Dashboard;
