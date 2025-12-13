"use client";

import SemesterSlider from "./SemesterSlider";
import SemesterStepper from "./SemesterStepper";

interface SemesterNavigatorProps {
  semesters: string[];
  currentSemesterIndex: number;
  onChange: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function SemesterPicker({
  semesters,
  currentSemesterIndex,
  onChange,
  onPrevious,
  onNext,
}: SemesterNavigatorProps) {
  return (
    <>
      <div className="block md:hidden">
        <SemesterStepper
          semesters={semesters}
          currentSemesterIndex={currentSemesterIndex}
          onPrevious={onPrevious}
          onNext={onNext}
          onChange={onChange}
        />
      </div>

      <div className="hidden md:block">
        <SemesterSlider
          values={semesters}
          currentSemesterIndex={currentSemesterIndex}
          onChange={onChange}
        />
      </div>
    </>
  );
}
