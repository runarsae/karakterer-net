import styled, { useTheme } from 'styled-components';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartType, ChartOptions } from 'chart.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import FontFaceObserver from 'fontfaceobserver';

const Container = styled.div((props) => ({
    position: 'relative',
    width: '100%',
    height: '200px',

    [`@media (min-width: ${props.theme.breakpoints.lg}px)`]: {
        height: '100%'
    }
}));

export enum YLabels {
    Grades,
    Percentages
}

interface Props {
    values: (number | null)[];
    dataLabelIndex: number;
    xLabels: string[];
    yLabels?: YLabels;
    color: string;
    valueSuffix?: string;
    onChange: (value: number) => void;
}

const LineChart = ({
    values,
    dataLabelIndex,
    xLabels,
    yLabels,
    color,
    valueSuffix,
    onChange
}: Props) => {
    const theme = useTheme();

    const [pointHover, setPointHover] = useState<boolean>(false);

    const options: ChartOptions<'line'> = useMemo(
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
                        size: 12
                    },
                    backgroundColor: theme.palette.popup.main,
                    borderRadius: 4,
                    padding: {
                        top: 8,
                        right: 8,
                        bottom: 6,
                        left: 8
                    },
                    anchor: 'end',
                    align: 'end',
                    display: (context) => {
                        return context.dataIndex === dataLabelIndex;
                    },
                    formatter: (value) => {
                        return valueSuffix ? value.toFixed(1) + '%' : value.toFixed(2);
                    }
                }
            },
            datasets: {
                line: {
                    borderColor: color,
                    backgroundColor: color,
                    hoverBackgroundColor: color,
                    hoverBorderColor: color,
                    hitRadius: 10,
                    pointHoverRadius: 4,
                    fill: false,
                    tension: 0.4,
                    spanGaps: false,
                    pointRadius: (context) => {
                        return context.dataIndex === dataLabelIndex ? 4 : 2;
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        zeroLineWidth: 0,
                        drawTicks: false,
                        color: '#1D1D1D',
                        borderColor: '#1D1D1D'
                    },
                    ticks: {
                        callback: (label, _index, labels) => {
                            if (typeof label === 'string') {
                                label = parseInt(label);
                            }

                            if (yLabels === YLabels.Grades) {
                                switch (label) {
                                    case 0:
                                        return 'F';
                                    case 1:
                                        return 'E';
                                    case 2:
                                        return 'D';
                                    case 3:
                                        return 'C';
                                    case 4:
                                        return 'B';
                                    case 5:
                                        return 'A';
                                    default:
                                        return null;
                                }
                            } else if (yLabels === YLabels.Percentages) {
                                let max = Math.max(...labels.map((l) => l.value));

                                if (
                                    (max > 40 && label % 20 === 0) ||
                                    (max <= 40 && max > 20 && label % 10 === 0) ||
                                    (max <= 20 && max > 10 && label % 5 === 0) ||
                                    (max <= 10 && label % 2 === 0)
                                ) {
                                    return valueSuffix ? label + valueSuffix : label;
                                } else {
                                    return null;
                                }
                            }

                            return valueSuffix ? label + valueSuffix : label;
                        },
                        padding: 20,
                        color: theme.palette.text,
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    labels: xLabels,
                    ticks: {
                        padding: 20,
                        color: theme.palette.text,
                        font: {
                            size: 12
                        },
                        callback: (_, index, ticks) => {
                            if (ticks.length >= 10) {
                                return index % 2 === 0 ? xLabels[index] : null;
                            }

                            return xLabels[index];
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            },
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    right: 38,
                    top: 38,
                    left: 0,
                    bottom: 0
                }
            },
            onClick: (_, e) => {
                if (e.length > 0) {
                    onChange(e[0].index);
                }
            },
            onHover: (_, e) => {
                e.length > 0 ? setPointHover(true) : setPointHover(false);
            }
        }),
        [theme, color, xLabels, dataLabelIndex, valueSuffix, yLabels, onChange]
    );

    const data = useMemo(
        () => ({
            datasets: [
                {
                    data: values
                }
            ]
        }),
        [values]
    );

    return (
        <Container>
            <Chart
                style={{ cursor: pointHover ? 'pointer' : 'auto' }}
                type="line"
                options={options}
                data={data}
            />
        </Container>
    );
};

export default LineChart;
