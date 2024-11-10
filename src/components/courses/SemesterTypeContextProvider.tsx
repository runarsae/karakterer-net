"use client";

import { createContext } from "@/utils/createContext";
import { Grade } from "@prisma/client";
import { ReactNode, useMemo, useState } from "react";

export enum SemesterType {
  All = 0,
  Spring = 1,
  Autumn = 3,
}

export const semesterTypeLabels = {
  [SemesterType.All]: "Høst og vår",
  [SemesterType.Spring]: "Vår",
  [SemesterType.Autumn]: "Høst",
};

export const SemesterTypeContext = createContext<{
  selectedSemesterType: SemesterType | undefined;
  setSelectedSemesterType: (semesterType: SemesterType) => void;
  enabledSemesterTypes: SemesterType[];
}>();

interface Props {
  children: ReactNode;
  grades: Grade[];
}

export const SemesterTypeContextProvider = ({ children, grades }: Props) => {
  // Check which semester types the course has grades for
  const hasSpring = useMemo(
    () => grades.some((item) => item.semester === 1),
    [grades],
  );
  const hasAutumn = useMemo(
    () => grades.some((item) => item.semester === 3),
    [grades],
  );

  const enabledSemesterTypes = useMemo(
    () => [
      ...(hasSpring ? [SemesterType.Spring] : []),
      ...(hasAutumn ? [SemesterType.Autumn] : []),
      ...(hasSpring && hasAutumn ? [SemesterType.All] : []),
    ],
    [hasAutumn, hasSpring],
  );

  const [selectedSemesterType, setSelectedSemesterType] =
    useState<SemesterType>(
      hasSpring && hasAutumn
        ? SemesterType.All
        : hasSpring
          ? SemesterType.Spring
          : SemesterType.Autumn,
    );

  return (
    <SemesterTypeContext.Provider
      value={{
        selectedSemesterType,
        setSelectedSemesterType,
        enabledSemesterTypes,
      }}
    >
      {children}
    </SemesterTypeContext.Provider>
  );
};
