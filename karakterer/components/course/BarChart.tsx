import styled, { useTheme } from 'styled-components';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartType, ChartOptions } from 'chart.js';
import { useEffect, useMemo, useRef } from 'react';
import FontFaceObserver from 'fontfaceobserver';

const Container = styled.div((props) => ({
    position: 'relative',
    width: '100%',
    maxWidth: '496px',
    height: '280px',
    padding: '16px',
    justifySelf: 'center',

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        height: '320px'
    }
}));

interface Props {
    isGraded: boolean;
    grades: (number | null)[];
}

const BarChart = ({ isGraded, grades }: Props) => {
    const theme = useTheme();

    const chartRef = useRef<ChartType<'bar'>>(null);

    useEffect(() => {
        const font = new FontFaceObserver('RaleWayMedium');

        font.load().then(() => {
            if (chartRef.current) {
                chartRef.current.update();
            }
        });
    }, []);

    const options: ChartOptions<'bar'> = useMemo(
        () => ({
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
                datalabels: {
                    color: theme.palette.heading,
                    font: {
                        size: 12,
                        family: 'RalewayMedium'
                    },
                    anchor: 'end',
                    align: function (context) {
                        const index = context.dataIndex;
                        const value = context.dataset.data[index];
                        const barHeight = context.chart
                            .getDatasetMeta(0)
                            .data[index].getProps(['height'], true)['height'] as number;

                        return barHeight < 30 || value === 0 ? 'end' : 'start';
                    }
                }
            },
            datasets: {
                bar: {
                    maxBarThickness: 56,
                    backgroundColor: isGraded
                        ? ['#272d1d', '#272d1d', '#33301f', '#352c1e', '#35251c', '#35221f']
                        : ['#272d1d', '#35221f'],
                    borderColor: isGraded
                        ? [
                              '#79b31199',
                              '#79b31199',
                              '#eecb2499',
                              '#fea71b99',
                              '#fc630e99',
                              '#fc482599'
                          ]
                        : ['#79b31199', '#fc482599'],
                    borderWidth: 1.5
                }
            },
            events: [],
            scales: {
                y: {
                    beginAtZero: true,
                    display: false
                },
                x: {
                    ticks: {
                        padding: 8,
                        color: theme.palette.text,
                        font: {
                            size: 12,
                            family: 'RalewayMedium'
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    labels: isGraded ? ['A', 'B', 'C', 'D', 'E', 'F'] : ['Bestått', 'Ikke bestått']
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }),
        [isGraded, theme.palette.heading, theme.palette.text]
    );

    const data = useMemo(
        () => ({
            datasets: [
                {
                    data: grades
                }
            ]
        }),
        [grades]
    );

    return (
        <Container>
            <Chart ref={chartRef} type="bar" options={options} data={data} />
        </Container>
    );
};

export default BarChart;
