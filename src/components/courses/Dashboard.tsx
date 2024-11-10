"use client";

import { useDashboardState } from "@/hooks/useDashboardState";
import { Grid, LineChartsSubGrid } from "./Grid";
import BarChart from "./BarChart";
import Slider from "./slider/Slider";
import { useCallback, useEffect } from "react";
import LineChart, { YLabels } from "./LineChart";
import { gradeLetter } from "@/utils/grades";
import { Course, Grade } from "@prisma/client";
import CourseHeader from "./CourseHeader";

interface DashboardProps {
  course: Course & { grades: Grade[] };
}

export default function Dashboard({ course }: DashboardProps) {
  const [state, dispatch] = useDashboardState(course.grades);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        dispatch({ type: "previous_semester" });
      } else if (e.key === "ArrowRight") {
        dispatch({ type: "next_semester" });
      }
    },
    [dispatch],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!state) return null;

  return (
    <div className="flex flex-col gap-4">
      <CourseHeader code={course.code} name={course.name} />
      <Grid hasGrades={state.hasGrades}>
        <div className="card [grid-area:grades]">
          <div className="flex h-full w-full flex-col gap-4">
            <h2>Karakterfordeling</h2>
            <BarChart
              semesterGrades={state.grades[state.selectedSemesterIndex]}
            />
          </div>
        </div>
        <div className="card [grid-area:slider]">
          {state.semesters.length > 1 ? (
            <Slider
              values={state.semesters}
              currentValueIndex={state.selectedSemesterIndex}
              onChange={(index) =>
                dispatch({ type: "set_semester", payload: { index: index } })
              }
            />
          ) : state.semesters.length === 1 ? (
            <p className="text-center">
              Emnet har bare registrert karakterer for{" "}
              {state.semesters[state.selectedSemesterIndex]}.
            </p>
          ) : (
            <p className="text-center">
              Ingen karakterer registrert for dette emnet.
            </p>
          )}
        </div>
        {state.hasGrades && (
          <div className="card flex h-full flex-col justify-center [grid-area:totalaverage]">
            <div className="flex w-full flex-col gap-3 py-4">
              <div className="flex items-center justify-center gap-4">
                <div className="text-2xl text-neutral-300">
                  {state.totalAverage && gradeLetter(state.totalAverage)}
                </div>
                <div className="h-[22px] w-0 border-r border-r-neutral-700" />
                <div className="text-2xl text-neutral-300">
                  {state.totalAverage}
                </div>
              </div>
              <p className="whitespace-nowrap text-center text-sm">
                Totalt gjennomsnitt
              </p>
            </div>
          </div>
        )}
        <div className="card flex h-full flex-col justify-center [grid-area:totalfailpercentage]">
          <div className="flex w-full flex-col gap-3 py-4">
            <div className="text-center text-2xl text-neutral-300">
              {state.totalFailPercentage}%
            </div>
            <p className="whitespace-nowrap text-center text-sm">
              Total strykprosent
            </p>
          </div>
        </div>
        <LineChartsSubGrid hasGrades={state.hasGrades}>
          {state.hasGrades && (
            <div className="card flex w-full flex-col [grid-area:averages]">
              <h2>Gjennomsnitt</h2>
              <LineChart
                values={state.averageGrades}
                dataLabelIndex={state.selectedSemesterIndex}
                xLabels={state.semesters}
                yLabels={YLabels.Grades}
                color="#0284c7"
                onChange={(index) =>
                  dispatch({
                    type: "set_semester",
                    payload: { index: index },
                  })
                }
              />
            </div>
          )}
          <div className="card flex w-full flex-col [grid-area:failpercentages]">
            <h2>Strykprosent</h2>
            <LineChart
              values={state.failPercentages}
              dataLabelIndex={state.selectedSemesterIndex}
              xLabels={state.semesters}
              yLabels={YLabels.Percentages}
              color="#b13f3f"
              valueSuffix="%"
              onChange={(value) =>
                dispatch({
                  type: "set_semester",
                  payload: { index: value },
                })
              }
            />
          </div>
        </LineChartsSubGrid>
      </Grid>
    </div>
  );
}
