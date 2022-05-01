import Card from 'components/common/Card';
import Section from 'components/common/Section';
import Title from 'components/course/Title';
import styled, { useTheme } from 'styled-components';
import Typography from 'components/common/Typography';
import BarChart from 'components/course/BarChart';
import { useCallback, useEffect, useState } from 'react';
import LineChart, { YLabels } from 'components/course/LineChart';
import Slider from 'components/course/Slider';
import { CourseProps, SemesterStats } from 'pages/course/[...id]';
import Navigation from 'components/layout/navigation/Navigation';

const Container = styled.div((props) => ({
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

const Header = styled.div((props) => ({
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

const MeasurementContainer = styled.div((props) => ({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
    padding: '16px 0'
}));

const AverageContainer = styled.div((props) => ({
    display: 'flex',
    gap: '16px',
    justifySelf: 'center',
    alignItems: 'center'
}));

const Line = styled.div((props) => ({
    width: '0px',
    height: '22px',
    borderRight: '1px solid ' + props.theme.palette.horizontalLine
}));

const Dashboard = ({
    course,
    name,
    hasGrades,
    hasPassFail,
    semesters,
    grades,
    averageGrades,
    failPercentages,
    totalAverage,
    totalAverageLetter,
    totalFailPercentage
}: CourseProps) => {
    const theme = useTheme();

    const [semesterIndex, setSemesterIndex] = useState<number>(semesters.length - 1);

    const [semesterGrades, setSemesterGrades] = useState<SemesterStats>(
        grades[semesters[semesterIndex]]
    );

    // If semester index changes, change to corresponding grades for that semester
    useEffect(() => {
        if (grades && semesters && semesterIndex !== undefined) {
            setSemesterGrades(grades[semesters[semesterIndex]]);
        }
    }, [grades, semesters, semesterIndex]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (semesterIndex !== undefined) {
                if (e.key === 'ArrowLeft') {
                    if (semesterIndex > 0) {
                        setSemesterIndex((prevValue) => prevValue! - 1);
                    }
                } else if (e.key === 'ArrowRight') {
                    if (semesterIndex < semesters.length - 1) {
                        setSemesterIndex((prevValue) => prevValue! + 1);
                    }
                }
            }
        },
        [semesterIndex, setSemesterIndex, semesters]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <Section>
            <Container>
                <Header>
                    <Title course={course} name={name} />
                    <Navigation />
                </Header>

                <Grid hasGrades={hasGrades}>
                    <Card style={{ gridArea: 'grades' }}>
                        <CardContent gap>
                            <Typography variant="h2">Karakterfordeling</Typography>
                            <BarChart
                                isGraded={semesterGrades.isGraded}
                                grades={
                                    semesterGrades.isGraded
                                        ? semesterGrades.letterGrades
                                        : semesterGrades.passFailGrades
                                }
                            />
                        </CardContent>
                    </Card>

                    {semesters.length > 1 && (
                        <Card
                            style={{
                                gridArea: 'slider'
                            }}
                        >
                            <Slider
                                max={semesters.length - 1}
                                value={semesterIndex}
                                onChange={(value) => setSemesterIndex(value)}
                                label={semesters[semesterIndex]}
                                minLabel={semesters[0]}
                                maxLabel={semesters[semesters.length - 1]}
                            />
                        </Card>
                    )}

                    <MeasurementsSubGrid hasGrades={hasGrades}>
                        {hasGrades && (
                            <Card style={{ gridArea: 'total_average' }}>
                                <CenterBox>
                                    <MeasurementContainer>
                                        <AverageContainer>
                                            <Typography variant="measurement" inline>
                                                {totalAverageLetter}
                                            </Typography>
                                            <Line />
                                            <Typography variant="measurement" inline>
                                                {totalAverage}
                                            </Typography>
                                        </AverageContainer>
                                        <Typography variant="body1" align="center" noWrap>
                                            Totalt gjennomsnitt
                                        </Typography>
                                    </MeasurementContainer>
                                </CenterBox>
                            </Card>
                        )}

                        <Card style={{ gridArea: 'total_fail_percentage' }}>
                            <CenterBox>
                                <MeasurementContainer>
                                    <Typography variant="measurement" align="center" noWrap>
                                        {totalFailPercentage}%
                                    </Typography>
                                    <Typography variant="body1" align="center" noWrap>
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
                                        values={averageGrades}
                                        dataLabelIndex={semesterIndex}
                                        xLabels={semesters}
                                        yLabels={YLabels.Grades}
                                        color="#3E95CD"
                                        onChange={(value) => setSemesterIndex(value)}
                                    />
                                </CardContent>
                            </Card>
                        )}
                        <Card style={{ gridArea: 'fail_percentages' }}>
                            <CardContent>
                                <Typography variant="h2">Strykprosent</Typography>
                                <LineChart
                                    values={failPercentages}
                                    dataLabelIndex={semesterIndex}
                                    xLabels={semesters}
                                    yLabels={YLabels.Percentages}
                                    color="#b13f3f"
                                    valueSuffix="%"
                                    onChange={(value) => setSemesterIndex(value)}
                                />
                            </CardContent>
                        </Card>
                    </LineChartsSubGrid>
                </Grid>
            </Container>
        </Section>
    );
};

export default Dashboard;
