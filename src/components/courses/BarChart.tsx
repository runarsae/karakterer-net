"use client";

import { Chart } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { useMemo } from "react";
import { Grade } from "@prisma/client";

interface BarChartProps {
  semesterGrades: Grade;
}

const BarChart = ({ semesterGrades }: BarChartProps) => {
  const options: ChartOptions<"bar"> = useMemo(
    () => ({
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        datalabels: {
          color: "#d4d4d4",
          anchor: "end",
          align: function (context) {
            const index = context.dataIndex;
            const value = context.dataset.data[index];
            const barHeight = context.chart
              .getDatasetMeta(0)
              .data[index].getProps(["height"], true)["height"] as number;

            return barHeight < 30 || value === 0 ? "end" : "start";
          },
        },
      },
      datasets: {
        bar: {
          maxBarThickness: 56,
          backgroundColor: semesterGrades.isGraded
            ? ["#272d1d", "#272d1d", "#33301f", "#352c1e", "#35251c", "#35221f"]
            : ["#272d1d", "#35221f"],
          borderColor: semesterGrades.isGraded
            ? [
                "#79b31199",
                "#79b31199",
                "#eecb2499",
                "#fea71b99",
                "#fc630e99",
                "#fc482599",
              ]
            : ["#79b31199", "#fc482599"],
          borderWidth: 1.5,
        },
      },
      events: [],
      scales: {
        y: {
          beginAtZero: true,
          display: false,
        },
        x: {
          ticks: {
            padding: 8,
          },
          grid: {
            display: false,
            drawBorder: false,
          },
          border: {
            display: false,
          },
          labels: semesterGrades.isGraded
            ? ["A", "B", "C", "D", "E", "F"]
            : ["Bestått", "Ikke bestått"],
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    }),
    [semesterGrades],
  );

  const data = useMemo(
    () => ({
      datasets: [
        {
          data: semesterGrades.isGraded
            ? [
                semesterGrades.a,
                semesterGrades.b,
                semesterGrades.c,
                semesterGrades.d,
                semesterGrades.e,
                semesterGrades.f,
              ]
            : [semesterGrades.g, semesterGrades.h],
        },
      ],
    }),
    [semesterGrades],
  );

  return (
    <div className="relative mx-auto h-[280px] w-full max-w-[496px] p-4 lg:h-[320px]">
      <Chart type="bar" options={options} data={data} />
    </div>
  );
};

export default BarChart;
