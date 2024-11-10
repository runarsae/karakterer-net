import { Dispatch, useEffect, useMemo, useReducer } from "react";
import {
  computeTotalAverage,
  computeTotalFailPercentage,
  semesterLetter,
} from "@/utils/grades";
import { Grade } from "@prisma/client";
import {
  SemesterType,
  SemesterTypeContext,
} from "@/components/courses/SemesterTypeContextProvider";
import { useContext } from "@/utils/useContext";

export type Action =
  | { type: "initialize"; payload: { semesterType: SemesterType } }
  | { type: "next_semester" }
  | { type: "previous_semester" }
  | { type: "set_semester"; payload: { index: number } };

export type State = {
  hasGrades: boolean;
  selectedSemesterIndex: number;
  semesters: string[];
  grades: Grade[];
  averageGrades: (number | null)[];
  totalAverage: number | null;
  failPercentages: (number | null)[];
  totalFailPercentage: number;
};

export const useDashboardState = (
  grades: Grade[],
): [State | undefined, Dispatch<Action>] => {
  const { selectedSemesterType } = useContext(SemesterTypeContext);

  const reducer = useMemo(
    () =>
      (prevState: State | undefined, action: Action): State | undefined => {
        switch (action.type) {
          case "initialize":
            const hasGrades = grades.some((item) => item.isGraded);

            const filteredGrades =
              action.payload.semesterType != SemesterType.All
                ? grades.filter(
                    (item) => item.semester == action.payload.semesterType,
                  )
                : grades;

            const semesters = filteredGrades.map(
              (item) => semesterLetter(item.semester) + item.year.toString(),
            );

            return {
              hasGrades: hasGrades,
              selectedSemesterIndex: semesters.length - 1,
              semesters: semesters,
              grades: filteredGrades,
              averageGrades: filteredGrades.map((item) => item.averageGrade),
              totalAverage: computeTotalAverage(filteredGrades),
              failPercentages: filteredGrades.map(
                (item) => item.failPercentage,
              ),
              totalFailPercentage: computeTotalFailPercentage(filteredGrades),
            };
          case "previous_semester":
            if (prevState && prevState.selectedSemesterIndex > 0) {
              const index = prevState.selectedSemesterIndex - 1;

              return {
                ...prevState,
                selectedSemesterIndex: index,
              };
            }

            return prevState;
          case "next_semester":
            if (
              prevState &&
              prevState.selectedSemesterIndex < prevState.semesters.length - 1
            ) {
              const index = prevState.selectedSemesterIndex + 1;

              return {
                ...prevState,
                selectedSemesterIndex: index,
              };
            }

            return prevState;
          case "set_semester":
            const index = action.payload.index;

            if (prevState) {
              return {
                ...prevState,
                selectedSemesterIndex: index,
              };
            }

            return prevState;
        }
      },
    [grades],
  );

  const [state, dispatch] = useReducer(reducer, undefined);

  // Initialize dashboard state when semester display and grades are changed
  useEffect(() => {
    if (selectedSemesterType !== undefined) {
      dispatch({
        type: "initialize",
        payload: { semesterType: selectedSemesterType },
      });
    }
  }, [selectedSemesterType, grades]);

  return [state, dispatch];
};
