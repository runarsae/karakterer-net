import { useMemo } from "react";
import {
  computeTotalAverage,
  computeTotalFailPercentage,
  semesterLetter,
} from "@/utils/grades";
import { Grade } from "@prisma/client";
import { SemesterType } from "@/components/courses/SemesterTypeContextProvider";

export interface DashboardData {
  hasGrades: boolean;
  filteredGrades: Grade[];
  semesters: string[];
  averageGrades: (number | null)[];
  totalAverage: number | null;
  failPercentages: (number | null)[];
  totalFailPercentage: number;
}

export function useDashboardData(
  grades: Grade[],
  semesterType: SemesterType,
): DashboardData {
  return useMemo(() => {
    const hasGrades = grades.some((item) => item.isGraded);

    const filteredGrades =
      semesterType !== SemesterType.All
        ? grades.filter((item) => item.semester === semesterType)
        : grades;

    const semesters = filteredGrades.map(
      (item) => semesterLetter(item.semester) + item.year.toString(),
    );

    return {
      hasGrades,
      filteredGrades,
      semesters,
      averageGrades: filteredGrades.map((item) => item.averageGrade),
      totalAverage: computeTotalAverage(filteredGrades),
      failPercentages: filteredGrades.map((item) => item.failPercentage),
      totalFailPercentage: computeTotalFailPercentage(filteredGrades),
    };
  }, [grades, semesterType]);
}
