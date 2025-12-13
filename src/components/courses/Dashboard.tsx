"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import { useSemesterNavigation } from "@/hooks/useSemesterNavigation";
import { Grid, LineChartsSubGrid } from "./Grid";
import BarChart from "./BarChart";
import SemesterPicker from "./SemesterPicker/SemesterPicker";
import { useEffect } from "react";
import LineChart, { YLabels } from "./LineChart";
import { gradeLetter } from "@/utils/grades";
import { Course, Grade } from "@prisma/client";
import CourseHeader from "./CourseHeader";
import FadeIn from "../common/animation/FadeIn";
import { SemesterTypeContext } from "./SemesterTypeContextProvider";
import { useContext } from "@/utils/useContext";

interface DashboardProps {
  course: Course & { grades: Grade[] };
}

export default function Dashboard({ course }: DashboardProps) {
  const { selectedSemesterType } = useContext(SemesterTypeContext);

  const data = useDashboardData(course.grades, selectedSemesterType);
  const semesterNavigation = useSemesterNavigation(data.semesters);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        semesterNavigation.goPrevious();
      } else if (e.key === "ArrowRight") {
        semesterNavigation.goNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [semesterNavigation]);

  return (
    <FadeIn>
      <div className="flex flex-col gap-4">
        <CourseHeader code={course.code} name={course.name} />
        <Grid hasGrades={data.hasGrades}>
          <div className="card [grid-area:grades]">
            <div className="flex h-full w-full flex-col gap-4">
              <h2>Karakterfordeling</h2>
              <BarChart
                semesterGrades={
                  data.filteredGrades[semesterNavigation.selectedIndex]
                }
              />
            </div>
          </div>
          <div className="card [grid-area:slider]">
            {data.semesters.length > 1 ? (
              <SemesterPicker
                semesters={data.semesters}
                currentSemesterIndex={semesterNavigation.selectedIndex}
                onChange={semesterNavigation.goToIndex}
                onPrevious={semesterNavigation.goPrevious}
                onNext={semesterNavigation.goNext}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-center">
                  {data.semesters.length === 1
                    ? `Emnet har bare registrert karakterer for ${data.semesters[semesterNavigation.selectedIndex]}.`
                    : "Ingen karakterer registrert for dette emnet."}
                </p>
              </div>
            )}
          </div>
          {data.hasGrades && (
            <div className="card flex h-full flex-col justify-center [grid-area:totalaverage]">
              <div className="flex w-full flex-col gap-3 py-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-2xl text-neutral-300">
                    {data.totalAverage && gradeLetter(data.totalAverage)}
                  </div>
                  <div className="h-[22px] w-0 border-r border-r-neutral-700" />
                  <div className="text-2xl text-neutral-300">
                    {data.totalAverage}
                  </div>
                </div>
                <p className="text-center text-sm whitespace-nowrap">
                  Totalt gjennomsnitt
                </p>
              </div>
            </div>
          )}
          <div className="card flex h-full flex-col justify-center [grid-area:totalfailpercentage]">
            <div className="flex w-full flex-col gap-3 py-4">
              <div className="text-center text-2xl text-neutral-300">
                {data.totalFailPercentage}%
              </div>
              <p className="text-center text-sm whitespace-nowrap">
                Total strykprosent
              </p>
            </div>
          </div>
          <LineChartsSubGrid hasGrades={data.hasGrades}>
            {data.hasGrades && (
              <div className="card flex w-full flex-col [grid-area:averages]">
                <h2>Gjennomsnitt</h2>
                <LineChart
                  values={data.averageGrades}
                  dataLabelIndex={semesterNavigation.selectedIndex}
                  xLabels={data.semesters}
                  yLabels={YLabels.Grades}
                  color="#0284c7"
                  onChange={semesterNavigation.goToIndex}
                />
              </div>
            )}
            <div className="card flex w-full flex-col [grid-area:failpercentages]">
              <h2>Strykprosent</h2>
              <LineChart
                values={data.failPercentages}
                dataLabelIndex={semesterNavigation.selectedIndex}
                xLabels={data.semesters}
                yLabels={YLabels.Percentages}
                color="#b13f3f"
                valueSuffix="%"
                onChange={semesterNavigation.goToIndex}
              />
            </div>
          </LineChartsSubGrid>
        </Grid>
      </div>
    </FadeIn>
  );
}
